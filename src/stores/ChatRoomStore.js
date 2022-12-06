import { action, makeAutoObservable, observable, reaction } from "mobx";
import { api } from "../repositories/Api";
import { chatRoomRepository } from "../repositories/ChatRoomRepository";

class ChatRoomStore {

    /**
     * 
     * @param {ChatRoomRepository} repository 
     */
    constructor({ repository }) {
        /**
         * Repository to access the remote data
         */
        this._repository = repository;
        /**
         * The local rooms
         */
        this._rooms = null;
        /**
         * The local messages of the tracked room
         */
        this._messages = null;
        /**
         * The local loading state
         */
        this._loading = false;
        /**
         * The observable rooms
         */
        this.rooms = null;
        /**
         * The observable messages of the tracked room
         */
        this.messages = null;
        /**
         * Property to know if the store is currently loading
         */
        this.loading = false;
        /**
         * The currently selected room
         */
        this.activeRoom = null;
        /**
         * The user's cursus
         */
        this.cursus = null;
        /**
         * The user's username
         */
        this.username = null;
        /**
         * The user's courses
         */
        this.courses = null
        /**
         * Properties of this object are set to each incoming message
         */
        this._propertiesToAppendToIncommingMessages = {};
        /**
         * Properties of this object are set to each incoming room
         */
        this._propertiesToAppendToIncomingRooms = {};
        /**
         * command to unsubscribe from the remote active room's messages changes
         * @see {@link setActiveRoom}
         */
        this.unsubscribeFromActiveRoomMessagesChange = () => { };

        /**
         * Make the store observable
         */
        makeAutoObservable(this, {
            _propertiesToAppendToIncomingRooms: false,
            _propertiesToAppendToIncommingMessages: false,
            _repository: false,
            courses: false,
            cursus: false,
            _messages: observable,
            _rooms: observable,
        });
    }

    /**
     * Start listening to remote rooms changes
     * @returns {Function} a function to dispose from listening
     */
    initialize() {
        const unsubscribeFromRemoteChanges = this._onRemoteRoomsChangeSetLocalRooms();
        const disposeFromLocalRoomsReaction = this._onLocalRoomsChangeSetObservedRoom();
        const disposeFromLocalMessagesReaction = this._onLocalMessagesChangeSetObservedMessages();

        return () => {
            unsubscribeFromRemoteChanges();
            disposeFromLocalRoomsReaction();
            disposeFromLocalMessagesReaction();
            this.unsubscribeFromActiveRoomMessagesChange && this.unsubscribeFromActiveRoomMessagesChange();
        }
    }

    /**
     * Whenever the remote rooms changes, set the local rooms with remote rooms
     * @To keep the local rooms up to date
     * @returns {Function} a function to unsubscribe from the snapchot
     */
    _onRemoteRoomsChangeSetLocalRooms() {
        return this._repository.onRoomsChange({ collectionName: this.cursus.label, callback: rooms => this._setLocalRooms(rooms) });
    }

    /**
     * Whenever the local rooms changes set the observed rooms with local rooms
     * It apply the additional properties to the rooms @see {@link definePropertiesToIncomingRooms}
     * @To notify the observer of rooms changes
     * @returns {Function} a function to dispose from the reaction
     */
    _onLocalRoomsChangeSetObservedRoom() {
        return reaction(
            () => this._rooms,
            (rooms) => {
                this.rooms = rooms.map(room => {
                    this._appendAdditionalProperties(room, this._propertiesToAppendToIncomingRooms);
                    return room
                });
            }
        );
    }

    /**
    * Whenever the local messages changes, set the observed messages with local messages. 
    * It apply the additional properties to each message @see {@link definePropertiesToIncommingMessages}
    * @To notify the observers of messages changes
    * @returns {Function} a function to dispose from the reaction
    */
    _onLocalMessagesChangeSetObservedMessages = () => reaction(
        () => this._messages,
        (messages) => {
            this.messages = []
            // setTimeout(() => {
            this.messages = messages.map(message => {
                this._appendAdditionalProperties(message, this._propertiesToAppendToIncommingMessages);
                return message
            });
            // }, 100);
        }
    );

    /**
     * Set the observable loading state
     * @returns {Function} to dispose from the reaction
     */
    _onLocalLoadingChanges = () => reaction(() => this._loading, (loading) => this.loading = loading);

    /**
     * Command to add properties to incoming rooms.
     * You can access the room in your function(room) properties
     * @param {String} properties an object that contains properties to append to the incoming rooms
     * 
     */
    definePropertiesToIncomingRooms(properties = {}) {
        this._propertiesToAppendToIncomingRooms = properties;
    }

    /**
     * Command to add properties to incoming messages.
     * You can access the message in your function(message) properties
     * @param {String} properties an object that contains properties to append to the incoming messages
     */
    definePropertiesToIncommingMessages(properties = {}) {
        this._propertiesToAppendToIncommingMessages = properties;
    }

    /**
     * Demand if the message if empty
     * @returns true if the message is empty, otherwise false
     */
    isMessageEmpty(message) {
        return !message || message.length === 0;
    }

    /**
     * Command to send a message
     * @param {String} message message to send
     * @returns true if the message was sent, otherwise false
     */
    sendMessage = async (message) => {
        return await this._repository.sendMessage({ collectionName: this.cursus.label, room: this.activeRoom, message, username: this.username });
    }

    /**
     * Transforms a date to a string.
     * @param {Date} date the date to transform
     * @returns the date as a string with the format "dd/mm/yyyy à hh:mm" 
     * if the date is today, the string will be "Aujourd'hui à hh:mm"
     */
    getDateTimeString(date) {
        if (!date) return 'Jamais';
        return getDatetimeString(date);
    }

    /**
     * Demand if the user has the given username
     * @param {String} username the username to test
     * @returns true if the user has the given username, otherwise false
     */
    isCurrentUsername(username) {
        return this.username === username;
    }

    /**
    * Set the active room and react to it's messages changes
    * @SideEffect Unsubscribe from the previous room's messages and subscribe to the given room's messages
    * @SideEffect Retrieve the messages of the given room
    * @param {Room} room 
    */
    setActiveRoom = async (room) => {
        this.unsubscribeFromActiveRoomMessagesChange();
        action(() => this.activeRoom = room)();
        this.unsubscribeFromActiveRoomMessagesChange = this._onRemoteActiveRoomMessagesChangeSetLocalMessages(this.activeRoom);
        await this._retrieveActiveRoomMessagesOnce();
    }

    /**
    * Whenever the remote room's messages changes, set the local messages with remote messages
    * @To keep the tracked room's messages up to date
    * @returns {Function} a function to unsubscribe from the snapchot
    */
    _onRemoteActiveRoomMessagesChangeSetLocalMessages(room) {
        return this._repository.onRoomMessagesChange({ room, callback: messages => this._setLocalMessages(messages) });
    }

    /**
     * @To retrieve the messages of the active room after changing the active room
     */
    _retrieveActiveRoomMessagesOnce = async () => {
        const messages = await this._repository.getRoomMessages(this.activeRoom);
        this._setLocalMessages(messages);
    }

    /**
     * command to set the active user of chat
     * @To know which cursus and courses to retrieve
     * @sideEffect it retrieves the user's cursus and courses
     * @sideEffect it retrieves the user's rooms
     * @param {Object} user 
     */
    async setActiveUser(user) {
        this.setUsername(user);
        await this._setCursusAndCoursesFromRemoteOnce(user.cursusId);
        await this._retrieveUserCursusRoomsOnce();
    }

    /**
     * If the given cursusId is not null it set the cursus and courses of the user.
     * @To get the users' rooms' name (the rooms' name are the courses' names)
     * @param {int} cursusId the cursus id for which to retrieve the cursus and courses
     */
    async _setCursusAndCoursesFromRemoteOnce(cursusId) {
        if (!cursusId) {
            console.error("cursusId is required for setting the cursus and courses");
            return;
        }
        const courses = await api.fetchCoursesByCursusId(cursusId);
        action(() => this.cursus = courses[0].cursus)();
        action(() => this.courses = courses.courses)();
    }

    /**
     * Retrieve the user's rooms from the remote
     * @To retrieve the users' rooms once without listening to remote changes
     */
    async _retrieveUserCursusRoomsOnce() {
        const rooms = await this._repository.getRooms(this.cursus.label);
        this._setLocalRooms(rooms);
    }

    /**
     * set the username of current user
     * @param {Object} user 
     */
    setUsername(user) {
        action(() => this.username = user.username)();
    }

    /**
     * Set the local rooms with the given rooms
     * @param {[Room]} rooms 
     */
    _setLocalRooms(rooms) {
        action(() => this._rooms = rooms)();
    }

    /**
     * Set the local messages as action to be able to react to it
     * @param {String} messages 
     */
    _setLocalMessages = (messages) => action(() => this._messages = messages)();

    /**
     * Set the local loading state
     * @param {Boolean} loading 
     */
    _setLocalLoading = (loading) => action(() => this._loading = loading)();

    /**
     * Append properties to the room
     * @param {Object} properties the object that contains the properties to append to the room
     * @param {Room} room the room to append the properties to
     */
    _appendAdditionalProperties(room, properties) {
        Object.entries(properties)
            .forEach(([key, value]) => {
                if (typeof value === 'function') {
                    room[key] = () => action(() => value(room))();
                } else {
                    room[key] = value;
                }
            });
    }
}

export const chatRoomStore = new ChatRoomStore({ repository: chatRoomRepository });

function getDatetimeString(date) {
    if (isToday(date)) return `${getTodayString()} à ${getFullTimeString(date)}`
    else return `${getFullDateString(date)} à ${getFullTimeString(date)}`
}

function getTodayString() {
    return "Aujourd'hui";
}

function getFullTimeString(t) {
    const hours = transformToTwoCharacters(t.getHours())
    const minutes = transformToTwoCharacters(t.getMinutes())
    return `${hours}:${minutes}`;
}

function getFullDateString(t) {
    const day = transformToTwoCharacters(getDayOfMonth(t));
    const month = transformToTwoCharacters(getCurrentMonthOfYear(t));
    const year = t.getFullYear();
    return `${day}/${month}/${year}`;
}

function getDayOfMonth(date) {
    return date.getDate();
}

function getCurrentMonthOfYear(date) {
    let adderToPreventIndexStartingAtZero = 1;
    return date.getMonth() + adderToPreventIndexStartingAtZero;
}

function transformToTwoCharacters(dayOfMonth) {
    let dayOfMonth_WithPrefix_ToEnsureLengthOf_TwoCharacters = ('0' + dayOfMonth);
    let dayWithTwoCharacters = dayOfMonth_WithPrefix_ToEnsureLengthOf_TwoCharacters.slice(-2);
    return dayWithTwoCharacters;
}

function isToday(date) {
    return new Date().getDate() === date.getDate();
}
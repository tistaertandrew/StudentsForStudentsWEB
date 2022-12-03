import * as signalR from "@microsoft/signalr";
import config from "../config.json";
import {homeStore} from "../stores/HomeStore";
import {sessionStore} from "../stores/SessionStore";
import {fileTransferStore} from "../stores/FileTransferStore";
import {navigationStore} from "../stores/NavigationStore";
import {requestsStore} from "../stores/RequestsStore";
import {myRequestsStore} from "../stores/MyRequestsStore";
import {adminStore} from "../stores/AdminStore";

class NotificationsHub {
    _connection = undefined
    static instance = undefined

    constructor() {
        this._connection = new signalR.HubConnectionBuilder()
            .withUrl(config.ApiUrl + "/Notifications")
            .build()
        this.start()
        this.listen()
    }

    start() {
        this._connection.start()
    }

    listen() {
        this._connection.on("updateUsersCount", () => {
            homeStore.loadUsersCount()
        })

        this._connection.on("updateFilesCount", () => {
            homeStore.loadFilesCount()
        })

        this._connection.on("updateFilesMetaData", () => {
          if(sessionStore.user) fileTransferStore.update(sessionStore.user.token)
        })

        this._connection.on("updateRequestStatus", (requestName, requestSenderName, requestHandlerName) => {
            requestsStore.loadRequests()
            myRequestsStore.loadMyRequests()

            if(sessionStore.user.username === requestSenderName) {
                this.showNotification(`Votre demande de "${requestName}" a été acceptée par ${requestHandlerName}`)
            }
        })

        this._connection.on("updateRequests", () => {
            requestsStore.loadRequests()
            myRequestsStore.loadMyRequests()
        })

        this._connection.on("updateUsers", () => {
            debugger
            adminStore.loadUsers()
        })
    }

    showNotification(message) {
        navigationStore.handleNotification(message)
    }

    static getInstance() {
        if (!NotificationsHub.instance) {
            NotificationsHub.instance = new NotificationsHub()
        }
        return NotificationsHub.instance
    }
}

export default NotificationsHub.getInstance
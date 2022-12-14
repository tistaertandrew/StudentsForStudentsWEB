import {action, makeAutoObservable, reaction} from "mobx";
import {fileTransferRepository} from "../repositories/FileTransferRepository";
import {sessionStore} from "./SessionStore";
import Course from "../models/Course";
import Cursus from "../models/Cursus";
import Section from "../models/Section";
import {Buffer} from 'buffer';

class FileTransferStore {
    _openFileAdd = false
    _openFilter = false
    _courses = []
    _file = undefined

    constructor({ repository }) {
        this._repository = repository;
        this._fileReader = new FileReader();
        this._content = { courseId: "", text: "", name: "", extension: "" };
        this._errors = [];
        this._isLoading = false;
        this._files = [];
        this._isError = false;

        this.files = [];
        this.isLoading = false;
        this.errors = [];
        this.isError = false;

        makeAutoObservable(this);

        this._onLocalFilesChanges();
        this._onLocalLoadingChanges();
        this._onLocalContentChanges();
        this._onLocalErrorsChanges();
        this._onLocalErrorChange();
    }

    get openFileAdd() {
        return this._openFileAdd
    }

    set openFileAdd(open) {
        this._openFileAdd = open
    }

    get openFilter() {
        return this._openFilter
    }

    set openFilter(open) {
        this._openFilter = open
    }

    get courses() {
        return this._courses
    }

    set courses(data) {
        this._courses = data.map(course => {
            return new Course(course.id, course.label, new Cursus(course.cursus.id, course.cursus.label, new Section(course.cursus.section.id, course.cursus.section.label)))
        })
    }

    get file() {
        return this._file
    }

    set file(file) {
        if (file) {
            this._file = file
            console.info(file)
        }
    }

    handleErrorMessage() {
        this.isError = true

        setTimeout(() => {
            this.isError = false
        }, 2500)
    }

    async init({ token }) {
        try {
            this._setLoading(true);
            this._loadFiles(token);
        } catch (e) {
            console.error("Error on file transfer init", e);
            this._setErrors(e);
            this._setIsError(true)
        } finally {
            this._setLoading(false);
        }
    }

    async update(token) {
        await this._loadFiles(token)
    }

    async onDeleteFile(file, token) {
        try {
            this._setLoading(true);
            console.info(file);
            await this._repository.deleteFile({ name: file.name }, token);
            //this._loadFiles(token);
        } catch (e) {
            console.error("Error on file delete", e);
            this._setErrors(e);
            this._setIsError(true)
        } finally {
            this._setLoading(false);
        }
    }

    onInputFileChange(courseId) {
        if (courseId === '') {
            this._setErrors({ message: 'Le champ "Cours concern??" est obligatoire' })
            this.handleErrorMessage()
            return
        }

        if (!this.file) {
            this._setErrors({ message: 'La synth??se ?? ajouter est obligatoire' })
            this.handleErrorMessage()
            return
        }
        this.closeFileAddPopup()
        try {
            this._fileReader.onloadend = () => {
                const text = this._fileReader.result;
                this._setLocalContent({ courseId: courseId, text, name: this.file.name });
            }

            this._fileReader.readAsArrayBuffer(this.file);
        } catch (e) {
            console.error("Error on file input listener", e);
            this._setErrors(e);
            this._setIsError(true)
        }
    }

    async onDownloadFile(file, token) {
        try {
            this._setLoading(true);
            const content = await this._repository.getFileContent({ name: file.name }, token);
            this._download(content, file.name + '.pdf', "application/pdf");
        } catch (e) {
            console.error("Error on file download", e);
            this._setErrors(e);
            this._setIsError(true)
        } finally {
            this._setLoading(false);
        }
    }

    _onLocalContentChanges() {
        return reaction(() => this._content, async (content) => {
            try {
                this._setLoading(true);
                // Create file in server
                await this._repository.createFile({
                    courseId: content.courseId,
                    name: content.name,
                    content: Buffer.from(content.text).toString('base64'),
                    extension: content.extension
                }, sessionStore.user?.token);
            } catch (e) {
                console.error("Error on file upload", e);
                this._setErrors(e);
                this._setIsError(true)
            } finally {
                this._setLoading(false);
            }
        });
    }

    _setLocalContent({ courseId, text, name }) {
        const extension = name.substring(name.lastIndexOf(".") + 1)
        const newName = name.substring(name.lastIndexOf('\\') + 1, name.lastIndexOf('.'));
        action(() => this._content = { courseId, text, name: newName, extension })();
    }

    async _loadFiles(token) {
        const files = await this._repository.loadFiles(token)
        if (files) {
            this._setFiles(files);
        }
    }

    _onLocalErrorChange() {
        return reaction(() => this._isError, (isError) => {
            this.isError = isError;
        });
    }

    _onLocalErrorsChanges() {
        return reaction(() => this._errors, (errors) => {
            action(() => this.errors = errors)();
        });
    }

    _onLocalFilesChanges() {
        return reaction(() => this._files, (files) => {
            action(() => this.files = files)();
        });
    }

    _onLocalLoadingChanges() {
        return reaction(() => this._isLoading, (loading) => {
            action(() => this.isLoading = loading)();
        });
    }

    _download(data, filename, type) {
        try {
            this._setLoading(true);
            let file = new Blob([data], { type: type });
            if (window.navigator.msSaveOrOpenBlob) // IE10+
                window.navigator.msSaveOrOpenBlob(file, filename);
            else { // Others
                let a = document.createElement("a"),
                    url = `data:application/pdf;base64,${data}`;
                a.href = url;

                a.download = filename;
                document.body.appendChild(a);
                a.click();
                setTimeout(function () {
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                }, 0);
            }
        } catch (e) {
            console.error("Error on file download", e);
            this._setErrors(e);
            this._setIsError(true)
            this._setLoading(false);
        }
    }

    _setFiles(files) {
        action(() => this._files = files)();
    }

    _setErrors(errors) {
        action(() => this._errors = errors.message)();
        this.handleErrorMessage()
    }

    _setIsError(isError) {
        action(() => this._isError = isError)();
    }

    _setLoading(loading) {
        action(() => this._isLoading = loading)()
    }

    setInputFile(input) {
        action(() => this._input = input)();
    }

    openFileAddPopup() {
        this.openFileAdd = true
    }

    closeFileAddPopup() {
        this.openFileAdd = false
    }

    openFilterPopup() {
        this.openFilter = true
    }

    closeFilterPopup() {
        this.openFilter = false
    }

    loadCourses(cursusId) {
        this._repository.loadCourses(cursusId)
            .then(data => this.courses = data)
    }

    handleFileSubmit(data) {
        this.onInputFileChange(...data.values())
    }

    async filterRequestsByCourse(data) {
        let id = parseInt([...data.values()][0])
        if (isNaN(id)) {
            this._setErrors({ message: 'Le champ "Cours concern??" est obligatoire' })
            this.handleErrorMessage()
            return
        }

        await this._loadFiles(sessionStore.user?.token)
        this._files = this._files.filter(file => file.course.id === id)
        this.closeFilterPopup()
    }

    async filterRequestsByDate(date) {
        await this._loadFiles(sessionStore.user?.token)
        this._files = this._files.filter(file => file.creationDate === date.toISOString().substring(0, 10))
        this.closeFilterPopup()
    }

    async filterRequestsByAuthor(data) {
        let author = [...data.values()][0]
        if (author === '') {
            this._setErrors({ message: 'Le champ "Auteur concern??" est obligatoire' })
            this.handleErrorMessage()
            return
        }

        await this._loadFiles(sessionStore.user?.token)
        this._files = this._files.filter(file => file.owner.toLowerCase().includes(author.toLowerCase()))
        this.closeFilterPopup()
    }

    async handleResetFilter() {
        await this._loadFiles(sessionStore.user?.token)
    }
}

export const
    fileTransferStore = new FileTransferStore({ repository: fileTransferRepository });
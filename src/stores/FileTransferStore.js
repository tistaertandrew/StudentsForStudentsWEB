import { action, makeAutoObservable, observable, reaction, runInAction, _allowStateChangesInsideComputed } from "mobx";
import { fileTransferRepository } from "../repositories/FileTransferRepository";
import { sessionStore } from "./SessionStore";

class FileTransferStore {
    constructor({ repository }) {
        this._repository = repository;
        this._fileReader = new FileReader();
        this._content = { text: "", name: "", extension: "" };
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
            console.log("Error on file transfer init", e);
            this._setErrors(e);
            this._setIsError(true)
        } finally {
            this._setLoading(false);
        }
    }

    async onDownloadFile(file, token) {
        try {
            this._setLoading(true);
            const content = await this._repository.getFileContent({ name: file.name }, token);
            this._download(content, file.name + '.txt', "text/plain");
        } catch (e) {
            console.error("Error on file download", e);
            this._setErrors(e);
            this._setIsError(true)
        } finally {
            this._setLoading(false);
        }
    }

    async onDeleteFile(file, token) {
        try {
            this._setLoading(true);
            console.log(file);
            await this._repository.deleteFile({ name: file.name }, token);
            this._loadFiles(token);
        } catch (e) {
            console.error("Error on file delete", e);
            this._setErrors(e);
            this._setIsError(true)
        } finally {
            this._setLoading(false);
        }
    }

    onInputFileChange(input) {
        try {
            this._fileReader.onload = () => {
                this._setLocalContent({ text: this._fileReader.result, name: input.value });
            }
            this._fileReader.readAsText(input.files[0]);

        } catch (e) {
            console.error("Error on file input listener", e);
            this._setErrors(e);
            this._setIsError(true)
        }
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
            console.log("loading", loading);
            action(() => this.isLoading = loading)();
        });
    }

    _onLocalContentChanges() {
        return reaction(() => this._content, async (content) => {
            try {
                this._setLoading(true);
                await this._repository.createFile({
                    name: content.name,
                    content: content.text,
                    extension: content.extension
                }, sessionStore.user?.token);
                this._loadFiles(sessionStore.user?.token);
            } catch (e) {
                console.error("Error on file upload", e);
                this._setErrors(e);
                this._setIsError(true)
            } finally {
                this._setLoading(false);
            }
        });
    }

    _setLocalContent({ text, name }) {
        const extension = name.substring(name.lastIndexOf(".") + 1)
        const newName = name.substring(name.lastIndexOf('\\') + 1, name.lastIndexOf('.'));
        action(() => this._content = { text, name: newName, extension })();
    }

    _download(data, filename, type) {
        try {
            this._setLoading(true);
            var file = new Blob([data], { type: type });
            if (window.navigator.msSaveOrOpenBlob) // IE10+
                window.navigator.msSaveOrOpenBlob(file, filename);
            else { // Others
                var a = document.createElement("a"),
                    url = URL.createObjectURL(file);
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
}

export const fileTransferStore = new FileTransferStore({ repository: fileTransferRepository });
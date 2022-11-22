import { FileTransferApi } from "./FileTransferApi";

export class FileTransferRepository {
    constructor({ api }) {
        this._api = api;
    }

    async loadFiles(token) {
        const response = await this._api.getAvailableFiles(token);
        const data = await response.json();
        if (data.isError) {
            throw new Error(data.errors);
        } else {
            return data.content.map(file => {
                return {
                    name: file.filename,
                    owner: file.ownerName,
                    creationDate: file.creationDate.substring(0, 10),
                    ownerId: file.ownerId,
                    id: file.fileId
                }
            });
        }
    }

    async deleteFile({ name }, token) {
        console.log(name);
        const response = await this._api.deleteFileByName(name, token);
        const data = await response.json();
        if (data.isError) {
            throw new Error(data.errors);
        }
    }

    async createFile({ name, content, extension }, token) {
        const response = await this._api.postFile(token, { content, filename: name, extension });
        const data = await response.json();
        if (data.isError) {
            throw new Error(data.errors);
        }
    }

    async getFileContent({ name }, token) {
        const response = await this._api.getFileByName(name, token);
        const data = await response.json();
        if (data.isError) {
            throw new Error(data.errors);
        } else {
            return data.content;
        }
    }
}

export const fileTransferRepository = new FileTransferRepository({ api: new FileTransferApi() });
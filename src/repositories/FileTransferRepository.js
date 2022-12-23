import { FileTransferApi } from "./FileTransferApi";
import Course from "../models/Course";
import Cursus from "../models/Cursus";
import Section from "../models/Section";

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
                    course: new Course(file.course.id, file.course.label, new Cursus(file.course.cursus.id, file.course.cursus.label, new Section(file.course.cursus.section.id, file.course.cursus.section.label))),
                    creationDate: file.creationDate.substring(0, 10),
                    ownerId: file.ownerId,
                    id: file.fileId
                }
            });
        }
    }

    async deleteFile({ name }, token) {
        const response = await this._api.deleteFileByName(name, token);
        const data = await response.json();
        if (data.isError) {
            throw new Error(data.errors);
        }
    }

    async createFile({ courseId, name, content, extension }, token) {
        const response = await this._api.postFile(token, { courseId, content, filename: name, extension });
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

    loadCourses(cursusId) {
        return this._api.fetchCourses(cursusId);
    }
}

export const fileTransferRepository = new FileTransferRepository({ api: new FileTransferApi() });
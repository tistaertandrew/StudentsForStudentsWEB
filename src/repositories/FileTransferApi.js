import config from '../env/config.json';

export class FileTransferApi {

    constructor() {
        this._base = `${config.ApiUrl}/File`;
        this._header = (token) => {
            return {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            }
        }
    }

    fetchCourses(cursusId) {
        return fetch(`${config.ApiUrl}/School/Course/${cursusId}`)
            .then(resp => resp.json())
    }

    async getAvailableFiles(token) {
        return await fetch(`${this._base}`, {
            method: 'GET',
            headers: this._header(token)
        });
    }

    async deleteFileByName(filename, token) {
        return await fetch(`${this._base}/${filename}`, {
            method: 'DELETE',
            headers: this._header(token)
        });
    }

    async getFileByName(filename, token) {
        return await fetch(`${this._base}/${filename}`, {
            method: 'GET',
            headers: this._header(token),
        })
    }

    async postFile(token, { courseId, content, filename, extension }) {
        return await fetch(`${this._base}`, {
            method: 'POST',
            body: JSON.stringify({ courseId, content, filename, extension }),
            headers: this._header(token)
        });
    }
}
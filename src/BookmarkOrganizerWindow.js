import { Folder } from "./Folder.js";

export class BookmarkOrganizerWindow {
    constructor() {
        this.folders = [];

        this.rootFolder = this.createFolder("Root");

        this.currentFolder = this.rootFolder;
    }

    createFolder(name) {
        const folder = new Folder(name);
        this.folders.push(folder);
        return folder;
    }

    dragAndDrop() {

    }

    addVisualBrackets() {

    }
}
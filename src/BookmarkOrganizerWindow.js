class BookmarkOrganizerWindow {
    constructor() {
        this.folders = [];

        this.rootFolder = this.createFolder("Root");
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
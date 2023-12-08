class BookmarkOrganizerWindow {
    constructor() {
        this.folders = [];
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
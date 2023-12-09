class Folder extends BookmarkExplorerElement {
    constructor(name, folder) {
        
        super(name, folder);

        this.elements = [];
    }

    addElement(element) {
        this.elements.push(element);
        element.folder = this;
        Browser.get().getBookmarkBar().addVisualBookmark(element);
    }

    removeElement(element) {
        const index = this.elements.indexOf(element);

        if (index == 1) {
            return;
        }

        this.elements.splice(index, 1);
    }

    organizeElements() {
        
    }
}
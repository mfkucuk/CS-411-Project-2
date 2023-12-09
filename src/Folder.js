class Folder extends BookmarkExplorerElement {
    constructor(name, folder) {
        
        super(name, folder);

        this.elements = [];
    }

    addElement(element) {
        this.elements.push(element);
        element.folder = this;
        if (element instanceof Folder){
            Browser.get().getBookmarkBar().addVisualFolder(element);
        } else if (element instanceof Bookmark)
        {
            Browser.get().getBookmarkBar().addVisualBookmark(element);
        } 
        else{
            Browser.get().getBookmarkBar().addBracket();
        }
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
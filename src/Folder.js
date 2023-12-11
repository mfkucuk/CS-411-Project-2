import { BookmarkExplorerElement } from './BookmarkExplorerElement.js';
import { Browser } from './Browser.js';
import { Bookmark } from './Bookmark.js';

export class Folder extends BookmarkExplorerElement {
    constructor(name, folder) {
        
        super(name, folder);

        this.elements = [];
        this.domElements = [];
    }

    addElement(element) {
        if (element instanceof Folder){
            Browser.get().getBookmarkBar().addVisualFolder(element);
        } else if (element instanceof Bookmark)
        {
            Browser.get().getBookmarkBar().addVisualBookmark(element);
        } 
        else{
            Browser.get().getBookmarkBar().addBracket(element);
        }

        this.elements.push(element);
        this.domElements.push(element.domElement);
        element.folder = this;
    }

    removeElement(element) {
        const index = this.elements.indexOf(element);

        if (index == 1) {
            return;
        }

        this.elements.splice(index, 1);
    }
}
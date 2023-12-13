import { BookmarkExplorerElement } from './BookmarkExplorerElement.js';

export class Bookmark extends BookmarkExplorerElement {
    constructor(url, name) {

        super(name);

        this.url = url;
    }
}
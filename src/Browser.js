import { BookmarkBar } from './BookmarkBar.js';
import { BookmarkOrganizerWindow } from './BookmarkOrganizerWindow.js';

export class Browser {
    constructor() {
        this.bookmarks = [];
        this.bookmarkBar = new BookmarkBar();
        this.organizerWindow = new BookmarkOrganizerWindow();

        this.currentUser = null;

        this.currentPage = null;
        this.allPages = {};
    }

    static get() {
        if (typeof this.instance == 'undefined') {
            this.instance = new Browser();
        }

        return this.instance;
    }

    getBookmarkBar() {
        return this.bookmarkBar;
    }

    getOrganizerWindow() {
        return this.organizerWindow;
    }

    open(page) {

        if (typeof page == 'string') 
        {
            if (typeof this.allPages[page] == 'undefined') 
            {
                return;
            }
            else 
            {
                page = this.allPages[page];
            }
        }
        
        this.currentPage = page;
        this.allPages[page.url] = page;

        const pageContainer = document.getElementById('pageContainer');

        if (pageContainer.childNodes.length != 0) 
        {
            pageContainer.removeChild(pageContainer.childNodes[0]);
        }

        document.getElementById('pageContainer').appendChild(page.content);
    }

    initPages(pages) {
        pages.forEach(page => {
            this.allPages[page.url] = page;
        });
    }
}
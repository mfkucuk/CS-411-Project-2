class Browser {
    constructor() {
        this.bookmarks = [];
        this.bookmarkBar = new BookmarkBar();
        this.organizerWindow = new BookmarkOrganizerWindow();

        this.currentPage = null;
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
        const pageContainer = document.getElementById('pageContainer');

        if (pageContainer.childNodes.length != 0) 
        {
            pageContainer.removeChild(pageContainer.childNodes[0]);
        }

        document.getElementById('pageContainer').appendChild(page.content);
    }
}
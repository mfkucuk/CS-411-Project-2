class BookmarkBar {

    constructor() {

        this.visible = true;
        this.bookmarks = [];
        
        this.domElement = document.getElementById('bookmarkBar');
    }

    show() {
        this.visible = true;
    }

    hide() {
        this.visible = false;
    }

    importBookmarks(browser) {
        
    }

    addVisualBookmark(bookmark) {
        if (!this.visible) {
            return;
        }

        const bookmarkElement = document.createElement('div');
        bookmarkElement.className = 'bookmark';
        bookmarkElement.textContent = bookmark.title;
        bookmarkElement.href = bookmark.url;
        bookmarkBar.appendChild(bookmarkElement);
    }
}
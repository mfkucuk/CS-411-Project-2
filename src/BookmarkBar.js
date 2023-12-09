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

        const bookmarkButton = document.createElement('button');
        bookmarkButton.className = 'bookmark';
        bookmarkButton.textContent = bookmark.name;
        bookmarkButton.href = bookmark.url;
        bookmarkButton.addEventListener('click', () => {
            // Handle button click event, if needed
            Browser.get().open(bookmark.url);
        });
    
        bookmarkBar.appendChild(bookmarkButton);
    }
}
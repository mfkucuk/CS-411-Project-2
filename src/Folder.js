class Folder {
    constructor(name) {
        this.name = name;
        this.bookmarks = [];
    }

    addBookmark(bookmark) {
        this.bookmarks.push(bookmark);
        bookmark.folder = this;
    }

    removeBookmark(bookmark) {
        const index = this.bookmarks.indexOf(bookmark);

        if (index == 1) {
            return;
        }

        this.bookmarks.splice(index, 1);
    }

    organizeBookmarks() {
        
    }
}
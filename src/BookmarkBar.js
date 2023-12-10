class BookmarkBar {
    constructor() {
        this.visible = true;
        this.bookmarks = [];
        this.domElement = document.getElementById('bookmarkBar');

        this.elementList = [];

        // Variable to store the order of bookmarks
        this.bookmarkOrder = [];

        // Add event listeners for drag and drop directly on the domElement
        this.domElement.addEventListener('dragstart', this.handleDragStart.bind(this));
        this.domElement.addEventListener('dragover', this.handleDragOver.bind(this));
        this.domElement.addEventListener('dragenter', this.handleDragEnter.bind(this));
        this.domElement.addEventListener('dragleave', this.handleDragLeave.bind(this));
        this.domElement.addEventListener('drop', this.handleDrop.bind(this));
        this.domElement.addEventListener('drop', this.handleDrop.bind(this));
        this.domElement.addEventListener('drop', this.handleFolderDrop.bind(this)); // Add new event listener
    }

    show() {
        this.visible = true;
    }

    hide() {
        this.visible = false;
    }


    addBracket(){
        if (!this.visible) {
            return;
        }
     
        const bracket = document.createElement('div');
        bracket.className = 'bookmark-bracket'; 
        bracket.draggable = true;
        bracket.textContent = '|'; 
        bracket.id = 'bracket'+this.elementList.length;

        this.domElement.appendChild(bracket);

        this.elementList.push(bracket);

    }

    addVisualFolder(folder) {
        if (!this.visible) {
            return;
        }
        console.log('add visual folder 1')
        const folderButton = document.createElement('button');
        folderButton.className = 'folder';
        folderButton.textContent = folder.name;
        folderButton.id = 'folder' + this.elementList.length;
        folderButton.draggable = true;

        folderButton.addEventListener('click', (event => {
            const popupContainer = document.getElementById('folderContainer');
            popupContainer.style.display = (popupContainer.style.display === 'none' || popupContainer.style.display === '') ? 'block' : 'none';
            this.bookmarks.forEach((label, index) => {
                const button = document.createElement('button');
                const bookmarkId = `bookmark-${Math.random()}`;
                bookmarkButton.id = bookmarkId;
                bookmarkButton.className = 'bookmark';
                bookmarkButton.textContent = bookmark.name;
                bookmarkButton.href = bookmark.url;
                popup.appendChild(button);
              });
        }))

        folderButton.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData("text", event.target.id);
        });


        console.log('add visual folder 2')
        this.domElement.appendChild(folderButton);
        this.elementList.push(folderButton);
    }

    addVisualBookmark(bookmark) {
        if (!this.visible) {
            return;
        }

        const bookmarkButton = document.createElement('button');
        const bookmarkId = `bookmark-${Math.random()}`;
        bookmarkButton.id = bookmarkId;
        bookmarkButton.className = 'bookmark';
        bookmarkButton.textContent = bookmark.name;
        bookmarkButton.href = bookmark.url;

        // Make the bookmark button draggable
        bookmarkButton.draggable = true;

        bookmarkButton.addEventListener('click', () => {
            // Handle button click event, if needed
            Browser.get().open(bookmark.url);
        });

        bookmarkButton.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData("text", event.target.id);
        });

        bookmarkButton.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        bookmarkButton.addEventListener('dragenter', (event) => {
            event.preventDefault();
            this.domElement.classList.add('drag-over');
        });

        bookmarkButton.addEventListener('dragleave', () => {
            this.domElement.classList.remove('drag-over');
        });

        bookmarkButton.addEventListener('drop', (event) => {
            event.preventDefault();
            const data = event.dataTransfer.getData("text");
            const draggedElement = document.getElementById(data);
            this.domElement.classList.remove('drag-over');

            if (draggedElement && draggedElement.parentElement !== this.domElement) {
                const newIndex = Array.from(this.domElement.children).indexOf(draggedElement);
                this.updateBookmarkOrder(data, newIndex);
            }
        });

        this.domElement.appendChild(bookmarkButton);

        // Add the bookmark ID to the bookmarkOrder array
        this.bookmarkOrder.push(bookmarkId);

        // Add the bookmark to the bookmarks array
        this.bookmarks.push({
            id: bookmarkId,
            name: bookmark.name,
            url: bookmark.url,
        });

        this.elementList.push(bookmarkButton);
    }

    // Function to handle drop event for folders
    handleFolderDrop(event) {
        event.preventDefault();
        const data = event.dataTransfer.getData("text");
        const draggedElement = document.getElementById(data);
        this.domElement.classList.remove('drag-over');

        if (draggedElement && draggedElement.parentElement == this.domElement) {
            if (event.target !== this.domElement) {
                const indexOfDragged = this.elementList.indexOf(draggedElement);
                
                let element = this.elementList.splice(indexOfDragged, 1);

                
                const indexOfHovered = this.elementList.indexOf(event.target);

                this.elementList.splice(indexOfHovered, 0, element[0]);

                this.refreshBoookmarBar();
            }   

        }
    }

    handleDragOver(event) {
        event.preventDefault();
        const draggedElement = document.querySelector('.dragging');
        if (draggedElement && draggedElement.parentElement !== this.domElement) {
            this.domElement.classList.add('drag-over');
        }
    }

    handleDragLeave() {
        this.domElement.classList.remove('drag-over');
    }

    handleDrop(event) {
        event.preventDefault();
        const data = event.dataTransfer.getData("text");
        const draggedElement = document.getElementById(data);
        this.domElement.classList.remove('drag-over');

        if (draggedElement && draggedElement.parentElement !== this.domElement) {
            this.readdBookmarks();
        }
    }

    handleDragStart(event) {
        event.dataTransfer.setData("text/plain", event.target.id);
    }

    handleDragEnter(event) {
        event.preventDefault();
        this.domElement.classList.add('drag-over');
    }

    updateBookmarkOrder(draggedId, newIndex) {
        // Remove the dragged bookmark from the order
        const currentIndex = this.bookmarkOrder.indexOf(draggedId);
        this.bookmarkOrder.splice(currentIndex, 1);

        // Insert the dragged bookmark at the new index
        this.bookmarkOrder.splice(newIndex, 0, draggedId);

        // Implement logic to save the new order to your data storage
        console.log("Bookmark order updated:", this.bookmarkOrder);

        // Re-add bookmarks to the BookmarkBar in the updated order
        this.readdBookmarks();
    }

    readdBookmark(bookmark) {
        const bookmarkButton = document.createElement('button');
        const bookmarkId = `bookmark-${Math.random()}`;
        bookmarkButton.id = bookmarkId;
        bookmarkButton.className = 'bookmark';
        bookmarkButton.textContent = bookmark.name;
        bookmarkButton.href = bookmark.url;

        // Make the bookmark button draggable
        bookmarkButton.draggable = true;

        bookmarkButton.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData("text", event.target.id);
            console.log('dragstart', event.target.id);
        });

        bookmarkButton.addEventListener('dragover', (event) => {
            event.preventDefault();
            console.log('dragover');
        });

        bookmarkButton.addEventListener('dragenter', (event) => {
            event.preventDefault();
            console.log('dragenter');
            this.domElement.classList.add('drag-over');
        });

        bookmarkButton.addEventListener('dragleave', () => {
            console.log('dragleave');
            this.domElement.classList.remove('drag-over');
        });

        bookmarkButton.addEventListener('drop', (event) => {
            event.preventDefault();
            const data = event.dataTransfer.getData("text");
            console.log('drop', data);
            this.domElement.classList.remove('drag-over');
            this.updateBookmarkOrder();
        });

        // Append the bookmark button to the DOM
        this.domElement.appendChild(bookmarkButton);

        // Add the bookmark ID to the bookmarkOrder array
        this.bookmarkOrder.push(bookmarkId);

        // Add the bookmark to the bookmarks array
        this.bookmarks.push({
            id: bookmarkId,
            name: bookmark.name,
            url: bookmark.url,
        });
    }

    readdBookmarks() {
        this.domElement.innerHTML = ''; // Clear the BookmarkBar
        const newBookmarkOrder = [];
        this.bookmarkOrder.forEach(bookmarkId => {
            const bookmark = this.bookmarks.find(b => b.id === bookmarkId);
            if (bookmark) {
                this.readdBookmark(bookmark);
                newBookmarkOrder.push(bookmarkId);
            }
        });
        this.bookmarkOrder = newBookmarkOrder;
    }

    refreshBoookmarBar() {
        while (this.domElement.childElementCount != 0) {
            this.domElement.removeChild(this.domElement.childNodes[0]);
        }

        this.elementList.forEach(ele => {
            console.log(ele);
            this.domElement.appendChild(ele);
        });
    }
}

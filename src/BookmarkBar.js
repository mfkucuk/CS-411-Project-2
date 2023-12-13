import { Browser } from "./Browser.js";
import { renamePopup } from "./main.js";
import { iconPopup } from "./main.js";

export class BookmarkBar {
    constructor() {
        this.visible = true;
        this.bookmarks = [];
        this.domElement = document.getElementById('bookmarkBar');
        this.outerBar = document.getElementById('innerBookmarkCont');
        this.elementList = [];

        // Variable to store the order of bookmarks
        this.bookmarkOrder = [];

        // Add event listeners for drag and drop directly on the domElement
        this.domElement.addEventListener('dragstart', this.handleDragStart.bind(this));
        this.domElement.addEventListener('dragover', this.handleDragOver.bind(this));
        this.domElement.addEventListener('dragenter', this.handleDragEnter.bind(this));
        this.domElement.addEventListener('dragleave', this.handleDragLeave.bind(this));
        this.domElement.addEventListener('drop', this.handleDrop.bind(this));

        this.outerBar.addEventListener('dragstart', this.handleDragStart.bind(this));
        this.outerBar.addEventListener('dragover', this.handleDragOver.bind(this));
        this.outerBar.addEventListener('dragenter', this.handleDragEnter.bind(this));
        this.outerBar.addEventListener('dragleave', this.handleDragLeave.bind(this));
        this.outerBar.addEventListener('drop', this.handleDrop.bind(this));


        document.getElementById('returnBtn').addEventListener('drop', (event) => 
        {
            event.preventDefault();
            const data = event.dataTransfer.getData("text");
            const draggedElement = document.getElementById(data);
            this.domElement.classList.remove('drag-over');

            if (draggedElement == event.target) {
                return;
            }

            else if (event.target.id == 'returnBtn' && draggedElement.className != 'bookmark-bracket') 
            {
                const currentFolder = Browser.get().getOrganizerWindow().currentFolder;
                
                if (currentFolder.folder == null) 
                {
                    return;
                }

                const indexOfDragged = currentFolder.domElements.indexOf(draggedElement);
                let element = currentFolder.elements.splice(indexOfDragged, 1);
                currentFolder.domElements.splice(indexOfDragged, 1);

                console.log(element);

                Browser.get().getOrganizerWindow().currentFolder.folder.addElement(element[0]);

                this.refreshBoookmarBar();
            }
        });
    }

    show() {
        this.visible = true;
    }

    hide() {
        this.visible = false;
    }


    addBracket(bracket){
        if (!this.visible) {
            return;
        }
     
        const bracketDom = document.createElement('div');
        bracketDom.className = 'bookmark-bracket'; 
        bracketDom.draggable = true;
        bracketDom.textContent = '|'; 
        bracketDom.id = 'bracket'+this.elementList.length;
        bracket.domElement = bracketDom;

        this.domElement.appendChild(bracketDom);

        this.elementList.push(bracketDom);

    }

    addVisualFolder(folder) {
        if (!this.visible) {
            return;
        }

        //Browser.get().getOrganizerWindow().currentFolder.addElement();

        console.log('add visual folder 1')
        const folderButton = document.createElement('button');
        folderButton.className = 'folder';
        folderButton.textContent = folder.name;
        folderButton.id = 'folder' + this.elementList.length;
        folderButton.draggable = true;
        folder.domElement = folderButton;

        folderButton.addEventListener('click', (event => {
            Browser.get().getOrganizerWindow().currentFolder = folder;
            this.refreshBoookmarBar();
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
        bookmark.domElement = bookmarkButton;

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
    handleDrop(event) {
        event.preventDefault();
        const data = event.dataTransfer.getData("text");
        const draggedElement = document.getElementById(data);
        this.domElement.classList.remove('drag-over');

        if (draggedElement == event.target) {
            return;
        }

        let currentFolder = Browser.get().getOrganizerWindow().currentFolder;

        if (draggedElement && draggedElement.parentElement == this.domElement) {
            if (event.target !== this.domElement) {
                const indexOfDragged = currentFolder.domElements.indexOf(draggedElement);
                const indexOfHovered = currentFolder.domElements.indexOf(event.target);
                
                let offset = indexOfDragged < indexOfHovered ? -1 : 0;
                if (event.target.className == 'folder' && draggedElement.className != 'bookmark-bracket') 
                {
                    let domElement = currentFolder.domElements.splice(indexOfDragged, 1);
                    let element = currentFolder.elements.splice(indexOfDragged, 1);


                    currentFolder.elements[indexOfHovered + offset].addElement(element[0]);
                    this.refreshBoookmarBar();
                }
                else 
                {
                    let domElement = currentFolder.domElements.splice(indexOfDragged, 1);
                    let element = currentFolder.elements.splice(indexOfDragged, 1);
    
                    currentFolder.domElements.splice(indexOfHovered + offset, 0, domElement[0]);
                    currentFolder.elements.splice(indexOfHovered + offset, 0, element[0]);
    
                    this.refreshBoookmarBar();
                }

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

    handleDragStart(event) {
        event.dataTransfer.setData("text/plain", event.target.id);
    }

    handleDragEnter(event) {
        event.preventDefault();
        this.domElement.classList.add('drag-over');
    }

    refreshBoookmarBar() {
        while (this.domElement.childElementCount != 0) {
            this.domElement.removeChild(this.domElement.childNodes[0]);
        }

        let currentFolder = Browser.get().getOrganizerWindow().currentFolder;

        currentFolder.domElements.forEach(ele => {
            this.domElement.appendChild(ele);
        });
    }
}

let chosenElement = null;

function showCustomContextMenu(event) {
    event.preventDefault();

    // Show the custom context menu at the cursor position

    if (event.target.className != 'bookmark' && event.target.className != 'folder'
     && event.target.className != 'bookmark-bracket') 
     {
        return;
    }
    
    const option2 = document.getElementById('renameOption');
    const option3 = document.getElementById('iconOption');
    if (event.target.className == 'bookmark-bracket') 
    {
        option2.style.display = 'none';
        option3.style.display = 'none';
    }
    else 
    {
        option2.style.display = 'block';
        option3.style.display = 'block';
    }

    chosenElement = event.target;

    const customContextMenu = document.getElementById('menu');
    customContextMenu.style.left = event.clientX + 'px';
    customContextMenu.style.top = event.clientY + 'px';
    customContextMenu.style.display = 'block';

    // Set a data attribute to identify the target element
    //customContextMenu.setAttribute('data-target-element', event.target.id);
}

function hideCustomContextMenu() 
{

    const customContextMenu = document.getElementById('menu');
    customContextMenu.style.display = 'none';
}

document.getElementById('deleteOption').addEventListener('click', (event) => {

    console.log(chosenElement);

    let currentFolder = Browser.get().getOrganizerWindow().currentFolder;

    const index = currentFolder.domElements.indexOf(chosenElement);

    currentFolder.domElements.splice(index, 1);

    Browser.get().getBookmarkBar().refreshBoookmarBar();
    chosenElement = null;

}); 

document.getElementById('renameBtn').addEventListener('click', (event) => {

    let currentFolder = Browser.get().getOrganizerWindow().currentFolder;

    const index = currentFolder.domElements.indexOf(chosenElement);   

    const unicodeValue = chosenElement.textContent.charCodeAt(0);
 
    if(emojis.map(char => char.charCodeAt(0)).includes(unicodeValue)){
        chosenElement.textContent = chosenElement.textContent.substring(0, 3);
        chosenElement.textContent += document.getElementById('renamedTitle').value;
        currentFolder.domElements[index].name += document.getElementById('renamedTitle').value;
    }
    else 
    {
        chosenElement.textContent = document.getElementById('renamedTitle').value;
        currentFolder.domElements[index].name = document.getElementById('renamedTitle').value;
    }


    document.getElementById('renamedTitle').value = "";

    renamePopup();

    Browser.get().getBookmarkBar().refreshBoookmarBar();
    chosenElement = null;
   
})


const emojis = ['⌚️', '💡', '❤️', '🔔', '✔️', '🎵', '💻', '📸', '🎥', '🚀', '⚙️', '🥪', '🍎', '🌍', '🐶', '🧳', '💄', '💍', '👔', '💾'];


let emoButtons = Array.from(document.getElementsByClassName('emoBtn'));

emoButtons.forEach(btn => {
    btn.addEventListener('click', () => {

        let currentFolder = Browser.get().getOrganizerWindow().currentFolder;
    
        const index = currentFolder.domElements.indexOf(chosenElement);

        let id = btn.id;
        id = id.substring(5);
        let i = parseInt(id);

        const unicodeValue = chosenElement.textContent.charCodeAt(0);

        if(emojis.map(char => char.charCodeAt(0)).includes(unicodeValue)){
            chosenElement.textContent = chosenElement.textContent.substring(2);
            chosenElement.textContent = emojis[i] + " " + chosenElement.textContent;
            currentFolder.domElements[index].name =  chosenElement.textContent;
        } else {
            chosenElement.textContent = emojis[i] + " " + chosenElement.textContent;
            currentFolder.domElements[index].name =  chosenElement.textContent;
        }

        iconPopup();
        Browser.get().getBookmarkBar().refreshBoookmarBar();
        chosenElement = null;

    });
});



window.addEventListener('contextmenu', (event) => 
{
    showCustomContextMenu(event);
});

window.addEventListener('click', (event) => 
{
    hideCustomContextMenu();
});

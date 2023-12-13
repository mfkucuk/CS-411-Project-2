import { Page } from './Page.js';
import { Browser } from './Browser.js';
import { Bracket } from './Bracket.js';
import { Bookmark } from './Bookmark.js';
import { Folder } from './Folder.js';

 
window.onload = () => {

    Browser.get().initPages(pages);
    Browser.get().open(pages[pageIndex]);

    const addButton = document.getElementById('addBookmarkBtn');
    const searchBar = document.getElementById('searchInput');
    const bookmarkTitle = document.getElementById('bookmarkTitle');
    const folderBtn = document.getElementById('folderBtn');
    const bracketBtn = document.getElementById('bracketBtn');
    const toggleBtn = document.getElementById('toggleBtn');
    const closePopupBtn = document.getElementById('closePopupBtn');
    const closeRenamePopupBtn = document.getElementById('closeRenamePopupBtn');
    const closeIconPopupBtn = document.getElementById('closeIconPopupBtn');
    const returnBtn = document.getElementById('returnBtn');
    const renameBtn = document.getElementById('renameOption');
    const iconBtn = document.getElementById('iconOption');
    const loginBtn = document.getElementById('loginBtn');


    addButton.addEventListener('click', (event) => {
        Browser.get().getOrganizerWindow().currentFolder.addElement(
            new Bookmark(Browser.get().currentPage.url, bookmarkTitle.value, "icon")
            );
        bookmarkTitle.value = ""    
    });

    folderBtn.addEventListener('click', (event) => {
        Browser.get().getOrganizerWindow().currentFolder.addElement(
            Browser.get().getOrganizerWindow().createFolder('New Folder')
        );
    });

    bracketBtn.addEventListener('click', (event) => {
        Browser.get().getOrganizerWindow().currentFolder.addElement(
            new Bracket('bracket')
        );
    });


    toggleBtn.onclick = togglePopup;
    closePopupBtn.onclick = togglePopup;
    closeRenamePopupBtn.onclick = renamePopup;
    renameBtn.onclick = renamePopup;
    returnBtn.onclick = goBack;
    iconBtn.onclick = iconPopup;
    closeIconPopupBtn.onclick = iconPopup;
    loginBtn.onclick = login;

}

function iterateFolder(folder) 
{
    let array = [];

    folder.elements.forEach(element => {
        let type;
        let url;

        if (element instanceof Bookmark) 
        {
            type = 'bookmark';
            url = element.url;
            array.push( { name: element.name, type: type, url: url } );

        }
        else if (element instanceof Folder) 
        {
            type = 'folder';
            array.push({ name: element.name, type: type });
        }
        else 
        {
            type = 'bracket';
            array.push( { name: element.name, type: type } );
        }
    });

    return array;
}

function login() 
{
    
    const email = document.getElementById('loginText').value;
    
    if (email == '') 
    {
        alert('invalid email!');
        return;
    }
    
    if (Browser.get().currentUser) {
        
        let array = iterateFolder(Browser.get().getOrganizerWindow().rootFolder);

        localStorage.setItem(Browser.get().currentUser, JSON.stringify(array))
    }

    Browser.get().currentUser = email;

    Browser.get().getOrganizerWindow().rootFolder.elements = [];
    Browser.get().getOrganizerWindow().rootFolder.domElements = [];

    if (localStorage.getItem(email)) 
    {
        let array = JSON.parse(localStorage.getItem(email));
        Browser.get().getOrganizerWindow().rootFolder.createElementFromType(array);
        Browser.get().getOrganizerWindow().rootFolder.createDomFromElements();
    }

    Browser.get().getOrganizerWindow().currentFolder = Browser.get().getOrganizerWindow().rootFolder;
    Browser.get().getBookmarkBar().refreshBoookmarBar();
}

export function togglePopup() {
    const popupContainer = document.getElementById('popupContainer');
    popupContainer.style.display = (popupContainer.style.display === 'none' || popupContainer.style.display === '') ? 'block' : 'none';
}

export function renamePopup(event) {
    const popupContainer = document.getElementById('renameContainer');

    if (typeof event != 'undefined') 
    {
        popupContainer.style.left = event.clientX + 'px';
        popupContainer.style.top = event.clientY + 'px';
    }
    popupContainer.style.display = (popupContainer.style.display === 'none' || popupContainer.style.display === '') ? 'block' : 'none';
}

export function iconPopup(event) {
    const popupContainer = document.getElementById('iconContainer');

    if (typeof event != 'undefined') 
    {
        popupContainer.style.left = (event.clientX + 30) + 'px';
        popupContainer.style.top = (event.clientY + 50) + 'px';
    }
    popupContainer.style.display = (popupContainer.style.display === 'none' || popupContainer.style.display === '') ? 'block' : 'none';
}

function goBack() 
{
    let currentFolder = Browser.get().getOrganizerWindow().currentFolder;

    if (currentFolder.folder == null) {
        return;
    }

    Browser.get().getOrganizerWindow().currentFolder = currentFolder.folder;

    Browser.get().getBookmarkBar().refreshBoookmarBar();
}

let pages = [];
let pageIndex = 0;

// Mock-up web pages

/////////////////// MAIN PAGE ///////////////////
{
    let mainPageContent = document.createElement('div');
    mainPageContent.style.backgroundColor = "#EEEEEE";
    
    let h1 = document.createElement('h1');
    h1.innerText = 'Flare 🔅';

    let p1 = document.createElement('p');
    p1.innerText = 'Welcome To Flare Browser';

    mainPageContent.appendChild(h1);
    mainPageContent.appendChild(p1);

    pages.push(new Page('mainpage.com', mainPageContent));
}
/////////////////////////////////////////////////

//////////////////// ZWITTER ////////////////////
{
    let zwitterContent = document.createElement('div');
    zwitterContent.style.backgroundColor = '#00AAFF';

    let h1 = document.createElement('h1');
    h1.innerText = 'Welcome to Zwitter';

    zwitterContent.appendChild(h1);

    pages.push(new Page('zwitter.com', zwitterContent));
}
/////////////////////////////////////////////////

///////////////////// AWAZON ////////////////////
{
    let awazonContent = document.createElement('div');
    awazonContent.style.backgroundColor = '#FFFF00';

    let h1 = document.createElement('h1');
    h1.innerText = 'Welcome to Awazon';

    awazonContent.appendChild(h1);

    pages.push(new Page('awazon.com', awazonContent));
}
/////////////////////////////////////////////////


window.addEventListener('keydown', (event) => {
    if (event.key == 'ArrowRight') {
        pageIndex++;
        pageIndex = Math.min(pageIndex, pages.length - 1);
        Browser.get().open(pages[pageIndex]);
    }
    else if (event.key == 'ArrowLeft') {
        pageIndex--;
        pageIndex = Math.max(pageIndex, 0);
        Browser.get().open(pages[pageIndex]);
    }
    else if (event.key == 'F10') 
    {
        localStorage.clear();
    }
});

window.addEventListener('beforeunload', () => {
    if (Browser.get().currentUser) {
        
        let array = iterateFolder(Browser.get().getOrganizerWindow().rootFolder);

        localStorage.setItem(Browser.get().currentUser, JSON.stringify(array))
    }
});
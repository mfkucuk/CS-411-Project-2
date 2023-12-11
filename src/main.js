import { Page } from './Page.js';
import { Browser } from './Browser.js';
import { Bracket } from './Bracket.js';
import { Bookmark } from './Bookmark.js';

const emojis = ['⌚️', '💡', '❤️', '🔔', '✔️', '🎵', '💻', '📸', '🎥', '🎙', '⚙️', '🥪', '🍎', '🌍', '🐶', '🧳', '💄', '💍', '👔'];
 
window.onload = () => {

    Browser.get().open(page3);

    const addButton = document.getElementById('addBookmarkBtn');
    const searchBar = document.getElementById('searchInput');
    const bookmarkTitle = document.getElementById('bookmarkTitle');
    const folderBtn = document.getElementById('folderBtn');
    const bracketBtn = document.getElementById('bracketBtn');
    const toggleBtn = document.getElementById('toggleBtn');
    const closePopupBtn = document.getElementById('closePopupBtn');
    const closeFolderPopupBtn = document.getElementById('closeFolderPopupBtn');
    const returnBtn = document.getElementById('returnBtn');

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
    closeFolderPopupBtn.onclick = folderPopup;
    returnBtn.onclick = goBack;


}

export function togglePopup() {
    const popupContainer = document.getElementById('popupContainer');
    popupContainer.style.display = (popupContainer.style.display === 'none' || popupContainer.style.display === '') ? 'block' : 'none';
}

export function folderPopup() {
    const popupContainer = document.getElementById('folderContainer');
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


let mainPageContent = document.createElement('div');
mainPageContent.style.backgroundColor = "#FF0000";

let mainPage = new Page('mainpage', mainPageContent);

let page1Content = document.createElement('div');
page1Content.style.backgroundColor = "#00FF00";

let page1 = new Page('page1', page1Content);

let page2Content = document.createElement('div');
page2Content.style.backgroundColor = "#0000FF";

let page2 = new Page('page2', page2Content);

let page3Content = document.createElement('div');
page3Content.style.backgroundColor = "#FFFF00";

let page3 = new Page('page3', page3Content);

window.addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
        Browser.get().open(mainPage);
    }
});
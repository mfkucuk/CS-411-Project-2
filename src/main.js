window.onload = () => {

    Browser.get().open(page3);

    const addButton = document.getElementById('addBookmarkBtn');
    const searchBar = document.getElementById('searchInput');
    const bookmarkTitle = document.getElementById('bookmarkTitle');

    addButton.addEventListener('click', (event) => {
        Browser.get().getOrganizerWindow().rootFolder.addElement(new Bookmark(bookmarkTitle.ariaValueText));
    });
}

function togglePopup() {
    const popupContainer = document.getElementById('popupContainer');
    popupContainer.style.display = (popupContainer.style.display === 'none' || popupContainer.style.display === '') ? 'block' : 'none';
}


let mainPageContent = document.createElement('div');
mainPageContent.style.backgroundColor = "#FF0000";

let mainPage = new Page('mainpage', mainPageContent);

let page1Content = document.createElement('div');
page1Content.style.backgroundColor = "#00FF00";

let page1 = new Page('mainpage', page1Content);

let page2Content = document.createElement('div');
page2Content.style.backgroundColor = "#0000FF";

let page2 = new Page('mainpage', page2Content);

let page3Content = document.createElement('div');
page3Content.style.backgroundColor = "#FFFF00";

let page3 = new Page('mainpage', page3Content);

window.addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
        Browser.get().open(mainPage);
    }
});
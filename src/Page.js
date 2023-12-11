export class Page {
    constructor(url, content) {
        this.url = url;
        content.id = 'page';
        this.content = content;
    }
}
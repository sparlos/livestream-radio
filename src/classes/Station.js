export default class Station {
  constructor(name, url) {
    this.name = name;
    this.url = url;
    this.imageUrl = null;
    this.id = null;

    this._parseId();
    this._generateImageUrl();
  }

  _parseId() {
    let regex = /\?v=(.*)/;
    let id = this.url.match(regex)[1];
    if(id) {
      this.id = id;
    } else {
      console.log('no id found in specified url!');
    }
  }

  _generateImageUrl() {
    this.imageUrl = `https://img.youtube.com/vi/${this.id}/sddefault.jpg`;
  }
}
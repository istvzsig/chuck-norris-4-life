class Nameplate {
  constructor(entity) {
    this.entity = entity;
    this.speechBox = document.createElement("div");
    document.body.append(this.speechBox);
  }
  draw() {
    this.speechBox.innerText = this.entity.name;
    this.speechBox.style.position = 'absolute';
    this.speechBox.style.width = this.entity.width + 'px';
    this.speechBox.style.fontSize = 12 + 'px';
    this.speechBox.style['color'] = 'white';
    // this.speechBox.style.backgroundColor = 'red';
    this.speechBox.style.textAlign = 'center';
    this.speechBox.style['left'] = this.entity.pos.x + 'px';
    this.speechBox.style['top'] = this.entity.pos.y - 20 + 'px';
  }
}

export default Nameplate;

let map = [
  0, 1, 2,  3,  4,  5, 6, 7, 8,
  4, 4, 4,  4,  4,  4, 4, 4, 4,
  4, 4, 4, 62, 61, 63, 4, 4, 4,
  4, 4, 4,  4,  4,  4, 4, 4, 4,
  4, 4, 4,  4,  4,  4, 4, 4, 4,
];

let blockers = [61, 62, 63]

function preload(){
  tileset = loadImage("assets/blockPack_packed.png")
  spritedata_lisa =  loadJSON("assets/Lisa.json")
  spritesheet_lisa = loadImage("assets/Lisa.png")
  preloadDialog();
}

function setup() {
  createCanvas(400, 400);
  console.log("Game loaded")
  player = new Player();
  sprite_lisa = new setupSprite(spritedata_lisa,spritesheet_lisa,animation);
  sprite_dialog = new setupSprite(spritedata_dialog,spritesheet_dialog,animation2);
  // setupDialog();
}

function draw() {
    background(220);
    drawGrid();
    noSmooth();
    push();
    scale(2.5);
    drawTiles(map, 9, 20, 18, 28);
    player.draw();
    pop();
    push();
    scale(1.5);
    imageMode(CENTER)
    translate(36-5-16, 32)
    translate(18*4,14*3)
    sprite_lisa.show();
    pop();
    // sprite_dialog.show();
    drawDialog("tesat");
}

function drawGrid() {
  for (j=0; j<5;j++){
    for (i = 0; i < 9; i++) {
    rect(i*55, j*55, 55, 55);
    }
  }


}

let spritesheet;
let spritedata;

let animation = [];
let animation2 = [];

const separateObject = obj => {
   const res = [];
   const keys = Object.keys(obj);
   keys.forEach(key => {
      res.push({
         key: obj[key]
      });
   });
   return res;
};

class Sprite {
  constructor(animation, x, y, speed) {
    this.x = x;
    this.y = y;
    this.animation = animation;
    this.w = this.animation[0].width;
    this.len = this.animation.length;
    this.speed = speed;
    this.index = 0;
  }

  show() {
    let index = floor(this.index) % this.len;
    image(this.animation[index], this.x, this.y);
  }

  animate() {
    this.index += this.speed;
    this.x += this.speed * 15;

    if (this.x > width) {
      this.x = -this.w;
    }
  }
}

function setupSprite(spritedata, spritesheet,animation) {
  //createCanvas(400, 400);
  let frames = separateObject(spritedata.frames);
  //console.log(separateObject(frames).length)
  for (let i = 0; i < frames.length; i++) {
    
    let pos = frames[i].key.frame;
    //console.log(pos.x + " " + pos.y + " " + pos.w + " " + pos.h)
    let img = spritesheet.get(pos.x, pos.y, pos.w, pos.h);
    animation.push(img);
  }
  return new Sprite(animation, 0, 0, random(0.1, 0.4));
}

function drawTiles(map, d_cols, s_cols, tilesizex, tilesizey) {
  for (let i = 0; i < map.length; i++) {
      let value = map[i];
      // source x , y
      let sx = (value % s_cols) * tilesizex;
      let sy = Math.floor(value / s_cols) * tilesizey;
      // distenation x , y
      let dx = (i % d_cols) * tilesizex;
      let dy = Math.floor(i / d_cols) * tilesizey;
      // render image
      let d = Math.floor(i / 9) * 14
      // console.log("i is " + i + " divide %" + Math.floor(i / 9))
      if (i < 9) {
          image(tileset, dx, dy, tilesizex, tilesizey, sx, sy, tilesizex, tilesizey);
      } else if (i >= 9) {
          image(tileset, dx, dy - d, tilesizex, tilesizey, sx, sy, tilesizex, tilesizey);
      }
      // else if (i < 27) {
      //     image(tileset, dx, dy-28, tilesizex, tilesizey, sx, sy, tilesizex, tilesizey);
      // }

  }
}

function keyPressed(){
  if (keyCode === UP_ARROW){
      player.move(0,-14);
  }
  if (keyCode === DOWN_ARROW){
    player.move(0, 14);
  }
  if (keyCode === LEFT_ARROW){
      player.move(-18,0);
  }
  if (keyCode === RIGHT_ARROW){
    player.move(18,0);
  }
}

class Player {
  constructor(){
      this.size = 18;
      this.x = 0;
      this.y = 0;
  }
  draw(){
    push();
    fill('#222222');
    rect(this.x,this.y,this.size,this.size)
    pop();
  }

  move(x,y){
    let block = Math.floor((this.x+x) / 18) + (Math.floor((this.y+y) / 14) * 9);
    if (!blockers.includes(map[block])) {
      this.x += x;
      this.y += y;
    }
  }
}
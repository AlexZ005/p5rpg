let map = [
  0, 1, 2,  3,  4,  5, 6, 7, 8,
  4, 4, 4,  4,  4,  4, 4, 4, 4,
  4, 4, 4, 62, 61, 63, 4, 4, 4,
  4, 4, 4,  4,  4,  4, 4, 4, 4,
  4, 4, 4,  4,  4,  4, 4, 4, 4,
];


function preload(){
  tileset = loadImage("assets/blockPack_packed.png")
}

function setup() {
  createCanvas(400, 400);
  console.log("Game loaded")
  player = new Player();
}

function draw() {
    background(220);
//    drawGrid();
noSmooth();
scale(2.5);
drawTiles(map, 9, 20, 18, 28);
player.draw();
  }

function drawGrid() {
  for (j=0; j<5;j++){
    for (i = 0; i < 9; i++) {
    rect(i*55, j*55, 55, 55);
    }
  }


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
    fill('#222222')
    rect(this.x,this.y,this.size,this.size)
    pop();
  }

  move(x,y){
      this.x += x;
      this.y += y;
  }
}
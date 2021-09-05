let _menu;
let _imgSelection;
let _imgDesert;
let _imgMenu;

//these coordinates relate to the Menu Selection Image (four "L" shaped bars)
let selectionX = 408;
let selectionY = 450;

function preloadSpells() {
  imgSpells = loadImage("assets/spells.png")
}

function setupSpells() {
  //size of spell circle
  x1 = 70;
  x2 = 70;

  _menu = new Menu();
  _menu.GenerateMenu();
}

function drawSpells() {

  for (var i = 0; i < _menu.items.length; i++) {
    //fill(random(0,255),random(0,255),random(0,255));
    //x.items[i].x+=2;
    _menu.items[i].update(x1);
    _menu.items[i].draw();
  }
  // pop();
}

function keyReleased() {
  lockedRight = false;
  lockedLeft = false;
}


class MenuItem {


    constructor(_w, _h, _a, _img) {
  
      this.img = _img;
      this.x = 70;
      this.y = 70;
      this.w = _w;
      this.h = _h;
  
      //this is the angle vector fro middle of circle to the direction of the menu item:
      this.angle = _a;
      this.nextAngle = 0;
  
      this.rotationSpeed = 1;
      this.isRotatingRight = false;
  
    }
  
    update(a) {
      
      if (this.isRotatingRight) {
        this.angle -= this.rotationSpeed;
      }
      var r = p5.Vector.fromAngle(radians(this.angle));
      //we need the menu's middle
      this.x = r.x * a;
      this.y = r.y * a;
  
    }
  
    draw() {
      push();
      colorMode(RGB);
      tint(250,200,50);
      //(take image, place on location x, location y, place with size x, size y, take from image location x, location y, with size size x, size y)
      image(imgSpells, this.x+width/2, this.y+100, 16*2.5, 16*2.5, 0, this.h, 16, 16);
      pop();
    }
  }

  class Menu {
    constructor() {
      this.menuLen = 25; //numOfItems;
      this.items = [];
      this.velocity = 45;
    }
    GenerateMenu() {
      let counter = 0;
      for (let a = 0; a < 360; a += this.velocity) {
        var r = p5.Vector.fromAngle(radians(a));
        this.items.push(new MenuItem(23, 0+(counter*16), a, imgSpells));
        counter += 1;
      }
    }
  }
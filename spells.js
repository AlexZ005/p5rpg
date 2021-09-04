let _menu;
let _imgSelection;
let _imgDesert;
let _imgMenu;
let _imgArrow;
let _imgArrowLeft;
let _imgClickedArrowLeft;

let _menuMoveSound;
let _menuChangeSound;

let lockedLeft = false;
let lockedRight = false;

let clickLeftX = 20;
let clickLeftY = -80;

let clickRightX = 180;
let clickRightY = -80;

//these coordinates relate to the Menu Selection Image (four "L" shaped bars)
let selectionX = 408;
let selectionY = 260;

function preloadSpells() {
  _imgSelection = loadImage("spells/img/menuSelector2_Large.png");
  _imgDesert = loadImage("spells/spaceBackground.png");
  _imgMenu = loadImage("spells/menuOriginal2.png");
  _imgArrow = loadImage("spells/images/Arrow.png");
  _imgArrowLeft = loadImage("spells/images/BlueArrowLeft.png");
  _imgClickedArrowLeft = loadImage("spells/images/ClickedArrowLeft.png");
  _imgArrowRight = loadImage("spells/images/BlueArrowRight.png");
  _imgClickedArrowRight = loadImage("spells/images/ClickedArrowRight.png");

  soundFormats("mp3", "ogg");
  _menuMoveSound = loadSound("spells/menu-rotate.ogg");
  _menuChangeSound = loadSound("spells/menu-expand.ogg");
}

function setupSpells() {
  //size of spell circle
  x1 = 70;
  x2 = 70;

  _menu = new Menu(x1, x2, 25);
  _menu.GenerateMenu();
//  _menuChangeSound.play();
}

function drawSpells() {

  if (keyIsDown(LEFT_ARROW)) {
    if (!_menu.isRotating()) {
      lockedLeft = true;
      _menu.rotate();
      _menuMoveSound.play();
    }
  }
  // image(_imgArrowLeft, 350, 600, 64, 64);
  if (keyIsDown(RIGHT_ARROW)) {
    if (!_menu.isRotating()) {
      _menu.rotateRight();
      lockedRight = true;
      //play rotate menu sound
      _menuMoveSound.play();
    }
  }

  if (lockedLeft) {
    image(_imgClickedArrowLeft, clickLeftX, clickLeftY, 64, 64);
  } else {
    image(_imgArrowLeft, clickLeftX, clickLeftY, 64, 64);
  }

  if (lockedRight) {
    image(_imgClickedArrowRight, clickRightX, clickRightY, 64, 64);
  } else {
    image(_imgArrowRight, clickRightX, clickRightY, 64, 64);
  }

  //AZ DRAW SELECTOR
  image(_imgSelection, selectionX/2-10, selectionY/2-5, 70/2, 68/2);
  // push();  
  //translate(width/2, height/2);

  for (var i = 0; i < _menu.items.length; i++) {
    //fill(random(0,255),random(0,255),random(0,255));
    //x.items[i].x+=2;
    _menu.items[i].update(x1, x2);
    _menu.items[i].draw();
  }
  // pop();
}

function mousePressed() {
  // Check if mouse is inside the circle images
  console.log(mouseX, mouseY, clickLeftX+32, clickLeftY+32)
  let b1 = dist(mouseX, mouseY, clickLeftX+32, clickLeftY+32);
  let b2 = dist(mouseX, mouseY, clickRightX+32, clickRightY+32);

  if (b1 < 32) {
    // LEFT ARROW BUTTON CLICK - THE DISTNACE BETWEEN THE MOUSE AND THE CENTRE OF THE CIRCLE IS LESS THAN THE RADIUS
    if (!_menu.isRotating()) {
      lockedLeft = true;
      _menu.rotate();
      _menuMoveSound.play();
    }
  }

  if (b2 < 32) {
    //RIGHT ARROW BUTTON CLICKED - THE DISTNACE BETWEEN THE MOUSE AND THE CENTRE OF THE CIRCLE IS LESS THAN THE RADIUS
    if (!_menu.isRotating()) {
      lockedRight = true;
      _menu.rotateRight();
      //play rotate menu sound
      _menuMoveSound.play();
    }
  }
  
}

function mouseReleased() {
  lockedRight = false;
  lockedLeft = false;
}

function keyReleased() {
  lockedRight = false;
  lockedLeft = false;
}


class MenuItem {


    constructor(_x, _y, _w, _h, _a, _img, _name) {
  
      this.img = _img;
      this.x = _x;
      this.y = _y;
      this.w = _w;
      this.h = _h;
  
      //this is the angle vector fro middle of circle to the direction of the menu item:
      this.angle = _a;
      this.nextAngle = 0;
  
      this.rotationSpeed = 9;
      this.isRotatingLeft = false;
      this.isRotatingRight = false;
  
      this.name = _name;
      this.isSelected = false;
      this.textImage = loadImage("spells/images/textSprites.png");
    }
  
    update(a, b) {
  
      if (this.isRotatingRight) {
        this.angle -= this.rotationSpeed;
  
        if (this.angle == this.nextAngle) {
          this.isRotatingRight = false;
        }
        if (this.angle < 0) {
          this.angle = 360;
        }
      } else if (this.isRotatingLeft) {
        this.angle += this.rotationSpeed;
  
        if (this.angle == 360) {
          this.angle = 0;
        }
        if (this.angle == this.nextAngle) {
          this.isRotatingLeft = false;
        }
      }
  
      var r = p5.Vector.fromAngle(radians(this.angle));
  
      //we need the menu's middle
      this.x = r.x * a;
      this.y = r.y * a;
  
    }
  
    draw() {
      if (this.angle > 180){
      image(this.img, this.x, -75, this.w, this.h);
    }
      if (this.angle == 45 && !(this.isRotatingLeft || this.isRotatingRight) ) {
      }
    }
  
  
  }

  class Menu {

    constructor(locationX, locationY, numOfItems) {
      this.x = locationX;
      this.y = locationY;
      this.menuLen = numOfItems;
      this.items = [];
      //valid values: 45, 90...etc..
      this.velocity = 45;
      //this.isRotating = false;
    }
  
    //going to have a list of menus that can switch between
    GenerateMenu() {
  
      let menuImages = [
        loadImage('spells/images/Mana_Magic2.gif'),
        loadImage('spells/images/Lava_Wave.gif'),
        loadImage('spells/images/Lucent_Beam.gif'),
        loadImage('spells/images/Magic_Absorb.gif'),
        loadImage('spells/images/Moon_Energy.gif'),
        loadImage('spells/images/Thunderbolt.gif'),
        loadImage('spells/gem.gif'),
        loadImage('spells/images/Fireball.gif')
      ]
  
      let menuText = [
        loadImage('spells/images/thunderboltText.png'),
        loadImage('spells/images/gemMissleText.png'),
        
        loadImage('spells/images/fireballText.png'),
        loadImage('spells/images/manaMagicText.png'),
        loadImage('spells/images/lavaWaveText.png'),
        loadImage('spells/images/lucentBeamText.png'),
        loadImage('spells/images/magicAbsorbText.png'),
        loadImage('spells/images/moonEnergyText.png')
      ];
  
      let counter = 0;
      for (let a = 0; a < 360; a += this.velocity) {
        var r = p5.Vector.fromAngle(radians(a));
        this.items.push(new MenuItem(this.x, this.y, 23, 25, a, menuImages[counter], menuText[counter]));
        counter += 1;
      }
    }
  
    rotate() {
      var len = this.items.length;
      for (var i = 0; i < len; i++) {
        var nextPos = i + 1;
        if (nextPos >= len) {
          nextPos = 0;
        }
        this.items[i].nextAngle = this.items[nextPos].angle;
        this.items[i].isRotatingLeft = true;
      }
    }
  
    rotateRight() {
      var len = this.items.length - 1;
      for (var i = len; i >= 0; i--) {
        var nextPos = i - 1;
        if (nextPos < 0) {
          nextPos = len;
        }
        this.items[i].nextAngle = this.items[nextPos].angle;
        this.items[i].isRotatingRight = true;
      }
    }
  
    isRotating() {
      var len = this.items.length;
  
      for (var i = 0; i < len; i++) {
        if (this.items[i].isRotatingLeft || this.items[i].isRotatingRight) {
          return true;
        }
  
      }
  
      return false;
  
    }
  
  }
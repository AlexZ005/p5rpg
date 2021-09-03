let _menu;

let _x1;
let _x2;

let _imgSelection;
let _imgDesert;
let _imgMenu;
let _imgArrow;
let _imgArrowLeft;
let _imgClickedArrowLeft;

let _menuMoveSound;
let _menuChangeSound;

let _introRotate = 20;
let lockedLeft = false;
let lockedRight = false;

//these coordinates relate to the Menu Selection Image (four "L" shaped bars)
let selectionX = 408;
let selectionY = 260;
let selectionW = 70;
let selectionH = 68;


//START FLASH VARIABLES//

let flash = false;
let currentFlashCount = 0;
let flashLimit = 2;
let o1 = 0;
let incrementer = 100;
let origin = 0;

let atTop = 160;
let atBottom = 0;

let up = true;

let r = 255;
let g = 0;
let b = 0;

//END FLASH VARIABLES//

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
  //createCanvas(984, 800);

  // Params: starting x, starting y, number of items
  _menu = new Menu(400, 400, 165);
  _menu.GenerateMenu();


  //size of spell circle
  x1 = 70;
  x2 = 70;

  _menu = new Menu(x1, x2, 25);
  _menu.GenerateMenu();
//  _menuChangeSound.play();
}

function drawSpells() {
  //background(105);

//  background(_imgDesert);

//  tint(255, 225);
  // if (flash) {
  //   if (o1 >= atTop) {
  //     up = false;
  //   }
  //   if (o1 <= atBottom) {
  //     up = true;
  //     currentFlashCount += 1;
      
  //   }
  //   if (up) {
  //     o1 += incrementer;
  //   } else {
  //     o1 -= incrementer;
  //   }
  //   fill(r, g, b, o1);

  //   rect(0, 0, width, height);

  //   if (currentFlashCount > flashLimit) {
  //     flash = false;
  //     currentFlashCount = 0;
  //     changeColor();
  //   }
  // }
  //GUI square for text on left
//  image(_imgMenu, 20, 30, 472/2, 116/2);

  if (keyIsDown(LEFT_ARROW)) {
    if (!_menu.isRotating()) {
      lockedLeft = true;
      _menu.rotate();
      //play rotate menu sound
      // Load the sound file.
      // We have included both an MP3 and an OGG version.

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
    image(_imgClickedArrowLeft, 350, 620, 64, 64);
  } else {
    image(_imgArrowLeft, 350, 620, 64, 64);
  }

  if (lockedRight) {
    image(_imgClickedArrowRight, 480, 620, 64, 64);
  } else {
    image(_imgArrowRight, 480, 620, 64, 64);
  }

  //AZ DRAW SELECTOR
  image(_imgSelection, selectionX/2-10, selectionY/2-5, 70/2, 68/2);
    translate(width/2, height/2);

  //change 130 to a variable so we can configure it in the future for different menu sizes
  //size of the menu selector must be 5-10px bigger than the menu item
  //based on size of menu item and # of interations we know whether enough space
  //is between menu items.
  //what is the max # of items
  for (var i = 0; i < _menu.items.length; i++) {
    //fill(random(0,255),random(0,255),random(0,255));
    //x.items[i].x+=2;
    _menu.items[i].update(x1, x2);
    _menu.items[i].draw();
  }

  // if (x1 > 130) {
  //   x1 = x1 - 22;
  //   x2 = x2 - 22;
  //   if (x1 < 130) {
  //     //set x1 to the minimum size
  //     x1 = 130;
  //   }
  //   if (x2 < 130) {
  //     //set x2 to the minimum size
  //     x2 = 130;
  //   } else {
  //     _menu.rotate();
  //   }
  // }
}

function mousePressed() {
  // Check if mouse is inside the circle images

  let b1 = dist(mouseX, mouseY, 382, 652);
  let b2 = dist(mouseX, mouseY, 512, 652);

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
  
  /*
  let selectionX = 408;
  let selectionY = 260;

  */
  if (
      mouseY > selectionY && 
      mouseY < selectionY + selectionH &&
      mouseX > selectionX && 
      mouseX <  selectionX + selectionW 
       
    ) {
    flash = true;
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

function changeColor() {
  
  r = random(0, 200);
  g = random(0, 200);
  b = random(0, 200);
}
///////////////////////////////////////////////////////
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
      //radians(angle) - this is the value we need. as long as we keep A inside of range
      // 0 to 360 then it will be in the circle!
      //console.log(this.angle);
  
      if (this.isRotatingRight) {
  
        //ONLY ODD INCREMENTS WILL WORK CORRECTLY UNLESS WE CHANGE THE LOGIC 
        //RIGHT HERE TO ALSO MAKE EVEN INCREMENTS OF ANGLES
        // if (this.isRotatingRight) {
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
  
      image(this.img, this.x, -70, this.w, this.h);
      if (this.angle == 45 && !(this.isRotatingLeft || this.isRotatingRight) ) {
        //console.log("BRUH");
        // image(this.name, -370, -370, 336, 44);
        //AZ DRAWS ITEM
//        image(this.name, -150, -150, 118, 22);
        
      }
      //text of menu item
  
      //will need to either provide the location of where to display the menu text, or just display where we know its going to be. for now, were doing the latter
  
      //we should put this logic into some sort of utility function, but since this is a prototype we are 
      //going to just include it here for now
  
      //go through the name of the text, and draw the letters based off of the ascii conversion
      //loop through the name text. and convert the number converted from the letter to the location in the image
  
      //  var currentLocationX = 20;
      //var currentLocationY = 20;
      //var characterWidth = 12; // Width of the text  
      //var characterHeight = 12;
      //for (var i = 0; i < this.name.length; i++){
  
      // image(this.textImage,currentLocationX, currentLocationY, 50,50,currentLocationX, currentLocationY, characterWidth,characterHeight);
      //print(unchar(this.name[i]));
      //print("asfdasfasdfasdf " + unchar('A'));
  
      //currentLocationX += 60;
    }
  
    //on click will run a configured color.
    
  
  
  }
  ///////////////////////////////////////
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
  
      //going to need a way to specify which menu items will have what images(i.e. instead of generate menu
      // have "add menu item" function that adds to the list. and the generation of the below
      // will look at how many menu items there are, and based on that it will update "velocity" below
      // which is actually the increment for when to create a menu ite// based on the # of menu items. for now we are hardcoding the # of menu items to 8
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
      /*
        let menuText = [
            'Mana Magic',
            'Lava Wave',
            'Lucent Beam',
            'Magic Absorb',
            'Moon Energy',
            loadImage('images/thunderboltText.png'),
            'Gem',
            'Fireball'
          ];*/
  
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
  
      //each increment, is a new menu item
      // we could draw a real circle if we go 1 increment per 360.
      // but we want to evenly space out numbers
      for (let a = 0; a < 360; a += this.velocity) {
        var r = p5.Vector.fromAngle(radians(a));
        //loop through items
        //set each items "next angle" variable to the 
        //*******************************************************
        //**SET THE MENU ITEM IMAGE WIDTH HEIGHT AND IMAGE HERE**
        //*******************************************************
        //r is the vector direction.
        ///x and y are the radius length
        //console.log(a);
        //console.log(this.items.length);
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
        //we just set the next angle to the next one in the list. and all the logic is in the menu item update
        //to change the angle until current angle = next angle
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
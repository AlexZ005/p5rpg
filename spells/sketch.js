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
  if (flash) {
    if (o1 >= atTop) {
      up = false;
    }
    if (o1 <= atBottom) {
      up = true;
      currentFlashCount += 1;
      
    }
    if (up) {
      o1 += incrementer;
    } else {
      o1 -= incrementer;
    }
    fill(r, g, b, o1);

    rect(0, 0, width, height);

    if (currentFlashCount > flashLimit) {
      flash = false;
      currentFlashCount = 0;
      changeColor();
    }
  }
  image(_imgMenu, 20, 30, 472/2, 116/2);

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

  if (x1 > 130) {
    x1 = x1 - 22;
    x2 = x2 - 22;
    if (x1 < 130) {
      //set x1 to the minimum size
      x1 = 130;
    }
    if (x2 < 130) {
      //set x2 to the minimum size
      x2 = 130;
    } else {
      _menu.rotate();
    }
  }
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

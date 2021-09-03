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
      this.items.push(new MenuItem(r.x * this.x, r.y * this.y, 23, 25, a, menuImages[counter], menuText[counter]));
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
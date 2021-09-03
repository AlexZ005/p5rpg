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

    image(this.img, this.x, this.y, this.w, this.h);
    if (this.angle == 45 && !(this.isRotatingLeft || this.isRotatingRight) ) {
      //console.log("BRUH");
      // image(this.name, -370, -370, 336, 44);
      image(this.name, -150, -150, 118, 22);
      
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
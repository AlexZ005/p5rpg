let spritesheet_dialog;
let spritedata_dialog;

let dialog_animation = [];
let horses = [];

function preloadDialog() {
  spritedata_dialog = loadJSON('assets/5.chap-nod.json');
  spritesheet_dialog = loadImage('assets/5.chap-nod.png');
}
function drawDialog(npc) {
    //background(100);
  //   console.log("dialog for " + npc)
  //  var dialogue = ["Attack","Recover","Run"];
    var dialogue = ["Welcome to RPG world!","Activate spells using Enter","Press Enter to close"];
    Say(dialogue[0]);
    Option(dialogue,2);
    
    translate(55, 285)
    sprite_dialog.show();
    
    // for (let horse of horses) {
      // horse.show();
      //horse.animate();
    // }
  }
  
  
  function Say(dialogue){
    var x = width/10;
    var y = 270;
    var sx = width-width/5;
    var sy = 100;
    
    fill(0);
    stroke(255);
    strokeWeight(5);
    rect(x,y,sx,sy);
    
    fill(255);
    strokeWeight(0);
    textSize(16);
    text(dialogue,100+x,30+y);
    //translate(x+5, y+5)
    // sprite_dialog.show();
  }
  function Option(options,num){
    var text = "";
    for(var i = 0;i < options.length;i++){
      if(num==i)text+=">";
      text+=options[i]+"\n";
    }
    Say(text);
  }


  
// function setupDialog() {
//   let frames = separateObject(spritedata_dialog.frames);
//   console.log(separateObject(frames).length)
//   for (let i = 0; i < frames.length; i++) {
    
//     let pos = frames[i].key.frame;
//     //console.log(pos.x)
//     let img = spritesheet_dialog.get(pos.x, pos.y, pos.w, pos.h);
//     dialog_animation.push(img);
//   }
// horse = new Sprite(dialog_animation, 60, 285, random(0.1, 0.4));
//   // for (let i = 0; i < 5; i++) {
//   //   horses[i] = new Sprite(dialog_animation, 0, i * 75, random(0.1, 0.4));
//   // }
// }



// function keyPressedDialog(){
//     if (keyCode == UP_ARROW){
//   //    menumode -= 1;
//       mySynth.play('A6');
//     }
//     if (keyCode == DOWN_ARROW){
//     //  menumode += 1;
//       mySynth.play('A6');
//     }
//     if (keyCode == ENTER){
//       //userStartAudio();
//       dialogActive = 0;
//     //  start(menumode)
      
//     }
//   }
  
  
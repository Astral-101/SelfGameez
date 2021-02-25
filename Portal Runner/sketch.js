var title, titleImage;
var multiplayer, multiplayerImage;
var singleButton, singleButtonImage;
var multiButton, multiButtonImage;
var portal, portalImage;
var bg, backgroundImage;
var START = 0;
var SINGLE = 1;
var END = 2;
var gameState = START;
var character1Image, character1;
var character2Image, character1;
var selectionTitle, selectionTitleImage;
var player;
var stoneGroup, stoneImage;
var count = 0;
var boyCopy ; 
var girlCopy;
var ground;
var score = 0;
var monsterGroup;
var monsterImage;
// var stone;

function preload(){

  //Preloading Images
  titleImage = loadImage("Images/TitleImage.png");
  multiplayerImage = loadImage("Images/MultiplayerImage.png");
  singleButtonImage = loadImage("Images/SinglePlayerButton.png");
  multiButtonImage = loadImage("Images/MultiPlayerButton.png");
  portalImage = loadImage("Images/PortalImage.png");
  backgroundImage = loadImage("Images/PortalBackground.jpg");
  boyImage = loadImage("Images/maleCharacter.png");
  girlImage = loadImage("Images/femaleCharacter.png");
  selectionTitleImage = loadImage("Images/selectionTitle.png");
  stoneImage = loadImage("Images/stoneImage.png");
  monsterImage = loadImage("Images/monsterImage.png");

}


function setup() {
  createCanvas(1000,600);

  if(gameState === START){
    singleButton = createSprite(500, 350, 50, 50);
    singleButton.addImage("singler", singleButtonImage);
    singleButton.scale = 0.8;
  
    multiButton = createSprite(500, 395, 50, 50);
    multiButton.addImage("multi", multiButtonImage);
    multiButton.scale = 0.8;
  
  }

  girlSprite = createSprite(700, 400, 50, 50);
  girlSprite.addImage( "girl",girlImage);
  girlSprite.scale= 1.2;
  girlSprite.visible = false ;

  boySprite = createSprite(350, 400, 50, 50);
  boySprite.addImage( "girl",boyImage);
  boySprite.visible = false ;

  boyCopy = createSprite(350, 400, 50, 50);
  boyCopy.addImage( "girl",boyImage);
  boyCopy.visible = false ;
  boyCopy.debug;

  girlCopy = createSprite(700, 400, 50, 50);
  girlCopy.addImage( "girl",girlImage);
  girlCopy.scale= 1.2;
  girlCopy.visible = false ;
    
  ground = createSprite(500, 550, 1000, 10);
  ground.visible = false;

  bg= createSprite(500, 300);
  
  bg.addImage("mybg", backgroundImage);
  bg.scale = 1.8;
  

  stoneGroup = new Group();
  monsterGroup = new Group();

  boyCopy.setCollider("circle", 0, 0, 120);
  boyCopy.debug = true;



  
 }

function draw() {
  background(0);
  bg.velocityX = -4;
  bg.depth = -1;
  if(bg.x < 0) {
    bg.x = bg.width/2;

  }
  
  if (gameState === START){
    if(mousePressedOver(singleButton)) {
      multiButton.visible= false;
      singleButton.visible= false;
      girlSprite.visible = true;
      boySprite.visible =true;
        
    
    
     }
     else if(mousePressedOver(multiButton)) {
      singleButton.visible= false;
      
     }
    
     if(mousePressedOver(girlSprite)) {
      boySprite.destroy();
      boySprite.depth = -3;
      girlSprite.visible = true;
      girlSprite.depth = 2;
      gameState = SINGLE;
     
     
    }
   
     else if(mousePressedOver(boySprite)) {
      boyCopy.visible =true;
      boySprite.destroy();
      girlSprite.destroy();
      girlSprite.depth= -4;
      gameState = SINGLE;
      boyCopy.scale = 0.75;
      boyCopy.x = 100;
  
    }

  }

  if (gameState === SINGLE){
    if (keyDown("space")){
      boyCopy.velocityY = -14;
      
  
      
    }

    boyCopy.velocityY = boyCopy.velocityY + 0.5;

    if (frameCount % 150  === 0){
      var stone = createSprite(700, 500, 50, 50);
      stone.addImage("stone", stoneImage);
      stone.velocityX = -6;
      stone.scale = 0.2;
      stone.depth = boyCopy.depth+1;
      score = score+1;
    
      stone.lifetime = 150;
      stoneGroup.add(stone);
      console.log(stone.x);
  
    
      }

    if (score >= 10){
      if (frameCount % 100 === 0){
        var monster = createSprite(random(400, 800), 350, 50, 50);
        monster.addImage("monster", monsterImage);
        monster.scale = 0.3;
        monster.velocityX = -6;
        monster.depth = boyCopy.depth+1;
        monster.lifetime = 150;

        monsterGroup.add(monster);
      }

      bg.velocityX = -4;
      bg.depth = -1;
      if(bg.x < 0) {
        bg.x = bg.width/2;
    
      }
    }

    if (boyCopy.isTouching(stoneGroup)){
      bg.velocityX = 0;
      stoneGroup.destroyEach();
      gameState = END;
  
    }
  
    if (boyCopy.isTouching(monsterGroup)){
      bg.velocityX = 0;
      monsterGroup.destroyEach();
      gameState = END;
    }





      

  }



  


  drawSprites();
  textSize(20);
  text("Score: " + score, 700, 50);

  if (gameState === END){
    textSize(20);
    text("GAME OVER", 400, 300);

  //   var restart = createSprite(500, 300, 50, 50);
  //   restart.shapeColor = "red";

  //   var start = createSprite(600, 300, 50, 50);
  //   start.shapeColor = "blue";
    
  //   if (mousePressedOver(restart)){
  //     gameState = SINGLE;
  //     score = 0;
  //     restart.destroy();
  //     console.log(gameState)
  //     restart.depth = singleButton-1;
  //   }

  //   if (mousePressedOver(start)){
  //     gameState = START;
  //     score = 0;
  //     start.destroy();
  //     console.log(gameState);
  //   }
  }

  boyCopy.collide(ground);

    

  }

// function spawnRocks(){
  

//   }



  

  










var rink,boy,cash,ice;
var rinkImg,boyImg,cashImg,iceImg;
var treasureCollection = 0;
var cashG,iceG;
var invisibleGround;

var PLAY=1;
var END=0;
var gameState=1;

var endImg, restartImg;
var restart;

function preload(){
    rinkImg = loadImage("ice.png");
    boyImg = loadImage("Boyskating.png");
    cashImg = loadImage("coin.png");
    iceImg = loadImage("icecube.webp");
    endImg = loadAnimation("gameOver.png");
    deadImg = loadAnimation("dead boy.png");
    restartImg = loadImage("restart.png")
}

function setup() {
 createCanvas(600,300);

 rink = createSprite(300,100);
 rink.addImage(rinkImg);
 rink.velocityX = -4;
 rink.scale = 1.5;

 invisibleGround = createSprite(200,200,400,10);
  invisibleGround.visible = false;

 boy = createSprite(100,180,20,20);
 boy.addAnimation("SahilRunning",boyImg);
 boy.scale = 0.1;

 cashG = new Group();
 iceG = new Group();

 restart = createSprite(300,200,100,20);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  restart.visible = false;

 boy.setCollider("circle",0,0,40);
  boy.debug = false;
}

function draw() {
background(rinkImg);
    if(gameState === PLAY){

        if(rink.x < 150 ){
            rink.x = width/2;
          }

          if(keyDown("space")&& boy.y >=100) {
            boy.velocityY = -13;
        }
        
        endImg.visible = false;
        restartImg.visible = false;
        //add gravity
        boy.velocityY = boy.velocityY + 0.8

          createCash();
          createIce();

          if(cashG.isTouching(boy)){
            cashG.destroyEach();
            treasureCollection = treasureCollection+50;

            
          }

          if(iceG.isTouching(boy)) {
            gameState=END;
          }
        }
          else if (gameState === END) {
                

                rink.velocityX = 0;
     
                iceG.setVelocityXEach(0);
                cashG.setVelocityXEach(0);

                iceG.setLifetimeEach(-1);
                cashG.setLifetimeEach(-1);

                //boy.addAnimation("SahilRunning",endImg,deadImg);
                //boy.x = width/2;
                //boy.y = height/2;
                //boy.scale=0.6

                cashG.destroyEach();
                iceG.destroyEach();

                cashG.setVelocityYEach(0);
                iceG.setVelocityYEach(0);

                endImg.visible = true;
                restart.visible = true;

                boy.changeAnimation("collided",deadImg)

                if(touches.length>0 || keyDown("SPACE") || mousePressedOver(restart)) {      
                    reset();
                    touches = []
                  }
            
          }

          boy.collide(invisibleGround);

          drawSprites();
          textSize(20);
          fill(0);
          text("Treasure: "+ treasureCollection, width-150,30);
        }



function createCash(){
    if(World.frameCount % 200 == 0) {
        var cash = createSprite(600,180,10,10);
        cash.addImage(cashImg);
        cash.scale=0.03;
        cash.velocityX = -5;
        cash.lifetime = 200;
        cashG.add(cash);
    }
}

function createIce(){
    if(World.frameCount % 150 == 0) {
        var ice = createSprite(600,180,10,10);
        ice.addImage(iceImg);
        ice.scale=0.045;
        ice.velocityX = -5;
        ice.lifetime = 200;
        iceG.add(ice);
    }
}

function reset(){
    gameState = PLAY;
    endImg.visible = false;
    restart.visible = false;
    
    if(rink.x < 150 ){
        rink.x = width/2;
      }
      rink.velocityX = -5;
    
    iceG.destroyEach();
    cashG.destroyEach();
    
    boy.changeAnimation("SahilRunning",boyImg);
    
    treasureCollection = 0;
}
var mario, marioImg;
var backgroundImg, bg;
var gameOver,gameoverImg;
var obstacle1Img, obstacle1 ,obstacle;
var restartImg;
var invisibleGround, invisibleGroundImg;
var brickGroup, brickImg, brick;
var coin, coinImg, coinGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;
var dieSound , jumpSound , checkPointSound;

function preload(){

  marioImg = loadAnimation ("mario00.png","mario01.png");
  backgroundImg = loadImage ("bg.png");
  obstacle1Img = loadAnimation ("obstacle1.png","obstacle3.png");
  gameoverImg = loadImage ("gameover.png");
  restartImg = loadImage ("restart.png");
  invisibleGroundImg = loadImage("ground2.png");
  brickImg = loadImage("brick.png");
  coinImg = loadImage("mario coin.png");
  dieSound = loadSound("die.mp3");
  jumpSound = loadSound("jump.mp3");
  checkPointSound = loadSound("checkPoint.mp3")

}






function setup() {
  createCanvas(650,450);

 bg = createSprite(300,218,10,10);
 bg.addImage(backgroundImg);
 bg.scale = 1.2;


 mario = createSprite(20,353,10,10);
 mario.addAnimation("mario",marioImg);
 mario.scale = 1.2;
 mario.setCollider("rectangle",0,0,30,30)

 gameOver = createSprite(325,225,20,20);
 gameOver.addImage("gameOver",gameoverImg);
 gameOver.visible = false;
 

 invisibleGround = createSprite(50,410,2900,10);
 //invisibleGround.visible = true
 invisibleGround.addImage(invisibleGroundImg);

 obstacle = new Group();
 brickGroup = new Group();
 coinGroup = new Group();

}

function draw() {
  background("black");

  if(gameState === PLAY ){
  invisibleGround.velocityX = -5

  
  if(keyDown("SPACE")&& mario.y >= 150){
    mario.velocityY = -10
    jumpSound.play();
  }
  mario.velocityY = mario.velocityY + 1

  if(invisibleGround.x <0){
   invisibleGround.x = invisibleGround.width/2
  }
  
  mario.collide(invisibleGround);

 if(mario.isTouching(brickGroup) || mario.isTouching(obstacle)){
  gameState = END
  dieSound.play();
 }

 

 spawnObstacles();
 spawnBricks();
 spawnCoins();
 }
 else if(gameState === END){
  gameOver.visible = true
  mario.visible = false
  invisibleGround.velocityX = 0
  brickGroup.destroyEach()
  obstacle.destroyEach()
  coinGroup.destroyEach()
  brickGroup.setLifetimeEach(-1)
  obstacle.setLifetimeEach(-1)
  coinGroup.setLifetimeEach(-1)
  brickGroup.setVelocityXEach(0)
  obstacle.setVelocityXEach(0)
  coinGroup.setVelocityXEach(0)
 }
 // bg.velocityX = 3 
 

  drawSprites();
  textSize(20)
  fill("white")
  text("Score :"+ score, 30,20)
  
}

function spawnObstacles() {
 
 if(frameCount % 90 === 0){
  obstacle1 = createSprite(Math.round(random(600,420)),353,50,50)
  obstacle1.addAnimation("obstacle1",obstacle1Img);
  obstacle1.velocityX = -2;
  obstacle1.lifetime = 300;
  obstacle.add(obstacle1);
  obstacle1.setCollider("rectangle",0,0,30,30)
 }
}

function spawnBricks(){
  if(frameCount % 100 === 0){
    brick = createSprite(400,Math.round(random(150,300)));
   brick.addImage("brick",brickImg)
    brick.velocityX = -2;
    brick.lifetime = 300;
    brickGroup.add(brick);
  }
}

function spawnCoins(){
  if(frameCount % 70 === 0){
   coin = createSprite(400,Math.round(random(250,353)));
   coin.addImage("coin",coinImg)
   coin.scale = 0.1
    coin.velocityX = -2;
    coin.lifetime = 200;
    coinGroup.add(coin);
  }
  for(i=0;i<coinGroup.length;i=i+1){
   if(mario.isTouching(coinGroup.get(i))){
    coinGroup.get(i).destroy()
    score = score+5 
    if(score % 100 === 0 && score > 0){
       checkPointSound.play();
     }
   }
  }
}
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var score = 0
var gameover;
var restart;
var seen = '#'+Math.floor(Math.random()*16777215).toString(16);
function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  
  trex_collided = loadImage("trex_collided.png");

  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  cactus1 = loadImage("obstacle1.png");
  
  cactus2 = loadImage("obstacle2.png");
  
  cactus3 = loadImage("obstacle3.png");
  
  cactus4 = loadImage("obstacle4.png");
  
  cactus5 = loadImage("obstacle5.png");
  
  cactus6 = loadImage("obstacle6.png");
  
  gameoverImage = loadImage("gameOver.png");
  
  restartImage = loadImage("restart.png");
  
  dieSound = loadSound("die.mp3");
  
  jumpSound = loadSound("jump.mp3");
}

function setup() {
  
  createCanvas(600, 200);
  
   gameover = createSprite(300,50,10,10); 
   gameover.addImage(gameoverImage);
   gameover.scale = 0.5;
   
   restart = createSprite(300,100,5,5);
   restart.addImage(restartImage);
   restart.scale = 0.5;

  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.debug = true;
  trex.setCollider("rectangle",0,0,trex.width*4,trex.height );

  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleground= createSprite(300,190,600,20);
  invisibleground.visible  = false ;
  
  cloudgroup = new Group();
  cactusgroup = new Group();
}

function draw() {
  background(150); 
  
 console.log(trex.y);
  
  if(gamestate == PLAY){
     
    gameover.visible = false;
    restart.visible = false;
    
     //jump when the space button is pressed
  if (keyDown("space") && trex.y>=156 ) {
    trex.velocityY = -14;
    jumpSound.play();
    
  }
    
    ground.velocityX = -4-3*score/100;
    
    trex.velocityY = trex.velocityY + 0.8;
    
     if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
 
    score = Math.round(frameRate()/60)+score;
  spawnclouds();
  spawncactus();
    
    if(trex.isTouching(cactusgroup)){
      //gamestate = 0;
      //dieSound.play()
      trex.velocityY = -10
    }
    
   
  }

 if(gamestate==0){
   ground.velocityX = 0;
   trex.velocityY = 0;
   trex.pause(); 
   cactusgroup.setVelocityXEach(0);
   cloudgroup.setVelocityXEach(0);
   cactusgroup.setLifetimeEach(-1);
   cloudgroup.setLifetimeEach(-1); 
   gameover.visible = true;
   restart.visible = true;
   
    if(mousePressedOver(restart)){
       reset();
      
  }

 }
  
 
  fill("white");
  textSize(20);
  text("score:"+score,width-200,30)

 
  trex.collide(invisibleground);
  
  
  drawSprites();
}

function reset(){
  gamestate = PLAY;
  score = 0;
  gameover.visible = false;
  restart.visible = false;
  cactusgroup.destroyEach();
  cloudgroup.destroyEach();
  trex.play();
  
}

function spawnclouds(){
  
  if(frameCount % 50 == 0){
  var cloud = createSprite(600,110,20,20);
  cloud.velocityX = -5 ;
  cloud.addImage(cloudImage);
  cloud.scale = 1.1;
  cloud.y = random(5,100 );
  cloud.depth=trex.depth;
  trex.depth = trex.depth+1
  cloud.lifetime = 600/5
    cloudgroup.add(cloud)
  }
  
}

function spawncactus(){
  if(frameCount % 70 == 0){
   var cactus = createSprite(600,160,20,20);
   cactus.velocityX = -6-3*score/100;
    
    cactus.scale = 0.5
    cactusgroup.add(cactus)
  
  var num =Math.round(random(1,6)) ;
  console.log(num);
    
    cactus.lifetime = 600/5
    
  switch(num){
    case 1:cactus.addImage(cactus1);
      cactus.scale =0.6;
      break;
      
    case 2:cactus.addImage(cactus2);
      cactus.scale =0.6;
      break;
      
    case 3:cactus.addImage(cactus3);
      cactus.scale = 0.6 ;
      break;
      
     case 4:cactus.addImage(cactus4);
      break;
      
    case 5:cactus.addImage(cactus5);
      break;
      
     case 6:cactus.addImage(cactus6);
       //   cactus.scale =0.1
      break;
      
      default:break;
      
      
      
  }
  }
  
}
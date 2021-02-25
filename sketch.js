
var monkey,monkey_running;
var ground,banana,bananaImage,obstacle,obstacleImage;
var FoodGroup,obstacleGroup,bananaGroup;
var score;
var backImage,backgr;
var score;

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png",
                                            "sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backImage=loadImage("forestBackground.jpg");
}
function setup() {
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  var survivalTime=0;
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=0;
  ground.x=ground.width/2;
  FoodGroup=new Group();
  obstaclesGroup=new Group();
  score=0;
    

  
}


function draw() {
  background(255);
  
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(backgr.x<0) {
    backgr.x=backgr.width/2;
  }
  if(keyDown("space")) {
    monkey.velocityY=-12;
  }
  monkey.collide(ground);
  if(FoodGroup.isTouching(monkey)) {
    FoodGroup.destroyEach();
    score=score+5;
  }
  spawnFood();
  spawnObstacles();
  drawSprites();
  
  
  if(obstaclesGroup.isTouching(monkey)) {
    ground.velocityX=0;
    monkey.velocityY=0;
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
  }
  //stroke("black");
  //textSize(20);
  //fill("black");
  //survivalTime=Math.ceil(frameCount/frameRate())
  //text("Survival Time: "+score,100,50);
  //stroke("White");
  textSize(20);
  fill("black");
  text("score: "+score,500,50);
  if(monkey.isTouching(obstaclesGroup)) {
    text("Game Over",100,100);
  }
  
}

function spawnFood() {
  if(frameCount%80===0) {
    banana=createSprite(600,250,40,10);
    banana.y=random(120,200);
    banana.velocityX=-4;
    banana.lifetime=300;
    monkey.depth=banana.depth+1;
    banana.addImage(bananaImage);
    banana.scale=0.05
    FoodGroup.add(banana);
  }
}
function spawnObstacles() {
  if(frameCount%300===0) {
    obstacle=createSprite(800,320,10,40)
    obstacle.velocityX=-6;
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.15;
    obstacle.lifetime=300;
    obstaclesGroup.add(obstacle);
  }
}
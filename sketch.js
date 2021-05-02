var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup;
var obsGroup;
var survivalTime;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){

  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 200);
  
  //creating sprite for monkey
  monkey = createSprite(50, 160, 20, 50);  
  monkey.addAnimation(monkey_running);
  monkey.scale = 0.5;
  
  //creating sprite for monkey
  ground = createSprite(200, 380, 400, 20);
  ground.x = ground.width/2;
  
  //creating invisible ground
  invisibleGround = createSprite(200, 390, 400, 10);
  invisibleGround.visible = false;
   monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = true
  
  survivalTime = 0;
  
  foodGroup = createGroup();
  obsGroup = createGroup();
}

function draw() {
 
  background(180);
  //displaying score
  text("Survival Time : "+ survivalTime, 100, 50);
  
  if (gameState === PLAY) {
       ground.velocityX = -(4+3 * score/100)
      //scoring
     survivalTime = Math.ceil (frameCount/frameRate())
     
    if (ground.x < 0) {
         ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if (keyisDown("space") && monkey.y >= 300) {
         monkey.velocityY = -12;
      }
    
    //add gravity
    monkey.velocityY = trex.velocityY + 0.8
    
    //spawn the food
    spawnFood();
    
    //spawn obstacles on the ground
    spawnObstacle();
    
    if (obsGroup.isTouching(monkey));
      gameState = END;
      //monkey.velocityY = -12
    }
      else if (gameState === END) {
                 ground.velocityX = 0;
                 monkey.velocityX = 0;
           if (keyisDown("r")) {
               reset();
        }
        
        //set the lifetime of the game objects so that they are never destroyed
       obsGroup.setLifetimeEach(-1);
       foodGroup.setLifetimeEach(-1);
        
        obsGroup.setVelocityXEach(0);
        foodGroup.setVelocityXEach(0);
      }
    
    //stop monkey from falling down
    monkey.collide(invisibleGround);
    
    }
  drawSprites()


function reset () {
  gameState = PLAY; 
  obsGroup.destroyEach();
  foodGroup.destroyEach();
  survivalTime = 0;
} 

function spawnObstacles () {
  if (frameCount % 300 === 0) {
       var obstacle = createSprite(400, 365, 10, 40);
       obstacle.velocityX = -(6 + score/100);
       obstacle.addImage(obstacleImage);
    
    //assigning scale and lifetime to the obstacle
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    
    obstacle.scale = 0.4;
    obstacle.velocityX = -3;
    
    obstacle.y = Math.round(random(280, 320))
    
    //adjust the depth
    obstacle.depth = monkey.depth
    monkey.depth = monkey.depth+1;
    
    obsGroup.add(obstacle);
  }
}

function spawnFood() {
if (frameCount % 80 === 0) {
  var banana = createSprite(400, 365, 10, 40);
  banana.velocityX = -(6 + score/100);
  banana.addImage(bananaImage);
  
  //assigning scale and lifetime to the banana
  banana.scale = 0.4;
  banana.lifetime = 300;
  banana.velocityX = -3;
  
  banana.y = Math.round(random(120,200))
  
  foodGroup.add(banana);
}
}
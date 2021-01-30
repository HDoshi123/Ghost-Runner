var tower, towerImg
var ghost, ghostImg
var door, doorImg, doorGroup
var climber, climberImg, climberGroup
var invisbleClimber, invisbleClimberGroup

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  towerImg = loadImage("tower.png");
  ghostImg = loadImage("ghost-standing.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  
}

function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300)
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(50,50,50,50);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.3; 
  
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleClimberGroup = new Group();
  
}

function draw(){
  background(0);
  
  if(gameState===PLAY){
    
  
  if(tower.y>600){
    tower.y=300;
  }
  
  if(keyDown("left")){
    ghost.x = ghost.x - 3;
  }
    
  if(keyDown("right")){
    ghost.x = ghost.x + 3;
  }
    
  if(keyDown("space")){
    ghost.velocityY = -3;
  }
  
  ghost.velocityY = ghost.velocityY + 0.8;
  
  spawnDoors();
    
  if(ghost.isTouching(climberGroup)){
    ghost.velocityY = 0;
  }
    
  drawSprites();
    
  
  if(ghost.y>600 || ghost.isTouching(invisibleClimberGroup)){
    ghost.destroy();
    tower.destroy();
    gameState=END
  }
    
}
  if(gameState===END){
    stroke("Yellow")
    fill("Yellow")
    textSize(50);
    text("Game Over", 200,250);
  }
  
}


function spawnDoors(){
  if(frameCount%240===0){
    door = createSprite(200,-50);
    door.addImage("door", doorImg);
    door.velocityY = 1;
    door.x = Math.round(random(120,400));
        
    climber = createSprite(200,10);
    climber.addImage("climber", climberImg);
    climber.velocityY = 1;
    climber.x = door.x;
    
    invisibleClimber = createSprite(200,15);
    invisibleClimber.width = climber.width
    invisibleClimber.height = 2
    invisibleClimber.velocityY = 1;
    invisibleClimber.x = climber.x;
    
    doorGroup.add(door);
    climberGroup.add(climber);
    invisibleClimberGroup.add(invisibleClimber);
  }
}


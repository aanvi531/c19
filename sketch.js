var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  doorsGroup = new Group();
  climberImg = loadImage("climber.png");
  climbersGroup = new Group();
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  invisibleBlockGroup = new Group();
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 2;

  ghost = createSprite(200,200);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.3;

  spookySound.loop();
  
}

function draw() {
  background(200);
  
  if(gameState == "play"){

  if(tower.y > 400){
      tower.y = 300
    }

  if(keyDown("space")){
    ghost.velocityY = -5;   
  }  
  ghost.velocityY = ghost.velocityY + 0.5;

  if(keyDown("right")){
    ghost.x = ghost.x + 3;
  }

  if(keyDown("left")){
    ghost.x = ghost.x - 3;
  }

  if(ghost.isTouching(climbersGroup)){
    ghost.velocityY = 0;
  }

  if(ghost.isTouching(invisibleBlockGroup) || ghost.y > 600){
    ghost.destroy();
    gameState = "end";

  }

    spawnDoors();
    drawSprites();
 }
 
 if(gameState == "end"){
  
  fill("red");
  stroke("green"); 
  strokeWeight(5);
  textFont("Alegerya");
  textSize(50); 
  text("Game Over", 230, 250);
 
 }
}

function spawnDoors(){
  if(frameCount % 240 === 0){
    door = createSprite(200, 50);
    door.addImage("door",doorImg);
    door.velocityY = 2;
    door.x = Math.round(random (120, 400));
    door.lifetime = 800;
    doorsGroup.add(door);

    climber = createSprite(200, 120);
    climber.addImage("climber",climberImg);
    climber.velocityY = 2;
    climber.x = door.x;
    climber.lifetime = 800;
    climbersGroup.add(climber);
    
    invisibleBlock = createSprite(200, 120);
    invisibleBlock.velocityY = 2;
    invisibleBlock.x = climber.x;
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlockGroup.add(invisibleBlock);

    door.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;
  }
   
}

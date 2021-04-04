var dog, happyDog, database, foodS, foodObj, foodStock, lastFed; 

function preload(){

dog = loadImage("Dog.png");
happyDog = loadImage("happyDog.png")


	//load images here
}

function setup() {
	createCanvas(500, 500);
database = firebase.database();
Dog = createSprite(250, 250, 10, 10);
Dog.addImage(dog);
Dog.scale = 0.5;
foodStock=database.ref('Food');
foodStock.on("value",readStock);

feed=createButton("Feed the dog");
feed.position(700,95);
feed.mousePressed(feedDog);


addFood=createButton("Add Food");
addFood.position(800,95);
addFood.mousePressed(addFoods);

}


function draw() { 
  background(46, 139, 87); 

  drawSprites();
  //add styles here
  fill(255,255,254);
  textSize(15);

  if(lastFed>=12){
    textSize("Last Feed : "+ lastFed%12 + "PM", 350,30);
  }else if(lastFed==0){
    text("Last Feed : 12 AM", 350,30);
  }else{
    text("Last Feed : "+ lastFed + " AM", 350,30);
  }
fedTime = database.ref('FeedTime');
fedTime.on('value', function (data){
  lastFed = data.val();
})
}


function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);

}

function feedDog(){
  Dog.addImage(happyDog);
if(foodObj.getFoodStock() <= 0){
  foodObj.updateFoodStock(foodObj.getFoodStock() * 0);
}
else{


  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
}
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}


function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
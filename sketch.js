var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed,lastFed;


//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feed=createButton("FEED THE DOG");
  feed.position(750,95);
  feed.mousePressed(feedDog);


  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  fedTime=database.ref("FeedTime")
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
  //write code to display text lastFed time here
fill("white")
  if(lastFed>=12){
text("lastfeed:"+lastFed%12+"pm",350,30)
}
else if(lastFed=0){
  text("lastfeed:12pm",350,30)
  }
 else {
    text("lastfeed:"+lastFed+"am",350,30)
    }
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  var foodStock=foodObj.getFoodStock(); 
  if(foodStock<=0){
     foodObj.updateFoodStock(foodStock*0)
  }
 else{
   foodObj.updateFoodStock(foodStock-1)
 }
  //write code here to update food stock and last fed time
database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour()
  
  
})
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

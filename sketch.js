var title;
var name1;
var btn1;

var db;

//gameState and playerCount
var gs = 0;
var pc = 0;

function setup(){
    createCanvas(windowWidth, windowHeight);

    title = createElement("h2");
    title.html("Car Racing Game");
    //title.style("textAlign",CENTER);
    title.position(windowWidth/2.5,windowHeight/30);

    name1 = createInput().attribute("placeholder","ENTER YOUR NAME");
    name1.style("textAlign", CENTER);
    name1.position(windowWidth/2.5,windowHeight/2);

    btn1 = createButton("SUBMIT");
    btn1.position(windowWidth/2.3,windowHeight/1.5);

    //database
    db = firebase.database();
    db.ref("gameState").on("value",function(data){
        gs = data.val();

    });
    db.ref("playerCount").on("value",function(data){
        pc = data.val();
    })
}

function draw(){

}


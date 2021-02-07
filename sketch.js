var title;
var name1;
var btn1;

var db;

//gameState and playerCount
var gs = 0;
var pc = 0;

//reset
var resetBtn;

function setup(){
    createCanvas(windowWidth, windowHeight);

    title = createElement("h1");
    title.html("Car Racing Game");
    //title.style("textAlign",CENTER);
    title.position(windowWidth/2.6,windowHeight/30);

    name1 = createInput().attribute("placeholder","ENTER YOUR NAME");
    name1.style("textAlign", CENTER);
    name1.position(windowWidth/2.5,windowHeight/2);


    //database
    db = firebase.database();
    db.ref("gameState").on("value",function(data){
        gs = data.val();

    });
    db.ref("playerCount").on("value",function(data){
        pc = data.val();
    });

    //button
    btn1 = createButton("SUBMIT");
    btn1.position(windowWidth/2.3,windowHeight/1.5);

    btn1.mousePressed(function() 
    {
        pc+=1;
        db.ref("/").update({playerCount: pc});;
        btn1.hide();
        name1.hide();

        //input
        var inputValue = name1.value();

        //element
        var greeting = createElement("h3");
        greeting.html("Welcome, " + inputValue  + "<br>" + "Waiting for other players to join..." );
        greeting.style("color","red")
        greeting.position(width/2.6,height/2);

        //folder
        db.ref("players/player" + pc).set({y: 200});

    });

    //reset
    resetBtn = createButton("Reset");
    resetBtn.position(width/2.5,height/2);
    
    resetBtn.mousePressed(function() {
        db.ref("/").update({gameState: 0, playerCount:0});
        db.ref("players").remove();
    })
}

function draw(){

    if(pc == 2)
    {
        gs = 1;
        db.ref("/").update({gameState: gs});
    }


}

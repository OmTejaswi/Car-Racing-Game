let title;
let name1;
let btn1;

let db;

//gameState and playerCount
let gs = 0;
let pc = 0;

//reset
let resetBtn;

//cars
let car1, car2;
let cars = [];

//initional
let initional;

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
        let inputValue = name1.value();

        //element
        let greeting = createElement("h3");
        greeting.html("&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Welcome," + inputValue  + "<br>" + "Waiting for other players to join..." );
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
    });

    //cars
    car1 = createSprite(width/3,height/1.2,20,40);
    car2 = createSprite(width/2,height/1.2,20,40);

    cars = [car1,car2];
}

function draw(){

    background("fff");

    if(pc === 2)
    {
        gs = 1;
        db.ref("/").update({gameState: gs});

        car1.visible = true;
        car2.visible = true;
    } else {
        car1.visible = false;
        car2.visible = false;
    }

    if(gs === 1 && initional === undefined) {
        db.ref("players").on("value",function(data){
            initional = data.val();
        });
    }

    if(gs === 1) {
        

        var x = width/2;
        var index = 0;
        for(let i in initional)
        {
            cars[index].x = x;
            x = x+100;

            cars[index].y = initional[i].y;

            index+=1;
        }
        
    }

    drawSprites();

}

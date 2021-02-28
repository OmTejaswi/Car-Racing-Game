var title;
var name1;
var btn1;
var greeting;

var limit = 0;

var db;

var backGround;

//gameState and playerCount
var gs = 0;
var pc = 0;

//reset
var resetBtn;

//cars
var car1, car2, car3, car4;
var cars = [];

//initional
var initional;

var pcData = 0;

var car1Img,car2Img,car3Img,car4Img,trackImg;

var rank = 0;
var score = [];

let alertBox;

function preload() {
    car1Img = loadImage("images/car1.png");
    car2Img = loadImage("images/car2.png");
    car3Img = loadImage("images/car3.png");
    car4Img = loadImage("images/car4.png");

    trackImg = loadImage("images/track.jpg");

    backGround = loadImage("images/download.png")
}

function setup(){
    createCanvas(windowWidth, windowHeight);

    title = createElement("h1");
    title.html("Car Racing Game");
    //title.style("textAlign",CENTER);
    title.position(windowWidth/3.5,windowHeight/30);

    name1 = createInput().attribute("placeholder","ENTER YOUR NAME");
    name1.style("textAlign", CENTER);
    name1.style("borderRadius","50px")
    name1.style("width","250px")
    name1.style("height","50px");
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
    btn1.position((windowWidth/2.3),windowHeight/1.5);

    btn1.mousePressed(function() 
    {
        pc+=1;
        pcData = pc;
        db.ref("/").update({playerCount: pc});;
        btn1.hide();
        name1.hide();

        //input
        var inputValue = name1.value();

        //element
        greeting = createElement("h3");
        greeting.html("<center> Welcome, \n" + inputValue  + "<br>" + "Waiting for other players to join..." );
        greeting.style("color","red")
        greeting.position(width/2.6,height/2);

        //folder
        db.ref("players/player" + pc).set({y: 6400});

    });

    db.ref("Rank").on("value", function(data){
        rank = data.val();
    })



    //cars
    car1 = createSprite(width/3,height/1.2,20,40);
    car1.addImage(car1Img);

    car2 = createSprite(width/1.5,height/1.2,20,40);
    car2.addImage(car2Img);

    car3 = createSprite(width/3,height/1.2,20,40);
    car3.addImage(car3Img);

    car4 = createSprite(width/1.5,height/1.2,20,40);
    car4.addImage(car4Img);


    cars = [car1,car2,car3,car4];
}

function draw(){

    //background("fff");


    if(pc === 4)
    {
        db.ref("/").update({gameState: gs});

        car1.visible = true;
        car2.visible = true;
        car3.visible = true;
        car4.visible = true;
    } else {
        car1.visible = false;
        car2.visible = false;
        car3.visible = false;
        car4.visible = false;
        background(backGround);
    }

    if(pc === 4 && gs===0) {
        gs = 1;
    }
 
    if(gs === 1 && initional === undefined) {
        db.ref("players").on("value",function(data){
            initional = data.val();
        });
    }

    if(gs === 1) {
      greeting.hide();

      background("#4B4B4B");

              
        image(trackImg,0,-windowHeight+800,windowWidth,windowWidth*5);

        var x = width/3.7;
        var index = 0;

        //initional position
        for(var i in initional)
        {

            cars[index].x = x;
            x = x+200;

            cars[index].y = initional[i].y;

            if(pcData-1 === index) {
                camera.position.y = cars[index].y-150;

                if(cars[index] === car1) {
                    fill("white");
                    ellipse(cars[index].x,cars[index].y,60);
                } else if(cars[index] === car2) {
                    fill("red");
                    ellipse(cars[index].x,cars[index].y,60);
                } else if(cars[index] === car3) {
                    fill("blue");
                    ellipse(cars[index].x,cars[index].y,60);
                } else if(cars[index] === car4) {
                    fill("black");
                    ellipse(cars[index].x,cars[index].y,60);
                }
            }
           
            index+=1;

        }

        //moving
    if(cars[pcData-1].y >= 270){
        if(keyDown(UP_ARROW))
        {
            cars[pcData-1].y -= 10;

            db.ref("players/player"+pcData).update({
                y: cars[pcData-1].y
            });
        }
    }

        if(cars[pcData-1].y <= 290 && limit === 0) {
            //gs = 2;
            rank+=1;
            alertBox = alert("Awesome Your Rank Is "+rank);
            
            
            
            db.ref("/").update({
                Rank: rank
            });

            limit = 1;
        }

        
    } 

    if(rank === 4) {
        time();
    }


    drawSprites();
}

function time() {
    setTimeout(()=>{
        db.ref("/").update({gameState: 0, playerCount:0, Rank: 0});
        db.ref("players").remove();
        window.location.reload();
    },10000)
}
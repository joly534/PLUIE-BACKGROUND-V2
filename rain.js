

//CANVAS ET ENVIRONEMENT
var canvas = document.getElementById("ciel");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var gravité;
const VENT = ['+', '-'];
var directionDuVent = Math.floor( Math.random() * 2 );

//tableau contenant toutes les gouttes
var goutte = [];
var indiceDeDirection = VENT[directionDuVent];

setInterval(() => {
    for (let i = 0; i < 2400; i++) {     
        goutte[i] = new Goutte(indiceDeDirection); 
    };
    
}, 1000);

//CONSTRUCTEUR DE GOUTTE
function Goutte(indiceDeDirection) {
    
    this.indice = indiceDeDirection;
    this.taille = [1,2,3,4];
    this.tailleRandom = Math.floor( Math.random() * 4 );
    this.tailleDeGoutte = this.taille[this.tailleRandom];
    this.x= Math.random() * ( canvas.width-1 );
    this.y= Math.random() * ( canvas.height - 1 );
    
    this.width= 1.5;
    this.height= this.tailleDeGoutte;

    switch (this.tailleDeGoutte) {
        case 1:
            gravite = 1;
            this.dy = 1;
            this.incidence = 0.5;
            this.color = "silver";
            this.friction = 0.1;
            break;
        case 2 :
            gravite = 2;
            this.dy = 1.5;
            this.incidence = 1;
            this.color = "cadetblue";
            this.friction = 0.15;
            break;
        case 3 : 
            gravite = 4;
            this.dy = 2;
            this.incidence = 1.5;
            this.color = "aquamarine";
            this.friction = 0.17;
            break;
        case 4 :
            gravite = 5;
            this.dy = 4;
            this.incidence = 2;    
            this.color= "aqua";
            this.friction = 0.19;
            break;
    }
    

    //LA GOUTTE APPARAIT
    this.draw= function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fill();
        };

    //LA GOUTTE TOMBE
    this.tombe = function() { 
        this.y += this.dy;
        this.x += this.incidence;
        if (this.y + this.height >= canvas.height) { 
            this.dy = -this.dy * this.friction;
            if (this.x + this.width > canvas.width) {
                this.x = 0
            } else if (this.x + this.width < 0) {
                this.x = canvas.width
            }

        } else {
            this.dy += 1;
        } 
    }
    //LA GOUTTE TOMBE
    this.rebondit = function() { this.dy = -this.dy; }
};

//LA PLUIE COMMENCE A TOMBER
function draw(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    
    for (let i = 0; i < goutte.length; i++) {
        goutte[i].draw();
        goutte[i].tombe();
        
    };
    window.requestAnimationFrame(draw);
};
    
window.requestAnimationFrame(draw);
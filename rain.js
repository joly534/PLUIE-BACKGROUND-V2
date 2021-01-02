

//CANVAS ET ENVIRONEMENT
var canvas = document.getElementById("ciel");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const VENT = ['+', '-'];
var directionDuVent = Math.floor( Math.random() * 2 );

//tableau contenant toutes les gouttes
var goutte = [];
var indiceDeDirection = VENT[directionDuVent];
// console.log(indiceDeDirection[2])
for (let i = 0; i < 500; i++) {     
    goutte[i] = new Goutte(indiceDeDirection); 
};

//CONSTRUCTEUR DE GOUTTE
function Goutte(indiceDeDirection) {
    this.indice = indiceDeDirection;
    this.taille = [0.5,1,2,4];
    this.tailleRandom = Math.floor( Math.random() * 4 );
    this.tailleDeGoutte = this.taille[this.tailleRandom];
    this.x= Math.random() * ( canvas.width-1 );
    this.y= Math.random() * ( canvas.height - 1 );
    this.width= 1.5;
    this.height= this.tailleDeGoutte;    
    this.color= "aqua";

    switch (this.tailleDeGoutte) {
        case 1:
            this.gravite = 1;
            this.incidence = 1;
            break;
        case 2 :
            this.gravite = 2;
            this.incidence = 2;
            break;
        case 3 : 
            this.gravite = 4;
            this.incidence = 3;
            break;
        case 4 :
            this.gravite = 8;
            this.incidence = 4;
            break;
    }
    
    this.dx += 2;
    console.log(this.indice)
    //LA GOUTTE APPARAIT
    this.draw= function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fill();
        };

    //LA GOUTTE TOMBE
    this.tombe = function() { 
        this.y += this.gravite;
        this.x += this.incidence;
        if (this.y >= canvas.height) { 
             this.y = 0; 
        } else if (this.x >= canvas.width) {
            this.x = 0;
        } else if (this.x + this.width <= 0) {
            this.x = canvas.width;
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


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
for (let i = 0; i < 400; i++) {     
    goutte[i] = new Goutte(indiceDeDirection); 
};

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
            this.gravite = 1;
            this.incidence = 0.5;
            this.color = "silver";
            break;
        case 2 :
            this.gravite = 2;
            this.incidence = 1;
            this.color = "cadetblue";
            break;
        case 3 : 
            this.gravite = 4;
            this.incidence = 1.5;
            this.color = "aquamarine";
            break;
        case 4 :
            this.gravite = 6;
            this.incidence = 2;    
            this.color= "aqua";
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
        this.y += this.gravite;
        this.x += this.incidence;
        if (this.y + this.height >= canvas.height) { 
            this.gravite = -this.gravite * 0.15;
            if (this.y+this.height  <= canvas.height/10) {
                this.gravite = -this.gravite;
            }

        } else if (this.x >= canvas.width) {
            this.x = 0;
        } else if (this.x + this.width <= 0) {
            this.x = canvas.width;
        } else if ((this.x + this.width >=canvas.width) && (this.y >= canvas.height)) {
            this.y =0;
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
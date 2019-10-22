var drops  = [];
var axisY = 1;
var axisX = 0;
var c1, c2;

function Drop(){
    //display drops
        this.x = random(0,width);
        this.y = random(-10, height);
        this.d = 2;
        this.h = random(2, 10);
        this.col= map(this.h, 2, 10, 100, 255);
        
        this.show = function(){
            noStroke();
            fill(this.col,100);
            ellipse(this.x, this.y, this.d, this.h);
        }
    
    //move object
        this.vel = 0;
        this.grv = map(this.h,2,10,3,10);
        this.off = map(this.h,2,10,height/2,height);
    
        this.move = function(){
            this.y += this.vel;
            this.vel = this.grv;
            if(this.y > this.off){
                this.y = -10;
            }
        }
    }
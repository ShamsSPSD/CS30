class animatedobjects {
    constructor(x,y){
      this.x = x; this.y = y;
      this.size = 1;
  
    }
  
    move(){
      this.y += random(-2,2);
      this.x += random(-2,2);
  
    }
  
    display(){
      strokeWeight(4);
      point(this.x,this.y);
  
    }
  
    }
  
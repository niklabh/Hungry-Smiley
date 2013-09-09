function player(id){
  this.id            = id;
  this.smoothingLR   = new Array();
  this.smoothingFB   = new Array();
  this.smoothedLR    = 0;
  this.smoothedFB    = 0;
  
  this.x = CANVAS_WIDTH/2;
  this.y = CANVAS_HEIGHT/2;
  this.width = 50;
  this.height = 50;
  this.img = document.getElementById("im3");
  switch(id%5){
	case 0:
		this.img = document.getElementById("im2");
		break;
	case 2:
		this.img = document.getElementById("im3");
		break;
	case 3:
		this.img = document.getElementById("im4");
		break;
	case 4:
		this.img = document.getElementById("im5");
		break;
	default:
	    this.img = document.getElementById("im1");
  }
  this.score = 0;

  this.draw = function(num) {
    canvas.save();
	canvas.drawImage(this.img,this.x,this.y,this.width,this.height);
    //canvas.fillRect(this.x,this.y,this.width,this.height);
    canvas.restore();
  }

  this.update = function(){
    //Stay within Bounds
    if(this.x < 0){
      this.x = 0;
    }else if(this.x > CANVAS_WIDTH-this.width){
      this.x = CANVAS_WIDTH-this.width;
    }

    if(this.y < 0){
      this.y = 0;
    }else if(this.y > CANVAS_HEIGHT-this.height){
      this.y = CANVAS_HEIGHT-this.height;
    }
  }
}

function bead(id){
	this.getRand = function(seed){
	var rnum = Math.floor((Math.random()*(seed-30))+10);
	return rnum;
  }
	this.id = id;
	this.visible = true;
	this.x = this.getRand(CANVAS_WIDTH);
	this.y = this.getRand(CANVAS_HEIGHT);
	this.width = 20;
    this.height = 20;
	this.img = document.getElementById("bead");
	this.audio = document.getElementById('demo');
	this.draw = function(num) {
	if(this.visible){
    canvas.save();
	canvas.drawImage(this.img,this.x,this.y,this.width,this.height);
    canvas.restore();
	}
  }
  this.update = function(){
   for(var i in players){
      if((players[i].x>(this.x-35)&&players[i].x<(this.x+35))&&(players[i].y>(this.y-35)&&players[i].y<(this.y+35)))
	  {
		if(this.visible)
		{
		players[i].score += 1;
		this.audio.play();
		noOfBeads += 1; 
		}
		this.visible = false;
	  }
    }
  }
  
}

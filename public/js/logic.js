function randomString() {
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  var string_length = 8;
  var randomstring = '';
  for (var i=0; i<string_length; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum,rnum+1);
  }
  return randomstring;
}

for(var j = 0;j<50;j++) {
  beads.push(new bead(j));
}
  
var roomId = randomString();
//roomId = "test"
var socket = io.connect(baseURL);
var roomURL = baseURL+"/mobile.html?id="+roomId;

socket.emit('new room', { room: roomId });

$('#gameLink').attr("href", roomURL).text(roomURL);
var qrURL = "https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl="+roomURL+"&choe=UTF-8";	
$("#qrc").css("background-image","url('"+qrURL+"')");
$("#qrc").css("background-repeat","no-repeat");


socket.on('add user', function(socketID, data){
    players.push(new player(socketID));
});

socket.on('remove user', function(socketID){
    var destroyThis = null;
    for(var i in players){
      if(players[i].id == socketID){
        destroyThis = i;
      }
    }
    if(destroyThis !== null){ players.splice(destroyThis, 1);}
});

	
socket.on('update position', function(socketId, data){
  var player = null;

  for(var i in players){
    if(players[i].id == socketId){
      player = players[i];
    }
  }


  if(player !== null){
    var tiltLR = data.tilt_LR;
    var tiltFB = data.tilt_FB;

    if((tiltLR < 2) && (tiltLR > -2)){  tiltLR = 0;  }
    if((tiltFB < 2) && (tiltFB > -2)){  tiltFB = 0;  }

    if(player.smoothingLR.length >= 5){ Pop(player.smoothingLR); }
    if(player.smoothingFB.length >= 5){ Pop(player.smoothingFB); }

    Push(player.smoothingLR, tiltLR);
    Push(player.smoothingFB, tiltFB);
    player.smoothedLR = 0;
    player.smoothedFB = 0;

    for(var i = 0; i < player.smoothingLR.length; i++){
      player.smoothedLR += player.smoothingLR[i];
    }
    for(var i = 0; i < player.smoothingFB.length; i++){ 
      player.smoothedFB += player.smoothingFB[i];
    }

    player.smoothedLR /= player.smoothingLR.length;
    player.smoothedFB /= player.smoothingFB.length;

    var speed = player.smoothedLR;

    //if tilting right, increase left, else, decrease
    if((player.smoothedLR > 3) || (player.smoothedLR < -3)){
      player.x += speed/2;
    }

    speed = player.smoothedFB;
    //if tilting right, increase left, else, decrease
    if((player.smoothedFB > 3) || (player.smoothedFB <-3)){
      player.y -= speed/2;
    }
	  
	  for(var i in players){
      var score = document.getElementById("score"+players[i].img.id.substring(2));
	    score.innerHTML = "Score: "+players[i].score;
    }
  }
});



function update() {
  for(var i in players){      
    players[i].update();
  }

  for(var i in beads){      
    beads[i].update();
  }
}


function draw() {
  canvas.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);

  for(var i in players){
    players[i].draw(i);
  }
for(var i in beads){      
    beads[i].draw(i);
  }
}
  
setInterval(function() {
  update();
  draw();
}, 1000/FPS);
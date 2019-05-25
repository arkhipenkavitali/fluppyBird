var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/flappy_bird_bird.png";
bg.src = "img/flappy_bird_bg.png";
fg.src = "img/flappy_bird_fg.png";
pipeUp.src = "img/flappy_bird_pipeUp.png";
pipeBottom.src = "img/flappy_bird_pipeBottom.png";

var fly = new Audio();
var scoreSound = new Audio();

fly.src = 'audio/fly.mp3';
scoreSound.src = 'audio/score.mp3';

var gap = 100;

document.addEventListener('keydown', moveY);

function moveY(){
	yPos -= 20;
	fly.play();
}

var pipe = [];
pipe[0] = {
	x: canvas.width,
	y: 0
}
var score = 0;

var xPos = 10;
var yPos = 150;
var grav = 1.5;


function draw(){
	ctx.drawImage(bg, 0, 0);

	for(var i = 0; i < pipe.length; i++){
		ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
		ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

		pipe[i].x--;

		if(pipe[i].x == 125){
			pipe.push({
				x: canvas.width,
				y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
			});
		}

		if(xPos + bird.width >= pipe[i].x 
			&& xPos <= pipe[i].x + pipeUp.width 
			&& (yPos <= pipe[i].y + pipeUp.height 
				|| yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
				|| yPos + bird.height >= canvas.height - fg.height){
				location.reload();
			}

		if(pipe[i].x == 5){
			score++;
			scoreSound.play();
		}
	}

	
	ctx.drawImage(fg, 0, canvas.height - fg.height);
	ctx.drawImage(bird, xPos, yPos);

	yPos += grav;

	ctx.fillStyle = '#000';
	ctx.font = '20px Verdana';
	ctx.fillText('Score: ' + score, 10, canvas.height - 20);

	requestAnimationFrame(draw);
}

pipeBottom.onload = draw;
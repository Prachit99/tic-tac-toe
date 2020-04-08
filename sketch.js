
let board = [
['','',''],
['','',''],
['','','']
];
let available = []
let players = ['X', 'O'];
let curr_player;

function setup() {
	createCanvas(400, 400);
	frameRate(2);
	curr_player = floor(random(players.length)); 
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			available.push([i,j]);
		}
	}	
}

function equal(a, b, c) {
	if (a == b && b == c && a != '')	return true;
	else 	return false; 
}

function check() {
	let winner =  null;
	for (let i = 0; i < 3; i++) {
		if (equal(board[i][0], board[i][1], board[i][2]))	winner = board[i][0];
	}
	for (let i = 0; i < 3; i++) {
		if (equal(board[0][i], board[1][i], board[2][i]))	winner = board[0][i];
	}

	if (equal(board[0][0], board[1][1], board[2][2])) 	winner = board[0][0];
	else if (equal(board[0][2], board[1][1], board[2][0]))	winner = board[0][2];

	if (winner == null && available.length == 0) return 'Tie';
	else 	return winner;

}

function nextTurn() {
	let index = floor(random(available.length));
	let spot  = available.splice(index, 1)[0];
	let  i = spot[0];
	let j = spot[1];
	board[i][j] = players[curr_player];
	curr_player = (curr_player + 1) % players.length; 
}



function draw() {
	background(0);
	let h = height/3;
	let w = width/3;
	strokeWeight(4);
	stroke(255);
	//textSize(32);
	line(w, 0, w, height);
	line(w*2, 0, w*2, height);
	line(0, h, width, h);
	line(0, h*2, width, h*2);

	for(let i = 0; i < 3; i++) {
		for(let j = 0; j < 3; j++) {
			let x = w * i + w/2;
			let y = h * j + h/2;
			let spot = board[i][j];
			let r = (w/2)*0.6;
			if (spot == players[1]) {
				noFill();
				ellipse(x, y, w*0.7);
			}
			else if (spot == players[0]) {
				line(x-r, y-r, x+r, y+r);
				line(x-r, y+r, x+r, y-r);
			}
		}
	}


	let res = check();
	if (res != null) {
		noLoop();
		if (res == 'Tie')	createP("Result: " + res).style('color', '#000').style('font-size', '32pt');
		else 			createP(res + " is the winner!").style('color', '#000').style('font-size', '32pt');
	}
	else {
		nextTurn();
	}

}
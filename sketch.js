
let board = [
	['','',''],
	['','',''],
	['','','']
];

let comp = 'X';
let human = 'O';
let curr_player = human;

let w;
let h;


function setup() {
	createCanvas(400, 400);
	w = width / 3;
	h = height / 3;
	nextTurn();	
}

function equal(a, b, c) {
	if (a == b && b == c && a != '') {
		return true;
	}
	else {
		return false;
	} 
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

	let avail = 0;
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (board[i][j] == '') {
				avail++;
			}
		}
	}
	if (winner == null && avail == 0) {
		return 'Tie';
	}
	else {
		return winner;
	}
}


function mousePressed() {
	if (curr_player == human) {
		let i = floor(mouseX / w);
		let j = floor(mouseY / h);
		if (board[i][j] == '') {
			board[i][j] = human;
			curr_player = comp;
			nextTurn();
		}
	}
}

function draw() {
	background(0);
	strokeWeight(4);
	stroke(255);

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
			if (spot == human) {
				noFill();
				ellipse(x, y, w*0.7);
			}
			else if (spot == comp) {
				line(x-r, y-r, x+r, y+r);
				line(x-r, y+r, x+r, y-r);
			}
		}
	}


	let res = check();
	if (res != null) {
		noLoop();
		let resultP = createP('');
		resultP.style('color', '#000').style('font-size', '32pt');
		if (res == 'Tie') {
			resultP.html('Its a Tie');
		}	
		else {
			resultP.html('${res} wins!');
		}
	}
}

//For human vs comp
function nextTurn() {
	let res = check();
	if (res !== null) {
		return scores[res];
	}
	
	let bestScore = -Infinity;
	let move;
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (board[i][j] == '') {
				board[i][j] = comp;
				let score = minimax(board, 0, false);
				board[i][j] = '';
				if (score > bestScore) {
					bestScore = score;
					move = { i, j };
				}
			}
		}
	}
	board[move.i][move.j] = comp;
	curr_player = human;
}

let scores = {
	X: 1,
	O: -1,
	Tie: 0
};


function minimax(board, depth, isMax) {
	let res = check();
	if (res !== null) {
		return scores[res];
	}

	if (isMax) {
		let bestScore = -Infinity;
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (board[i][j] == '') {
					board[i][j] = comp;
					let score = minimax(board, depth + 1, false);
					board[i][j] = '';
					bestScore = max(score, bestScore);
				}
			}
		}
		return bestScore;
	}
	else {
		let bestScore = Infinity;
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (board[i][j] == '') {
					board[i][j] = human;
					let score = minimax(board, depth + 1, true);
					board[i][j] = '';
					bestScore = min(score, bestScore);
				}
			}
		}
		return bestScore;
	}
}





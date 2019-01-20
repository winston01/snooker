let ballImages = [
	"Snooker_ball_red.png",
	"Snooker_ball_yellow.png",	
	"Snooker_ball_green.png",	
	"Snooker_ball_brown.png",	
	"Snooker_ball_blue.png",	
	"Snooker_ball_pink.png",	
	"Snooker_ball_black.png",	
];

$(document).ready(function(){

	$(':radio:not(.red-ball-box > :radio)').click(function(){
		$('.red-ball-box > input[name="redsOnTable"]').addClass("disabled");
		calculateFrameBall();
	});

	$('.red-ball-box > :radio').click(function(){
		$('.red-ball-box > input[name="redsOnTable"]').removeClass("disabled");
		calculateFrameBall();
	});

	$('.red-ball-box > input[name="redsOnTable"]').click(function(){
		$('.red-ball-box > input[name="redsOnTable"]').removeClass("disabled");
		$('.red-ball-box > :radio').prop('checked',true);
	});

	$('.red-ball-box > input[name="redsOnTable"]').change(function(){
		$('input[name="radio"]:checked').val($('.red-ball-box > input[name="redsOnTable"]').val());
		// calculateFrameBall();
	});

	$('input[type="number"]').change(function(){
		calculateFrameBall();
	});
	
	calculateFrameBall();
});

function calculateFrameBall() {
	let pointsOnTable = 147;
	let player1RedsAndBlacks = 0;
	let player2RedsAndBlacks = 0;
	let player1Colours = [];
	let player2Colours = [];

	if ($('input[name="radio"]:checked').parent().hasClass("red-ball-box")) {
		pointsOnTable = $('input[name="radio"]:checked').val() * 8 + 27;
	} else {
		pointsOnTable = getColoursOnTableValue();
	}

	let player1Points = Number($('input[name="player1Points"]').val());
	let player2Points = Number($('input[name="player2Points"]').val());

	let player1PointsToFrameBall = Math.ceil((pointsOnTable - (player1Points - player2Points)) / 2);
	let player2PointsToFrameBall = Math.ceil((pointsOnTable - (player2Points - player1Points)) / 2);

	if ($('input[name="radio"]:checked').parent().hasClass("red-ball-box")) {
		player1RedsAndBlacks = Math.floor(player1PointsToFrameBall / 8);
		player2RedsAndBlacks = Math.floor(player2PointsToFrameBall / 8);
	}

	player1Colours = getColoursShare(player1PointsToFrameBall - player1RedsAndBlacks * 8);
	player2Colours = getColoursShare(player2PointsToFrameBall - player2RedsAndBlacks * 8);

	
		$('#player1PointsToFrameBall').text(player1PointsToFrameBall + ' ' + player1RedsAndBlacks + ' ' + JSON.stringify(player1Colours));
		$('#player2PointsToFrameBall').text(player2PointsToFrameBall + ' ' + JSON.stringify(player2Colours));
}

function getColoursOnTableValue() {
	let lowestColourValue = Number($('input[name="radio"]:checked').val());
	let coloursOnTableValue = 0;
	
	for (let i = 7; i >= lowestColourValue; i--) {
		coloursOnTableValue += i;
	}
	
	return coloursOnTableValue;
}

function getColoursShare(pointsToShare) {
	let lowestColourValue = 2;
	if (!$('input[name="radio"]:checked').parent().hasClass("red-ball-box")) {
		lowestColourValue = Number($('input[name="radio"]:checked').val());
	}

	let coloursShare = [];
	let coloursAdded = 0;

	for (let i = lowestColourValue; i <= 7; i++) {
		if (pointsToShare <= coloursAdded) {
			break;
		}
		coloursShare.push(i);
		coloursAdded += i;
	}

	return coloursShare;
}

function isPointsSetupValid() {
	let isPointsSetupValid = false;

	let player1Points = Number($('input[name="player1Points"]').val());
	let player2Points = Number($('input[name="player2Points"]').val());
	let lowestColour = Number($('input[name="radio"]:checked').val());
	
	if (lowestColour > 1 && (player1Points + player2Points >= 15)) {
		isPointsSetupValid = true;
	}

	return isPointsSetupValid;
}
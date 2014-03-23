
// Using NaN instead of null is a clever hack. See checkForWinner for details.
var spaces = [
  NaN, NaN, NaN,
  NaN, NaN, NaN,
  NaN, NaN, NaN
];

var player1 = 'veggies';
var player1Wins = 0
var player2 = 'junkfood';
var player2Wins = 0
var currentPlayer = null;
var gameOver = false;

var setNextTurn = function () {
  if (currentPlayer === player1) {
    currentPlayer = player2;
  }
  else {
    currentPlayer = player1;
  }
  $('#turn-label').text(currentPlayer);
};

var checkForWinner = function () {
  // Because (NaN === NaN) is always false, we can safely assume
  // that if three spaces in a row are the same, all three spaces are
  // marked by a player, and not all empty.

  if ( spaces[0] === spaces[1] && spaces[1] === spaces[2]
    || spaces[3] === spaces[4] && spaces[4] === spaces[5]
    || spaces[6] === spaces[7] && spaces[7] === spaces[8]
    || spaces[0] === spaces[3] && spaces[3] === spaces[6]
    || spaces[1] === spaces[4] && spaces[4] === spaces[7]
    || spaces[2] === spaces[5] && spaces[5] === spaces[8]
    || spaces[0] === spaces[4] && spaces[4] === spaces[8]
    || spaces[2] === spaces[4] && spaces[4] === spaces[6] ) {

    $(document).trigger('game-win', currentPlayer);
    gameOver = true;
  }
};

$(document).on('click', '#board .space', function (e) {
  var spaceNum = $(e.currentTarget).index();
  console.log('You clicked on space #' + spaceNum);   // FOR TESTING ONLY

  // Marks the space with the current player's name
  if (gameOver == false && spaces[spaceNum] !== player1 && spaces[spaceNum] !== player2) {
    spaces[spaceNum] = currentPlayer;
    // Adds a class to elem so css can take care of the visuals
    if (currentPlayer == player1) {
      $('#board .space:eq(' + spaceNum + ')').addClass('veggies');
    } else {
      $('#board .space:eq(' + spaceNum + ')').addClass('junkfood');
    };

    checkForWinner();
    setNextTurn();
  } 
  else if (gameOver == true) {
    alert("The game is over!");
  } 
  else {
    alert("That space is already taken!");
  };
});

$(document).on('game-win', function (e, winner) {
  alert(winner + " wins this match!");
  $('#title-label, #turn-label').hide();
  if (winner == player1) {
    player1Wins += 1;
  } else {
    player2Wins += 1;
  };
  $('#player1-wins').text(player1Wins);
  $('#player2-wins').text(player2Wins);
});

// Start the game
$('#new-game').on('click', function (e) {
  $('#board .space').removeClass('veggies');
  $('#board .space').removeClass('junkfood');
  gameOver = false;
  spaces = [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN];
  player1 = prompt("Player 1 enter your name:");
  player2 = prompt("Player 2 enter your name:");
  $('#title-label, #turn-label, #player1, #player1-wins, #player2, #player2-wins').show();
  $('#player1').text(player1 + ":");
  $('#player2').text(player2 + ":");
  $('#player1-wins').text(player1Wins);
  $('#player2-wins').text(player2Wins);
  setNextTurn();
});


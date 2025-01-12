$(document).ready(function () {
    let player1Name = "Player 1";
    let player2Name = "Player 2";
    let player1Wins = 0;
    let player2Wins = 0;
    let gamesPlayed = 0;
    let currentPlayer = "X";
  
    // Start Game Button with fade
    $("#start-game").on("click", function () {
      const name1 = $("#player1-name").val().trim();
      const name2 = $("#player2-name").val().trim();
  
      if (name1) player1Name = name1;
      if (name2) player2Name = name2;
  
      $("#player1-display").text(player1Name);
      $("#player2-display").text(player2Name);
  
      $("#player-info").text(`${player1Name}'s Turn (X)`);
      $("#player-name-input").hide();
      $("#player-info, #scoreboard, #game-board, #restart-button").fadeIn();
    });


    //clicks with game logic
  
    $(".cell").on("click", function () {
      if ($(this).text() === "") {
        $(this).text(currentPlayer);


        if (checkWinner()) {
          const winnerName = currentPlayer === "X" ? player1Name : player2Name;
          if (currentPlayer === "X") player1Wins++;
          else player2Wins++;
          gamesPlayed++;
          updateScores();
          showWinner(`${winnerName} Wins!`);
          resetBoard();
        } else if (isBoardFull()) {
          gamesPlayed++;
          updateScores();
          showWinner("It's a Draw!");
          resetBoard();
        } else {
          currentPlayer = currentPlayer === "X" ? "O" : "X";
          const currentPlayerName = currentPlayer === "X" ? player1Name : player2Name;
          $("#player-info").text(`${currentPlayerName}'s Turn (${currentPlayer})`);
        }
      }
    });
  

    //restart game with fade effect
    $("#restart-button").on("click", function () {
      resetGame();
    });
  
    function updateScores() {
      $("#player1-wins").text(player1Wins);
      $("#player2-wins").text(player2Wins);
      $("#games-played").text(gamesPlayed);
    }
  
    function resetBoard() {
      $(".cell").text("");
    }
  
    function resetGame() {
      player1Wins = 0;
      player2Wins = 0;
      gamesPlayed = 0;
      currentPlayer = "X";
      updateScores();
      resetBoard();
      $("#winner-message").fadeOut();
      $("#player-info").text(`${player1Name}'s Turn (X)`);
    }
  
    function showWinner(message) {
      $("#winner-message").text(message).fadeIn();
    }
  
    function checkWinner() {
      const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
  
      return winningCombinations.some((combination) =>
        combination.every((index) => $(".cell").eq(index).text() === currentPlayer)
      );
    }
  
    function isBoardFull() {
      return $(".cell").filter((_, cell) => $(cell).text() === "").length === 0;
    }
  });
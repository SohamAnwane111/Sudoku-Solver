function clearBoard() {
  var board = document.getElementsByTagName("td");
  for (var i = 0; i < board.length; i++) {
    board[i].innerText = "";
    board[i].style.backgroundColor = "black";
  }
}

function boardToString() {
  var string = "";
  var board = document.getElementsByTagName("td");
  var validNum = /[1-9]/;
  for (var i = 0; i < board.length; i++) {
    if (validNum.test(board[i].innerText)) {
      string += board[i].innerText;
    } else {
      string += "-";
    }
  }
  return string;
}

function matrixToBoard(matrix) {
  var board = document.getElementsByTagName("td");
  var index = 0;
  for (var row = 0; row < 9; row++) {
    for (var col = 0; col < 9; col++) {
      board[index].innerText = matrix[row][col];
      index++;
    }
  }
}

function stringToBoard(string) {
  var board = document.getElementsByTagName("td");
  var validNum = /[1-9]/;
  for (var i = 0; i < board.length; i++) {
    if (validNum.test(string[i])) {
      board[i].innerText = string[i];
    } else {
      board[i].innerText = "";
    }
  }
}

function solveBoard() {
  if (isBoardValid()) {
    var matrix = stringToMatrix();
    sudoku_solver(matrix);
    matrixToBoard(matrix);
  } else {
    alert("The Sudoku Board is INVALID!");
  }
}

function isBoardValid() {
  return areRowsValid() && areColumnsValid() && areSquaresValid();
}

function areRowsValid() {
  var string = boardToString();
  var start_index = [0, 9, 18, 27, 36, 45, 54, 63, 72];

  for (var i = 0; i < start_index.length; i++) {
    var nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    for (var j = 0; j < 9; j++) {
      var curr = string[start_index[i] + j];
      if (curr != "-") {
        var found = false;
        for (var k = 0; k < nums.length; k++) {
          if (curr == nums[k]) {
            nums[k] = "0";
            found = true;
            break;
          }
        }
        if (found == false) {
          return false;
        }
      }
    }
  }
  return true;
}

function areColumnsValid() {
  var string = boardToString();
  var start_index = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  for (var i = 0; i < start_index.length; i++) {
    var nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    for (var j = 0; j < 9; j++) {
      var curr = string[start_index[i] + j * 9];
      if (curr != "-") {
        var found = false;
        for (var k = 0; k < nums.length; k++) {
          if (curr == nums[k]) {
            nums[k] = "0";
            found = true;
            break;
          }
        }
        if (found == false) {
          return false;
        }
      }
    }
  }
  return true;
}

function areSquaresValid() {
  var string = boardToString();
  var box_index = [0, 3, 6, 27, 30, 33, 54, 57, 60];
  var cell = [0, 1, 2, 9, 10, 11, 18, 19, 20];

  for (var i = 0; i < box_index.length; i++) {
    var index = box_index[i];
    var substring = "";
    for (var j = 0; j < cell.length; j++) {
      substring += string[index + cell[j]];
    }
    if (isSquareValid(substring) == false) {
      return false;
    }
  }
  return true;
}

function isSquareValid(substring) {
  var nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  for (var i = 0; i < substring.length; i++) {
    if (substring[i] != "-") {
      var found = false;
      for (var j = 0; j < nums.length; j++) {
        if (substring[i] == nums[j]) {
          nums[j] = "0";
          found = true;
          break;
        }
      }
      if (found == false) {
        return false;
      }
    }
  }
  return true;
}

function stringToMatrix() {
  var matrix = [];
  var string = boardToString();
  var index = 0;
  for (var i = 0; i < 9; i++) {
    matrix[i] = [];
    var j = 0;
    while (j < 9) {
      if (string[index] != "-") {
        matrix[i][j] = parseInt(string[index]);
      } else {
        matrix[i][j] = 0;
      }
      index++;
      j++;
    }
  }
  return matrix;
}

function isSafe(matrix, i, j, x) {
  for (var k = 0; k < 9; k++) {
    if (matrix[i][k] == x || matrix[k][j] == x) return false;
  }

  var row_start = i - (i % 3);
  var col_start = j - (j % 3);

  for (var row = 0; row < 3; row++) {
    for (var col = 0; col < 3; col++) {
      if (matrix[row_start + row][col_start + col] == x) return false;
    }
  }
  return true;
}

function sudoku_solver(matrix) {
  var row, col;
  var empty_cell_found = false;
  for (row = 0; row < 9; row++) {
    for (col = 0; col < 9 && !empty_cell_found; col++) {
      if (matrix[row][col] == 0) {
        empty_cell_found = true;
        break;
      }
    }
    if (empty_cell_found) break;
  }

  if (row == 9 && col == 9) {
    return true;
  }

  for (var x = 1; x <= 9; x++) {
    if (isSafe(matrix, row, col, x)) {
      matrix[row][col] = x;
      if (sudoku_solver(matrix)) return true;
      matrix[row][col] = 0;
    }
  }

  return false;
}

/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var answers = new Board({n: n});
  rowArr = _.range(n);
  colArr = _.range(n);
  checkPiece = function(row, column) {
    answers.togglePiece(row, column)
    if (answers.hasAnyRooksConflicts() === false) {
      rowArr = _.filter(rowArr, function(x) {if (x !== row){return x;}})
      colArr = _.filter(colArr, function(x) {if (x !== column) {return x;}})
      checkArr();
    };
  }

  var checkArr = function() {
    if (rowArr.length === 0 || colArr.length === 0) {
      return;
    }
    checkPiece(rowArr[0], colArr[0]);
  }
  checkPiece(0, 0);

  var solution = answers.rows(); //fixme
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var multiples = function(x) {
    if (x === 0) {return 1;}
    if (x > 0) {return x * multiples(x - 1)}
  }


  var solutionCount = multiples(n);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

window.findNQueensSolution = function(n) {
  var solution = new Board({n: n});
  var count = 0;
  console.log(n, 'I am N');
  if (n === 0) {
    return []
  }
  if (n === 2 || n === 3) {
    return solution.rows();
  };



  var checkSolution = function() {
    if (count === n) {
      return solution.rows();
    }
    for (let i = 0; i < n; i++) {
      for (let k = 0; k < n; k++) {
        if (solution.checkToggle(i, j)) {
          return;
        } else {
          count++
          return;
        }
      }
    }

  var checkToggle = function(row, column) {
    this.togglePiece(row, column)
    if (this.hasAnyQueensConflicts) {
      this.togglePiece(row, column);
      return true;
      }
    return false;
    }
  }
  checkSolution()
  console.log('Single solution for ' + n + ' Queens:', JSON.stringify(solution));
  return solution.rows();
};

/*
create board size n
create count
start in 0, 0 ~
function () {count === n} return board
iterate rows 0 - n
  iterate down column of current row
    check for conflict - Helper Function
      if conflict
        return
    else
      toggle piece
      count++;
        return


*/

// window.countNQueensSolutions = function(n) {
//   var multiples = function(x) {
//     if (x === 0) {return 1;}
//     if (x > 0) {return x * multiples(x - 1)}
//   }
//   var solutionCount = multiples(n); //fixme
//   console.log('Number of solutions for ' + n + ' queens:', solutionCount);
//   return solutionCount;
// };

window.NQueentuple = function(n) {
  tupleArray = [];
  for (let i = 0; i < n; i++) {
    for (let k = 0; k < n; k++) {
      tupleArray.push([i, k]);
    }
  }
  console.log(tupleArray);
};
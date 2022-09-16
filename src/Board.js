// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var row = this.get(rowIndex);
      var count = 0;
      row.forEach(function(position) {
        count += position;
      })
      return (count > 1);
    },

    /*
    get the row
    create count
    iterate through the row
      add row value to count
    return the condition of count greater than 1
    */

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var n = this.attributes.n
      for (let i = 0; i < n; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false
    },

    /*
    get n form board.attributes.n
    loop n times
    if (rowconfliceAt i)
      return true
    else return false
    */


    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var n = this.attributes.n;
      var count = 0;
      for (let i = 0; i < n; i++) {
        var row = this.get(i);
        count += row[colIndex]
      }
      return (count > 1);
    },

    /*
    store n
    variable count
    loop n times
      set row = this.get(i)
      count += column row[colIndex]

    */

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var n = this.attributes.n;
      for (let i = 0; i < n; i++) {
          if (this.hasColConflictAt(i)) {
            return true;
          }
        }
        return false
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var n = this.attributes.n;
      for (let i = 0; i < n; i++) {
        for (let k = 0; k < n; k++) {
          if (this.get(i)[k] === 1) {
            let a = i + 1;
            let b = k + 1;
            while (a < n && b < n) {
              if (this.get(a)[b] === 1) {
                return true;
              } else {
                a++;
                b++;
              }
            }
          }
        }
      }
      return false;
    },
    /*
    n length
    get first row
    iterate first row if we find a 1
    look 1 row down and 1 coloumn right and add it to the count repeat
    coloumn === n

    */

// hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {


//   if (majorDiagonalColumnIndexAtFirstRow >= 0) {
//     let rowI = 0;
//     let columnI = majorDiagonalColumnIndexAtFirstRow;
//   } else {
//     let rowI = 0;
//     let columnI = majorDiagonalColumnIndexAtFirstRow * -1;
//   }

//   const currentDiagonal = [];
//   while (this._isInBounds(rowI, columnI)) {
//     let pos = this.get(rowI)[columnI];
//     rowI++;
//     columnI++;
//     currentDiagonal.push(pos);
//   }

//   let count = 0;
//   currentDiagonal.forEach((pos) => {
//     if (pos > 0) {
//       count++;
//     }
//   });
//   return (count > 1);
// },

    /* input tells us position to check from
    if majorDia is positive
      column index = majorDia
      row index = 0
    else
      column = majorDia *= -1
      rowindex = 0

    while (_isInBounds())



    */

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var n = this.attributes.n;
      for (let i = 0; i < n; i++) {
        for (let k = 0; k < n; k++) {
          if (this.get(i)[k] === 1) {
            let a = i + 1;
            let b = k + 1;
            while (a < n && b < n) {
              if (this.get(a)[b] === 1) {
                return true;
              } else {
                a++;
                b++;
              }
            }
          }
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var n = this.attributes.n;
      for (let i = 0; i < n; i++) {
        for (let k = 0; k < n; k++) {
          if (this.get(i)[k] === 1) {
            let a = i - 1;
            let b = k - 1;
            while (a < n && b < n && a > 0 && b > 0) {
              if (this.get(a)[b] === 1) {
                return true;
              } else {
                a--;
                b--;
              }
            }
          }
        }
      }
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var n = this.attributes.n;
      for (let i = 0; i < n; i++) {
        for (let k = 0; k < n; k++) {
          if (this.get(i)[k] === 1) {
            let a = i + 1;
            let b = k - 1;
            while (a < n && b < n && a > 0 && b > 0) {
              if (this.get(a)[b] === 1) {
                return true;
              } else {
                a++;
                b--;
              }
            }
          }
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());

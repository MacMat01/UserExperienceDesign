export class TicTacToe {

    static FREE = 0;
    static CROSS = 1;
    static CIRCLE = 2;

    static nextSymbol(symbol) {
        if (symbol === TicTacToe.CROSS) {
            return TicTacToe.CIRCLE;
        } else {
            return TicTacToe.CROSS;
        }
    }

    size
    schema
    free_slots
    winner
    witness

    /**
     * Creates a new schema with the given size.
     *
     * @param size size of the schema.
     */
    constructor(size) {
        this.size = size;
        this.schema = Array(size).fill(0).map( _ => Array(size).fill(TicTacToe.FREE));
        this.free_slots = size*size;
        this.winner = TicTacToe.FREE;
        this.witness = Array(size).fill(0).map( _ => Array(size).fill(false));
    }

    /**
     * Returns true if the cell at the given position is empty.
     *
     * @param i row index.
     * @param j column index.
     * @returns {boolean} true if the cell at the given position is empty.
     */
    isEmpty(i, j) {
        return (this.isValid(i, j))&&(this.schema[i][j]===TicTacToe.FREE);
    }


    /**
     * Private methods used to add the given symbol at the given position.
     *
     * @param i row index.
     * @param j column index.
     * @param v symbol to add.
     * @returns {boolean} true if the symbol has been successfully added.
     */
    addValue(i, j, v) {
        if (this.isEmpty(i, j)) {
            this.schema[i][j] = v;
            this.free_slots -= 1;
            this.checkWinner(i, j, v);
            return true;
        } else {
            return false;
        }
    }

    /**
     * Returns the value at the given position represented as an array.
     *
     * @param p position in the schema.
     * @returns {int} the value at the given position.
     */
    get(p) {
        return this.getSymbolAt(p[0], p[1]);
    }

    /**
     * Returns the value at the given position.
     *
     * @param i
     * @param j
     * @returns {int} the value at the given position.
     */
    getSymbolAt(i, j) {
        if (this.isValid(i, j)) {
            return this.schema[i][j];
        }
        return TicTacToe.FREE;
    }

    /**
     * Returns the array containing the coordinates of row i.
     *
     * @param i row index.
     * @returns {[number,number][]} the array containing the coordinates of row i.
     */
    row(i) {
        return Array.from(Array(this.size).keys()).map(j => [i,j]);
    }

    /**
     * Returns the array containing the coordinates of column j.
     *
     * @param j column index.
     * @returns {[number,number][]} the array containing the coordinates of column j.
     */
    column(j) {
        return Array.from(Array(this.size).keys()).map(i => [i, j]);
    }

    /**
     * Returns the coordinates of diagonal one.
     *
     * @returns {[number,number][]} the coordinates of diagonal one.
     */
    diagonalOne() {
        return Array.from(Array(this.size).keys()).map(i => [i, i]);
    }

    /**
     * Returns the coordinates of diagonal two.
     *
     * @returns {[number,number][]} the coordinates of diagonal two.
     */
    diagonalTwo() {
        return Array.from(Array(this.size).keys()).map(i => [i, this.size-i-1]);
    }

    /**
     * Returns true if all the elements at the given locations contain the same value v.
     *
     * @param arrayOfPositions an array of locations.
     * @param v an integer.
     * @returns {boolean} true if all the elements at the given locations contain the same value v.
     */
    check(arrayOfPositions, v) {
        if (arrayOfPositions.every(p => this.get(p)===v)) {
            this.winner = v;
            arrayOfPositions.forEach(p => this.witness[p[0]][p[1]] = true)
            return true;
        } else {
            return false;
        }
    }

    /**
     * Returns true if all the elements in the row i contain the same value v.
     *
     * @param i a row index.
     * @param v a value,
     * @returns {boolean} true if all the element in the row i contains the same value v.
     */
    checkRow(i, v) {
        return this.check(this.row(i), v);
    }

    /**
     * Returns true if all the element in the column j contains the same value v.
     *
     * @param j a column index.
     * @param v a value,
     * @returns {boolean} true if all the element in the column j contains the same value v.
     */
    checkColumn(j, v) {
        return this.check(this.column(j), v);
    }

    /**
     * Returns true if all the element in the diagonal one contain the same value v.
     *
     * @param v a value.
     * @returns {boolean} true if all the element in the diagonal one contain the same value v.
     */
    checkDiagonalOne(v) {
        return this.check(this.diagonalOne(), v);
    }

    /**
     * Returns true if all the element in the diagonal two contain the same value v.
     *
     * @param v a value.
     * @returns {boolean} true if all the element in the diagonal two contain the same value v.
     */
    checkDiagonalTwo(v) {
        return this.check(this.diagonalTwo(), v);
    }


    /**
     * Returns true if the value v placed at position (i,j) let the player win.
     *
     * @param i row index.
     * @param j column index.
     * @param v symbol value.
     * @returns {boolean} true if the value v placed at position (i,j) let the player win.
     */
    checkWinner(i, j, v) {
        let flag =  this.checkRow(i, v);
        if (!flag) { flag = this.checkColumn(j, v); }
        if (!flag && (i===j)) { flag = this.checkDiagonalOne(v); }
        if (!flag && (i===this.size-j-1)) { flag = this.checkDiagonalTwo(v); }
        return flag;
    }

    /**
     * Returns true if the match is over.
     *
     * @returns {boolean} true if the game is over.
     */
    isGameOver() {
        return (this.free_slots===0)||(this.winner !== TicTacToe.FREE);
    }

    /**
     * Returns true if the match is draw.
     *
     * @returns {boolean} true if the game is draw.
     */
    isDraw() {
        return (this.free_slots===0)&&(this.winner === TicTacToe.FREE);
    }

    /**
     * Returns true if the given values represent a valid location.
     *
     * @param i row index.
     * @param j column index.
     * @returns {boolean} true if the given values represent a valid location.
     */
    isValid(i, j) {
        return (0<=i)&&(i<this.size)&&(0<=j)&&(j<this.size);
    }

    /**
     * Returns the array of locations of winner symbols.
     *
     * @returns {[number, number][]} the array of locations of winner symbols.
     */
    getWitness() {
        return this.witness;
    }

    isAWinnerLocation(i, j) {
        return this.witness[i][j];
    }
}
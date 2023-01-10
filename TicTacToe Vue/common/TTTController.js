import {TicTacToe} from "@/common/TicTacToe";

/**
 * This class is used to control game activities.
 */
export class TTTController {

    schema;

    size;

    currentSymbol;

    /**
     * Creates a new controller managing a schema with the given size.
     *
     * @param size size of the schema.
     */
    constructor(size=3) {
        this.size = size;
        this.schema = new TicTacToe(3);
        this.currentSymbol = TicTacToe.CROSS;
    }

    /**
     * Returns true if the cell at the given position is empty.
     * @param i row index
     * @param j column index
     * @returns {boolean} true if the cell at the given position is empty.
     */
    isEmpty(i , j) {
        return this.schema.isEmpty(i, j);
    }

    /**
     * Adds the current symbol at the given position.
     *
     * @param i row index.
     * @param j column index.
     * @returns {boolean} true if the symbol has been successfully added.
     */
    addSymbolAt(i, j) {
        if (this.isEmpty(i, j)) {
            this.schema.addValue(i, j, this.currentSymbol);
            this.currentSymbol = TicTacToe.nextSymbol(this.currentSymbol);
            return true;
        } else {
            return false;
        }
    }

    /**
     * Returns true if the game is over.
     *
     * @returns {boolean} true if the game is over.
     */
    isGameOver() {
        return this.schema.isGameOver();
    }

    /**
     * Returns true if the match is draw.
     *
     * @returns {boolean} true if the match is draw.
     */
    isDraw() {
        return this.schema.isDraw();
    }

    /**
     * Resets the schema and restarts the game.
     */
    clear() {
        this.schema = new TicTacToe(this.size);
    }

    getSymbolAt(i, j) {
        return this.schema.getSymbolAt(i, j);
    }

    isAWinnerLocation(i, j) {
        return this.schema.isAWinnerLocation(i, j);
    }

}
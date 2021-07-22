import ChessBoard from './ChessBoard'
import ChessPiece, { Color, Position, MoveInformation } from './ChessPiece'

export default class PawnPiece extends ChessPiece {
  constructor(color: Color, position: Position, board: ChessBoard) {
    super(color, position, board)
  }

  private isFirstMove(): Boolean {
    if (this.color === Color.WHITE && this.position.row === 1) {
      return true
    }
    if (this.color === Color.BLACK && this.position.row === 6) {
      return true
    }

    return false
  }

  public generateValidMovePositions(): MoveInformation[] {
    const validSquares: MoveInformation[] = []
    const nextSquare: Position =
      this.color === Color.WHITE
        ? { ...this.position, row: this.position.row + 1 }
        : { ...this.position, row: this.position.row - 1 }
    const pieceAtNextSquare = this.board.getPieceAtPosition(nextSquare)

    // pawn 1 step and 2 step move
    if (pieceAtNextSquare === null) {
      validSquares.push({ isCapture: false, start: this.position, end: nextSquare })
      if (this.isFirstMove()) {
        const nextSquare: Position =
          this.color === Color.WHITE
            ? { ...this.position, row: this.position.row + 2 }
            : { ...this.position, row: this.position.row - 2 }
        const pieceAtNextSquare = this.board.getPieceAtPosition(nextSquare)
        if (pieceAtNextSquare === null) {
          validSquares.push({ isCapture: false, start: this.position, end: nextSquare })
        }
      }
    }

    // pawn capture
    const leftDiagonal: Position =
      this.color === Color.WHITE
        ? { row: this.position.row + 1, column: this.position.column - 1 }
        : { row: this.position.row - 1, column: this.position.column - 1 }
    const rightDiagonal: Position =
      this.color === Color.WHITE
        ? { row: this.position.row + 1, column: this.position.column + 1 }
        : { row: this.position.row - 1, column: this.position.column + 1 }
    const leftPiece = this.board.getPieceAtPosition(leftDiagonal)
    const rightPiece = this.board.getPieceAtPosition(rightDiagonal)

    if (leftPiece !== null && leftPiece.isOppositeColor(this)) {
      validSquares.push({ isCapture: true, start: this.position, end: leftDiagonal })
    }
    if (rightPiece !== null && rightPiece.isOppositeColor(this)) {
      validSquares.push({ isCapture: true, start: this.position, end: rightDiagonal })
    }

    //TODO: en passant

    return validSquares
  }
}

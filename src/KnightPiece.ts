import ChessBoard from './ChessBoard'
import ChessPiece, { Color, MoveInformation, Position } from './ChessPiece'

export default class KnightPiece extends ChessPiece {
  constructor(color: Color, position: Position, board: ChessBoard) {
    super(color, position, board)
  }
  private offsets: Position[] = [
    { row: 2, column: -1 },
    { row: 2, column: 1 },
    { row: 1, column: -2 },
    { row: 1, column: 2 },
    { row: -2, column: -1 },
    { row: -2, column: 1 },
    { row: -1, column: -2 },
    { row: -1, column: 2 }
  ]

  public generateValidMovePositions(): MoveInformation[] {
    const moves: MoveInformation[] = []
    this.offsets.forEach(offset => {
      const currentPosition: Position = {
        row: this.position.row + offset.row,
        column: this.position.column + offset.column
      }
      if (!this.isPositionInBounds(currentPosition)) {
        return
      }
      const positionPiece = this.board.getPieceAtPosition(currentPosition)
      if (positionPiece === null) {
        moves.push({ isCapture: false, start: this.getPosition(), end: currentPosition })
      } else if (positionPiece.isOppositeColor(this)) {
        moves.push({ isCapture: true, start: this.getPosition(), end: currentPosition })
      }
    })
    return moves
  }
}

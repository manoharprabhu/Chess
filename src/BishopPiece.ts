import ChessBoard from './ChessBoard'
import ChessPiece, { Color, Position, MoveInformation } from './ChessPiece'

export default class BishopPiece extends ChessPiece {
  constructor(color: Color, position: Position, board: ChessBoard) {
    super(color, position, board)
  }

  private offsets: Position[] = [
    { row: 1, column: 1 },
    { row: 1, column: -1 },
    { row: -1, column: 1 },
    { row: -1, column: -1 }
  ]

  private traverseAndFindMoves(startPosition: Position, direction: Position): MoveInformation[] {
    let currentPosition: Position = startPosition
    const moves: MoveInformation[] = []
    for (let i = 1; i <= 8; i++) {
      const newPos: Position = {
        row: currentPosition.row + direction.row,
        column: currentPosition.column + direction.column
      }
      if (!this.isPositionInBounds(newPos)) {
        break
      }

      const piece = this.board.getPieceAtPosition(newPos)
      if (piece === null) {
        moves.push({ start: startPosition, end: newPos, isCapture: false })
      } else {
        if (piece.isOppositeColor(this)) {
          moves.push({ start: startPosition, end: newPos, isCapture: true })
        }
        return moves
      }
      currentPosition = newPos
    }

    return moves
  }

  public generateValidMovePositions(): MoveInformation[] {
    const startPosition = this.getPosition()
    const moves: MoveInformation[] = []

    for (let i = 0; i < this.offsets.length; i++) {
      const result = this.traverseAndFindMoves(startPosition, this.offsets[i])
      moves.push(...result)
    }

    return moves
  }
}

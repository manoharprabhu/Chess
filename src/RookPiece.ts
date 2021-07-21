import ChessBoard from './ChessBoard'
import ChessPiece, { Color, Position, MoveInformation } from './ChessPiece'

export default class RookPiece extends ChessPiece {
  constructor(color: Color, position: Position, board: ChessBoard) {
    super(color, position, board)
  }

  private offsets: Position[] = [
    { row: 0, column: 1 },
    { row: 1, column: 0 },
    { row: -1, column: 0 },
    { row: 0, column: -1 }
  ]

  public generateValidMovePositions(): MoveInformation[] {
    const startPosition = this.getPosition()
    const moves: MoveInformation[] = []

    for (let i = 0; i < this.offsets.length; i++) {
      const result = this.traverseAndFindMoves(startPosition, this.offsets[i])
      result.forEach(move => {
        moves.push(move)
      })
    }
    return moves
  }
}

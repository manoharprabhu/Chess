import ChessBoard from './ChessBoard'
import ChessPiece, { Color, Position, MoveInformation } from './ChessPiece'

export default class KingPiece extends ChessPiece {
  constructor(color: Color, position: Position, board: ChessBoard) {
    super(color, position, board)
  }

  public generateValidMovePositions(): MoveInformation[] {
    throw new Error('Method not implemented.')
  }
}

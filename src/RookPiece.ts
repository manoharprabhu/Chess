import ChessBoard from './ChessBoard'
import ChessPiece, { Color, Type, Position, MoveInformation } from './ChessPiece'

export default class RookPiece extends ChessPiece {
  constructor(color: Color, position: Position, board: ChessBoard) {
    super(Type.ROOK, color, position, board)
  }

  public generateValidMovePositions(): MoveInformation[] {
    throw new Error('Method not implemented.')
  }
}

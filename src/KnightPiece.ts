import ChessBoard from './ChessBoard'
import ChessPiece, { Color, Type, Position, MoveInformation } from './ChessPiece'

export default class KnightPiece extends ChessPiece {
  constructor(color: Color, position: Position, board: ChessBoard) {
    super(Type.KNIGHT, color, position, board)
  }

  public generateValidMovePositions(): MoveInformation[] {
    throw new Error('Method not implemented.')
  }
}

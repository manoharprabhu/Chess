import ChessBoard from './ChessBoard'
import ChessPiece, { Color, Type, Position, MoveInformation } from './ChessPiece'

export default class QueenPiece extends ChessPiece {
  constructor(color: Color, position: Position, board: ChessBoard) {
    super(Type.QUEEN, color, position, board)
  }

  public generateValidMovePositions(): MoveInformation[] {
    throw new Error('Method not implemented.')
  }
}

import ChessBoard from './ChessBoard'
import ChessPiece, { Color, PieceType, Position, MoveInformation } from './ChessPiece'

export default class KnightPiece extends ChessPiece {
  constructor(color: Color, position: Position, board: ChessBoard) {
    super(color, position, board)
  }

  public generateValidMovePositions(): MoveInformation[] {
    throw new Error('Method not implemented.')
  }
  public getType(): PieceType {
    return 'Knight'
  }
}

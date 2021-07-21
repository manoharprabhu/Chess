import ChessBoard from './ChessBoard'

export default abstract class ChessPiece {
  protected color: Color
  protected position: Position
  protected board: ChessBoard

  constructor(color: Color, position: Position, board: ChessBoard) {
    this.color = color
    this.position = position
    this.board = board
  }

  public getColor(): Color {
    return this.color
  }

  public getPosition(): Position {
    return { ...this.position }
  }

  public setPosition(position: Position) {
    this.position = position
  }

  public isOppositeColor(piece: ChessPiece): Boolean {
    return this.color !== piece.color
  }

  public isPositionInBounds(position: Position): Boolean {
    if (position.row < 0 || position.row > 7) {
      return false
    }

    if (position.column < 0 || position.column > 7) {
      return false
    }

    return true
  }

  public abstract generateValidMovePositions(): MoveInformation[]
}

export interface Position {
  row: number
  column: number
}

export interface MoveInformation {
  start: Position
  end: Position
  isCapture: Boolean
}

export enum Color {
  WHITE,
  BLACK
}

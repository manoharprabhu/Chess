import BishopPiece from './BishopPiece'
import ChessPiece, { Color, MoveInformation, Position } from './ChessPiece'
import KingPiece from './KingPiece'
import KnightPiece from './KnightPiece'
import PawnPiece from './PawnPiece'
import QueenPiece from './QueenPiece'
import RookPiece from './RookPiece'

export default class ChessBoard {
  private pieces: ChessPiece[] = []
  private currentPlayer: Color
  private configuration: Configuration
  private directions: string[] = [
    'UP',
    'UPRIGHT',
    'RIGHT',
    'DOWNRIGHT',
    'DOWN',
    'DOWNLEFT',
    'LEFT',
    'UPLEFT'
  ]
  private knightOffsets: Position[] = [
    { row: 2, column: 1 },
    { row: 1, column: 2 },
    { row: -1, column: 2 },
    { row: -2, column: 1 },
    { row: -2, column: -1 },
    { row: -1, column: -2 },
    { row: 1, column: -2 },
    { row: 2, column: -1 }
  ]
  constructor(configuration: Configuration) {
    this.configuration = configuration

    this.currentPlayer = configuration.firstPlayer ? configuration.firstPlayer : Color.WHITE
    switch (configuration.pieceArrangement) {
      case PieceArrangement.DEFAULT:
        this.initializeDefaultArrangement()
        break
      case PieceArrangement.WITHFEN:
        this.initializeWithFen()
        break
      case PieceArrangement.EMPTY:
      default:
        break
    }
  }

  public clone(): ChessBoard {
    const newBoard = new ChessBoard(this.configuration)
    newBoard.currentPlayer = this.currentPlayer
    newBoard.configuration = { ...this.configuration }
    newBoard.pieces = []
    this.pieces.forEach(piece => {
      let newPiece: ChessPiece | null = null
      if (piece instanceof PawnPiece) {
        newPiece = new PawnPiece(piece.getColor(), piece.getPosition(), newBoard)
      } else if (piece instanceof RookPiece) {
        newPiece = new RookPiece(piece.getColor(), piece.getPosition(), newBoard)
      } else if (piece instanceof BishopPiece) {
        newPiece = new BishopPiece(piece.getColor(), piece.getPosition(), newBoard)
      } else if (piece instanceof KnightPiece) {
        newPiece = new KnightPiece(piece.getColor(), piece.getPosition(), newBoard)
      } else if (piece instanceof QueenPiece) {
        newPiece = new QueenPiece(piece.getColor(), piece.getPosition(), newBoard)
      } else if (piece instanceof KingPiece) {
        newPiece = new KingPiece(piece.getColor(), piece.getPosition(), newBoard)
      }
      if (newPiece === null) {
        throw new Error('Piece is null. Cannot clone')
      }
      newBoard.pieces.push(newPiece)
    })
    return newBoard
  }

  private initializeWithFen() {
    if (!this.configuration.fen) {
      throw new Error('FEN not defined')
    }

    throw new Error('Not Implemented')
  }

  private initializeDefaultArrangement() {
    // white pawns
    for (let i = 0; i < 8; i++) {
      this.pieces.push(new PawnPiece(Color.WHITE, { row: 1, column: i }, this))
    }
    // black pawns
    for (let i = 0; i < 8; i++) {
      this.pieces.push(new PawnPiece(Color.BLACK, { row: 6, column: i }, this))
    }

    // white pieces
    this.pieces.push(new RookPiece(Color.WHITE, { row: 0, column: 0 }, this))
    this.pieces.push(new RookPiece(Color.WHITE, { row: 0, column: 7 }, this))
    this.pieces.push(new KnightPiece(Color.WHITE, { row: 0, column: 1 }, this))
    this.pieces.push(new KnightPiece(Color.WHITE, { row: 0, column: 6 }, this))
    this.pieces.push(new BishopPiece(Color.WHITE, { row: 0, column: 2 }, this))
    this.pieces.push(new BishopPiece(Color.WHITE, { row: 0, column: 5 }, this))
    this.pieces.push(new QueenPiece(Color.WHITE, { row: 0, column: 3 }, this))
    this.pieces.push(new KingPiece(Color.WHITE, { row: 0, column: 4 }, this))

    // black pieces
    this.pieces.push(new RookPiece(Color.BLACK, { row: 6, column: 0 }, this))
    this.pieces.push(new RookPiece(Color.BLACK, { row: 6, column: 7 }, this))
    this.pieces.push(new KnightPiece(Color.BLACK, { row: 6, column: 1 }, this))
    this.pieces.push(new KnightPiece(Color.BLACK, { row: 6, column: 6 }, this))
    this.pieces.push(new BishopPiece(Color.BLACK, { row: 6, column: 2 }, this))
    this.pieces.push(new BishopPiece(Color.BLACK, { row: 6, column: 5 }, this))
    this.pieces.push(new QueenPiece(Color.BLACK, { row: 6, column: 3 }, this))
    this.pieces.push(new KingPiece(Color.BLACK, { row: 6, column: 4 }, this))
  }

  private pruneMoves(allMoves: MoveInformation[]): MoveInformation[] {
    // Iterate through moves
    // Apply move to the board
    // Check if king is under check. If yes, reject move
    const prunedMoves: MoveInformation[] = []
    allMoves.forEach(move => {
      const boardClone = this.clone()
      boardClone.applyMove(move)
      if (!boardClone.isMyKingUnderCheck()) {
        prunedMoves.push(move)
      }
    })
    return prunedMoves
  }

  private findMyKing(): KingPiece | null {
    for (let i = 0; i < this.pieces.length; i++) {
      if (this.pieces[i].getColor() === this.currentPlayer && this.pieces[i] instanceof KingPiece) {
        return this.pieces[i] as KingPiece
      }
    }
    return null
  }

  private isMyKingUnderCheck(): Boolean {
    const myKing = this.findMyKing()
    if (myKing === null) {
      throw new Error('King not found')
    }

    for (const direction of this.directions) {
      const piece = this.raytrace(myKing.getPosition(), direction)
      if (piece === null || !piece.isOppositeColor(myKing)) {
        continue
      }

      switch (direction) {
        case 'UP':
        case 'DOWN':
          if (piece instanceof RookPiece || piece instanceof QueenPiece) {
            return true
          }
          break
        case 'UPRIGHT':
        case 'DOWNRIGHT':
        case 'UPLEFT':
        case 'DOWNLEFT':
          if (piece instanceof QueenPiece || piece instanceof BishopPiece) {
            return true
          }
          break
        case 'RIGHT':
        case 'LEFT':
          if (piece instanceof QueenPiece || piece instanceof RookPiece) {
            return true
          }
          break
      }

      if (piece instanceof KingPiece && piece.getDistance(myKing) === 1) {
        return true
      }

      if (this.checkOppositeKnights(myKing)) {
        return true
      }

      //TODO check pawn
    }

    return false
  }

  private checkOppositeKnights(king: KingPiece): Boolean {
    for (let i = 0; i < this.knightOffsets.length; i++) {
      const knight = this.getPieceAtPosition(this.knightOffsets[i])
      if (knight === null) {
        continue
      }

      if (knight.isOppositeColor(king)) {
        return true
      }
    }

    return false
  }

  private raytrace(start: Position, direction: string): ChessPiece | null {
    let offset: Position = { row: 0, column: 0 }
    switch (direction) {
      case 'UP':
        offset.row = 1
        break
      case 'UPRIGHT':
        offset.row = 1
        offset.column = 1
        break
      case 'RIGHT':
        offset.column = 1
        break
      case 'DOWNRIGHT':
        offset.row = -1
        offset.column = 1
        break
      case 'DOWN':
        offset.row = -1
        break
      case 'DOWNLEFT':
        offset.row = -1
        offset.column = -1
        break
      case 'LEFT':
        offset.column = -1
        break
      case 'UPLEFT':
        offset.row = 1
        offset.column = -1
        break
      default:
        break
    }

    let currentPosition = start
    let hitPiece: ChessPiece | null = null
    for (let i = 0; i < 8; i++) {
      const newPosition: Position = {
        row: currentPosition.row + offset.row,
        column: currentPosition.column + offset.column
      }
      hitPiece = this.getPieceAtPosition(newPosition)
      if (hitPiece !== null) {
        return hitPiece
      }
      currentPosition = newPosition
    }

    return null
  }

  private applyMove(move: MoveInformation) {
    const startPiece = this.getPieceAtPosition(move.start)
    const capturedPiece = this.getPieceAtPosition(move.end)
    if (startPiece === null) {
      throw new Error(
        `getPieceAtPosition: Piece not found to apply the move: ${JSON.stringify(move.start)}`
      )
    }
    // Remove captured piece
    if (move.isCapture && capturedPiece !== null) {
      const capturedIndex = this.findPieceIndex(capturedPiece)
      if (capturedIndex === -1) {
        throw new Error('Captured piece not found to apply the move')
      }

      this.pieces.splice(capturedIndex, 1)
    }

    // Move piece to position
    startPiece.setPosition(move.end)
  }

  private findPieceIndex(piece: ChessPiece): number {
    for (let i = 0; i < this.pieces.length; i++) {
      if (
        this.pieces[i].getPosition().row === piece.getPosition().row &&
        this.pieces[i].getPosition().column === piece.getPosition().column
      ) {
        return i
      }
    }

    return -1
  }

  private moveInformationSorter(a: MoveInformation, b: MoveInformation): number {
    if (a.end.row < b.end.row) {
      return -1
    } else if (a.end.row > b.end.row) {
      return 1
    } else {
      if (a.end.column < b.end.column) {
        return -1
      } else if (a.end.column > b.end.column) {
        return 1
      } else {
        return 0
      }
    }
  }

  public getPieceAtPosition(position: Position): ChessPiece | null {
    for (let i = 0; i < this.pieces.length; i++) {
      const piecePos = this.pieces[i].getPosition()
      if (piecePos.row === position.row && piecePos.column === position.column) {
        return this.pieces[i]
      }
    }

    return null
  }

  public placePiece<T extends ChessPiece>(
    color: Color,
    position: Position,
    type: { new (...args: any[]): T }
  ): ChessBoard {
    if (this.getPieceAtPosition(position) !== null) {
      throw new Error('square is already occupied')
    }

    const piece = new type(color, position, this)
    this.pieces.push(piece)
    return this
  }

  public getCurrentPlayer(): Color {
    return this.currentPlayer
  }

  public generateMovesForPiece(position: Position): MoveInformation[] {
    const piece = this.getPieceAtPosition(position)
    if (!piece) {
      throw new Error('No piece at the position')
    }
    if (piece.getColor() !== this.currentPlayer) {
      throw new Error('Not your turn')
    }

    const allMoves = piece.generateValidMovePositions()
    const validMoves = this.pruneMoves(allMoves)
    validMoves.sort(this.moveInformationSorter)
    return validMoves
  }

  public prettyPrint() {
    const board: string[][] = []
    for (let i = 0; i < 8; i++) {
      board.push([])
      for (let k = 0; k < 8; k++) {
        board[i].push('.')
      }
    }

    this.pieces.forEach(piece => {
      const pos = piece.getPosition()
      let character = '.'
      if (piece instanceof PawnPiece) {
        character = 'P'
      } else if (piece instanceof BishopPiece) {
        character = 'B'
      } else if (piece instanceof RookPiece) {
        character = 'R'
      } else if (piece instanceof KnightPiece) {
        character = 'N'
      } else if (piece instanceof KingPiece) {
        character = 'K'
      } else if (piece instanceof QueenPiece) {
        character = 'Q'
      }
      board[7 - pos.row][pos.column] = character
    })

    console.table(board)
  }
}

export interface Configuration {
  pieceArrangement: PieceArrangement
  firstPlayer?: Color
  fen?: string
}

export enum PieceArrangement {
  EMPTY,
  DEFAULT,
  WITHFEN
}

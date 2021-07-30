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
  private whiteCastleKingSide: boolean
  private whiteCastleQueenSide: boolean
  private blackCastleKingSide: boolean
  private blackCastleQueenSide: boolean
  private enPassantTargetSquare: string
  private halfMoveClock: number
  private fullMoveClock: number

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
    this.whiteCastleKingSide = true
    this.whiteCastleQueenSide = true
    this.blackCastleKingSide = true
    this.blackCastleQueenSide = true
    this.enPassantTargetSquare = '-'
    this.halfMoveClock = 0
    this.fullMoveClock = 0
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
    const parts: string[] = this.configuration.fen.split(' ')
    if (parts.length !== 6) {
      throw new Error('FEN must have 6 parts')
    }

    // Parse piece info
    const ranks: string[] = parts[0].split('/')
    for (let row = 0; row < ranks.length; row++) {
      let colIndex = 0
      const colChars = ranks[row].split('')
      for (let col = 0; col < colChars.length; col++) {
        const currentChar = colChars[col]
        if (currentChar >= '1' && currentChar <= '9') {
          colIndex += parseInt(currentChar)
        } else {
          const piece = this.makePieceForFen(currentChar, row, colIndex)
          if (piece === null) {
            throw new Error('Invalid character in FEN')
          }
          this.pieces.push(piece)
          colIndex++
        }
      }
    }

    // Parse first color
    if (parts[1] === 'w') {
      this.currentPlayer = Color.WHITE
    }
    if (parts[1] === 'b') {
      this.currentPlayer = Color.BLACK
    }

    // Parse castling ability
    if (parts[2].indexOf('K') !== -1) {
      this.whiteCastleKingSide = true
    } else {
      this.whiteCastleKingSide = false
    }
    if (parts[2].indexOf('Q') !== -1) {
      this.whiteCastleQueenSide = true
    } else {
      this.whiteCastleQueenSide = false
    }
    if (parts[2].indexOf('k') !== -1) {
      this.blackCastleKingSide = true
    } else {
      this.blackCastleKingSide = false
    }
    if (parts[2].indexOf('q') !== -1) {
      this.blackCastleQueenSide = true
    } else {
      this.blackCastleQueenSide = false
    }

    // Parse en passant target square
    this.enPassantTargetSquare = parts[3]

    // Parse halfmove clock
    this.halfMoveClock = parseInt(parts[4])

    // Parse fullmove
    this.fullMoveClock = parseInt(parts[5])
  }

  private makePieceForFen(currentChar: string, row: number, col: number): ChessPiece | null {
    let color: Color = Color.WHITE
    if (currentChar >= 'a' && currentChar <= 'z') {
      color = Color.BLACK
    }

    if (currentChar.toLowerCase() === 'r') {
      return new RookPiece(color, { row: 7 - row, column: col }, this)
    } else if (currentChar.toLowerCase() === 'n') {
      return new KnightPiece(color, { row: 7 - row, column: col }, this)
    } else if (currentChar.toLowerCase() === 'b') {
      return new BishopPiece(color, { row: 7 - row, column: col }, this)
    } else if (currentChar.toLowerCase() === 'q') {
      return new QueenPiece(color, { row: 7 - row, column: col }, this)
    } else if (currentChar.toLowerCase() === 'k') {
      return new KingPiece(color, { row: 7 - row, column: col }, this)
    } else if (currentChar.toLowerCase() === 'p') {
      return new PawnPiece(color, { row: 7 - row, column: col }, this)
    }

    return null
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
    this.pieces.push(new RookPiece(Color.BLACK, { row: 7, column: 0 }, this))
    this.pieces.push(new RookPiece(Color.BLACK, { row: 7, column: 7 }, this))
    this.pieces.push(new KnightPiece(Color.BLACK, { row: 7, column: 1 }, this))
    this.pieces.push(new KnightPiece(Color.BLACK, { row: 7, column: 6 }, this))
    this.pieces.push(new BishopPiece(Color.BLACK, { row: 7, column: 2 }, this))
    this.pieces.push(new BishopPiece(Color.BLACK, { row: 7, column: 5 }, this))
    this.pieces.push(new QueenPiece(Color.BLACK, { row: 7, column: 3 }, this))
    this.pieces.push(new KingPiece(Color.BLACK, { row: 7, column: 4 }, this))
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

  public isKingSideCastlingAllowed(color: Color) {
    switch (color) {
      case Color.WHITE:
        return this.whiteCastleKingSide
      case Color.BLACK:
        return this.blackCastleKingSide
      default:
        return true
    }
  }

  public isQueenSideCastlingAllowed(color: Color) {
    switch (color) {
      case Color.WHITE:
        return this.whiteCastleQueenSide
      case Color.BLACK:
        return this.blackCastleQueenSide
      default:
        return true
    }
  }

  public getEnPassantTarget(): string {
    return this.enPassantTargetSquare
  }

  public getHalfmoveClock() {
    return this.halfMoveClock
  }

  public getFullmoveClock() {
    return this.fullMoveClock
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
}

export interface Configuration {
  pieceArrangement: PieceArrangement
  firstPlayer?: Color
  fen?: string
  whiteCastleKingSide?: boolean
  whiteCastleQueenSide?: boolean
  blackCastleKingSide?: boolean
  blackCastleQueenSide?: boolean
}

export enum PieceArrangement {
  EMPTY,
  DEFAULT,
  WITHFEN
}

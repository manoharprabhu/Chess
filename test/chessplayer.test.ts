import BishopPiece from '../src/BishopPiece'
import ChessBoard, { Configuration, PieceArrangement } from '../src/ChessBoard'
import { Color, MoveInformation } from '../src/ChessPiece'
import KingPiece from '../src/KingPiece'
import PawnPiece from '../src/PawnPiece'
import RookPiece from '../src/RookPiece'

describe('White Pawn tests', () => {
  it('Test pawn initial moves', () => {
    const board = new ChessBoard({ pieceArrangement: PieceArrangement.EMPTY })
    board
      .placePiece(Color.WHITE, { row: 1, column: 5 }, PawnPiece)
      .placePiece(Color.WHITE, { row: 4, column: 0 }, KingPiece)
      .placePiece(Color.BLACK, { row: 4, column: 7 }, KingPiece)

    const validMoves = board.generateMovesForPiece({ row: 1, column: 5 })
    const expected: MoveInformation[] = [
      { isCapture: false, start: { row: 1, column: 5 }, end: { row: 2, column: 5 } },
      { isCapture: false, start: { row: 1, column: 5 }, end: { row: 3, column: 5 } }
    ]
    expect(validMoves).toEqual(expected)
  })

  it('Test pawn initial moves with block', () => {
    const board = new ChessBoard({ pieceArrangement: PieceArrangement.EMPTY })
    board
      .placePiece(Color.WHITE, { row: 1, column: 5 }, PawnPiece)
      .placePiece(Color.BLACK, { row: 2, column: 5 }, PawnPiece)
      .placePiece(Color.WHITE, { row: 4, column: 0 }, KingPiece)
      .placePiece(Color.BLACK, { row: 4, column: 7 }, KingPiece)

    const validMoves = board.generateMovesForPiece({ row: 1, column: 5 })

    const expected: MoveInformation[] = []
    expect(validMoves).toEqual(expected)
  })

  it('Test pawn initial moves with block', () => {
    const board = new ChessBoard({ pieceArrangement: PieceArrangement.EMPTY })
    board
      .placePiece(Color.WHITE, { row: 1, column: 5 }, PawnPiece)
      .placePiece(Color.BLACK, { row: 3, column: 5 }, PawnPiece)
      .placePiece(Color.WHITE, { row: 4, column: 0 }, KingPiece)
      .placePiece(Color.BLACK, { row: 4, column: 7 }, KingPiece)

    const validMoves = board.generateMovesForPiece({ row: 1, column: 5 })

    const expected: MoveInformation[] = [
      { isCapture: false, start: { row: 1, column: 5 }, end: { row: 2, column: 5 } }
    ]
    expect(validMoves).toEqual(expected)
  })

  it('Test pawn capture', () => {
    const board = new ChessBoard({ pieceArrangement: PieceArrangement.EMPTY })
    board
      .placePiece(Color.WHITE, { row: 3, column: 5 }, PawnPiece)
      .placePiece(Color.BLACK, { row: 4, column: 6 }, PawnPiece)
      .placePiece(Color.BLACK, { row: 4, column: 4 }, PawnPiece)
      .placePiece(Color.WHITE, { row: 7, column: 0 }, KingPiece)
      .placePiece(Color.BLACK, { row: 7, column: 7 }, KingPiece)

    const validMoves = board.generateMovesForPiece({ row: 3, column: 5 })
    const expected: MoveInformation[] = [
      { isCapture: true, start: { row: 3, column: 5 }, end: { row: 4, column: 4 } },
      { isCapture: false, start: { row: 3, column: 5 }, end: { row: 4, column: 5 } },
      { isCapture: true, start: { row: 3, column: 5 }, end: { row: 4, column: 6 } }
    ]
    expect(validMoves).toEqual(expected)
  })

  it('Test pawn capture on first move', () => {
    const board = new ChessBoard({ pieceArrangement: PieceArrangement.EMPTY })
    board
      .placePiece(Color.WHITE, { row: 1, column: 5 }, PawnPiece)
      .placePiece(Color.BLACK, { row: 2, column: 6 }, PawnPiece)
      .placePiece(Color.BLACK, { row: 2, column: 4 }, PawnPiece)
      .placePiece(Color.WHITE, { row: 7, column: 0 }, KingPiece)
      .placePiece(Color.BLACK, { row: 7, column: 7 }, KingPiece)

    const validMoves = board.generateMovesForPiece({ row: 1, column: 5 })
    const expected: MoveInformation[] = [
      { isCapture: true, start: { row: 1, column: 5 }, end: { row: 2, column: 4 } },
      { isCapture: false, start: { row: 1, column: 5 }, end: { row: 2, column: 5 } },
      { isCapture: true, start: { row: 1, column: 5 }, end: { row: 2, column: 6 } },
      { isCapture: false, start: { row: 1, column: 5 }, end: { row: 3, column: 5 } }
    ]
    expect(validMoves).toEqual(expected)
  })
})

describe('Black Pawn tests', () => {
  it('Test pawn initial moves', () => {
    const board = new ChessBoard({
      pieceArrangement: PieceArrangement.EMPTY,
      firstPlayer: Color.BLACK
    })
    board
      .placePiece(Color.BLACK, { row: 6, column: 5 }, PawnPiece)
      .placePiece(Color.WHITE, { row: 7, column: 0 }, KingPiece)
      .placePiece(Color.BLACK, { row: 7, column: 7 }, KingPiece)

    const validMoves = board.generateMovesForPiece({ row: 6, column: 5 })
    const expected: MoveInformation[] = [
      { isCapture: false, start: { row: 6, column: 5 }, end: { row: 4, column: 5 } },
      { isCapture: false, start: { row: 6, column: 5 }, end: { row: 5, column: 5 } }
    ]
    expect(validMoves).toEqual(expected)
  })

  it('Test pawn initial moves with block', () => {
    const board = new ChessBoard({
      pieceArrangement: PieceArrangement.EMPTY,
      firstPlayer: Color.BLACK
    })
    board
      .placePiece(Color.WHITE, { row: 1, column: 5 }, PawnPiece)
      .placePiece(Color.BLACK, { row: 2, column: 5 }, PawnPiece)
      .placePiece(Color.WHITE, { row: 7, column: 0 }, KingPiece)
      .placePiece(Color.BLACK, { row: 7, column: 7 }, KingPiece)

    const validMoves = board.generateMovesForPiece({ row: 2, column: 5 })
    const expected: MoveInformation[] = []
    expect(validMoves).toEqual(expected)
  })

  it('Test pawn initial moves with block', () => {
    const board = new ChessBoard({
      pieceArrangement: PieceArrangement.EMPTY,
      firstPlayer: Color.BLACK
    })
    board
      .placePiece(Color.BLACK, { row: 6, column: 5 }, PawnPiece)
      .placePiece(Color.WHITE, { row: 4, column: 5 }, PawnPiece)
      .placePiece(Color.WHITE, { row: 7, column: 0 }, KingPiece)
      .placePiece(Color.BLACK, { row: 7, column: 7 }, KingPiece)

    const validMoves = board.generateMovesForPiece({ row: 6, column: 5 })
    const expected: MoveInformation[] = [
      { isCapture: false, start: { row: 6, column: 5 }, end: { row: 5, column: 5 } }
    ]
    expect(validMoves).toEqual(expected)
  })

  it('Test pawn capture', () => {
    const board = new ChessBoard({
      pieceArrangement: PieceArrangement.EMPTY,
      firstPlayer: Color.BLACK
    })
    board
      .placePiece(Color.BLACK, { row: 4, column: 5 }, PawnPiece)
      .placePiece(Color.WHITE, { row: 3, column: 6 }, PawnPiece)
      .placePiece(Color.WHITE, { row: 3, column: 4 }, PawnPiece)
      .placePiece(Color.WHITE, { row: 7, column: 0 }, KingPiece)
      .placePiece(Color.BLACK, { row: 7, column: 7 }, KingPiece)

    const validMoves = board.generateMovesForPiece({ row: 4, column: 5 })

    const expected: MoveInformation[] = [
      { isCapture: true, start: { row: 4, column: 5 }, end: { row: 3, column: 4 } },
      { isCapture: false, start: { row: 4, column: 5 }, end: { row: 3, column: 5 } },
      { isCapture: true, start: { row: 4, column: 5 }, end: { row: 3, column: 6 } }
    ]
    expect(validMoves).toEqual(expected)
  })

  it('Test pawn capture on first move', () => {
    const board = new ChessBoard({
      pieceArrangement: PieceArrangement.EMPTY,
      firstPlayer: Color.BLACK
    })
    board
      .placePiece(Color.BLACK, { row: 6, column: 5 }, PawnPiece)
      .placePiece(Color.WHITE, { row: 5, column: 6 }, PawnPiece)
      .placePiece(Color.WHITE, { row: 5, column: 4 }, PawnPiece)
      .placePiece(Color.WHITE, { row: 7, column: 0 }, KingPiece)
      .placePiece(Color.BLACK, { row: 7, column: 7 }, KingPiece)

    const validMoves = board.generateMovesForPiece({ row: 6, column: 5 })

    const expected: MoveInformation[] = [
      { isCapture: false, start: { row: 6, column: 5 }, end: { row: 4, column: 5 } },
      { isCapture: true, start: { row: 6, column: 5 }, end: { row: 5, column: 4 } },
      { isCapture: false, start: { row: 6, column: 5 }, end: { row: 5, column: 5 } },
      { isCapture: true, start: { row: 6, column: 5 }, end: { row: 5, column: 6 } }
    ]
    expect(validMoves).toEqual(expected)
  })
})

describe('Bishop tests', () => {
  it('Bishop range test', () => {
    const board = new ChessBoard({
      pieceArrangement: PieceArrangement.EMPTY,
      firstPlayer: Color.WHITE
    })
    board
      .placePiece(Color.WHITE, { row: 4, column: 4 }, BishopPiece)
      .placePiece(Color.WHITE, { row: 6, column: 2 }, KingPiece)
      .placePiece(Color.BLACK, { row: 6, column: 5 }, KingPiece)

    const validMoves = board.generateMovesForPiece({ row: 4, column: 4 })
    const expected: MoveInformation[] = [
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 0, column: 0 } },
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 1, column: 1 } },
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 1, column: 7 } },
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 2, column: 2 } },
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 2, column: 6 } },
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 3, column: 3 } },
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 3, column: 5 } },
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 5, column: 3 } },
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 5, column: 5 } },
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 6, column: 6 } },
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 7, column: 7 } }
    ]
    expect(validMoves).toEqual(expected)
  })

  it('Bishop capture test', () => {
    const board = new ChessBoard({
      pieceArrangement: PieceArrangement.EMPTY,
      firstPlayer: Color.WHITE
    })
    board
      .placePiece(Color.WHITE, { row: 4, column: 4 }, BishopPiece)
      .placePiece(Color.WHITE, { row: 6, column: 2 }, KingPiece)
      .placePiece(Color.BLACK, { row: 6, column: 5 }, KingPiece)
      .placePiece(Color.BLACK, { row: 5, column: 3 }, PawnPiece)

    const validMoves = board.generateMovesForPiece({ row: 4, column: 4 })
    const expected: MoveInformation[] = [
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 0, column: 0 } },
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 1, column: 1 } },
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 1, column: 7 } },
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 2, column: 2 } },
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 2, column: 6 } },
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 3, column: 3 } },
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 3, column: 5 } },
      { isCapture: true, start: { row: 4, column: 4 }, end: { row: 5, column: 3 } },
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 5, column: 5 } },
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 6, column: 6 } },
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 7, column: 7 } }
    ]
    expect(validMoves).toEqual(expected)
  })
})

describe('Rook test', () => {
  it('Rook range test', () => {
    const board = new ChessBoard({
      pieceArrangement: PieceArrangement.EMPTY,
      firstPlayer: Color.WHITE
    })

    board
      .placePiece(Color.WHITE, { row: 4, column: 4 }, RookPiece)
      .placePiece(Color.WHITE, { row: 7, column: 0 }, KingPiece)
      .placePiece(Color.BLACK, { row: 7, column: 7 }, KingPiece)

    const validMoves = board.generateMovesForPiece({ row: 4, column: 4 })
    const expected: MoveInformation[] = [
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 0, column: 4 } },
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 1, column: 4 } },
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 2, column: 4 } },
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 3, column: 4 } },
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 4, column: 0 } },
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 4, column: 1 } },
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 4, column: 2 } },
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 4, column: 3 } },
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 4, column: 5 } },
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 4, column: 6 } },
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 4, column: 7 } },
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 5, column: 4 } },
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 6, column: 4 } },
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 7, column: 4 } }
    ]
    expect(validMoves).toEqual(expected)
  })

  it('Rook capture test', () => {
    const board = new ChessBoard({
      pieceArrangement: PieceArrangement.EMPTY,
      firstPlayer: Color.WHITE
    })

    board
      .placePiece(Color.WHITE, { row: 4, column: 4 }, RookPiece)
      .placePiece(Color.WHITE, { row: 7, column: 0 }, KingPiece)
      .placePiece(Color.BLACK, { row: 7, column: 7 }, KingPiece)
      .placePiece(Color.BLACK, { row: 6, column: 4 }, BishopPiece)

    const validMoves = board.generateMovesForPiece({ row: 4, column: 4 })
    const expected: MoveInformation[] = [
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 0, column: 4 } },
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 1, column: 4 } },
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 2, column: 4 } },
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 3, column: 4 } },
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 4, column: 0 } },
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 4, column: 1 } },
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 4, column: 2 } },
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 4, column: 3 } },
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 4, column: 5 } },
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 4, column: 6 } },
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 4, column: 7 } },
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 5, column: 4 } },
      { isCapture: true, start: { row: 4, column: 4 }, end: { row: 6, column: 4 } }
    ]
    expect(validMoves).toEqual(expected)
  })

  it('Rook discovery check move test', () => {
    const board = new ChessBoard({
      pieceArrangement: PieceArrangement.EMPTY,
      firstPlayer: Color.WHITE
    })

    board
      .placePiece(Color.WHITE, { row: 4, column: 4 }, RookPiece)
      .placePiece(Color.WHITE, { row: 3, column: 4 }, KingPiece)
      .placePiece(Color.BLACK, { row: 7, column: 7 }, KingPiece)
      .placePiece(Color.BLACK, { row: 6, column: 4 }, RookPiece)

    const validMoves = board.generateMovesForPiece({ row: 4, column: 4 })
    const expected: MoveInformation[] = [
      { isCapture: false, start: { row: 4, column: 4 }, end: { row: 5, column: 4 } },
      { isCapture: true, start: { row: 4, column: 4 }, end: { row: 6, column: 4 } }
    ]
    expect(validMoves).toEqual(expected)
  })
})

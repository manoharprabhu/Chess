import BishopPiece from '../src/BishopPiece'
import ChessBoard, { PieceArrangement } from '../src/ChessBoard'
import { Color, MoveInformation } from '../src/ChessPiece'
import KingPiece from '../src/KingPiece'
import KnightPiece from '../src/KnightPiece'
import PawnPiece from '../src/PawnPiece'
import QueenPiece from '../src/QueenPiece'
import RookPiece from '../src/RookPiece'

describe('Board tests', () => {
  it('Get current player', () => {
    const board = new ChessBoard({
      pieceArrangement: PieceArrangement.EMPTY,
      firstPlayer: Color.WHITE
    })
    expect(board.getCurrentPlayer()).toEqual(Color.WHITE)

    const board2 = new ChessBoard({
      pieceArrangement: PieceArrangement.EMPTY,
      firstPlayer: Color.BLACK
    })
    expect(board2.getCurrentPlayer()).toEqual(Color.BLACK)
  })

  it('Place piece at occupied location', () => {
    const board = new ChessBoard({
      pieceArrangement: PieceArrangement.EMPTY,
      firstPlayer: Color.WHITE
    })
    expect(() => {
      board
        .placePiece(Color.WHITE, { row: 5, column: 4 }, BishopPiece)
        .placePiece(Color.BLACK, { row: 5, column: 4 }, PawnPiece)
    }).toThrowError(Error)
  })

  it('Generate move for non existant piece', () => {
    const board = new ChessBoard({
      pieceArrangement: PieceArrangement.EMPTY,
      firstPlayer: Color.WHITE
    })
    expect(() => {
      board.generateMovesForPiece({ row: 3, column: 5 })
    }).toThrowError(Error)
  })

  it('Move piece out of turn', () => {
    const board = new ChessBoard({
      pieceArrangement: PieceArrangement.EMPTY,
      firstPlayer: Color.WHITE
    })
    board
      .placePiece(Color.WHITE, { row: 7, column: 0 }, KingPiece)
      .placePiece(Color.BLACK, { row: 7, column: 7 }, KingPiece)

    expect(() => {
      board.generateMovesForPiece({ row: 7, column: 7 })
    }).toThrowError(Error)
  })

  it('Initialize default', () => {
    const board = new ChessBoard({
      pieceArrangement: PieceArrangement.DEFAULT
    })
    expect(board.getCurrentPlayer()).toEqual(Color.WHITE)

    expect(board.getPieceAtPosition({ row: 0, column: 0 })).toBeInstanceOf(RookPiece)
    expect(board.getPieceAtPosition({ row: 0, column: 1 })).toBeInstanceOf(KnightPiece)
    expect(board.getPieceAtPosition({ row: 0, column: 2 })).toBeInstanceOf(BishopPiece)
    expect(board.getPieceAtPosition({ row: 0, column: 3 })).toBeInstanceOf(QueenPiece)
    expect(board.getPieceAtPosition({ row: 0, column: 4 })).toBeInstanceOf(KingPiece)
    expect(board.getPieceAtPosition({ row: 0, column: 5 })).toBeInstanceOf(BishopPiece)
    expect(board.getPieceAtPosition({ row: 0, column: 6 })).toBeInstanceOf(KnightPiece)
    expect(board.getPieceAtPosition({ row: 0, column: 7 })).toBeInstanceOf(RookPiece)
    expect(board.getPieceAtPosition({ row: 1, column: 0 })).toBeInstanceOf(PawnPiece)
    expect(board.getPieceAtPosition({ row: 1, column: 1 })).toBeInstanceOf(PawnPiece)
    expect(board.getPieceAtPosition({ row: 1, column: 2 })).toBeInstanceOf(PawnPiece)
    expect(board.getPieceAtPosition({ row: 1, column: 3 })).toBeInstanceOf(PawnPiece)
    expect(board.getPieceAtPosition({ row: 1, column: 4 })).toBeInstanceOf(PawnPiece)
    expect(board.getPieceAtPosition({ row: 1, column: 5 })).toBeInstanceOf(PawnPiece)
    expect(board.getPieceAtPosition({ row: 1, column: 6 })).toBeInstanceOf(PawnPiece)
    expect(board.getPieceAtPosition({ row: 1, column: 7 })).toBeInstanceOf(PawnPiece)

    expect(board.getPieceAtPosition({ row: 7, column: 0 })).toBeInstanceOf(RookPiece)
    expect(board.getPieceAtPosition({ row: 7, column: 1 })).toBeInstanceOf(KnightPiece)
    expect(board.getPieceAtPosition({ row: 7, column: 2 })).toBeInstanceOf(BishopPiece)
    expect(board.getPieceAtPosition({ row: 7, column: 3 })).toBeInstanceOf(QueenPiece)
    expect(board.getPieceAtPosition({ row: 7, column: 4 })).toBeInstanceOf(KingPiece)
    expect(board.getPieceAtPosition({ row: 7, column: 5 })).toBeInstanceOf(BishopPiece)
    expect(board.getPieceAtPosition({ row: 7, column: 6 })).toBeInstanceOf(KnightPiece)
    expect(board.getPieceAtPosition({ row: 7, column: 7 })).toBeInstanceOf(RookPiece)
    expect(board.getPieceAtPosition({ row: 6, column: 0 })).toBeInstanceOf(PawnPiece)
    expect(board.getPieceAtPosition({ row: 6, column: 1 })).toBeInstanceOf(PawnPiece)
    expect(board.getPieceAtPosition({ row: 6, column: 2 })).toBeInstanceOf(PawnPiece)
    expect(board.getPieceAtPosition({ row: 6, column: 3 })).toBeInstanceOf(PawnPiece)
    expect(board.getPieceAtPosition({ row: 6, column: 4 })).toBeInstanceOf(PawnPiece)
    expect(board.getPieceAtPosition({ row: 6, column: 5 })).toBeInstanceOf(PawnPiece)
    expect(board.getPieceAtPosition({ row: 6, column: 6 })).toBeInstanceOf(PawnPiece)
    expect(board.getPieceAtPosition({ row: 6, column: 7 })).toBeInstanceOf(PawnPiece)
  })
})

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

  it('Test pawn capture with discovery check', () => {
    const board = new ChessBoard({
      pieceArrangement: PieceArrangement.EMPTY,
      firstPlayer: Color.WHITE
    })
    board
      .placePiece(Color.BLACK, { row: 7, column: 0 }, KingPiece)
      .placePiece(Color.BLACK, { row: 7, column: 4 }, RookPiece)
      .placePiece(Color.BLACK, { row: 2, column: 5 }, PawnPiece)
      .placePiece(Color.WHITE, { row: 1, column: 4 }, PawnPiece)
      .placePiece(Color.WHITE, { row: 0, column: 4 }, KingPiece)

    const validMoves = board.generateMovesForPiece({ row: 1, column: 4 })

    const expected: MoveInformation[] = [
      { isCapture: false, start: { row: 1, column: 4 }, end: { row: 2, column: 4 } },
      { isCapture: false, start: { row: 1, column: 4 }, end: { row: 3, column: 4 } }
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

describe('King test', () => {
  it('King range test', () => {
    const board = new ChessBoard({
      pieceArrangement: PieceArrangement.EMPTY,
      firstPlayer: Color.WHITE
    })
    board
      .placePiece(Color.BLACK, { row: 2, column: 2 }, KingPiece)
      .placePiece(Color.WHITE, { row: 2, column: 5 }, KingPiece)

    const validMoves = board.generateMovesForPiece({ row: 2, column: 5 })
    const expected: MoveInformation[] = [
      { isCapture: false, start: { row: 2, column: 5 }, end: { row: 1, column: 4 } },
      { isCapture: false, start: { row: 2, column: 5 }, end: { row: 1, column: 5 } },
      { isCapture: false, start: { row: 2, column: 5 }, end: { row: 1, column: 6 } },
      { isCapture: false, start: { row: 2, column: 5 }, end: { row: 2, column: 4 } },
      { isCapture: false, start: { row: 2, column: 5 }, end: { row: 2, column: 6 } },
      { isCapture: false, start: { row: 2, column: 5 }, end: { row: 3, column: 4 } },
      { isCapture: false, start: { row: 2, column: 5 }, end: { row: 3, column: 5 } },
      { isCapture: false, start: { row: 2, column: 5 }, end: { row: 3, column: 6 } }
    ]
    expect(validMoves).toEqual(expected)
  })
  it('King restricted range test', () => {
    const board = new ChessBoard({
      pieceArrangement: PieceArrangement.EMPTY,
      firstPlayer: Color.WHITE
    })
    board
      .placePiece(Color.BLACK, { row: 6, column: 2 }, KingPiece)
      .placePiece(Color.WHITE, { row: 7, column: 0 }, KingPiece)

    const validMoves = board.generateMovesForPiece({ row: 7, column: 0 })
    const expected: MoveInformation[] = [
      { isCapture: false, start: { row: 7, column: 0 }, end: { row: 6, column: 0 } }
    ]
    expect(validMoves).toEqual(expected)
  })

  it('King capture test', () => {
    const board = new ChessBoard({
      pieceArrangement: PieceArrangement.EMPTY,
      firstPlayer: Color.WHITE
    })
    board
      .placePiece(Color.BLACK, { row: 6, column: 2 }, KingPiece)
      .placePiece(Color.WHITE, { row: 7, column: 0 }, KingPiece)
      .placePiece(Color.BLACK, { row: 6, column: 0 }, PawnPiece)

    const validMoves = board.generateMovesForPiece({ row: 7, column: 0 })
    const expected: MoveInformation[] = [
      { isCapture: true, start: { row: 7, column: 0 }, end: { row: 6, column: 0 } }
    ]
    expect(validMoves).toEqual(expected)
  })

  it('King no moves test', () => {
    const board = new ChessBoard({
      pieceArrangement: PieceArrangement.EMPTY,
      firstPlayer: Color.WHITE
    })
    board
      .placePiece(Color.BLACK, { row: 6, column: 2 }, KingPiece)
      .placePiece(Color.WHITE, { row: 7, column: 0 }, KingPiece)
      .placePiece(Color.WHITE, { row: 6, column: 0 }, PawnPiece)

    const validMoves = board.generateMovesForPiece({ row: 7, column: 0 })
    const expected: MoveInformation[] = []
    expect(validMoves).toEqual(expected)
  })
})

describe('Knight test', () => {
  it('Knight range test', () => {
    const board = new ChessBoard({
      pieceArrangement: PieceArrangement.EMPTY,
      firstPlayer: Color.WHITE
    })
    board
      .placePiece(Color.WHITE, { row: 3, column: 4 }, KnightPiece)
      .placePiece(Color.WHITE, { row: 7, column: 0 }, KingPiece)
      .placePiece(Color.BLACK, { row: 7, column: 7 }, KingPiece)

    const validMoves = board.generateMovesForPiece({ row: 3, column: 4 })
    const expected: MoveInformation[] = [
      { isCapture: false, start: { row: 3, column: 4 }, end: { row: 1, column: 3 } },
      { isCapture: false, start: { row: 3, column: 4 }, end: { row: 1, column: 5 } },
      { isCapture: false, start: { row: 3, column: 4 }, end: { row: 2, column: 2 } },
      { isCapture: false, start: { row: 3, column: 4 }, end: { row: 2, column: 6 } },
      { isCapture: false, start: { row: 3, column: 4 }, end: { row: 4, column: 2 } },
      { isCapture: false, start: { row: 3, column: 4 }, end: { row: 4, column: 6 } },
      { isCapture: false, start: { row: 3, column: 4 }, end: { row: 5, column: 3 } },
      { isCapture: false, start: { row: 3, column: 4 }, end: { row: 5, column: 5 } }
    ]
    expect(validMoves).toEqual(expected)
  })
  it('Knight capture and block test', () => {
    const board = new ChessBoard({
      pieceArrangement: PieceArrangement.EMPTY,
      firstPlayer: Color.WHITE
    })
    board
      .placePiece(Color.WHITE, { row: 1, column: 6 }, KnightPiece)
      .placePiece(Color.WHITE, { row: 7, column: 0 }, KingPiece)
      .placePiece(Color.BLACK, { row: 7, column: 7 }, KingPiece)
      .placePiece(Color.BLACK, { row: 3, column: 7 }, RookPiece)
      .placePiece(Color.WHITE, { row: 2, column: 4 }, KnightPiece)

    const validMoves = board.generateMovesForPiece({ row: 1, column: 6 })
    const expected: MoveInformation[] = [
      { isCapture: false, start: { row: 1, column: 6 }, end: { row: 0, column: 4 } },
      { isCapture: false, start: { row: 1, column: 6 }, end: { row: 3, column: 5 } },
      { isCapture: true, start: { row: 1, column: 6 }, end: { row: 3, column: 7 } }
    ]
    expect(validMoves).toEqual(expected)
  })
})

describe('Queen test', () => {
  it('Queen range test', () => {
    const board = new ChessBoard({
      pieceArrangement: PieceArrangement.EMPTY,
      firstPlayer: Color.WHITE
    })
    board
      .placePiece(Color.WHITE, { row: 4, column: 6 }, QueenPiece)
      .placePiece(Color.WHITE, { row: 7, column: 0 }, KingPiece)
      .placePiece(Color.BLACK, { row: 7, column: 7 }, KingPiece)
      .placePiece(Color.WHITE, { row: 4, column: 5 }, PawnPiece)
      .placePiece(Color.WHITE, { row: 5, column: 5 }, PawnPiece)
      .placePiece(Color.WHITE, { row: 5, column: 6 }, PawnPiece)
      .placePiece(Color.BLACK, { row: 4, column: 7 }, PawnPiece)

    const validMoves = board.generateMovesForPiece({ row: 4, column: 6 })
    const expected: MoveInformation[] = [
      { isCapture: false, start: { row: 4, column: 6 }, end: { row: 0, column: 2 } },
      { isCapture: false, start: { row: 4, column: 6 }, end: { row: 0, column: 6 } },
      { isCapture: false, start: { row: 4, column: 6 }, end: { row: 1, column: 3 } },
      { isCapture: false, start: { row: 4, column: 6 }, end: { row: 1, column: 6 } },
      { isCapture: false, start: { row: 4, column: 6 }, end: { row: 2, column: 4 } },
      { isCapture: false, start: { row: 4, column: 6 }, end: { row: 2, column: 6 } },
      { isCapture: false, start: { row: 4, column: 6 }, end: { row: 3, column: 5 } },
      { isCapture: false, start: { row: 4, column: 6 }, end: { row: 3, column: 6 } },
      { isCapture: false, start: { row: 4, column: 6 }, end: { row: 3, column: 7 } },
      { isCapture: true, start: { row: 4, column: 6 }, end: { row: 4, column: 7 } },
      { isCapture: false, start: { row: 4, column: 6 }, end: { row: 5, column: 7 } }
    ]
    expect(validMoves).toEqual(expected)
  })
})

describe('FEN test', () => {
  it('No fen', () => {
    expect(() => {
      const board = new ChessBoard({ pieceArrangement: PieceArrangement.WITHFEN })
    }).toThrowError()
  })

  it('Invalid fen', () => {
    expect(() => {
      const board = new ChessBoard({
        pieceArrangement: PieceArrangement.WITHFEN,
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'
      })
    }).toThrowError()
  })

  it('Check default fen', () => {
    const board = new ChessBoard({
      pieceArrangement: PieceArrangement.WITHFEN,
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    })
    expect(board.getPieceAtPosition({ row: 0, column: 0 })).toBeInstanceOf(RookPiece)
    expect(board.getPieceAtPosition({ row: 0, column: 1 })).toBeInstanceOf(KnightPiece)
    expect(board.getPieceAtPosition({ row: 0, column: 2 })).toBeInstanceOf(BishopPiece)
    expect(board.getPieceAtPosition({ row: 0, column: 3 })).toBeInstanceOf(QueenPiece)
    expect(board.getPieceAtPosition({ row: 0, column: 4 })).toBeInstanceOf(KingPiece)
    expect(board.getPieceAtPosition({ row: 0, column: 5 })).toBeInstanceOf(BishopPiece)
    expect(board.getPieceAtPosition({ row: 0, column: 6 })).toBeInstanceOf(KnightPiece)
    expect(board.getPieceAtPosition({ row: 0, column: 7 })).toBeInstanceOf(RookPiece)
    expect(board.getPieceAtPosition({ row: 1, column: 0 })).toBeInstanceOf(PawnPiece)
    expect(board.getPieceAtPosition({ row: 1, column: 1 })).toBeInstanceOf(PawnPiece)
    expect(board.getPieceAtPosition({ row: 1, column: 2 })).toBeInstanceOf(PawnPiece)
    expect(board.getPieceAtPosition({ row: 1, column: 3 })).toBeInstanceOf(PawnPiece)
    expect(board.getPieceAtPosition({ row: 1, column: 4 })).toBeInstanceOf(PawnPiece)
    expect(board.getPieceAtPosition({ row: 1, column: 5 })).toBeInstanceOf(PawnPiece)
    expect(board.getPieceAtPosition({ row: 1, column: 6 })).toBeInstanceOf(PawnPiece)
    expect(board.getPieceAtPosition({ row: 1, column: 7 })).toBeInstanceOf(PawnPiece)

    expect(board.getPieceAtPosition({ row: 7, column: 0 })).toBeInstanceOf(RookPiece)
    expect(board.getPieceAtPosition({ row: 7, column: 1 })).toBeInstanceOf(KnightPiece)
    expect(board.getPieceAtPosition({ row: 7, column: 2 })).toBeInstanceOf(BishopPiece)
    expect(board.getPieceAtPosition({ row: 7, column: 3 })).toBeInstanceOf(QueenPiece)
    expect(board.getPieceAtPosition({ row: 7, column: 4 })).toBeInstanceOf(KingPiece)
    expect(board.getPieceAtPosition({ row: 7, column: 5 })).toBeInstanceOf(BishopPiece)
    expect(board.getPieceAtPosition({ row: 7, column: 6 })).toBeInstanceOf(KnightPiece)
    expect(board.getPieceAtPosition({ row: 7, column: 7 })).toBeInstanceOf(RookPiece)
    expect(board.getPieceAtPosition({ row: 6, column: 0 })).toBeInstanceOf(PawnPiece)
    expect(board.getPieceAtPosition({ row: 6, column: 1 })).toBeInstanceOf(PawnPiece)
    expect(board.getPieceAtPosition({ row: 6, column: 2 })).toBeInstanceOf(PawnPiece)
    expect(board.getPieceAtPosition({ row: 6, column: 3 })).toBeInstanceOf(PawnPiece)
    expect(board.getPieceAtPosition({ row: 6, column: 4 })).toBeInstanceOf(PawnPiece)
    expect(board.getPieceAtPosition({ row: 6, column: 5 })).toBeInstanceOf(PawnPiece)
    expect(board.getPieceAtPosition({ row: 6, column: 6 })).toBeInstanceOf(PawnPiece)
    expect(board.getPieceAtPosition({ row: 6, column: 7 })).toBeInstanceOf(PawnPiece)

    expect(board.getPieceAtPosition({ row: 0, column: 0 })!.getColor()).toEqual(Color.WHITE)
    expect(board.getPieceAtPosition({ row: 7, column: 0 })!.getColor()).toEqual(Color.BLACK)
  })

  it('Check fen', () => {
    const board = new ChessBoard({
      pieceArrangement: PieceArrangement.WITHFEN,
      fen: '8/8/8/8/8/8/8/3QK3 w KQkq - 0 1'
    })
    expect(board.getPieceAtPosition({ row: 0, column: 3 })).toBeInstanceOf(QueenPiece)
    expect(board.getPieceAtPosition({ row: 0, column: 4 })).toBeInstanceOf(KingPiece)
    expect(board.getPieceAtPosition({ row: 5, column: 5 })).toBeNull()
  })
})

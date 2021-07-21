import ChessBoard, { Configuration, PieceArrangement } from '../src/ChessBoard'
import { Color, MoveInformation } from '../src/ChessPiece'
import KingPiece from '../src/KingPiece'
import PawnPiece from '../src/PawnPiece'

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
      { isCapture: false, start: { row: 3, column: 5 }, end: { row: 4, column: 5 } },
      { isCapture: true, start: { row: 3, column: 5 }, end: { row: 4, column: 4 } },
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
      { isCapture: false, start: { row: 1, column: 5 }, end: { row: 2, column: 5 } },
      { isCapture: false, start: { row: 1, column: 5 }, end: { row: 3, column: 5 } },
      { isCapture: true, start: { row: 1, column: 5 }, end: { row: 2, column: 4 } },
      { isCapture: true, start: { row: 1, column: 5 }, end: { row: 2, column: 6 } }
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
      { isCapture: false, start: { row: 6, column: 5 }, end: { row: 5, column: 5 } },
      { isCapture: false, start: { row: 6, column: 5 }, end: { row: 4, column: 5 } }
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
      { isCapture: false, start: { row: 4, column: 5 }, end: { row: 3, column: 5 } },
      { isCapture: true, start: { row: 4, column: 5 }, end: { row: 3, column: 4 } },
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
      { isCapture: false, start: { row: 6, column: 5 }, end: { row: 5, column: 5 } },
      { isCapture: false, start: { row: 6, column: 5 }, end: { row: 4, column: 5 } },
      { isCapture: true, start: { row: 6, column: 5 }, end: { row: 5, column: 4 } },
      { isCapture: true, start: { row: 6, column: 5 }, end: { row: 5, column: 6 } }
    ]
    expect(validMoves).toEqual(expected)
  })
})

// describe('Bishop tests', () => {
//   it("Bishop range test", () => {
//     const board = new ChessBoard({ pieceArrangement: PieceArrangement.EMPTY })
//     board.placePiece(Color.WHITE, { row: 4, column: 4 }, BishopPiece)

//     const bishop = board.getPieceAtPosition({ row: 4, column: 4 })
//     if (bishop === null) {
//       fail('bishop not found')
//     }

//     const validMoves = bishop.generateValidMovePositions()
//     const expected: MoveInformation[] = [
//       { isCapture: false, start: { row: 6, column: 5 }, end: { row: 5, column: 5 } },
//       { isCapture: false, start: { row: 6, column: 5 }, end: { row: 4, column: 5 } },
//       { isCapture: true, start: { row: 6, column: 5 }, end: { row: 5, column: 4 } },
//       { isCapture: true, start: { row: 6, column: 5 }, end: { row: 5, column: 6 } }
//     ]
//     expect(validMoves).toEqual(expected)

//   })
// })

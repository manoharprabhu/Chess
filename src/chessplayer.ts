// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
export class ChessPlayer {
  private _eventDetails: ChessEventDetails

  public get eventDetails(): ChessEventDetails {
    return { ...this._eventDetails }
  }

  private constructor(eventDetails: ChessEventDetails) {
    this._eventDetails = eventDetails
  }
}

export class ChessPlayerBuilder {
  private eventDetails: ChessEventDetails
  constructor() {
    this.eventDetails = {}
  }
  public event(event: String): ChessPlayerBuilder {
    this.eventDetails.event = event
    return this
  }
  public site(site: String): ChessPlayerBuilder {
    this.eventDetails.site = site
    return this
  }
  public date(date: number): ChessPlayerBuilder {
    this.eventDetails.date = date
    return this
  }
  public white(name: String): ChessPlayerBuilder {
    this.eventDetails.white = name
    return this
  }
  public black(name: String): ChessPlayerBuilder {
    this.eventDetails.black = name
    return this
  }
  public result(result: String): ChessPlayerBuilder {
    this.eventDetails.result = result
    return this
  }
  public whiteElo(elo: number): ChessPlayerBuilder {
    this.eventDetails.whiteElo = elo
    return this
  }
  public blackElo(elo: number): ChessPlayerBuilder {
    this.eventDetails.blackElo = elo
    return this
  }
  public timeControl(control: String): ChessPlayerBuilder {
    this.eventDetails.timeControl = control
    return this
  }
  public termination(termination: String): ChessPlayerBuilder {
    this.eventDetails.termination = termination
    return this
  }

  public setDefaultBoardConfiguration(): ChessPlayerBuilder {
    return this
  }
}

interface ChessEventDetails {
  event?: String
  site?: String
  date?: number
  white?: String
  black?: String
  result?: String
  whiteElo?: number
  blackElo?: number
  timeControl?: String
  termination?: String
}

export interface T {
  name: string
}

export interface Context {
  transports: { [_:string]: T }
  codes: string[]
  current: null | string
}

export interface ContextEmpty extends Context {
  transports: {}
  codes: []
  current: null
}

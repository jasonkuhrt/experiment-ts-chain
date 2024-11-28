interface T {
  name: string
}

interface Context {
  transports: { [_:string]: T }
  current: null | string
}

export interface ContextEmpty extends Context {
  transports: {}
  current: null
}

// Approach 1: mapped type + conditional type
// interface Chain<
//   out $C extends Context,
// > {
//   _: $C
//   set:  <
//     const name extends $C['transports'][keyof $C['transports']]['name'],
//   > (name: name) => Chain<{
//     [_ in keyof $C]:
//       _ extends 'current'
//         ? name
//         : $C[_]
//     }>
//   addAndSetIfFirst: <
//     t extends T,
//   > (t: t) => Chain<{
//       [_ in keyof $C]:
//         _ extends 'current'    ? ($C['current'] extends string ? $C['current'] : t['name']) :
//         _ extends 'transports' ? { [_ in t['name']]: t } & $C['transports'] :
//         $C[_]
//     }>
// }

// Approach 2: explicit recreate
// interface Chain<
//   out $C extends Context,
// > {
//   _: $C
//   set: <
//     const name extends $C['transports'][keyof $C['transports']]['name'],
//   > (name: name) => Chain<{
//       current: name,
//       transports: $C['transports'],
//     }>
//   addAndSetIfFirst: <
//     t extends T,
//   > (t: t) => Chain<{
//       current:    ($C['current'] extends string ? $C['current'] : t['name'])
//       transports: { [_ in t['name']]: t } & $C['transports']
//     }>
// }

// Approach 3: explicit recreate + type parameter
// interface Chain<
//   out $C extends Context,
// > {
//   _: $C
//   set: <
//     const name extends $C['transports'][keyof $C['transports']]['name'],
//     c extends Context = {
//       current: name,
//       transports: $C['transports'],
//     }
//   > (name: name) => Chain<c>
//   addAndSetIfFirst: <
//     t extends T,
//     c extends Context = {
//       current:    ($C['current'] extends string ? $C['current'] : t['name'])
//       transports: { [_ in t['name']]: t } & $C['transports']
//     }
//   > (t: t) => Chain<c>
// }

// Approach 4: #3 with extensibility
export interface Chain<
  out $C extends Context,
> {
  _: $C
  set: <
    const name extends $C['transports'][keyof $C['transports']]['name'],
    c extends Context = {
      current: name,
      transports: $C['transports'],
    }
  > (name: name) => Chain<c>
  addAndSetIfFirst: <
    t extends T,
    c extends Context = {
      current:    ($C['current'] extends string ? $C['current'] : t['name'])
      transports: { [_ in t['name']]: t } & $C['transports']
    }
  > (t: t) => Chain<c>
}

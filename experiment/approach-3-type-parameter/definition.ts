// Approach 3: explicit recreate + type parameter

import { Context, ContextEmpty, T } from "../lib/context.js"


interface Chain<
  out $C extends Context,
> {
  _: $C
  set: <
    const name extends $C['transports'][keyof $C['transports']]['name'],
    c extends Context = {
      current: name,
      codes: $C['codes'],
      transports: $C['transports'],
    }
  > (name: name) => Chain<c>
  addAndSetIfFirst: <
    t extends T,
    c extends Context = {
      current:    ($C['current'] extends string ? $C['current'] : t['name'])
      codes: $C['codes'],
      transports: { [_ in t['name']]: t } & $C['transports']
    }
  > (t: t) => Chain<c>
}


export declare const chain: Chain<ContextEmpty>

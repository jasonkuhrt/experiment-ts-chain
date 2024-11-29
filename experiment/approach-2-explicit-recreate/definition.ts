// Approach 2: explicit recreate

import { Context, ContextEmpty, T } from "../lib/context.js"

interface Chain<
  out $C extends Context,
> {
  _: $C
  set: <
    const name extends $C['transports'][keyof $C['transports']]['name'],
  > (name: name) => Chain<{
      current: name,
      transports: $C['transports'],
    }>
  addAndSetIfFirst: <
    t extends T,
  > (t: t) => Chain<{
      current:    ($C['current'] extends string ? $C['current'] : t['name'])
      transports: { [_ in t['name']]: t } & $C['transports']
    }>
}

export declare const chain: Chain<ContextEmpty>

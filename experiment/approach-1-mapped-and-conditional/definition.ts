// Approach 1: mapped type + conditional type

import { Context, ContextEmpty, T } from "../lib/context.js"

interface Chain<
  out $C extends Context,
> {
  _: $C
  set:  <
    const name extends $C['transports'][keyof $C['transports']]['name'],
  > (name: name) => Chain<{
    [_ in keyof $C]:
      _ extends 'current'
        ? name
        : $C[_]
    }>
  addAndSetIfFirst: <
    t extends T,
  > (t: t) => Chain<{
      [_ in keyof $C]:
        _ extends 'current'    ? ($C['current'] extends string ? $C['current'] : t['name']) :
        _ extends 'transports' ? { [_ in t['name']]: t } & $C['transports'] :
        $C[_]
    }>
}

export declare const chain: Chain<ContextEmpty>

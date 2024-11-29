import { Context } from "../lib/context.js"
import { Chain, chain, ExtensionChainable } from "./definition.js"


interface m1 extends ExtensionChainable {
  name: 'm1'
  return: <const code extends string>(code:code) => Chain<
    // @ts-expect-error
    AddCode<this['parameters'][0], code>,
    // @ts-expect-error
    this['parameters'][1],
    // @ts-expect-error
    this['parameters'][2]
  >
}
type AddCode<$C extends Context, $code extends string> = {
  [k in keyof $C]:
    k extends 'codes' ? [$code, ...$C[k]] : $C[k]
}

interface m2 extends ExtensionChainable {
  name: 'm2'
  // @ts-expect-error
  return: () => Chain<this['parameters'][0], this['parameters'][1], this['parameters'][2]>
}

const c = chain
  .extendWithPropertiesChainable<m1>()
  .m1('a')
  .extendWithPropertiesChainable<m2>()
  .m2()
  .m1('b')
  .m2()
  .m1('c')
  .m2()
  .m1('d')
  .m2()
  .m1('e')
  .m2()
  .m1('f')
  .m2()
  .m1('g')
  .m2()
  .m1('h')
  .m2()
  .m1('i')
  .m2()
  .m1('j')
  .m2()
  .m1('k')
  .m2()
  .m1('l')
  .m2()
  .m1('m')
  .m2()
  .m1('n')
  .m2()
  .m1('o')
  .m2()
  .m1('p')
  .m2()
  .m1('q')
  .m2()
  .m1('r')
  .m2()
  .m1('s')
  .m2()
  .m1('t')
  .m2()
  .m1('u')
  .m2()
  .m1('v')
  .m2()
  .m1('w')
  .m2()
  .m1('x')
  .m2()
  .m1('y')
  .m2()
  .m1('z')
  .m2()
  .m1('aa')
  .m2()
  .m1('bb')
  .m2()

type c = typeof c
c._context.codes

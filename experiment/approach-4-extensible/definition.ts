// Approach 4: #3 with extensibility

import { Context, T, ContextEmpty } from "../lib/context.js"
import { TypeFunction, Apply } from "../lib/type-function.js"

type ExtensionChainableRegistry = Record<string, ExtensionChainable>

export type Chain<
  $Context extends Context,
  $Extension extends object,
	$ExtensionChainable extends ExtensionChainableRegistry,
> =
	& ChainBase<$Context, $Extension, $ExtensionChainable>
	& $Extension
	& {
			[k in keyof $ExtensionChainable]: Apply<$ExtensionChainable[k], [$Context, $Extension, $ExtensionChainable]>
		}

export interface ChainBase<
  out $Context extends Context,
	out $Extension extends object,
	out $ExtensionChainable extends Record<string, ExtensionChainable>,
> {
  _context: $Context
  _extension: $Extension
  _extensionChainable: $ExtensionChainable
	extendWithPropertiesChainable: <
    extensionChainable extends ExtensionChainable,
  > () =>
    Chain<$Context, $Extension,   $ExtensionChainable & { [_ in extensionChainable['name']]: extensionChainable }>
  extendWithProperties: <
    extension extends {}
  > (extension: extension) => Chain<$Context, $Extension & extension, $ExtensionChainable>
  set: <
    const name extends $Context['transports'][keyof $Context['transports']]['name'],
    c extends Context = {
      current: name,
      transports: $Context['transports'],
      codes: $Context['codes'],
    }
  > (name: name) => Chain<c, $Extension, $ExtensionChainable>
  addAndSetIfFirst: <
    t extends T,
    c extends Context = {
      current:    ($Context['current'] extends string ? $Context['current'] : t['name'])
      transports: { [_ in t['name']]: t } & $Context['transports']
      codes: $Context['codes'],
    }
  > (t: t) => Chain<c, $Extension, $ExtensionChainable>
}

export interface ExtensionChainable extends TypeFunction {
  name: string
}

export type ExtensionChainableArguments = [Context, object, ExtensionChainableRegistry]

export declare const chain: Chain<ContextEmpty, {}, {}>

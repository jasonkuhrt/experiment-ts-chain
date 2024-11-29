export interface TypeFunction {
	parameters: unknown
	return: unknown
}

export type Apply<$TF extends TypeFunction, $Arguments> = ($TF & { parameters: $Arguments })['return']

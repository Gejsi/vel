export type Maybe<T> = T | null | undefined

export type ThenArg<T> = T extends PromiseLike<infer U> ? ThenArg<U> : T

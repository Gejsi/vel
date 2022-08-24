import { createReactQueryHooks } from '@trpc/react'
import type { inferProcedureInput, inferProcedureOutput } from '@trpc/server'
import type { AppRouter } from '../server/router'

// there are more hooks that can be destructured, but these are the only
// ones needed currently
export const { useQuery, useContext, useMutation } =
  createReactQueryHooks<AppRouter>()

/**
 * Helper type to infer the output of a query resolver
 * @example type HelloOutput = inferQueryOutput<'hello'>
 */
export type inferQueryOutput<
  TRouteKey extends keyof AppRouter['_def']['queries']
> = inferProcedureOutput<AppRouter['_def']['queries'][TRouteKey]>

/**
 * Helper type to infer the input of a query resolver
 * @example type HelloInput = inferQueryInput<'hello'>
 */
export type inferQueryInput<
  TRouteKey extends keyof AppRouter['_def']['queries']
> = inferProcedureInput<AppRouter['_def']['queries'][TRouteKey]>

/**
 * Helper type to infer the output of a mutation resolver
 * @example type HelloOutput = inferMutationOutput<'hello'>
 */
export type inferMutationOutput<
  TRouteKey extends keyof AppRouter['_def']['mutations']
> = inferProcedureOutput<AppRouter['_def']['mutations'][TRouteKey]>

/**
 * Helper type to infer the input of a mutation resolver
 * @example type HelloInput = inferMutationInput<'hello'>
 */
export type inferMutationInput<
  TRouteKey extends keyof AppRouter['_def']['mutations']
> = inferProcedureInput<AppRouter['_def']['mutations'][TRouteKey]>

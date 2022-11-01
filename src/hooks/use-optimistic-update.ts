import { useRef } from 'react'
import { useContext, useMutation } from '../utils/trpc'

type MutationKey = Parameters<typeof useMutation>[0]

type SetQueryDataParameters = Parameters<
  ReturnType<typeof useContext>['setQueryData']
>

type OptimisticUpdateProps = {
  mutationKey: MutationKey
  invalidatedQueryKey: SetQueryDataParameters[0]
  // TODO: these `any`s make the use of this hook a bit redundant since
  // since the types should be inferred rather than explicitly written:
  // this solution is limited because TS doesn't currently support partial inference.
  updateQueryData: (prevData: any, input: any) => SetQueryDataParameters[1]
}

// TODO: add notifications support
const useOptimisticUpdate = ({
  mutationKey,
  invalidatedQueryKey,
  updateQueryData,
}: OptimisticUpdateProps) => {
  // this ref is used to track the amount of ongoing mutations and avoid flashing updates
  const mutationsCount = useRef(0)
  const utils = useContext()

  return useMutation(mutationKey, {
    async onMutate(input) {
      mutationsCount.current++

      // cancel any outgoing refetches (so they don't overwrite the optimistic update)
      await utils.cancelQuery(invalidatedQueryKey)
      // save the previous value
      const prevData = utils.getQueryData(invalidatedQueryKey)

      // optimistically update data
      if (prevData)
        utils.setQueryData(
          invalidatedQueryKey,
          updateQueryData(prevData, input)
        )

      // return a context object with the snapshotted value `prevData`
      return { prevData }
    },
    // if the mutation fails, use the context to roll back
    onError(err, input, context) {
      if (context?.prevData)
        utils.setQueryData(invalidatedQueryKey, context.prevData)
    },
    // refetch after error or success
    onSettled() {
      mutationsCount.current--

      if (mutationsCount.current === 0)
        utils.invalidateQueries(invalidatedQueryKey)
    },
  })
}

export default useOptimisticUpdate

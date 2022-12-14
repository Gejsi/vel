import { useRef } from 'react'
import { toast } from 'react-hot-toast'
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
  toastOptions?: {
    loading: string
    error: string
    success: string
    id: string
  }
}

const useOptimisticUpdate = ({
  mutationKey,
  invalidatedQueryKey,
  updateQueryData,
  toastOptions,
}: OptimisticUpdateProps) => {
  // this ref is used to track the amount of ongoing mutations and avoid flashing updates
  const mutationsCount = useRef(0)
  const utils = useContext()

  return useMutation(mutationKey, {
    async onMutate(input) {
      mutationsCount.current++

      toastOptions &&
        toast.loading(toastOptions.loading, { id: toastOptions.id })

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
    onError(_err, _input, context) {
      toastOptions && toast.error(toastOptions.error, { id: toastOptions.id })

      if (context?.prevData)
        utils.setQueryData(invalidatedQueryKey, context.prevData)
    },
    // if the mutation succeeds, show a successful notification
    onSuccess() {
      toastOptions &&
        toast.success(toastOptions.success, { id: toastOptions.id })
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

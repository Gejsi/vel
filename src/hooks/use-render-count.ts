import { useEffect, useRef } from 'react'

const useRenderCount = () => {
  const commitCountRef = useRef(0)

  useEffect(() => {
    commitCountRef.current++
  })

  return commitCountRef.current
}

export default useRenderCount

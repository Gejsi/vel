import Head from 'next/head'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import Toolbar from '../../components/Toolbar'
import idSchema from '../../schemas/id.schema'
import type { NextPageWithLayout } from '../_app'

const Editor: NextPageWithLayout = () => {
  const { id } = useRouter().query
  const parsedId = useMemo(
    () => idSchema.safeParse({ id: parseInt(id, 10) }),
    [id]
  )

  if (!parsedId.success)
    return <h1 className='prose'>this deck doesn't exist</h1>

  return (
    <>
      <Head>
        <title>Vel | Editor</title>
      </Head>

      <Toolbar title='Editor' />
      <span>Editing deck #{id}</span>
    </>
  )
}

export default Editor

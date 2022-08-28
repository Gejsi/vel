import Head from 'next/head'
import { useRouter } from 'next/router'
import Toolbar from '../../components/Toolbar'
import type { NextPageWithLayout } from '../_app'

const Editor: NextPageWithLayout = () => {
  const { id: deckId } = useRouter().query

  return (
    <>
      <Head>
        <title>Vel | Editor</title>
      </Head>

      <Toolbar title='Editor' />
      <span>Editing deck #{deckId}</span>
    </>
  )
}

export default Editor

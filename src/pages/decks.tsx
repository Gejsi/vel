import { clsx } from 'clsx'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { MdAdd } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'
import Card from '../components/Card'
import Toolbar from '../components/Toolbar'
import { useMutation, useQuery } from '../utils/trpc'
import type { NextPageWithLayout } from './_app'

const Decks: NextPageWithLayout = () => {
  const router = useRouter()

  const { data: decks, isLoading: queryLoading } = useQuery(['deck.getAll'])

  const { mutate: createDeck, isLoading: mutationLoading } = useMutation(
    'deck.create',
    {
      onSuccess() {
        router.push('/editor')
      },
    }
  )

  const btnClass = twMerge(
    'btn btn-primary gap-2',
    clsx({ loading: mutationLoading })
  )

  return (
    <>
      <Head>
        <title>Vel | Decks</title>
      </Head>

      <Toolbar title='Decks'>
        <button className={btnClass} onClick={() => createDeck()}>
          {!mutationLoading && <MdAdd className='h-6 w-6' />}
          <span className='hidden md:block'>Create deck</span>
        </button>
      </Toolbar>

      <p className='prose mb-4'>
        Click &nbsp;<kbd className='kbd'>+ Create Deck</kbd> to add a new set of
        flash cards. <br />
        Edit your cards or just practice!
      </p>

      <section className='grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-4'>
        <Card title='Lorem ipsum sit doloret' />
        <Card title='Lorem ipsum sit doloret' />
        <Card title='Lorem ipsum sit doloret' />
      </section>
    </>
  )
}

export default Decks

import Head from 'next/head'
import Link from 'next/link'
import Toolbar from './Toolbar'

const Error = ({
  title,
  statusCode = 500,
}: {
  title: string
  statusCode?: number
}) => (
  <>
    <Head>
      <title>Vel &#x2022; Error</title>
    </Head>

    <Toolbar title='Oops!' />

    <div className='rounded-xl bg-error p-8 text-error-content md:mx-auto md:w-9/12'>
      <p className='text-lg'>({statusCode})</p>
      <h1 className='mb-8 text-xl font-bold md:text-3xl'>{title}</h1>
      <Link href='/decks'>
        <a className='btn'>Create a new deck</a>
      </Link>
    </div>
  </>
)

export default Error

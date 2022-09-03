import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  MdFormatBold,
  MdFormatColorText,
  MdFormatItalic,
  MdFormatListBulleted,
  MdSave,
} from 'react-icons/md'
import { twMerge } from 'tailwind-merge'
import Editor from '../../components/editor/Editor'
import Error from '../../components/Error'
import ToolbarWithIcons from '../../components/ToolbarWithIcons'
import { useQuery } from '../../utils/trpc'
import type { NextPageWithLayout } from '../_app'

const EditorPage: NextPageWithLayout = () => {
  const { id } = useRouter().query
  const {
    data: deck,
    isLoading,
    error,
  } = useQuery(['deck.getById', { id: id as string }], {
    retry: false,
    refetchOnWindowFocus: false,
  })

  if (error)
    return (
      <Error
        title="This deck doesn't exist"
        statusCode={error.data?.httpStatus}
      />
    )

  const iconClass = twMerge('btn btn-square btn-ghost')

  return (
    <>
      <Head>
        <title>Vel &#x2022; {deck?.title}</title>
      </Head>

      <ToolbarWithIcons>
        <div className='flex flex-1 flex-nowrap overflow-y-auto'>
          <div className='btn-group flex-nowrap rounded-lg bg-base-content/10'>
            <button className={iconClass + ' rounded-l-lg'}>
              <MdFormatListBulleted className='h-6 w-6' />
            </button>
            <button className={iconClass}>
              <MdFormatItalic className='h-6 w-6' />
            </button>
            <button className={iconClass}>
              <MdFormatBold className='h-6 w-6' />
            </button>
            <button className={iconClass + ' rounded-r-lg'}>
              <MdFormatColorText className='h-6 w-6' />
            </button>
          </div>
        </div>

        <button
          className='btn btn-primary gap-2'
          onClick={() => console.log('saving to db')}
        >
          <MdSave className='h-6 w-6' />
          <span className='hidden md:block'>Save</span>
        </button>
      </ToolbarWithIcons>

      {/* {isLoading ? <Spinner /> : <span>Editing deck #{id}</span>} */}

      <h1 className='mb-4 text-5xl font-bold'>{deck?.title}</h1>
      <Editor id={1} />
    </>
  )
}

export default EditorPage

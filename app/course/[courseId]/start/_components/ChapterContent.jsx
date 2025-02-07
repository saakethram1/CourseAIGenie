import React from 'react'
import YouTube from 'react-youtube'
import ReactMarkdown from 'react-markdown'
const opts={
    height:'390',
    width:'640',
    playerVars:{
        autoplay:0
    }
}
const ChapterContent = ({chapter,content}) => {
    console.log("cont",content)
  return (
    <div className='p-10'>
      <h2 className='font-medium'>{chapter?.ChapterName}</h2>
      <p className='text-gray-500 '>{chapter?.about}</p>

<div className='flex justify-center my-6'>
   <YouTube videoId={content?.videoId} opts={opts} />
   </div>

   <div>
    {content?.content?.chapters?.map((item,index)=>(
        <div className='p-5 bg-sky-50 mb-3 rounded-lg'>
        <div className='text-sm'>
          <h2 className='font-bold mt-2'>{item.title}</h2>
          <ReactMarkdown className='whitespace-pre-wrap'>{item?.explanation}</ReactMarkdown>
          {item.code_example?.code && <div className='p-4 mt-2 bg-black rounded-lg text-white'>
            <h2 className='text-orange-500 mb-2'>{item?.code_example?.language}</h2>
            <pre>
            <code>{item?.code_example?.code}</code>
            </pre>
          
          </div>
          }
        </div>
        </div>
    ))}
   </div>
    </div>
  )
}

export default ChapterContent

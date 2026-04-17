import React from 'react'

const FormHeader = () => {
  return (
    <div className='w-full flex flex-col items-center justify-center pb-10'>
      {/* i want make size of text in small screen small */}
          <h1 className='text-2xl md:text-3xl font-bold'>Create your workspace</h1>
          <p className='text-center'>Join the editorial approach to task management.</p>
    </div>
  )
}

export default FormHeader
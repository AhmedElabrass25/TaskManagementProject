import React from 'react'
import Header from './features/Header'
import AllMembers from './features/AllMembers'

const Members = () => {
    
  return (
      <section className="mt-10 ">
      <Header />
      <div className="w-full rounded-sm">
        <AllMembers />
      </div>
    </section>
  )
}

export default Members
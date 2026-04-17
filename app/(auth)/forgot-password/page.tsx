import React from 'react'
import ForgotHeader from './features/ForgotHeader'
import ForgotForm from './features/ForgotForm'

const ForgotPassword = () => {
  return (
        <section className="mt-10 ">
      <div className="container w-full lg:w-xl bg-white p-12 rounded-sm">
        <ForgotHeader />
        <ForgotForm />
      </div>
    </section>
  )
}

export default ForgotPassword
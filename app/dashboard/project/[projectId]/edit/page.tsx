import React from 'react'
import UpdateProjectForm from './features/UpdateProjectForm'

const page = () => {
  return (
  <section className="mt-10 ">
      <div className="container w-full lg:w-xl bg-white p-4 md:p-12 rounded-sm">
        <UpdateProjectForm />
      </div>
    </section>
  )
}

export default page
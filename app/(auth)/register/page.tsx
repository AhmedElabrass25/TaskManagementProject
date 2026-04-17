import FormHeader from "./features/FormHeader"
import RegisterForm from "./features/RegisterForm"

const Register = () => {
  return (
    <section className="mt-10 ">
      <div className="container w-full lg:w-xl bg-white p-12 rounded-sm">
        <FormHeader />
        <RegisterForm />
      </div>
    </section>
  )
}

export default Register
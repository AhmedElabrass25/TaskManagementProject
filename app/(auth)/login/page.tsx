import Button from '@/components/ui/Button'
import LoginHeader from './features/LoginHeader'
import LoginForm from './features/LoginForm'

const Login = () => {
  return (
    <>
      <section className="mt-10 ">
      <div className="container w-full lg:w-xl bg-white p-12 rounded-sm">
        <LoginHeader />
        <LoginForm />
      </div>
    </section>
    </>
  )
}

export default Login
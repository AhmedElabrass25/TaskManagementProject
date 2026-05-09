import Button from "@/components/ui/Button";
import LoginHeader from "./features/LoginHeader";
import LoginForm from "./features/LoginForm";
type Props = {
  searchParams: Promise<{ redirect?: string }>;
};
const Login = async ({ searchParams }: Props) => {
  const { redirect } = await searchParams;
  return (
    <>
      <section className="mt-10 ">
        <div className="container w-full lg:w-xl bg-white p-12 rounded-sm">
          <LoginHeader />
          <LoginForm redirectUrl={redirect} />
        </div>
      </section>
    </>
  );
};

export default Login;

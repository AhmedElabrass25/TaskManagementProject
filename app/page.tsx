import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  // i want check if toke in cookies if exist redirect to dashboard if not show login page
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (token) {
    // redirect to dashboard
    redirect("/dashboard");
  }else {
    // show login page
    redirect("/login");
  }
 
  return (
    <></>
  )
}

export default page
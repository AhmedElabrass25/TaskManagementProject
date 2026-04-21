import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  // i want check if toke in cookies if exist redirect to dashboard if not show login page
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (token) {
    redirect("/dashboard/projects");
  }else {
    redirect("/login");
  }
 
  return (
    <></>
  )
}

export default page
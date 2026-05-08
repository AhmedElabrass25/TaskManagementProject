import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (token) {
    redirect("/projects");
  } else {
    redirect("/login");
  }

  return <></>;
};

export default page;

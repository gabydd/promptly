import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUser } from "../../lib/context";
import LoginView from "../../views/auth/Login";
import SignUp from "../../views/auth/SignUp";
const Auth: NextPage = (props) => {
  const value = useUser();
  const { push } = useRouter();
  useEffect(() => {
    if (value?.user) {
      push("/");
    }
  }, [value, push]);

  if (!value || value.loading) {
    return <>Loading...</>;
  }

  return (
    <div className="flex flex-wrap justify-center items-center h-screen">
      <LoginView refetchUser={value.refetchUser} />
      <SignUp refetchUser={value.refetchUser} />
    </div>
  );
};
export default Auth;

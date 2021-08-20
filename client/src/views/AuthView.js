import { Route } from "react-router-dom";
import ForgotView from "./ForgotView";
import LoginView from "./LoginView";
import SignUpView from "./SignUpView";

const AuthView = ({ refetchUser }) => {
  return (
    <div>
      <Route exact path="/auth">
        <div className="flex flex-wrap justify-center items-center h-screen">
          <LoginView refetchUser={refetchUser} />
          <SignUpView refetchUser={refetchUser} />
        </div>
      </Route>
      <Route path="/auth/forgot">
          <ForgotView/>
      </Route>
    </div>
  );
};

export default AuthView;

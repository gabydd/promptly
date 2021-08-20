import { Route } from "react-router-dom";
import GetResetTokenView from "./GetResetTokenView";
import ResetPasswordView from "./ResetPasswordView";

const ForgotView = () => {
  return (
    <div>
      <Route exact path="/auth/forgot">
        <GetResetTokenView />
      </Route>
      <Route path="/auth/forgot/reset">
        <ResetPasswordView />
      </Route>
    </div>
  );
};

export default ForgotView;

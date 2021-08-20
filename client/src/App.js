import { gql, useQuery } from "@apollo/client";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import AppView from "./views/AppView";
import AuthView from "./views/AuthView";

const GET_USER = gql`
  query GetUser {
    getUser {
      id
      name
      email
      connections {
        name
        email
      }
      connectsToUser {
        name
        email
      }
    }
  }
`;

function App() {
  const { loading, data, refetch} = useQuery(GET_USER);
  if (loading) return "Logging in...";
  return (
    <Router>
      <Route path="/" exact>
        {data.getUser ? <AppView refetchUser={refetch} user={data.getUser} /> : <Redirect to="/auth" />}
      </Route>
      <Route path="/auth">
        {data.getUser ? <Redirect to="/" /> : <AuthView refetchUser={refetch} />}
      </Route>
    </Router>
  );
}

export default App;

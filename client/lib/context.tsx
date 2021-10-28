import { useQuery } from "@apollo/client";
import { createContext, useContext, PropsWithChildren, useEffect } from "react";
import { GET_USER } from "./queries";
import { RefetchUserProps, UserTypeData, UserType } from "./types";

export const UserContext = createContext<
  | (RefetchUserProps & { user: UserType | undefined; loading: boolean })
  | undefined
>(undefined);

export const UserProvider = ({ children }: PropsWithChildren<{}>) => {
  const { loading, data, refetch } = useQuery<UserTypeData>(GET_USER);
  useEffect(() => {
    refetch()
  }, [refetch]);
  return (
    <UserContext.Provider
      value={{ loading: loading, user: data?.getUser, refetchUser: refetch }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

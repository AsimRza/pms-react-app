import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useServices } from "./hooks";
import Loading from "../shared/components/ui/Loading";
import Error from "../shared/components/ui/Error";
import type { IUser } from "../services/auth/model";

export const UserContext = React.createContext<IUser>({} as IUser);

interface IProps {
  children: React.ReactNode;
}
const UserProvider: React.FC<IProps> = ({ children }) => {
  const { authService } = useServices();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user", localStorage.getItem("accessToken")],
    queryFn: () => authService.me(),
  });

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (isError) {
    return <Error message={error.message} />;
  }

  if (!data) {
    return (
      <Error message="İstifadəçi məlumatları yüklənərkən xəta baş verdi." />
    );
  }

  const currentUser = data;

  return (
    <UserContext.Provider
      value={{
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        type: currentUser.type,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

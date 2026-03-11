import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useServices } from "./hooks";
import Loading from "../shared/components/ui/Loading";
import Error from "../shared/components/ui/Error";

export const UserContext = React.createContext(null);

const UserProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const { authService } = useServices();

  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: ["user"],
    queryFn: () => authService.me(),
    enabled: !user,
  });

  React.useEffect(() => {
    if (isSuccess && data) {
      localStorage.setItem("user", JSON.stringify(data));
    }
  }, [data, isSuccess]);

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

  const currentUser = user || data;

  return (
    <UserContext.Provider
      value={{
        firstName: currentUser?.firstName,
        lastName: currentUser?.lastName,
        email: currentUser?.email,
        type: "Müəllim",
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

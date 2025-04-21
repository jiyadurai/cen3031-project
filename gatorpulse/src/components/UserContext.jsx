import { createContext, useContext } from "react";

export const UserContext = createContext(null);  // default value

export const useUser = () => useContext(UserContext);
import { useContext } from "react";
import { UserContext } from "./user.context";

export default function useUserContext() {
  return useContext(UserContext);
}

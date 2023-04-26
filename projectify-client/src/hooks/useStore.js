import { useContext } from "react";
import AuthContext from "../context/ContextProvider";

const useStore = () => {
    return useContext(AuthContext);
}

export default useStore;
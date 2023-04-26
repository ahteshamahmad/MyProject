import { createContext, useState } from "react";

const StoreContext = createContext({});

export const ContextProvider = ({ children }) => {
    const [home, setHome] = useState();
    const [auth, setAuth] = useState({});
    const [currentUser, setCurrentUser] = useState();
    const [allProjects, setAllProjects] = useState([]);
    const [project, setProject] = useState({});
    const [allEmployees, setAllEmployees] = useState([]);
    const [allManagers, setAllManagers] = useState([]);
    const [managerProjects, setManagerProjects] = useState([]);

    return (
        <StoreContext.Provider value={{ 
            home, setHome,
            auth, setAuth, 
            currentUser, setCurrentUser,
            allProjects, setAllProjects,
            project, setProject,
            allEmployees, setAllEmployees,
            allManagers, setAllManagers,
            managerProjects, setManagerProjects
        }}>
            { children }
        </StoreContext.Provider>
    )
}

export default StoreContext;
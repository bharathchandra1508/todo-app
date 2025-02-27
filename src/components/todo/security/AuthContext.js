import { createContext, useContext, useState } from "react";

// Create a Context
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// share the created context with other components
export default function AuthProvider({children})
{
    // Put some state in context
    const [ isAuthenticated, setIsAuthenticated ]  = useState(false);
    const [ username, setUsername ]  = useState(null);
    //setInterval( () => setNumber(number + 1),10000 );

    function login(username, password)
    {
        if(username === 'bharath' && password === 'dummy')
        {
            setIsAuthenticated(true);
            setUsername(username);
            return true;
        }
        else
        {
            setIsAuthenticated(false);
            setUsername(null);
            return false;
        }
    }

    function logout()
    {
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={ {isAuthenticated, login, logout, username} }>
            {children}
        </AuthContext.Provider>
    );
}
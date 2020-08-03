import React, {useState} from 'react';

export const AuthContext = React.createContext({});

const AuthContextProvider = props => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const loginHandler = () => {
        console.log('Setting in loginHandler')
        setIsAuthenticated(true);
    };

    return (
        <AuthContext.Provider value={{
            login: loginHandler,
            isAuth: isAuthenticated
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
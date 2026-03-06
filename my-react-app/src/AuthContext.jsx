import { createContext, useState, useContext, Children } from 'react';
const AuthContext = createContext();
export const AuthProvider = ({Children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    const login = (token) => {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
    };
    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    
    };
    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {Children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
}
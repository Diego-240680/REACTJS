import { createContext, useMemo, useState, useContext } from 'react';

const AuthContext = createContext();

const readStoredUser = () => {
  try {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(readStoredUser());
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const isLoggedIn = Boolean(token);
  const role = (currentUser?.rol || currentUser?.role || 'cliente').toLowerCase();
  const isAdmin = role === 'admin';
  const isCliente = role === 'cliente';

  const login = (newToken, userData = {}) => {
    const normalizedUser = {
      ...userData,
      rol: (userData?.rol || userData?.role || 'cliente').toLowerCase(),
    };

    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(normalizedUser));

    setToken(newToken);
    setCurrentUser(normalizedUser);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken('');
    setCurrentUser(null);
  };

  const value = useMemo(
    () => ({
      isLoggedIn,
      token,
      currentUser,
      role,
      isAdmin,
      isCliente,
      login,
      logout,
    }),
    [isLoggedIn, token, currentUser, role, isAdmin, isCliente]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

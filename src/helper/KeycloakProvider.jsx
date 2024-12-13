import React, { createContext, useState, useEffect } from 'react';
import keycloak from './keycloak';

export const AuthContext = createContext();

const KeycloakProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // keycloak.init is asynchronous and isAuthenticated becomes false between page navigation
    // Solution
    const [isLoading, setIsLoading] = useState(true); 
  
    useEffect(() => {
        keycloak.init({ onLoad: 'check-sso', silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
            flow: 'standard', })
        .then(authenticated => {
            setIsAuthenticated(authenticated);
            setIsLoading(false);
        })
        .catch(err => {
            console.error('Keycloak init error:', err);
            setIsAuthenticated(false);
            setIsLoading(false);
          });
    }, []);
  
    const login = () => {
        keycloak.login();
    }
    const logout = () => {console.log('logging out');keycloak.logout({ redirectUri: `${window.location.origin}/` }); setIsAuthenticated(false)}
  
    return (
      <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export default KeycloakProvider;
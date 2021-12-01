import React from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

export const AppContext = React.createContext();
const userLocalStorageKey = 'user';
const getUser = () => (
    getLocalStorage(userLocalStorageKey)
)
const setUser = (value) => setLocalStorage(userLocalStorageKey, value)
const providerValue = {
    getUser,
    setUser
}
const AppGlobalProvider = ({ children }) => {
    return (
        <AppContext.Provider value={providerValue}>
            {children}
        </AppContext.Provider>
    )
}

export default AppGlobalProvider

import React, { useState,createContext } from 'react'

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const url = "http://localhost:8080"
    const [token,setToken] = useState("")
    const contextValue = {
        url,
        token,
        setToken
    }

    return (
        <StoreContext.Provider value = {contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider



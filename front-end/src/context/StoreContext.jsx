import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const url = "http://localhost:8080";
    const [token, setToken] = useState("");
    const [user, setUser] = useState(null);

    const fetchUserInfo = async (token) => {
        console.log("Attempting to fetch user info with token:", token);
        try {
            const response = await axios.post(`${url}/api/v1/userinfo`, { token });

            if (response.status === 200) {
                const data = response.data;
                setUser(data);
            } else {
                console.error("Failed to fetch user info:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            fetchUserInfo(storedToken);
        }
    }, []);

    const contextValue = {
        url,
        token,
        setToken,
        user,
        setUser,
        fetchUserInfo,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;

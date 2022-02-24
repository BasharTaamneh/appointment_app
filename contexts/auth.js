import { createContext, useContext, useState } from 'react';
import jwt from 'jsonwebtoken';
// import axios from 'axios'

import { useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
    const auth = useContext(AuthContext);
    if (!auth) throw new Error('You forgot AuthProvider!');
    return auth;
}

export function AuthProvider(props) {

    const [state, setState] = useState({
        token: null,
        user: null,
        login: login,
    });

    async function login(response) {

        const decodedAccess = jwt.decode(response.data.data.access);


        if (response.data.data) {
            const newState = {
                token: response.data.data.access,
                user: {
                    id: decodedAccess.id,
                    username: decodedAccess.username,
                    email: decodedAccess.email,
                    account_type: decodedAccess.account_type
                },

            }
            localStorage.setItem("auth", JSON.stringify(newState))
            setState(prevState => ({ ...prevState, ...newState }));
        }
    }

    useEffect(function authChecker() {
        if ("auth" in localStorage) {
            const data = localStorage.getItem("auth")
            setState(JSON.parse(data))
        }
    }, [])

    return (
        <AuthContext.Provider value={state}>
            {props.children}
        </AuthContext.Provider>
    );
}
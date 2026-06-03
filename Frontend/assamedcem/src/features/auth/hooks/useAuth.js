import { login, register, getMe, logout } from "../services/auth.api";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../auth.context";

export function useAuth() {
    const context = useContext(AuthContext);
    const { user, setUser } = context;
    const [errors, setErrors] = useState(null);

    async function handleRegister({ username, email, password }) {
        try {
            const data = await register({ username, email, password });
            setUser(data.user);
            setErrors(null);
        } catch (err) {
            setErrors(err.message);
            throw err;
        }
    }

    async function handleLogin({ email, password }) {
        try {
            const data = await login({ email, password });
            setUser(data.user);
            setErrors(null);
        } catch (err) {
            setErrors(err.message);
            throw err;
        }
    }

    async function handleGetMe() {
        try {
            const data = await getMe();
            setUser(data.user);
        } catch (err) {
            setErrors(err.message);
        }
    }

    async function handleLogout() {
        try {
            await logout();
            setUser(null);
        } catch (err) {
            setErrors(err.message);
        }
    }

    useEffect(() => {
        handleGetMe();
    }, []);

    return {
        handleRegister,
        handleLogin,
        handleGetMe,
        handleLogout,
        user,
        errors,
    };
}

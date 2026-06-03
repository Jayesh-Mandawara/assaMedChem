import "../styles/login.scss";
import FormGroup from "../components/FormGroup";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

const Login = () => {
    const { handleLogin, errors } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await handleLogin({ email, password });
            navigate("/");
        } catch (error) {
            console.error("Login error:", error);
        }
    }

    return (
        <main className="login-page">
            <div className="form-container">
                <h1>Login</h1>
                {errors && (
                    <div className="error-message">{errors}</div>
                )}
                <form onSubmit={handleSubmit}>
                    <FormGroup
                        label="Email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <FormGroup
                        label="Password"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="button" type="submit">
                        Login
                    </button>
                </form>
                <p>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </main>
    );
};

export default Login;

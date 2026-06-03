import "../styles/register.scss";
import FormGroup from "../components/FormGroup";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { handleRegister, errors } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await handleRegister({ username: name, email, password });
            navigate("/");
        } catch (error) {
            console.error("Register error:", error);
        }
    }

    return (
        <main className="register-page">
            <div className="form-container">
                <h1>Register</h1>
                {errors && (
                    <div className="error-message">{errors}</div>
                )}
                <form onSubmit={handleSubmit}>
                    <FormGroup
                        label="Name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
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
                        Register
                    </button>
                    <p>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </main>
    );
};

export default Register;

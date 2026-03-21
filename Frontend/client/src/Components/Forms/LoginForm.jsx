import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./LoginForm.css";
import { useAuth } from "../Hooks/useAuth";
import { login } from "../../Services/auth/public/authService";

export const LoginForm = () => {
    const { setAuthData } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const onChangeLoginHandler = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmitLoginHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await login(data);
            if (response.status === 200) {
                toast.success("Login successful!");
                setAuthData(response.data.email, response.data.role, response.data.firstName);
                navigate("/dashboard");
            }
        } catch (error) {
            const message = error.response?.data?.detail
                || error.response?.data?.message
                || "Incorrect email or password.";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="login-form p-4 rounded" onSubmit={onSubmitLoginHandler}>
            <div className="mb-3">
                <label className="form-label login-label" htmlFor="email">
                    Email Address
                </label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    className="form-control login-input"
                    placeholder="juandelacruz@gmail.com"
                    onChange={onChangeLoginHandler}
                    value={data.email}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label login-label" htmlFor="password">
                    Password
                </label>
                <div className="password-field">
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="form-control login-input password-input"
                        placeholder="Enter your password"
                        onChange={onChangeLoginHandler}
                        value={data.password}
                        required
                    />
                    <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>
            </div>

            <button
                type="submit"
                className="btn login-submit-btn"
                disabled={loading}
            >
                {loading ? "Signing in..." : "Login"}
            </button>
        </form>
    );
}; 
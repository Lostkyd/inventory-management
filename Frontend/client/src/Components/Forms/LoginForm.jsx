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
    const [data, setData] = useState({
        email: '',
        password: ''
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
            if(response.status === 200) {
                toast.success("Login successful!");
                setAuthData(response.data.token, response.data.role);
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
        <form className="login-form" onSubmit={onSubmitLoginHandler}>
            <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="juandelacruz@gmail.com"
                    onChange={onChangeLoginHandler}
                    value={data.email}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="••••••••"
                    onChange={onChangeLoginHandler}
                    value={data.password}
                    required
                />
            </div>
            <button type="submit" className="btn" disabled={loading}>
                {loading ? 'Signing in...' : 'Login'}
            </button>
        </form>
    );
};
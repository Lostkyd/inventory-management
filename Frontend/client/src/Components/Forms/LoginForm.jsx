import { useState, useContext  } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../Pages/Login/Login.css"; 
import { AppContext } from "../../Context/Context";
import { login } from "../auth/authService";

export const LoginForm = () => {
    const { setAuthData } = useContext(AppContext);
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
                localStorage.setItem("token", response.data.token);
                setAuthData(response.data.token, response.data.role);
                navigate("/dashboard");

            }
        }catch (error) {
            toast.error("Login failed. Please check your credentials and try again.");
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
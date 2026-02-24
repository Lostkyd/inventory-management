import { useNavigate } from 'react-router-dom';

const Login = () => { 
    const navigate = useNavigate(); 
    return ( 
        <div className="login-page"> 
            <div className="login-card"> 
                <div className="login-logo">
                        Sweet<span>Bliss</span>
                </div> 
                    <p className="login-tagline">Welcome back! Please sign in to continue.</p> 
                <div className="login-divider" /> 
                    <LoginForm onSuccess={() => navigate('/dashboard')} /> 
            </div>     
        </div> 
    ); 
}; 
export default Login;
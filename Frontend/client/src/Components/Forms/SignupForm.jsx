import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { registerUser, verifyOtp, resendOtp, setPassword } from "../../Services/auth/public/authService";

const SignupForm = ({ onSuccess, step, setStep }) => {
    const [data, setData] = useState({
        email: "",
        otp: "",
        password: "",
        confirmPassword: ""
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const validatePassword = (password) => {
        if (password.length < 8) {
            toast.error("Password must be at least 8 characters");
            return false;
        }
        if (!/[A-Z]/.test(password)) {
            toast.error("Password must contain at least one uppercase letter");
            return false;
        }
        if (!/[0-9]/.test(password)) {
            toast.error("Password must contain at least one number");
            return false;
        }
        if (!/[!@#$%^&*]/.test(password)) {
            toast.error("Password must contain at least one special character (!@#$%^&*)");
            return false;
        }
        return true;
    };


    const registerMutation = useMutation({
        mutationFn: () => registerUser(data.email),
        onSuccess: () => {
            toast.success("OTP sent to " + data.email);
            setStep(2);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to register");
        }
    });

    const verifyMutation = useMutation({
        mutationFn: () => verifyOtp(data.email, data.otp),
        onSuccess: () => {
            toast.success("Email verified!");
            setStep(3);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Invalid OTP");
        }
    });

    const resendMutation = useMutation({
        mutationFn: () => resendOtp(data.email),
        onSuccess: () => toast.success("OTP resent!"),
        onError: (error) => {
            const message = error.response?.data?.detail
                || error.response?.data?.message
                || "Failed to resend OTP";
            toast.error(message);
        }
    });

    const passwordMutation = useMutation({
        mutationFn: () => setPassword(data.email, data.password, data.confirmPassword),
        onSuccess: () => {
            toast.success("Account created! You can now login.");
            if (onSuccess) onSuccess();
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to set password");
        }
    });

    const handleRegister = (e) => {
        e.preventDefault();
        registerMutation.mutate();
    };

    const handleVerifyOtp = (e) => {
        e.preventDefault();
        verifyMutation.mutate();
    };

    const handleSetPassword = (e) => {
        e.preventDefault();
        if(!validatePassword(data.password)) return;
        if (data.password !== data.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        passwordMutation.mutate();
    };

    return (
        <div className="user-form">
            <div className="step-indicator">
                <div className={`step ${step >= 1 ? "active" : ""}`}>1</div>
                <div className="step-line" />
                <div className={`step ${step >= 2 ? "active" : ""}`}>2</div>
                <div className="step-line" />
                <div className={`step ${step >= 3 ? "active" : ""}`}>3</div>
            </div>
            <p className="step-label">
                {step === 1 && "Create Account"}
                {step === 2 && "Verify Email"}
                {step === 3 && "Set Password"}
            </p>

            {step === 1 && (
                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" name="email" className="form-control"
                            placeholder="juandelacruz@gmail.com" value={data.email}
                            onChange={onChange} required />
                    </div>
                    <button type="submit" className="btn w-100"
                        disabled={registerMutation.isPending}>
                        {registerMutation.isPending ? "Sending OTP..." : "Send OTP"}
                    </button>
                </form>
            )}

            {step === 2 && (
                <form onSubmit={handleVerifyOtp}>
                    <div className="mb-3">
                        <label className="form-label">Enter OTP</label>
                        <p className="otp-hint">OTP sent to <strong>{data.email}</strong></p>
                        <input type="text" name="otp" className="form-control"
                            placeholder="Enter OTP" value={data.otp}
                            onChange={onChange} required />
                    </div>
                    <button type="submit" className="btn w-100"
                        disabled={verifyMutation.isPending}>
                        {verifyMutation.isPending ? "Verifying..." : "Verify OTP"}
                    </button>
                    <button type="button" className="btn-resend"
                        onClick={() => resendMutation.mutate()}
                        disabled={resendMutation.isPending}>
                        {resendMutation.isPending ? "Resending..." : "Resend OTP"}
                    </button>
                </form>
            )}

            {step === 3 && (
                <form onSubmit={handleSetPassword}>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" name="password" className="form-control"
                            placeholder="••••••••" value={data.password}
                            onChange={onChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input type="password" name="confirmPassword" className="form-control"
                            placeholder="••••••••" value={data.confirmPassword}
                            onChange={onChange} required />
                    </div>
                    <button type="submit" className="btn w-100"
                        disabled={passwordMutation.isPending}>
                        {passwordMutation.isPending ? "Saving..." : "Create Account"}
                    </button>
                </form>
            )}
        </div>
    );
};

export default SignupForm;
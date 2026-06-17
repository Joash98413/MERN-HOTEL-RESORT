import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {backendUrl} from "../App";
import axios from "axios";
import {toast} from 'react-toastify';

const Login = ({setToken}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const adminLoginHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${backendUrl}/api/admin/login`, {
                email,
                password
            });
            console.log("Backend response:", response.data);

            if(response.data && response.data.success && response.data.token) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                toast.success("Login successful!");
                navigate("/dashboard");
            } else {
                toast.error(response.data.message || "Login failed: No token received");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Cannot reach server. Is the backend running?";
            toast.error(errorMessage);
            console.error("Login error details:", {
                url: `${backendUrl}/api/admin/login`,
                error: error.message
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                    <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Admin Login</h1>
                    <form onSubmit={adminLoginHandler}>
                        <div className="mb-2">
                            <p className="text-sm font-semibold text-gray-700 mb-2">Email Address</p>
                            <input
                                type="email"
                                placeholder="Enter admin email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-fuchsia-900" required
                            />
                        </div>
                        <div className="mb-2">
                            <p className="text-sm font-semibold text-gray-700">Password</p>
                            <input
                                type="password"
                                placeholder="Enter admin password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-fuchsia-900" required
                            />
                        </div>
                        <div>
                            <button 
                                type="submit" 
                                disabled={loading}
                                className={`w-full px-3 py-2 text-lg font-bold rounded-md text-white transition ${loading ? 'bg-gray-400' : 'bg-fuchsia-900 hover:bg-fuchsia-800'}`}>
                                {loading ? "Authenticating..." : "Login"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
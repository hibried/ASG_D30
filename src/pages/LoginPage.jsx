import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const changeUsername = (e) => {
        setUsername(e.target.value);
    };

    const changePassword = (e) => {
        setPassword(e.target.value);
    };

    const navigate = useNavigate();

    const handleSubmit = async () => {
        const payload = {
            username: username,
            password: password,
        };

        const headers = {
            headers: {
                'x-api-key': 'reqres-free-v1'
            }
        }

        const loading_toast = toast.loading("Logging in...");

        try {
            const response = await axios.post('https://reqres.in/api/login', payload, headers);
            localStorage.setItem("accessToken", response.data.token);
            setTimeout(() => {
                navigate("/");
                toast.dismiss(loading_toast);
                toast.success('Successfully logged in');
            }, 2000);
        } catch (error) {
            console.error(error.response.data.error);
            toast.dismiss(loading_toast);
            toast.error(error.response.data.error);
        }     
    };

    useEffect(() => {
      document.title = "ASG_D30 | Login";
    }, []);

    return (
        <div>
            <div className="h-screen flex justify-center items-center">
                <div className="lg:flex gap-10">
                    <div className="mb-5 lg:mb-0">
                        <h1 className="text-5xl text-center lg:text-start font-semibold tracking-widest mb-3">ASG_D30</h1>
                        <p className="text-xl text-center lg:text-start font-light tracking-wide">
                            ASG_D30 displays a list of users<br/>with details of each user.
                        </p>
                    </div>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                        <legend className="fieldset-legend">Log in to ASG_D30</legend>

                        <input type="email" className="input validator mb-1" placeholder="Email address" onChange={changeUsername} required />

                        <input type="password" className="input" placeholder="Password" onChange={changePassword} required />

                        <button className="btn btn-neutral mt-2 mb-2" onClick={handleSubmit}>Log In</button>
                        <a href={'/register'} className="text-center hover:underline">Don't have an account yet?</a>

                    </fieldset>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
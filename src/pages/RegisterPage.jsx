import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';

const RegisterPage = () => {
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

        const loading_toast = toast.loading("Registering...");

        try {
            const response = await axios.post('https://reqres.in/api/register', payload, headers);
            localStorage.setItem("accessToken", response.data.token);
            setTimeout(() => {
                navigate("/login");
                toast.dismiss(loading_toast);
                toast.success('Successfully registered');
            }, 2000);
        } catch (error) {
            console.error(error.response.data.error);
            toast.dismiss(loading_toast);
            toast.error(error.response.data.error);
        }
    };

    useEffect(() => {
        document.title = "ASG_D30 | Register";
    }, []);

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <h1 className="text-5xl text-center font-semibold tracking-widest mb-5">ASG_D30</h1>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Create a new account</legend>

                <input type="email" className="input validator mb-1" placeholder="Email address" onChange={changeUsername} required />
                <input type="password" className="input" placeholder="Password" onChange={changePassword} required />

                <button className="btn btn-neutral mt-2 mb-2" onClick={handleSubmit}>Register</button>
                <a href={'/login'} className="text-center hover:underline">Already have an account?</a>
            </fieldset>
        </div>
    )
}

export default RegisterPage
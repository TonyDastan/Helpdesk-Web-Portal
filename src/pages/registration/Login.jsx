/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { api } from '../../utils/apis';
import { useUser } from '../../providers/UserContext';
import ErrorText from '../../Components/Typography/ErrorText';
import { Bounce, Slide, Zoom, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const INITIAL_OBJ = {
        email: '', password: ''
    };
    const navigate = useNavigate();
    const [requestObj, setRequestObj] = useState(INITIAL_OBJ);
    const [errorMessage, setErrorMessage] = useState("");
    const { setUser } = useUser();

    const submitForm = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (requestObj.email.trim() === "") return setErrorMessage("Email is required!")
        if (requestObj.password.trim() === "") return setErrorMessage("Password is required!")

        try {
            const response = await axios.post(api.login, requestObj);
            if (response.data.success) {
                if (response.data.user.is_staff) {
                    const { token, user } = response.data;
                    // Store the token in local storage
                    localStorage.setItem("refresh_token", token);
                    localStorage.setItem("user", JSON.stringify(user));
                    setUser({ id: user.id, ...user });
                    console.log("Login Successful: ");
                    toast.success('Login Success', {
                        position: "top-right",
                    });
                    // Delay the navigation to allow the toast to be visible
                    setTimeout(() => {
                        navigate('/dashboard');
                    }, 1000); // 1 second delay
                } else {
                    console.log("Only Admin required");
                    toast.warning('Only Admin Allowed', {
                        position: "top-right",
                    })
                    navigate('/');
                }
            } else {
                toast.error("Invalid email or password. Please try again.", {
                    position: "top-right",
                });
                navigate('/');
            }
        } catch (error) {
            // Handle login failure
            console.error('Login failed:', error);
            toast.error("Something occured. Please try again.", {
                position: "top-right",
            });
            navigate('/');
        }
    };

    const updateFormValue = (e) => {
        setErrorMessage("");
        const { name, value } = e.target;
        setRequestObj({ ...requestObj, [name]: value });
    };

    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-gray-300 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-200 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl dark:text-black">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" method="POST" onSubmit={(e) => submitForm(e)}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-black dark:text-black">Your email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="bg-gray-100 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com"
                                    value={requestObj.email}
                                    onChange={updateFormValue}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-black dark:text-black">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="bg-gray-100 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="min 8 characters"
                                    value={requestObj.password}
                                    onChange={updateFormValue}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-black dark:text-black">Remember me</label>
                                    </div>
                                </div>
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                            </div>

                            <ErrorText styleClass="mt-8 text-md text-red-400">{errorMessage}</ErrorText>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                            <ToastContainer transition={Slide} />
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login
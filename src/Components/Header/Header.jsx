/* eslint-disable no-unused-vars */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHelpCircle } from 'react-icons/fi'; 

const Header = () => {
    const user = localStorage.getItem('user');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear(); // Clear all items in localStorage
        navigate('/'); // Navigate to '/' route
    };

    return (
        <div className="flex justify-between items-center bg-white text-black p-4">
            <div className="flex items-center">
                <h1 className="text-2xl font-bold">HELPDESK</h1>
                <FiHelpCircle className="ml-2" size={24} />
            </div>
            <Link to="/responses" className="text-blue-600 hover:underline mr-4">View Responses</Link>
            <button
                className="bg-red-600 text-black px-4 py-2 rounded hover:bg-red-700"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );
};

export default Header;

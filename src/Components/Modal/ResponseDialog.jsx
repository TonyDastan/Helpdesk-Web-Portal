/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { api } from '../../utils/apis';
import {message} from 'antd';

const ResponseDialog = ({ isOpen, closeModal, response }) => {
    const [updatedResponse, setUpdatedResponse] = useState('');

    const handleInputChange = (e) => {
        setUpdatedResponse(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('refresh_token');

            const data = {
                ...response,
                updatedResponse,
            }
            
            const res = await axios.put(`${api.createUpdateResponseUrl}${response.id}/`, data, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (res.status === 200) {
                console.log('Response updated successfully');
                message.success('Response updated successfully')
                closeModal();
            } else {
                console.error('Failed to update response');
            }
        } catch (error) {
            console.error('Error updating response:', error);
        }
    };

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${isOpen ? '' : 'hidden'}`}>
            <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Update Response</h2>
                <textarea
                    className="w-full border rounded-md p-2 mb-4"
                    rows="4"
                    placeholder="Enter updated response..."
                    value={updatedResponse}
                    onChange={handleInputChange}
                />
                <div className="flex justify-end">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded mr-2"
                        onClick={handleSubmit}
                    >
                        Update Response
                    </button>
                    <button
                        className="bg-gray-300 text-gray-700 py-1 px-3 rounded"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResponseDialog;

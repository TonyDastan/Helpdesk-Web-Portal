/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Modal from '../../Components/Modal/Modal'
import axios from 'axios';
import { api } from '../../utils/apis';
import Header from '../../Components/Header/Header';

const ViewRequests = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [issues, setIssues] = useState([]); // Ensure initial state is an array

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const token = localStorage.getItem('refresh_token');
                const response = await axios.get(api.fetchIssues, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                // Ensure response data is an array before setting the state
                const issuesData = Array.isArray(response.data) ? response.data : [];
                setIssues(issuesData);

                // Loop through issues and fetch user data for each issue
                for (let issue of issuesData) {
                    await fetchUserData(issue.user);
                }
            } catch (error) {
                console.error('Error fetching issues:', error);
            }
        };

        fetchIssues();

        const intervalId = setInterval(fetchIssues, 90000); 

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId); 
    }, []);

    const fetchUserData = async (user_id) => {
        try {
            const token = localStorage.getItem('refresh_token');
            const userData = await axios.get(`${api.fetchUser}/${user_id}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (userData.status === 200) {
                // Update issues state with user data
                setIssues(prevIssues => {
                    const updatedIssues = prevIssues.map(issue => {
                        if (issue.user === user_id) {
                            return {
                                ...issue,
                                name: userData.data.fullname,
                                contact: userData.data.contact
                            };
                        }
                        return issue;
                    });
                    return updatedIssues;
                });
            } else {
                console.error('Error Occurred:', userData.error);
            }
        } catch (error) {
            console.error('Error fetching User:', error);
        }
    };

    const openModal = (member) => {
        setSelectedMember(member);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMember(null);
    };

    const getStatusComponent = (status) => {
        const badgeStyle = {
            padding: '0.25rem 0.75rem',
            borderRadius: '16px', 
            fontSize: '0.7rem',
        };
    
        if (status) {
            return <div style={{ ...badgeStyle, backgroundColor: '#34D399', color: '#ffffff' }}>Success</div>;
        } else {
            return <div style={{ ...badgeStyle, backgroundColor: '#EF4444', color: '#ffffff' }}>Pending</div>;
        }
    };

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    return (
        <div className="container mx-auto p-4 pt-10 elevation-5">
            <Header />
            <div className="max-w-4xl mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden">
                <div className="px-6 py-4">
                    <h2 className="text-2xl font-bold mb-4">Issues List</h2>
                    <hr className="mb-4 border-t-2 border-gray-200" />
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-gray-100">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">S/N</th>
                                    <th className="py-2 px-4 border-b">Description</th>
                                    <th className="py-2 px-4 border-b">Category</th>
                                    <th className="py-2 px-4 border-b">Urgency Level</th>
                                    <th className="py-2 px-4 border-b">Submitted By</th>
                                    <th className="py-2 px-4 border-b">Phone No</th>
                                    <th className="py-2 px-4 border-b">Date</th>
                                    <th className="py-2 px-4 border-b">Status</th>
                                    <th className="py-2 px-4 border-b">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {issues.map((issue, index) => (
                                    <tr key={issue.id} className="border-t text-center">
                                        <td className="py-2 px-4 text-center">{index + 1}</td>
                                        <td className="py-2 px-4">{truncateText(issue.issue_description, 10)}</td>
                                        <td className="py-2 px-4">{issue.category}</td>
                                        <td className="py-2 px-4">{issue.urgency_level}</td>
                                        <td className='py-2 px-4'>{issue.name}</td>
                                        <td className='py-2 px-4'>{issue.contact}</td>
                                        <td className='py-2 px-4'>{new Date(issue.submitted_on).toLocaleDateString()}</td>
                                        <td className='py-2 px-4'>{getStatusComponent(issue.status)}</td>
                                        <td className="py-2 px-4 text-center">
                                            <button
                                                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700"
                                                onClick={() => openModal(issue)}
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {selectedMember && (
                    <Modal isOpen={isModalOpen} closeModal={closeModal} member={selectedMember} />
                )}
            </div>
        </div>
    );
};

export default ViewRequests;

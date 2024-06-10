/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Modal from '../../Components/Modal/Modal'

const ViewRequests = ({ data }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);

    const openModal = (member) => {
        setSelectedMember(member);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMember(null);
    };

    return (
        <div className="container mx-auto p-4 pt-10">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="px-6 py-4">
                    <h2 className="text-2xl font-bold mb-4">Members List</h2>
                    <hr className="mb-4 border-t-2 border-gray-200" />
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">S/N</th>
                                    <th className="py-2 px-4 border-b">Name</th>
                                    <th className="py-2 px-4 border-b">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((member, index) => (
                                    <tr key={member.id} className="border-t text-center">
                                        <td className="py-2 px-4 text-center">{index + 1}</td>
                                        <td className="py-2 px-4">{member.name}</td>
                                        <td className="py-2 px-4 text-center">
                                            <button
                                                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700"
                                                onClick={() => openModal(member)}
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
}

export default ViewRequests
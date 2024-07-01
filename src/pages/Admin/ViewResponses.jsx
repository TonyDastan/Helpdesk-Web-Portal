/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { api } from '../../utils/apis';
import ResponseDialog from '../../Components/Modal/ResponseDialog';
import { message } from 'antd';

const ViewResponses = () => {
    const [responses, setResponses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedResponse, setSelectedResponse] = useState(null);
    const [feedbacks, setFeedbacks] = useState({}); // New state to store feedbacks

    useEffect(() => {
        fetchResponses();
    }, []);

    const fetchResponses = async () => {
        try {
            const response = await axios.get(api.fetchResponsesUrl);
            setResponses(response.data);
            // Fetch feedback for each response
            response.data.forEach(fetchFeedback);
        } catch (error) {
            console.error('Error fetching responses:', error);
        }
    };

    const fetchFeedback = async (response) => {
        try {
            const feedbackResponse = await axios.get(`${api.fetchFeedbacksUrl}/${response.id}/`);
            setFeedbacks(prevFeedbacks => ({
                ...prevFeedbacks,
                [response.id]: feedbackResponse.data
            }));
        } catch (error) {
            console.error(`Error fetching feedback for response ${response.id}:`, error);
        }
    };

    const handleUpdate = (response) => {
        setSelectedResponse(response);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedResponse(null);
    };

    const handleDelete = async (response) => {
        try {
            await axios.delete(`${api.createUpdateResponseUrl}${response.id}/`, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('refresh_token')}`
                }
            });
            message.success(`Response with ID ${response.id} deleted successfully`);
            fetchResponses();
        } catch (error) {
            console.error(`Error deleting response with ID ${response.id}:`, error);
            message.error(`Error deleting response with ID ${response.id}:`);
        }
    };

    return (
        <div className="container mx-auto mt-4">
            <h1 className="text-2xl font-bold mb-4">Issue Responses</h1>
            <div className="grid grid-cols-1 gap-4">
                {responses.map((response) => (
                    <div key={response.id} className="bg-white shadow-md rounded-lg p-4">
                        <div className="mb-4">
                            <span className="font-semibold">Issue Description:</span> {response.issue.issue_description}
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">Issue Category:</span> {response.issue.category}
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">Issue Urgency Level:</span> {response.issue.urgency_level}
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">Issue Submission Date:</span>{' '}
                            {new Date(response.issue.submitted_on).toLocaleString()}
                        </div>
                        <div className="mb-2">
                            <span className="font-semibold">Response:</span> {response.response}
                        </div>
                        <div className="mb-2">
                            <span className="font-semibold">Reply Date:</span>{' '}
                            {new Date(response.reply_date).toLocaleString()}
                        </div>
                        <div className="mb-2">
                            <span className="font-semibold">Feedback:</span> 
                            <ul>
                                {feedbacks[response.id]?.map((feedback) => (
                                    <li key={feedback.id}>{feedback.feedback_text}</li>
                                )) || 'No feedback available.'}
                            </ul>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded"
                                onClick={() => handleUpdate(response)}
                            >
                                Update
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded"
                                onClick={() => handleDelete(response)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {selectedResponse && (
                <ResponseDialog isOpen={isModalOpen} closeModal={closeModal} response={selectedResponse} />
            )}
        </div>
    );
};

export default ViewResponses;

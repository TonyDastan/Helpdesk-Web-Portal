/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import { api } from '../../utils/apis';
import {message} from 'antd'

const Modal = ({ isOpen, closeModal, issue }) => {
  const [response, setResponse] = useState('');

  const handleSubmitResponse = async () => {
    try {
      const token = localStorage.getItem('refresh_token');
      const data = {
        response: response,
        issue: issue.id
      };
      console.log(data)
      const res = await axios.post(api.createUpdateResponseUrl, data, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      if (res.data.success) {
        message.success('Response have been submitted successfully')
        console.log('Response have been submitted successfully')
        closeModal(true);
      } else {
        console.log('Failed to submit response')
        message.error('Failed to submit response')
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleResponseChange = (e) => {
    setResponse(e.target.value);
  };

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Issue Details
                </Dialog.Title>
                <div className="mt-4 space-y-2">
                  <div className="mt-2">
                    <span className="text-sm font-semibold text-gray-700">Issue:</span>
                    <p className="text-sm text-gray-500 whitespace-pre-wrap mt-1">{issue.issue_description}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-700">Category:</span>
                    <span className="text-sm text-gray-500">{issue.category}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-700">Urgency:</span>
                    <span className="text-sm text-gray-500">{issue.urgency_level}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-700">Name:</span>
                    <span className="text-sm text-gray-500">{issue.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-700">Contact:</span>
                    <span className="text-sm text-gray-500">{issue.contact}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-700">Submitted On:</span>
                    <span className="text-sm text-gray-500">{new Date(issue.submitted_on).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="response" className="block text-sm font-medium text-gray-700">
                    Response
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="response"
                      name="response"
                      rows="3"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={response}
                      onChange={handleResponseChange}
                      placeholder="Type your response here..."
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={handleSubmitResponse}
                  >
                    Submit Response
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;

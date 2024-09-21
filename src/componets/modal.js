// src/components/Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, onSave, formData, handleChange }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    &times;
                </button>
                <h2 className="text-xl font-semibold mb-4">{formData.id ? 'Edit Entry' : 'Add New Entry'}</h2>
                <form>
                    <div className="space-y-4">
                        <input
                            className="p-2 border rounded w-full"
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <input
                            className="p-2 border rounded w-full"
                            type="text"
                            name="designation"
                            placeholder="Designation"
                            value={formData.designation}
                            onChange={handleChange}
                        />
                        <input
                            className="p-2 border rounded w-full"
                            type="number"
                            name="mobileno"
                            placeholder="Mobile No"
                            value={formData.mobileno}
                            onChange={handleChange}
                        />
                        <input
                            className="p-2 border rounded w-full"
                            type="text"
                            name="cordinate"
                            placeholder="Cordinate"
                            value={formData.cordinate}
                            onChange={handleChange}
                        />
                        <input
                            className="p-2 border rounded w-full"
                            type="text"
                            name="picture"
                            placeholder="Picture URL"
                            value={formData.picture}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex justify-end mt-4">
                        <button
                            type="button"
                            onClick={onSave}
                            className="bg-blue-500 text-white p-2 rounded mr-2"
                        >
                            {formData.id ? 'Update' : 'Add'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 text-gray-700 p-2 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;

import { useState, useEffect } from 'react';
import Uppy from '@uppy/core';
import { Dashboard, DragDrop } from '@uppy/react';
import Tus from '@uppy/tus';

import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import '@uppy/drag-drop/dist/style.min.css';

function createUppy() {
    return new Uppy().use(Tus, { endpoint: '/api/upload' });
}

export default function AssignmentUploader() {
    const [uppy] = useState(createUppy);
    return (
        <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-2xl p-6 w-[100%]">
            <h2 className="text-lg font-semibold mb-2">UPLOAD ASSIGNMENT</h2>

            
            <div className="border-2 border-dashed border-gray-400 p-6 rounded-lg text-center">
                <img src="/src/assets/upload.png" alt="Upload Icon" className="size-16 mx-auto mb-2" />
                <p className="text-gray-600">Click or drag and drop to upload</p>
                <Dashboard uppy={uppy}/>
                <p className="text-xs text-gray-400 mt-1">Maximum size: 25MB</p>
            </div>

            <p className="text-gray-500 mt-3">OR</p>

            <input
                type="text"
                placeholder="Paste link here"
                className="border border-gray-300 rounded-md p-2 w-full mt-2"
            />
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                SUBMIT
            </button>
        </div>
    );
}


        
    

    
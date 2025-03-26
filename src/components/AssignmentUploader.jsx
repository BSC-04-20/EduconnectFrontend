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
        <div className="flex flex-col items-center justify-center bg-white shadow-md min-h-screen rounded-2xl p-6 w-full">
            <h2 className="text-lg font-semibold text-sky-950 mb-2">UPLOAD ASSIGNMENT</h2>

            <div className="border-2 border-dashed border-gray-400 p-6 rounded-3xl w-full sm:w-[80%] md:w-[60%] lg:w-[50%] text-center">
                <img src="/src/assets/upload.png" alt="Upload Icon" className="size-16 mx-auto mb-2" />
                
                <div className="flex justify-center">
                    <Dashboard uppy={uppy} width={300} height={180} />
                </div>

                <p className="text-xs text-gray-400 mt-1">Maximum size: 25MB</p>
            </div>

            <p className="text-gray-500 mt-3">OR</p>

            <input
                type="text"
                placeholder="Paste link here"
                className="border border-gray-300 rounded-md p-2 w-full sm:w-[80%] md:w-[60%] lg:w-[50%] mt-2"
            />
            
            <button className="mt-4 w-[50%] sm:w-[40%] md:w-[30%] lg:w-[20%] bg-sky-900 text-white py-2 rounded-md hover:bg-sky-500 transition">
                SUBMIT
            </button>
        </div>
    );
}

import { useEffect, useState } from 'react';
import Uppy from '@uppy/core';
import Dashboard from '@uppy/react/lib/Dashboard';
import Tus from '@uppy/tus';

import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';


function createUppy() {
    return new Uppy().use(Tus, { endpoint: '/api/upload' });
}

export default function AssignmentUploader() {
	// Important: use an initializer function to prevent the state from recreating.
	const [uppy] = useState(createUppy);

	return <Dashboard theme="light" uppy={uppy} className='bg-blue-900'/>;
}



// export default function AssignmentUploader(){
//     return(
//         <div>
//             <input type="file" />
//         </div>
//     )
// }
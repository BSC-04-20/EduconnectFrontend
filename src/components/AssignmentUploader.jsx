import { useEffect, useState } from 'react';
import Uppy from '@uppy/core';
import Dashboard from '@uppy/react/lib/Dashboard';
import Tus from '@uppy/tus';
import { WiCloudUp } from "react-icons/wi";
// import Upload from "../../../assets/upload.png"

import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';


function createUppy() {
    return new Uppy().use(Tus, { endpoint: '/api/upload' });
}

export default function AssignmentUploader() {
	// Important: use an initializer function to prevent the state from recreating.
	const [uppy] = useState(createUppy);

	return (

        <div>
            <Dashboard theme="light" uppy={uppy} className='h-[80px]'/>

            {/* <div className="flex py-1">
            <WiCloudUp className="text-sky-900 size-[1.5rem]"  />

            </div> */}
            
            <div className="absolute top-10 left-20 h-[35%] ml-20 mr-10">
                        <img src="/src/assets/upload.png" className="size-full"/>
            </div>
            
         
            

        </div>

        

    )
}



// export default function AssignmentUploader(){
//     return(
//         <div>
//             <input type="file" />
//         </div>
//     )
// }
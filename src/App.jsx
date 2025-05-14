import { RouterProvider } from 'react-router-dom'
import routes from './config/routes'
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function App() {

  return (
    <div>
      <RouterProvider router={routes}/>
    </div>
  )
}

export default App

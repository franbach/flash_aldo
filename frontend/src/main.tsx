import App from '@/app'
import ReactDOM from 'react-dom/client'
import { initialize } from "@/app/initialize";
import { RouterProvider } from "react-router-dom";

import '@/ui/style/index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={initialize(<App />)} />,
)

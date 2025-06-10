import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

console.log('React app started'); 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
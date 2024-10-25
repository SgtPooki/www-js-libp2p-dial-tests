import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app.jsx'

const root = document.getElementById('root')

if (root == null) {
  throw new Error('No root element')
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
)

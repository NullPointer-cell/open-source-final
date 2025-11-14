import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ErrorBoundary from './components/ErrorBoundary.jsx'

console.log('Mounting app — debug banner active')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)

// Visible debug banner appended to body so we can confirm React bundle executed
try {
  const existing = document.getElementById('debug-banner');
  if (!existing) {
    const banner = document.createElement('div');
    banner.id = 'debug-banner';
    banner.textContent = 'DEBUG: React bundle loaded';
    banner.style.position = 'fixed';
    banner.style.right = '12px';
    banner.style.bottom = '12px';
    banner.style.zIndex = '99999';
    banner.style.background = 'rgba(255,69,58,0.95)';
    banner.style.color = 'white';
    banner.style.padding = '6px 10px';
    banner.style.borderRadius = '6px';
    banner.style.fontFamily = 'Inter, system-ui, Arial';
    banner.style.fontSize = '12px';
    document.body.appendChild(banner);
  }
} catch (e) {
  console.warn('Failed to render debug banner', e);
}

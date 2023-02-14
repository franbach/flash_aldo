import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import actionCable from 'actioncable'

const CableApp: { cable: any } = { cable: null}

CableApp.cable = actionCable.createConsumer('ws://localhost:3000/cable')

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App cable={CableApp.cable} />
)

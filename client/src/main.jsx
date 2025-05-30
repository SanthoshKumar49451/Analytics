import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.jsx'
import './main.css'
import { BrowserRouter } from 'react-router-dom'
import store from '../src/store/store.js'
import { Provider } from 'react-redux'


ReactDOM.createRoot(document.getElementById('root')).render(

  <BrowserRouter  >
    <Provider store={store} >
      <App />

    </Provider>

  </BrowserRouter>,
)

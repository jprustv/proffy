import React, { useState } from 'react';

import './assets/styles/global.css'

import { AuthProvider } from './contexts/auth'
import Routes from './routes'

function App() {

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}

export default App;

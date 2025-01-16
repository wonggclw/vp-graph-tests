import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import Header from './Header';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1>Grace's D3 tests for VP</h1>
      <BrowserRouter>
        <Header />
        <AppRoutes />
      </BrowserRouter>
    </>
  )
}

export default App

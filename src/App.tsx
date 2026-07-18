import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import SharedPage from './pages/SharedPage'

function App() {
  return (
    <Routes>
      <Route path="/HomePage" element={<HomePage />} />
      <Route path="/" element={<RegisterPage />} />
      <Route path="/share/:id" element={<SharedPage />} />
      <Route path="*" element={<Navigate to="/HomePage" />} />
    </Routes>
  )
}

export default App

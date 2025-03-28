import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DiskScheduling from './DiskScheduling'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <DiskScheduling/>
    </>
  )
}

export default App

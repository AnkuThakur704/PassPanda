import { useState } from 'react'
import './App.css'
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import Navbar from './components/Navbar'
import Manager from './components/manager';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="main h-[100vh] w-[100vw]  ">
      <Navbar/>
      <Manager/>
    </div>
    </>
  )
}

export default App

import { useState } from 'react'
import './App.css'
import './assets/style.css'
import Television from './components/Television.jsx'

function App() {
  const [televisions, setTelevisions] = useState([])

  return (
    <>
      <main className=' flex flex-col h-screen w-screen justify-center items-center'>
        <Television />
        <button className=' bg-slate-900 p-2'>Add Television Instance</button>
      </main>
    </>
  )
}

export default App

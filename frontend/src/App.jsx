import { useEffect, useState } from 'react'
import './App.css'
import './assets/style.css'
import Television from './components/Television.jsx'

function App() {
  const [televisions, setTelevisions] = useState([])
  useEffect(() => {
    
    // Get all television instances
    (async() => {
      const res = await fetch('http://127.0.0.1:5000/televisions');
      const televisions = await res.json();
      setTelevisions(televisions);
    })();

  }, []);
  return (
    <>
      <main className=' flex flex-col h-screen w-screen justify-center items-center'>
        
        {
          televisions.map(television => {
            return <Television channel={television.channel[1]}/>
          })
        }
        <button className=' bg-slate-900 p-2'>Add Television Instance</button>
        
      </main>
    </>
  )
}

export default App

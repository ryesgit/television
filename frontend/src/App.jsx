import { useEffect, useState } from 'react'
import './App.css'
import './assets/style.css'
import Television from './components/Television.jsx'
import { baseURL } from './locals/constants.js'

function App() {
  const [televisions, setTelevisions] = useState([])
  useEffect(() => {
    
    // Get all television instances
    (async() => {
      const res = await fetch(`${baseURL}/televisions`);
      const televisions = await res.json();
      setTelevisions(televisions);
    })();

  }, []);

  const createNewTV = async() => {
    const res = await fetch(`${baseURL}/televisions/create`);
    const newTv = await res.json();
    setTelevisions(prev => [...prev, newTv]);
  }

  return (
    <>
      <main className=' flex flex-col h-screen w-screen justify-center items-center'>
        
        <div className=' flex w-4/5 gap-2'>
          {
            televisions.map(television => {
              return <Television className=" aspect-video" channel={television.channel[1]} id={television.id} key={television.id} on={television.on}/>
            })
          }
        </div>
        <button className=' bg-slate-900 p-2' onClick={createNewTV}>Add Television Instance</button>
        
      </main>
    </>
  )
}

export default App

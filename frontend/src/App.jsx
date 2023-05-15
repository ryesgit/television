import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import YouTubeEmbed from './components/YouTubeEmbed.jsx'

function App() {

  return (
    <>
      <YouTubeEmbed src={"https://www.youtube.com/embed/LaBY6Jdhu5Q"} title={"From zero to hero with Microsoft Graph API – July 2021"}/>
    </>
  )
}

export default App

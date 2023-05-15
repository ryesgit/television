import { useEffect, useState } from 'react'

import YouTube from "react-youtube";

const Television = () => {
  const [volume, setVolume] = useState(100);
  const [channel, setChannel] = useState('LaBY6Jdhu5Q');
  const [on, setOn] = useState(false);
  const [opts, setOpts] = useState({});
  useEffect(() => {
    const opts = {
      height: '390',
      width: '100%',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        mute: 1
      },
    }

    setOpts(opts);
  }, []);  

  return (
    <>
        <aside className=' p-4 bg-black'>
            <YouTube videoId={channel} opts={opts}/>

            <div className=' flex justify-around items-center pt-2'>
                <button>Volume Up</button>
                <button>Volume Down</button>
                <button>Channel Up</button>
                <button>Channel Down</button>

                <label htmlFor="power" className=" bg-red-700 p-2 rounded-md cursor-pointer">Power Button</label>
                <input type="checkbox" name="power-button" id="power" className=" appearance-none"/>
            </div>

        </aside>
    </>
  )
}

export default Television
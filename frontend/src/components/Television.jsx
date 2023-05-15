import { useEffect, useState } from 'react'

import YouTube from "react-youtube";
import { baseURL } from '../locals/constants.js';

const Television = ({channel:channelVideoID, id}) => {
  const [volume, setVolume] = useState(100);
  const [channel, setChannel] = useState(channelVideoID);
  const [on, setOn] = useState(true);
  const [opts, setOpts] = useState({});
  const [player, setPlayer] = useState();

  useEffect(() => {
    const opts = {
      height: '200',
      width: '100%',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        mute: 1
      },
    }

    setOpts(opts);
  }, []);

  const channelUp = async() => {
    const res = await fetch(`${baseURL}/televisions/channel/${id}/up`);
    const newChannel = await res.json();
    console.log(newChannel[1]);
    setChannel(newChannel[1]);
  }
  
  useEffect(() => {
    if (!player) {
      return
    } else {
      console.log(channel)
      player.loadVideoById(channel, 5);
    }
  }, [channel])

  return (
    <>
        <aside className=' p-4 bg-black md:w-1/2 flex flex-col m-0 mx-auto'>

            {/* Toggles power button background color */}
            { on ? <YouTube title={channel} videoId={channel} opts={opts} onReady={(event) => setPlayer(event.target)} /> : <div style={{ width: '100%', height: '200px', background: 'gray' }} /> }

            <div className=' flex justify-around items-center pt-2 text-xs flex-wrap'>
                <p>{channel}</p>
                <button>Volume Up</button>
                <button>Volume Down</button>
                <button onClick={channelUp}>Channel Up</button>
                <button>Channel Down</button>

                <label htmlFor="power" className={`${ !on ? 'bg-red-700' : 'bg-green-700' } p-2 rounded-md cursor-pointer`} onClick={() => setOn(!on)}>Power Button</label>
                <input type="checkbox" name="power-button" id="power" className=" appearance-none"/>
            </div>

        </aside>
    </>
  )
}

export default Television;
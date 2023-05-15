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
    try {
      const res = await fetch(`${baseURL}/televisions/channel/${id}/up`);
      if(res.status == 405) {
        alert("You have reached the end of channels");
        return
      }
      const newChannel = await res.json();


      console.log(newChannel[1]);
      setChannel(newChannel[1]);
    } catch(err) {
        alert(err.toString());
    }
    if(player.isMuted()) {
      player.unMute()
    }
  }
  
  const channelDown = async() => {
    try {
      const res = await fetch(`${baseURL}/televisions/channel/${id}/down`);
      if(res.status == 405) {
        alert("You have reached the end of channels");
        return
      }
      const newChannel = await res.json();


      console.log(newChannel[1]);
      setChannel(newChannel[1]);
    } catch(err) {
        alert(err.toString());
    }
    if(player.isMuted()) {
      player.unMute()
    }
  }
  
  useEffect(() => {
    if (!player) {
      return
    } else {
      console.log(channel)
      player.loadVideoById(channel, 5);
    }
    
  }, [channel])

  // Everytime volume changes, reset player volume.
  useEffect(() => {
    if (!player) {
      return
    } else {
      player.setVolume(volume)
    }
  }, [volume])

  const volumeUp = async() => {
    try {
      const res = await fetch(`${baseURL}/televisions/volume/${id}/up`);
      if(res.status == 405) {
        alert("Can no longer increase volume");
        return
      }
      const newVolume = await res.json();

      setVolume(newVolume);
    } catch(err) {
        alert(err.toString());
    }

  }

  const volumeDown = async() => {
    if(player.isMuted()) {
      player.unMute()
    }
    try {
      const res = await fetch(`${baseURL}/televisions/volume/${id}/down`);
      if(res.status == 405) {
        alert("Can no longer decrease volume");
        return
      }
      const newVolume = await res.json();

      setVolume(newVolume);
    } catch(err) {
        alert(err.toString());
    }

  }

  return (
    <>
        <aside className=' p-4 bg-black md:w-1/2 flex flex-col m-0 mx-auto'>

            {/* Toggles power button background color */}
            { on ? <YouTube title={channel} videoId={channel} opts={opts} onReady={(event) => setPlayer(event.target)} /> : <div style={{ width: '100%', height: '200px', background: 'gray' }} /> }

            <div className=' flex justify-around items-center pt-2 text-xs flex-wrap'>
                <p>{channel}</p>
                <button onClick={volumeUp}>Volume Up</button>
                <button onClick={volumeDown}>Volume Down</button>
                <button onClick={channelUp}>Channel Up</button>
                <button onClick={channelDown}>Channel Down</button>

                <label htmlFor="power" className={`${ !on ? 'bg-red-700' : 'bg-green-700' } p-2 rounded-md cursor-pointer`} onClick={() => setOn(!on)}>Power Button</label>
                <input type="checkbox" name="power-button" id="power" className=" appearance-none"/>
            </div>

        </aside>
    </>
  )
}

export default Television;
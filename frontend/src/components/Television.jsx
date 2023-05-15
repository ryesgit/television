import { useEffect, useState } from 'react'

import YouTube from "react-youtube";
import { baseURL } from '../locals/constants.js';

const Television = ({channel:channelVideoID, id, className}) => {
  const [volume, setVolume] = useState(100);
  const [channel, setChannel] = useState(channelVideoID);
  const [on, setOn] = useState(true);
  const [opts, setOpts] = useState({});
  const [player, setPlayer] = useState();
  const [info, setInfo] = useState('');

  useEffect(() => {
    const opts = {
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
    if (!player || !channel) {
      return
    } else {
      console.log(!player);
      console.log(channel)
      console.log(player);
      player.loadVideoById(channel);
    }

  }, [channel])

  // Everytime anything changes, change TV info
  useEffect(() => {

    (async() => {
      const info = await getTVInfo()
      setInfo(info);
    })();
  }, [channel, volume, on])

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
  
  const switchOnOffTV = async() => {
    try {
      const res = await fetch(`${baseURL}/televisions/power/${id}`);
      const power = await res.json();

      setOn(power);
    } catch(err) {
        alert(err.toString());
    }
  }

  const getTVInfo = async() => {
    try {
      const res = await fetch(`${baseURL}/televisions/${id}/info`);
      const info = await res.json();
      return info
    } catch(err) {
        alert(err.toString());
    } 
  }

  return (
    <>
        <aside className={className + `relative p-4 bg-black md:w-1/2 flex z-0 flex-col m-0 mx-auto`}>
            <p className='absolute z-10 text-white'>{info}</p>
            {/* Toggles power button background color */}
            { on ? <YouTube iframeClassName=' grow' className=' flex flex-col justify-center' title={channel} videoId={channel} opts={opts} onReady={(event) => setPlayer(event.target)} /> : <div className=' h-full' style={{ width: '100%', background: 'gray' }} /> }

            <div className=' flex grow justify-center items-center pt-2 text-xs flex-wrap m-1'>

                <button onClick={volumeUp}>Volume Up</button>
                <button onClick={volumeDown}>Volume Down</button>
                <button onClick={channelUp}>Channel Up</button>
                <button onClick={channelDown}>Channel Down</button>

                <label htmlFor="power" className={`${ !on ? 'bg-red-700' : 'bg-green-700' } p-2 rounded-md cursor-pointer`} onClick={switchOnOffTV}>Power Button</label>
                <input type="checkbox" name="power-button" id="power" className=" appearance-none"/>
            </div>

        </aside>
    </>
  )
}

export default Television;
import YouTubeEmbed from './YouTubeEmbed.jsx'

const Television = () => {

  return (
    <>
        <aside className=' p-4 bg-black'>
            <YouTubeEmbed src={"https://www.youtube.com/embed/LaBY6Jdhu5Q"} title={"From zero to hero with Microsoft Graph API – July 2021"}/>

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
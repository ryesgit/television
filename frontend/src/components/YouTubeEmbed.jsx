import React from 'react'

const YouTubeEmbed = ({ src, title }) => {
  return (
    <>
        <iframe width="853" height="480" src={`${src}?autoplay=1&mute=1`} title={title} frameborder="0" autoplay allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </>
  )
}

export default YouTubeEmbed
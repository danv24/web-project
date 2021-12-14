import React from 'react'
import ParticleBackground from '../particles/ParticleBackground'
import FetchPictures from '../PhotoCarouselFolder/FetchPictures'

import "./Home.css"
function Home() {
    return (
        <div className="home-div">
        <ParticleBackground className="particles"/>

        <div className="paricles-div">
            <h1 className="home-title">מרחב צפון</h1>
            <img alt="home" className="mountain-image" src="../photos/mountain.jpeg"/>
            <FetchPictures />
            </div>

        </div>
    )
}

export default Home

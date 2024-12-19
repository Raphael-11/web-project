import React from 'react'
import './Hero.css'
import hero_image from '../Assets/hero_image.jpg'
import hand_icon from '../Assets/hand_icon.jpg'
import arrow_icon from '../Assets/arrow_icon.png'

const Hero = () => {
  return (
    <div className='hero'>
    <div className="hero-left">

    <h2>New arrival only</h2>
    <div>

<p>Collection</p>
<p>For everyone</p>

    </div>
    <div className="hero-latest-btn">
        
          <div>
         Latest Collection
    </div>
    <img src='arrow_icon' alt='' />
    </div>
</div>    
<div className="hero-right">
    <img src={hero_image} alt=''/>



</div>
    </div>

  );
};
export default Hero;
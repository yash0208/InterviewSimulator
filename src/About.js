import React, { Component } from "react";
import "./About.css";
import audioimage from './assets/audio.jpg';
import videoimage from './assets/video.jpg';
import textimage from './assets/text.jpg';

class About extends Component {
  render() {
    return (
      <>

        <section id="about">
        
          <div className="about-heading">
            <h1>What We Offer</h1>
          </div>
          <div className="about-container">
            <div className="about-item">
              <img src={audioimage} alt="Image 1" />
              <p>We determine the emotional state of the interviewee with the change in tones of their speech.</p>
            </div>
            <div className="about-item">
              <img src={videoimage} alt="Image 2" />
              <p>We examine the facial expressions and eye movements to ascertain emotion of the interviewee and track their gaze.</p>
            </div>
            <div className="about-item">
              <img src={textimage} alt="Image 3" />
              <p>With the lingual analysis we figure out the interviewee's Ocean's personality.</p>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default About;

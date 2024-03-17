import React, { Component } from "react";
import ParticlesBg from "particles-bg";
import './Header.css';
import About from "./About";

class Header extends Component {
  smoothScroll = (target) => {
    const targetElement = document.querySelector(target);
    const targetOffset = targetElement.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: targetOffset,
      behavior: "smooth"
    });
  };

  render() {
    return (
      <>
      <header id="home">
        <ParticlesBg type="circle" bg={true} />

        <nav id="nav-wrap">
          <ul id="nav" className="nav">
            <li className="current">
              <a className="smoothscroll" href="#home" onClick={() => this.smoothScroll("#home")}>
                Home
              </a>
            </li>
            <li>
              <a className="smoothscroll" href="#about" onClick={() => this.smoothScroll("#about")}>
                About
              </a>
            </li>
            <li>
              <a className="smoothscroll" href="#login" onClick={() => this.smoothScroll("#login")}>
                Login/Sign Up
              </a>
            </li>
          </ul>
        </nav>

        <div className="banner-text">
          <h1>IntuitiHire</h1>
        </div>
        
      </header>
      <About/>
      </>
    );
  }
}

export default Header;
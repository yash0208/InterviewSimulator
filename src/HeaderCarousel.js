import React from "react";
import Slider from "react-slick";

import imgVideo from "./assets/interview.mp4";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const listOfVideos = [
  {
    videoSrc: imgVideo,
    name: "video-img-1",
  },
  {
    videoSrc: imgVideo,
    name: "video-img-2",
  },
  {
    videoSrc: imgVideo,
    name: "video-img-3",
  },
  {
    videoSrc: imgVideo,
    name: "video-img-4",
  },
  {
    videoSrc: imgVideo,
    name: "video-img-5",
  },
];

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

const HeaderCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="slider-container">
      <h1 className="text-center">Stories from the Interview Chair</h1>
      <p className="text-center" style={{ fontSize: "1.2rem" }}>
        Unveiling sample interview dynamics
      </p>
      <Slider {...settings} style={{ maxWidth: "95%", margin: "0 auto" }}>
        {listOfVideos.map((videoItem) => {
          return (
            <div key={videoItem.name}>
              {/* <img
                src={videoItem.videoSrc}
                alt={videoItem.name}
                style={{ width: "100%", padding: 10 }}
              /> */}
              <video controls style={{ width: "100%", padding: 10 }}>
                <source src={videoItem.videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default HeaderCarousel;

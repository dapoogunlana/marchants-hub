import React, { useEffect, useState } from 'react';
import './scroll-to-top.scss';

function ScrollToTop() {

  const [showArrow, setShowArrow] = useState(false);
  const screenHeight = window.innerHeight;

  const scrollToTop = () => {
    window.scrollTo({
      behavior: 'smooth',
      left: 0,
      top: 0,
    });
  }

  useEffect(() => {
    document.addEventListener('scroll', () => {
      const position = window.pageYOffset;
      (position > (screenHeight * 0.7)) ? setShowArrow(true) : setShowArrow(false);
    });
  });

  return (
    <div className={'scroll-to-top ' + (showArrow ? '' : 'hide-arrow')} onClick={scrollToTop}>
      <i className="fa-solid fa-arrow-up"></i>
    </div>
  );
}

export default ScrollToTop;

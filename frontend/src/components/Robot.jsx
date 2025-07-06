import React from 'react';
import Spline from '@splinetool/react-spline';
import TypingEffect from './TypingEffect';
const Robot = () => {
  return (
    <div className="flex justify-center bg-bg-dark items-center  pb-10 flex-col lg:flex-row gap-6">
      <TypingEffect />

        <Spline
          scene="https://prod.spline.design/9vrxvm7fDwLq4QF3/scene.splinecode"
          style={{
            width: 600,
            height: 700
          }}
        />
    </div>
  );
};

export default Robot;

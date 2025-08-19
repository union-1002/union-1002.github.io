import { useState } from 'react';
import { Link } from 'react-router';



function HodaengPage() {


  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-20"
        style={{ backgroundImage: "url('images/hodaeng_back.png')" }}
      />
      <div className="absolute inset-0 bg-black/60 -z-10" />
      <div className="w-full h-full flex flex-col justify-center items-center overflow-auto py-10">
        <div className='mt-5 text-center flex gap-2 justify-center'>
          <img
            src="images/hodaeng_main.png"
            className="w-250 h-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default HodaengPage;
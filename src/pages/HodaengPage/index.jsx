import { useState } from 'react';
import { Link } from 'react-router';



function HodaengPage() {


  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-20"
        style={{ backgroundImage: "url('images/back_bday_W.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/60 -z-10" />
      <div className="w-full h-full flex flex-col justify-center items-center overflow-auto py-10">
        <div className="flex flex-col items-center text-center text-white">

        </div>
        <div className='mt-5 text-center flex gap-2 justify-center'>
          <Link
            to="/happybdayM"
            className="inline-block px-10 py-10 text-white/60 border border-white/60 hover:text-white hover:border-white transition rounded-md"
          >
            ← 리더 생일
          </Link>
          <Link
            to="/happybdayBK"
            className="inline-block px-10 py-10 text-white/60 border border-white/60 hover:text-white hover:border-white transition rounded-md"
          >
            비광 생일 →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HodaengPage;
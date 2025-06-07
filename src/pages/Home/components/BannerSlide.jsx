import { useState, useEffect } from "react";
import { useUser } from '@/shared/user';
import banner1 from '../images/banner1.png';
import banner2 from '../images/banner2.png';
import banner3 from '../images/banner3.png';
import banner4 from '../images/banner4.png';
import banner5 from '../images/banner5.png';
import banner_n from '../images/banner_n.png';
import banner_h from '../images/banner_h.jpg';





const BannerSlide = () => {
  const user = useUser(); // 로그인 정보
  const [current, setCurrent] = useState(0);

  const images = [
    ...(user.part === '새붉은 재앙' ? [banner_n] : []),
    banner1,
    banner2,
    banner3,
    banner4,
    banner5,
  ];

  // 5초마다 자동 이동
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full pt-[56.25%] overflow-hidden rounded-md">
      {/* 이미지 */}
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt="banner"
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${index === current ? "opacity-100" : "opacity-0"}`}
        />
      ))}

      {/* 좌우 버튼 */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-md shadow-md rounded-full w-6 h-6 lg:w-12 lg:h-12 text-lg hover:bg-white transition"
      >
        &lt;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-md shadow-md rounded-full w-6 h-6 lg:w-12 lg:h-12 text-lg hover:bg-white transition"
      >
        &gt;
      </button>
    </div>
  );
};


export default BannerSlide;
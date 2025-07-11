import { useState, useEffect } from "react";
import { useUser } from '@/shared/user';
import banner8 from '../images/banner8.jpg';
import banner9 from '../images/banner9.jpg';
import banner10 from '../images/banner10.gif';
import banner11 from '../images/banner11.jpg';
import banner7 from '../images/banner7.jpg';
import banner5 from '../images/banner5.png';
import banner_n from '../images/banner_n.png';
import banner6 from '../images/banner6.jpg';
import banner_w from '../images/banner_w.jpg';
import banner_e from '../images/banner_e.jpg';
import banner_u from '../images/banner_u.jpg';
import banner_d from '../images/banner_d.jpg';
import banner_hu from '../images/banner_hu.jpg';
import banner_nn from '../images/banner_n.jpg';
import banner_hday from '../images/banner_hday.jpg';
import banner_mday from '../images/banner_mday.gif';





const BannerSlide = () => {
  const user = useUser(); // 로그인 정보
  const [current, setCurrent] = useState(0);

  const images = [
    ...(user.part === '새붉은 재앙' ? [banner_n] : []),
    ...(user.part === '울프독' ? [banner_mday] : []),
    ...(user.part === '울프독' ? [banner_w] : []),
    ...(user.part === '이글아이' ? [banner_hday] : []),
    ...(user.part === '이글아이' ? [banner_e] : []),
    ...(user.part === '드라칼' ? [banner_d] : []),
    ...(user.part === '헌터즈' ? [banner_nn] : []),
    ...(user.part === '헌터즈' ? [banner_hu] : []),
    banner7,
    banner9,
    banner8,
    banner10,
    banner11,
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
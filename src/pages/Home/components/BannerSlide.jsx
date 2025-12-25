import { useState, useEffect } from "react";
import { useUser } from '@/shared/user';
import banner5 from '../images/banner5.png';
import banner25_2 from '../images/banner_25_2.png';
import banner25_3 from '../images/banner_25_3.png';
import banner25_4 from '../images/banner_25_4.png';
import banner25_5 from '../images/banner_25_5.png';
import banner25_6 from '../images/banner_25_6.png';
import banner25_7 from '../images/banner_25_7.png';
import banner25_8 from '../images/banner_25_8.png';
import banner25_9 from '../images/banner_25_9.png';
import banner25_10 from '../images/banner_25_10.png';
import banner_n from '../images/banner_n.png';






const BannerSlide = () => {
  const user = useUser(); // 로그인 정보
  const [current, setCurrent] = useState(0);

  const images = [
    ...(user.part === '새붉은 재앙' ? [banner_n] : []),
    ...(user.part === '헌터즈' ? [banner25_6] : []),
    ...(user.part === '이글아이' ? [banner25_7] : []),
    ...(user.part === '울프독' ? [banner25_8] : []),
    ...(user.part === '드라칼' ? [banner25_9] : []),
    ...(user.part === '언더 그라운드' ? [banner25_10] : []),
    banner25_2,
    banner25_3,
    banner25_4,
    banner25_5,
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
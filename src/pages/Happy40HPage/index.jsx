import { useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { useUser } from '@/shared/user';

const milestones = [
  { label: '시작', date: '2025.05.02' },
  { label: '100,000', date: '2025.05.16' },
  { label: '200,000', date: '2025.06.08' },
  { label: '300,000', date: '2025.06.25' },
  { label: '400,000', date: '2025.07.14' },
]



function Happy40HPage() {
  const [reached, setReached] = useState(0)
  const [circleReached, setCircleReached] = useState([true, false, false, false, false])

  const handleClick = (idx) => {
    if (idx <= reached + 1) {
      setReached(idx)

      // 일정 시간 후 원 색도 바뀌게
      const newCircle = [...circleReached]
      setTimeout(() => {
        newCircle[idx] = true
        setCircleReached(newCircle)
      }, 600) // 선 애니메이션 시간보다 약간 뒤
    }
  }


  return (
    <div className='bg-[#fff8fe] w-full min-h-screen'>
      <div className="relative flex flex-col items-center pt-10 pb-10 mx-auto">
        {milestones.map((milestone, idx) => (
          <div
            key={idx}
            className={`z-20 cursor-pointer group ${
              idx === 4 ? 'flex flex-col items-center' : 'flex items-start'
            }`}
          >
            <div className="w-full flex flex-col items-center px-4">
              {/* 원 */}
              {idx === 4 ? (
                // ✅ 40만 마일스톤 (액자 + 이미지 + 까만 필터)
                <div className='mt-30'>
                  <div className='text-center'>
                    <p className='font-h text-3xl'>Congratulations</p>
                    <p className='font-h text-3xl'>400,000</p>

                  </div>
                  <div
                    className="w-full max-w-3xl aspect-[1/1] grid place-items-center overflow-hidden"
                    onClick={() => handleClick(4)}>
                    {/* 이미지 */}
                    <div className="col-start-1 row-start-1 w-full h-full z-0">
                      <img
                        src="/images/H_40.png"
                        alt="이미지"
                        className="w-full h-full object-cover scale-65"
                      />
                    </div>

                    {/* 필터 (프레임 아래로 이동) */}
                    <div
                      className="col-start-1 row-start-1 w-full h-full bg-black transition-opacity duration-700 z-10 pointer-events-none scale-65"
                      style={{ opacity: circleReached[4] ? 0 : 1 }}
                    />

                    {/* 프레임 (제일 위) */}
                    <div className="col-start-1 row-start-1 w-full h-full z-20 pointer-events-none">
                      <img
                        src="/images/H_40_frame.png"
                        alt="프레임"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>
            


              ) : (
                // 나머지 마일스톤은 기본 원
                <div
                  className={`w-6 h-6 rounded-full border-2 transition-all duration-300 cursor-pointer
                    ${circleReached[idx] ? 'bg-[#ff87c7] border-[#ff87c7]' : 'bg-white border-gray-400'}
                  `}
                  onClick={() => handleClick(idx)}
                />
              )}



              {/* 선 */}
              {idx < 3 && (
                <div className="relative w-1 h-20 bg-gray-300 overflow-hidden mx-auto">
                  <div
                    className="absolute top-0 left-0 w-full bg-[#ff87c7] transition-all duration-700 origin-top"
                    style={{
                      height: idx < reached ? '100%' : '0%',
                    }}
                  />
                </div>
              )}
            </div>

            {idx === 4 ? (
              // ✅ 40만: 이미지 아래쪽 텍스트
              <div className="flex flex-col items-center mt-2 text-center">
                <p className="text-3xl font-h">Um darüber hinauszugehen</p>
                <p className="text-2xl font-h">Herbert Peter Schneider</p>
                <p
                  className={`text-[#ff87c7] transition-opacity duration-500 mt-3 ${
                    circleReached[idx] ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {milestone.date}
                </p>
                
              </div>
            ) : (
              // ✅ 나머지 마일스톤: 지금처럼 텍스트 옆
              <div className="pt-1">
                <p className="text-sm">{milestone.label}</p>
                <p
                  className={`text-xs text-[#ff87c7] transition-opacity duration-500 ${
                    circleReached[idx] ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {milestone.date}
                </p>
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}

export default Happy40HPage;
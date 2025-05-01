function TeamIntroCard({
  className,
  name,
  name_en,
  title,
  content,
}) {
  return (
    <div className={`flex flex-col lg:flex-row w-full space-y-4 lg:space-y-0 lg:space-x-8 border-[0.5px] px-6 lg:px-2 py-10 mb-2 ${className}`}>
      
      {/* 좌측: 제목+가로줄 */}
      <div className="flex flex-col w-full lg:w-1/4">
        <h2 className="text-xl font-bold text-center mb-2">
          {name}
        </h2>
        <div className="w-30 h-[0.5px] bg-[#435373] mx-auto mb-2"></div>
        <h2 className="text-sm text-center">
          {name_en}
        </h2>
      </div>
      {/* 우측: 내용 */}
      <div className="w-full lg:w-2/3 text-sm leading-relaxed text-center lg:text-left text-gray-700 lg:flex-row">
        <p className="font-song">{title}</p><br />
        <p className="whitespace-pre-line">{content}</p>
      </div>
    </div>
  );
}

export default TeamIntroCard;

export default function CharacterDetail({ selected, revealedFields, setRevealedFields }) {
  if (!selected) return null;

  return (
    <div className="mt-12 text-center w-full flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-2">{selected.name}</h2>
      <p className="text-lg text-gray-700 mb-6">{selected.nickname}</p>


      <div className="grid grid-cols-2 lg:max-w-lg w-full text-left">
        <div className="border border-gray-300 p-4">
          <p className="text-xs text-gray-500 mb-1">생일</p>
          <p className="text-sm font-medium">{selected.birthday}</p>
        </div>
        <div className="border-b border-r border-t border-gray-300 p-4">
          <p className="text-xs text-gray-500 mb-1">나이</p>
          <p className="text-sm font-medium">{selected.age}세</p>
        </div>
        <div className="border-b border-l border-r border-gray-300 p-4">
          <p className="text-xs text-gray-500 mb-1">키</p>
          <p className="text-sm font-medium">{selected.height}cm</p>
        </div>
        <div className="border-b border-r border-gray-300 p-4">
          <p className="text-xs text-gray-500 mb-1">세대</p>
          <p className="text-sm font-medium">{selected.gen}세대</p>
        </div>
        <div className="border-b border-l border-r border-gray-300 p-4">
          <p className="text-xs text-gray-500 mb-1">본명</p>
          <p
            className={`text-sm font-medium cursor-pointer ${
              revealedFields.fullname
                ? 'transition-[filter] duration-300 ease-out blur-none'
                : 'transition-none [filter:blur(5px)]'
            }`}
            onClick={() => setRevealedFields({ ...revealedFields, fullname: true })}
          >
            {selected.fullname}<br />
            {selected.engname}
          </p>
        </div>
        <div className="border-b border-r border-gray-300 p-4">
          <p className="text-xs text-gray-500 mb-1">출신</p>
          <p
            className={`text-sm font-medium cursor-pointer ${
              revealedFields.nationality
                ? 'transition-[filter] duration-300 ease-out blur-none'
                : 'transition-none [filter:blur(5px)]'
            }`}
            onClick={() => setRevealedFields({ ...revealedFields, nationality: true })}
          >
            {selected.nationality}
          </p>
        </div>
        <div className="col-span-2 p-4 border-b border-l border-r border-gray-300">
          <p className="text-xs text-gray-500 mb-1">기타</p>
          <p className="text-sm font-medium whitespace-pre-line">{selected.etc}</p>
        </div>
      </div>
    </div>
  );
}

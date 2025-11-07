import CrownIcon from './CrownIcon';

const leaderInitials = ['E', 'H', 'M', 'J', 'R', '라', '사',];

const leaderGemColors = {
  E: '#60A5FA',
  H: '#0B0C10',
  M: '#9B5DE5',
  J: '#0F52BA',
  R: '#DF564E',
  라: '#A41313',
  사: '#E6E6FA',
};

export default function CharacterList({ groupedByGroup, selected, onSelect, getTitlesForPair, revealedTitles, handleReveal }) {
  return (
    <>
      {Object.entries(groupedByGroup).map(([groupName, members]) => (
        <div key={groupName} className="mb-8 w-full flex justify-center">
          <div className="flex justify-center flex-wrap max-w-4xl w-full">
            {members.map(emp => (
              <div key={emp.id} className="flex flex-col items-center" style={{ minWidth: '9rem', maxWidth: '9rem', minHeight: '10rem' }}>
                <div className="relative">
                  <button
                    onClick={() => onSelect(emp)}
                    className="w-20 h-20 flex items-center justify-center text-xl font-bold shadow-md"
                    style={{
                      backgroundColor: emp.color || '#eee',
                      border: `2px solid ${emp.border_color || '#999'}`,
                      borderRadius: '9999px',
                    }}
                  >
                    {emp.initials}
                  </button>
                  {selected?.initials === emp.initials && (
                    <div
                      className="absolute -top-1 left-0.5 w-7 h-7 rounded-full"
                      style={{
                        backgroundColor: emp.border_color || '#999',
                        border: '2px solid white',
                      }}
                    />
                  )}

                  {/* 👑 리더 왕관 추가 */}
                  {leaderInitials.includes(emp.initials) && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 drop-shadow">
                      <CrownIcon
                        className="w-7 h-7"
                        color={emp.color}
                        border={emp.border_color}
                        gemColor={leaderGemColors[emp.initials]}
                      />
                    </div>
                  )}
                </div>

                {selected && selected.initials !== emp.initials && (
                  <div className="mt-2 text-xs text-gray-700 flex flex-col items-center">
                    {(getTitlesForPair(selected.initials, emp.initials) || [{ text: '-', is_spoiler: false }]).map(
                      (title, idx) => (
                        <div
                          key={`${title.text}-${idx}`}
                          className={`whitespace-pre-line text-center cursor-pointer transition-[filter] duration-300 ease-out ${
                            revealedTitles.has(`${selected.initials}-${emp.initials}-${idx}`) || !title.is_spoiler
                              ? 'blur-none'
                              : '[filter:blur(5px)]'
                          }`}
                          onClick={() => handleReveal(selected.initials, emp.initials, idx)}
                        >
                          {title.text}
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

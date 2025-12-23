import CrownIcon from './CrownIcon';
import RibbonIcon from './RibbonIcon';
import FolderIcon from "./FolderIcon";
import LockIcon from "./LockIcon";


const leaderInitials = ['E', 'H', '?', 'B', '라', '사',];

const leaderGemColors = {
  E: '#4da6ff',
  H: '#474342',
  라: '#000000',
  사: '#d1d1d1',
  B: '#7dbbff',
  '?': '#ffffff'
};

const leaderColors = {
  E: '#c6aca3',
  H: '#f8cddd',
  라: '#a41313',
  사: '#ffffff',
  B: '#ffe1de',
  '?': '#e2e2e2'
}

const leaderBorders = {
  E: '#68533a',
  H: '#ff99b4',
  라: '#000000',
  사: '#adadad',
  B: '#ffa9b1',
  '?': '#8c8c8c'
}

const grimStaffsInitials = ['에'];

const ribbonColors = {
  T: '#8EBCAF',
  에: '#9CF3D4',
};

export default function CharacterList({ groupedByGroup, selected, onSelect, getTitlesForPair, revealedTitles, handleReveal }) {
  return (
    <>
      {Object.entries(groupedByGroup).map(([groupName, members]) => (
        <div key={groupName} className="w-full flex justify-center">
          <div className="flex justify-center flex-wrap max-w-4xl w-full">
            {members.map(emp => (
              <div key={emp.id} className="flex flex-col items-center mb-8" style={{ minWidth: '8rem', maxWidth: '8rem', minHeight: '10rem' }}>
                <div className="relative">
                  <button
                    onClick={() => onSelect(emp)}
                    className="w-20 h-20 relative flex items-center justify-center"
                    style={{ background: "transparent" }}
                  >
                    <FolderIcon
                      className="w-20 h-20"
                      stroke={emp.border_color_5y || "#999"}
                      topColor={emp.gradient_5y}
                    />

                    {/* SVG 위에 initials */}
                    <span
                      className="absolute inset-0 flex items-center justify-center font-semibold select-none"
                      style={{ color: "#000" }}
                    >
                      {emp.initials}
                    </span>
                  </button>

                  {selected?.initials === emp.initials && (
                    <div className="absolute top-1 right-0.5">
                      <LockIcon className="w-7 h-7" color={emp.border_color_5y || "#999"} />
                    </div>
                  )}

                  {/* 👑 리더 왕관 추가 */}
                  {leaderInitials.includes(emp.initials) && (
                    <div className="absolute top-0 left-3 -translate-x-1/2 drop-shadow">
                      <CrownIcon
                        className="w-6 h-6"
                        color={leaderColors[emp.initials]}
                        border={leaderBorders[emp.initials]}
                        gemColor={leaderGemColors[emp.initials]}
                      />
                    </div>
                  )}
                  {grimStaffsInitials.includes(emp.initials) && (
                    <div className="absolute top-0 left-3 -translate-x-1/2 drop-shadow">
                      <RibbonIcon
                        color={ribbonColors[emp.initials]}
                        border={emp.border_color}
                        size={28}
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

import { useState } from 'react';
import { Link } from 'react-router';
import { useUser } from '@/shared/user';
import { useMemberData } from './hooks/useMemberData';
import CharacterList from './CharacterList';
import CharacterDetail from './CharacterDetail';
import CharacterFormModal from './CharacterFormModal';
import UserTitleEditModal from './UserTitleEditModal';
import CharacterTitleModal from './CharacterTitleModal';
import AdMonth from "../../components/AdBottom";
import AdBottom from '../../components/AdBottom';


export default function Member5yIntroPage() {
  const user = useUser();
  const { employees, titles, setTitles, allInitials, fetchCharacters } = useMemberData(user);
  const refreshList = fetchCharacters;
  const [selected, setSelected] = useState(null);
  const [revealedTitles, setRevealedTitles] = useState(new Set());
  const [revealedFields, setRevealedFields] = useState({ fullname: false, nationality: false });

  const [isCharModalOpen, setCharModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // add | edit

  const [isUserEditModalOpen, setUserEditModalOpen] = useState(false); // 유저 상호호칭 수정
  const [isTitleModalOpen, setTitleModalOpen] = useState(false);

  const nameMap = Object.fromEntries(employees.map(e => [e.initials, e.name]));



  const groupedByGroup = employees.reduce((acc, emp) => {
    const groupName = emp.group_name || '기타';
    if (!acc[groupName]) acc[groupName] = [];
    acc[groupName].push(emp);
    return acc;
  }, {});

  const handleReveal = (from, to, idx) => {
    setRevealedTitles(prev => new Set(prev).add(`${from}-${to}-${idx}`));
  };

  const getTitlesForPair = (from, to) =>
    titles.filter(t => t.from_initials === from && t.to_initials === to);

  return (
    <div className="relative w-full min-h-[100dvh] overflow-y-auto">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-20"
        style={{ backgroundImage: "url('/images/5y_back.jpg')" }}
      />
        <div className="flex flex-col items-center space-y-4 w-full py-8 px-2 lg:px-0">

          {user.isAdmin && (
            <button
              className="bg-blue-600 text-white px-3 py-1 rounded mb-2"
              onClick={() => {
                setModalMode('add');
                setSelected(null);
                setCharModalOpen(true);
              }}
            >
              ＋ 캐릭터 추가
            </button>
          )}

          <Link
            to="/memberIntro"
            className="
              inline-flex items-center gap-2
              px-3 py-1.5
              rounded-md
              border border-gray-200
              text-xs tracking-wide
              text-gray-600
              hover:bg-gray-100 hover:text-gray-900
              transition
            "
          >
            ⟵ 보안 문서 접속 종료
          </Link>


          {isUserEditModalOpen && (
            <UserTitleEditModal
              user={user}
              allInitials={allInitials}
              onClose={() => setUserEditModalOpen(false)}
            />
          )}

          <CharacterList
            groupedByGroup={groupedByGroup}
            selected={selected}
            onSelect={emp => {
              setSelected(emp);
              setRevealedFields({ fullname: false, nationality: false });
            }}
            getTitlesForPair={getTitlesForPair}
            revealedTitles={revealedTitles}
            handleReveal={handleReveal}
          />

          <CharacterDetail
            selected={selected}
            revealedFields={revealedFields}
            setRevealedFields={setRevealedFields}
          />

          {selected && user.isAdmin && (
            <div className="gap-0.5 flex">
              <button
                className="px-3 py-1 bg-gray-700 text-white rounded"
                onClick={() => {
                  setModalMode('edit');
                  setCharModalOpen(true);
                }}
              >
                수정
              </button>
              <button
                className="bg-gray-700 text-white px-3 py-1 rounded"
                onClick={() => setTitleModalOpen(true)}
              >
                상호호칭 수정
              </button>
            </div>
            
          )}
          {/* 공용 모달 */}
          {isCharModalOpen && (
            <CharacterFormModal
              mode={modalMode}
              selected={selected}
              onClose={() => setCharModalOpen(false)}
              onSave={refreshList}
            />
          )}
          {isTitleModalOpen && selected && (
            <CharacterTitleModal
              character={selected}
              nameMap={nameMap}
              allInitials={allInitials}
              onClose={() => setTitleModalOpen(false)}
              onSave={() => console.log('저장 완료')}
            />
          )}

          <div className="w-full mt-20">
            <AdBottom />
          </div>

        </div>
    </div>
  );
}

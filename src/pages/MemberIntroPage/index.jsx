import { useState } from 'react';
import MainLayout from '@/shared/MainLayout';
import PageLayout from '@/shared/PageLayout';
import { MENU_PROPS } from '@/shared/SideNavigationBar';
import { useUser } from '@/shared/user';
import supabase from '@/shared/supabase';
import { useMemberData } from './hooks/useMemberData';
import CharacterList from './CharacterList';
import CharacterDetail from './CharacterDetail';
import EditModal from './EditModal';
import CharacterFormModal from './CharacterFormModal';
import UserTitleEditModal from './UserTitleEditModal';

export default function MemberIntroPage() {
  const user = useUser();
  const { employees, titles, setTitles, allInitials, fetchCharacters } = useMemberData(user);
  const refreshList = fetchCharacters;
  const [selected, setSelected] = useState(null);
  const [revealedTitles, setRevealedTitles] = useState(new Set());
  const [revealedFields, setRevealedFields] = useState({ fullname: false, nationality: false });

  const [isCharModalOpen, setCharModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // add | edit

  const [isUserEditModalOpen, setUserEditModalOpen] = useState(false); // 유저 상호호칭 수정



  const groupedByGroup = employees.reduce((acc, emp) => {
    const groupName = emp.groups?.group_name || '기타';
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
    <MainLayout>
      <PageLayout title="직원 소개" sidebar={MENU_PROPS['유니온 소개']}>
        <div className="flex flex-col items-center space-y-4 w-full">

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

          {user.isLoggedIn && (
            <button
              className="bg-[#404040] text-white px-2 py-1 rounded mb-10"
              onClick={() => setUserEditModalOpen(true)}
            >
              ◆
            </button>
          )}

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
            <button
              className="px-4 py-2 bg-gray-700 text-white rounded"
              onClick={() => {
                setModalMode('edit');
                setCharModalOpen(true);
              }}
            >
              수정
            </button>
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
        </div>
      </PageLayout>
    </MainLayout>
  );
}

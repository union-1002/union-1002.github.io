import { useEffect, useState } from 'react';
import supabase from '@/shared/supabase';

export default function CharacterFormModal({ mode = 'add', selected, onClose, onSave }) {
  const [groups, setGroups] = useState([]);
  const [form, setForm] = useState({
    name: '',
    nickname: '',
    initials: '', // ✅ 추가
    birthday: '',
    age: '',
    height: '',
    gen: '',
    fullname: '',
    engname: '',
    nationality: '',
    etc: '',
    group_id: null,
    is_public: true,
    era: 'current', // ✅ era 필드 추가
  });

  // 🔹 그룹 목록 불러오기 및 수정 모드 초기값 세팅
  useEffect(() => {
    const fetchGroups = async () => {
      const { data, error } = await supabase
        .from('groups')
        .select('id, group_name, color, border_color');
      if (!error) setGroups(data);
    };
    fetchGroups();

    // 수정 모드일 때 기존 값 세팅
    if (mode === 'edit' && selected) {
      setForm({
        name: selected.name || '',
        nickname: selected.nickname || '',
        initials: selected.initials || '', // ✅ 추가
        birthday: selected.birthday || '',
        age: selected.age || '',
        height: selected.height || '',
        gen: selected.gen || '',
        fullname: selected.fullname || '',
        engname: selected.engname || '',
        nationality: selected.nationality || '',
        etc: selected.etc || '',
        group_id: selected.groups?.id || selected.group_id || null, // ✅ 기존 부서 유지
        is_public: selected.is_public ?? true, // ✅ 공개 여부 유지
        era: selected.era || 'current', // ✅ 기존 era 유지
      });
    }
  }, [mode, selected]);

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleSubmit = async () => {
    const payload = { ...form };
    if (mode === 'edit') payload.id = selected.id;

    const { error } = await supabase.from('characters').upsert(payload);
    if (error) {
      console.error('❌ 저장 실패:', error);
      alert('저장 실패');
      return;
    }

    onSave();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-[90vw] max-w-xl">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          {mode === 'add' ? '캐릭터 추가' : '캐릭터 수정'}
        </h2>

        <div className="grid grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto">
          {/* 이름 */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">이름</label>
            <input
              className="w-full border border-gray-300 rounded px-2 py-1.5 focus:ring-1 focus:ring-blue-400"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>

          {/* 닉네임 */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">닉네임</label>
            <input
              className="w-full border border-gray-300 rounded px-2 py-1.5 focus:ring-1 focus:ring-blue-400"
              value={form.nickname}
              onChange={(e) => handleChange('nickname', e.target.value)}
            />
          </div>

          {/* ✅ 이니셜 */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">이니셜</label>
            <input
              className="w-full border border-gray-300 rounded px-2 py-1.5 uppercase tracking-wide focus:ring-1 focus:ring-blue-400"
              placeholder="예: R, L, J"
              value={form.initials}
              onChange={(e) => handleChange('initials', e.target.value)}
            />
          </div>

          <div></div> {/* 균형 맞춤용 빈칸 */}

          {/* 생일 */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">생일</label>
            <input
              className="w-full border border-gray-300 rounded px-2 py-1.5 focus:ring-1 focus:ring-blue-400"
              value={form.birthday}
              onChange={(e) => handleChange('birthday', e.target.value)}
            />
          </div>

          {/* 나이 */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">나이</label>
            <input
              className="w-full border border-gray-300 rounded px-2 py-1.5 focus:ring-1 focus:ring-blue-400"
              value={form.age}
              onChange={(e) => handleChange('age', e.target.value)}
            />
          </div>

          {/* 키 */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">키(cm)</label>
            <input
              className="w-full border border-gray-300 rounded px-2 py-1.5 focus:ring-1 focus:ring-blue-400"
              value={form.height}
              onChange={(e) => handleChange('height', e.target.value)}
            />
          </div>

          {/* 세대 */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">세대</label>
            <input
              className="w-full border border-gray-300 rounded px-2 py-1.5 focus:ring-1 focus:ring-blue-400"
              value={form.gen}
              onChange={(e) => handleChange('gen', e.target.value)}
            />
          </div>

          {/* 본명 */}
          <div className="col-span-2">
            <label className="block text-xs font-semibold text-gray-600 mb-1">본명 (영문 포함)</label>
            <div className="flex gap-2">
              <input
                className="w-1/2 border border-gray-300 rounded px-2 py-1.5 focus:ring-1 focus:ring-blue-400"
                placeholder="한글명"
                value={form.fullname}
                onChange={(e) => handleChange('fullname', e.target.value)}
              />
              <input
                className="w-1/2 border border-gray-300 rounded px-2 py-1.5 focus:ring-1 focus:ring-blue-400"
                placeholder="영문명"
                value={form.engname}
                onChange={(e) => handleChange('engname', e.target.value)}
              />
            </div>
          </div>

          {/* 출신 */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">출신</label>
            <input
              className="w-full border border-gray-300 rounded px-2 py-1.5 focus:ring-1 focus:ring-blue-400"
              value={form.nationality}
              onChange={(e) => handleChange('nationality', e.target.value)}
            />
          </div>

          {/* 기타 */}
          <div className="col-span-2">
            <label className="block text-xs font-semibold text-gray-600 mb-1">기타</label>
            <textarea
              className="w-full border border-gray-300 rounded px-2 py-1.5 h-20 resize-none focus:ring-1 focus:ring-blue-400"
              value={form.etc}
              onChange={(e) => handleChange('etc', e.target.value)}
            />
          </div>
        </div>

        {/* 그룹 선택 */}
        <div className="mt-6">
          <p className="text-xs font-semibold text-gray-600 mb-2">소속 그룹</p>
          <div className="flex flex-wrap gap-2">
            {groups.map((g) => (
              <label
                key={g.id}
                className={`flex items-center gap-2 px-3 py-1 rounded-full border cursor-pointer text-sm transition ${
                  form.group_id === g.id
                    ? 'border-blue-500 bg-blue-50 font-semibold'
                    : 'border-gray-300 hover:bg-gray-100'
                }`}
              >
                <input
                  type="radio"
                  name="group"
                  value={g.id}
                  checked={form.group_id === g.id}
                  onChange={() => handleChange('group_id', g.id)}
                  className="hidden"
                />
                <span
                  className="w-3 h-3 rounded-full border"
                  style={{
                    backgroundColor:
                      form.group_id === g.id ? g.color : 'transparent',
                    borderColor: g.border_color,
                  }}
                ></span>
                <span>{g.group_name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Era 선택 */}
        <div className="mt-5">
          <p className="text-xs font-semibold text-gray-600 mb-1">시기</p>
          <div className="flex gap-4 text-sm">
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="era"
                value="current"
                checked={form.era === 'current'}
                onChange={() => handleChange('era', 'current')}
              />
              현재
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="era"
                value="past_5y"
                checked={form.era === 'past_5y'}
                onChange={() => handleChange('era', 'past_5y')}
              />
              5년 전
            </label>
          </div>
        </div>

        {/* 공개 여부 */}
        <div className="mt-5">
          <p className="text-xs font-semibold text-gray-600 mb-1">공개 여부</p>
          <div className="flex gap-4 text-sm">
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="is_public"
                checked={form.is_public === true}
                onChange={() => handleChange('is_public', true)}
              />
              공개
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="is_public"
                checked={form.is_public === false}
                onChange={() => handleChange('is_public', false)}
              />
              비공개
            </label>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            className="px-4 py-2 border rounded hover:bg-gray-100"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleSubmit}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}

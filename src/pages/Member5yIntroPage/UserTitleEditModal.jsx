import { useEffect, useState } from 'react';
import supabase from '@/shared/supabase';

export default function UserTitleEditModal({ user, allInitials, onClose }) {
  const [calling, setCalling] = useState({});
  const [called, setCalled] = useState({});

  useEffect(() => {
    const fetchCallData = async () => {
      if (!user?.uid) return;

      const { data, error } = await supabase
        .from('employees')
        .select('calling, called')
        .eq('id', user.uid)
        .single();

      if (!error && data) {
        setCalling(data.calling || {});
        setCalled(data.called || {});
      } else {
        setCalling({});
        setCalled({});
      }
    };

    fetchCallData();
  }, [user.uid]);

  const handleSave = async () => {
    const { error } = await supabase.from('employees').upsert({
      id: user.uid,
      calling,
      called,
    });
    if (!error) onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-[90vw] max-w-xl">
        <h2 className="text-xl font-bold mb-4">상호호칭 수정</h2>

        <div className="max-h-[60vh] overflow-y-auto space-y-4">
          {(allInitials || []).map(initial => (
            <div key={initial}>
              <div className="text-sm font-medium">{initial}</div>
              <input
                className="border w-full rounded px-2 py-1 mt-1 mb-2"
                placeholder="내가 부르는 호칭"
                value={calling[initial] || ''}
                maxLength={10}
                onChange={e =>
                  setCalling({ ...calling, [initial]: e.target.value })
                }
              />
              <input
                className="border w-full rounded px-2 py-1"
                placeholder="나를 부르는 호칭"
                value={called[initial] || ''}
                maxLength={10}
                onChange={e =>
                  setCalled({ ...called, [initial]: e.target.value })
                }
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button className="px-4 py-2 border rounded" onClick={onClose}>
            취소
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleSave}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}

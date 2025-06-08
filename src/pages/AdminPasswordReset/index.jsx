import { useEffect, useState } from "react";
import supabase from '@/shared/supabase';

function AdminPasswordReset() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    // members 테이블에서 모든 유저 가져오기
    supabase.from("members").select("id, username").then(({ data }) => setUsers(data));
  }, []);

  const handleReset = async () => {
    const session = (await supabase.auth.getSession()).data.session;
    const token = session?.access_token;
    const adminUid = session?.user?.id;

    const res = await fetch(`https://zcalgdptslkptkodnqun.supabase.co/functions/v1/reset_password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ adminUid, targetUid: selectedUser, newPassword })
    });

    const result = await res.json();
    if (!res.ok) alert("변경 실패: " + result.error);
    else alert("비밀번호가 변경되었습니다");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-4">🔐 비밀번호 초기화</h2>
      <select onChange={e => {
        console.log("선택된 UID:", e.target.value);
        setSelectedUser(e.target.value)}} className="mb-2 w-full border p-2">
        <option value="">-- 유저 선택 --</option>
        {users.map(u => <option key={u.id} value={u.id}>{u.username}</option>)}
      </select>
      <input
        type="text"
        placeholder="새 비밀번호"
        value={newPassword}
        onChange={e => setNewPassword(e.target.value)}
        className="mb-2 w-full border p-2"
      />
      <button onClick={handleReset} className="bg-blue-600 text-white px-4 py-2 rounded">
        비밀번호 변경
      </button>
    </div>
  );
}

export default AdminPasswordReset;
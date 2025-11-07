import { useEffect, useState } from 'react';
import supabase from '@/shared/supabase';

export function useMemberData(user) {
  const [employees, setEmployees] = useState([]);
  const [titles, setTitles] = useState([]);
  const [allInitials, setAllInitials] = useState([]);

  // ===============================================================
  // 1️⃣ 캐릭터 불러오기 (fetchCharacters 함수는 effect 밖에 둠)
  // ===============================================================
  const fetchCharacters = async () => {
    const { data, error } = await supabase
      .from('characters_with_groups')
      .select('*')
      .order('order_index', { ascending: true })
      .order('id', { ascending: true });

    if (error) {
      console.error('❌ Supabase error (characters):', error);
      return;
    }

    let list = data;

    // ✅ 로그인한 유저가 있을 경우 "나" 항목 추가
    if (user.isLoggedIn && user.uid) {
      const myGroupInfo = list.find(
        e => e.group_name === user.group?.group_name
      );

      const me = {
        id: 'me',
        initials: '나',
        name: user.username,
        fullname: user.fullname,
        engname: user.engname,
        nationality: user.nationality,
        position: myGroupInfo?.group_name || '소속 없음',
        birthday: user.birthday,
        age: user.age,
        height: user.height,
        gen: user.gen,
        etc: '',
        group_name: myGroupInfo?.group_name,
        color: myGroupInfo?.color,
        border_color: myGroupInfo?.border_color,
        order_index: myGroupInfo?.order_index
      };

      list = [...list, me];
    }

    setEmployees(list);
  };

  // 처음 한 번만 실행
  useEffect(() => {
    fetchCharacters();
  }, [user]);

  // ===============================================================
  // 2️⃣ titles 불러오기 + 유저 개인 title 병합
  // ===============================================================
  useEffect(() => {
    const fetchTitles = async () => {
      let all = [];
      let from = 0;
      const batch = 1000;
      let done = false;

      while (!done) {
        const { data, error } = await supabase
          .from('titles')
          .select('*')
          .range(from, from + batch - 1);

        if (error) {
          console.error('❌ Supabase error (titles):', error);
          break;
        }

        all = all.concat(data);
        if (data.length < batch) done = true;
        else from += batch;
      }

      all.sort((a, b) => a.id - b.id);
      setTitles(all);

      // 🔹 유저 개인 titles도 병합
      if (user.isLoggedIn) {
        await refreshUserTitles(all);
      }
    };

    const refreshUserTitles = async (baseTitles = []) => {
      const { data, error } = await supabase
        .from('employees')
        .select('calling, called')
        .eq('id', user.uid)
        .single();

      if (error) {
        console.error('❌ refreshUserTitles error:', error);
        return;
      }

      const { calling = {}, called = {} } = data;
      const newTitles = [...baseTitles];

      Object.entries(calling).forEach(([to, text]) => {
        if (!newTitles.find(t => t.from_initials === '나' && t.to_initials === to)) {
          newTitles.push({ from_initials: '나', to_initials: to, text, is_spoiler: false });
        }
      });

      Object.entries(called).forEach(([from, text]) => {
        if (!newTitles.find(t => t.from_initials === from && t.to_initials === '나')) {
          newTitles.push({ from_initials: from, to_initials: '나', text, is_spoiler: false });
        }
      });

      setTitles(newTitles);
    };

    fetchTitles();
  }, [user.uid, user.isLoggedIn]);

  // ===============================================================
  // 3️⃣ 이니셜 목록
  // ===============================================================
  useEffect(() => {
    const fetchInitials = async () => {
      const { data, error } = await supabase
        .from('characters_with_groups')
        .select('initials')
        .order('order_index', { ascending: true })
        .order('id', { ascending: true });

      if (!error && data) {
        setAllInitials(data.map(c => c.initials));
      }
    };
    fetchInitials();
  }, []);

  // ===============================================================
  // 4️⃣ 최종 반환 (fetchCharacters 포함)
  // ===============================================================
  return { employees, titles, setTitles, allInitials, fetchCharacters };
}

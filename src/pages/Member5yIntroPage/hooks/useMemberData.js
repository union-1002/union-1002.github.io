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
      .eq('era', 'past_5y')
      .order('order_index', { ascending: true })
      .order('id', { ascending: true });

    if (error) {
      console.error('❌ Supabase error (characters):', error);
      return;
    }

    setEmployees(data);
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
          .eq('era', 'past_5y')
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
    };

    fetchTitles();
  }, []);

  // ===============================================================
  // 3️⃣ 이니셜 목록
  // ===============================================================
  useEffect(() => {
    const fetchInitials = async () => {
      const { data, error } = await supabase
        .from('characters_with_groups')
        .select('initials')
        .eq('era', 'past_5y')
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

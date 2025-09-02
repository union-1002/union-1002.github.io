import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router'; // 지금 안 쓰면 지워도 됨
import supabase from '@/shared/supabase';

const PX_PER_MIN = 4;

function DeathfinalPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const { data, error } = await supabase
        .from('death_inside')
        .select('*')
        .order('publish_at', { ascending: true })
        .order("id", { ascending: true });

      if (!mounted) return;
      if (error) {
        console.error(error);
        return;
      }
      setPosts((data || []).filter(p => p.publish_at));
    })();

    return () => {
      mounted = false;
    };
  }, []);

  // 이전 글과의 시간차(분) 계산
  const gaps = useMemo(() => {
    // 방어: publish_at 없는 행 제거(이전에도 필터했지만 한 번 더 안전)
    const safe = posts.filter(p => p.publish_at);
    const ms = safe.map((p) => new Date(p.publish_at).getTime());
    const diffsMin = [];
    for (let i = 0; i < ms.length; i++) {
      if (i === 0) diffsMin.push(0);
      else {
        const diff = (ms[i] - ms[i - 1]) / 60000;
        diffsMin.push(Math.max(0, Number.isFinite(diff) ? diff : 0));
      }
    }
    return diffsMin;
  }, [posts]);

  return (
    <div className="relative w-full min-h-[100dvh] overflow-y-auto">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-20"
        style={{ backgroundImage: "url('images/inside.jpg')" }}
      />
      <div className="fixed inset-0 bg-black/60 -z-10" />
      <div className="mx-auto max-w-4xl w-full px-4 py-6 space-y-6">
        <div className="flex justify-center gap-2">
          <Link to="/" className="w-fit bg-black/20 border border-white/15 hover:bg-pink-300/20 transition p-1.5">
            🏠️
          </Link>
          <Link to="https://bangool.tistory.com/121" target="_blank" className="w-fit bg-black/20 border border-white/15 hover:bg-pink-300/20 transition p-1.5">
            🤖
          </Link>
        </div>
        {posts.map((post, idx) => (
          <div key={post.id || idx}>
            {idx > 0 && (
              <div
                style={{ height: `${gaps[idx] * PX_PER_MIN}px` }}
                className="w-px bg-transparent"
              />
            )}
            {post.id === 1 && (
              <div className="w-fit mx-auto mt-10 mb-10 py-1 px-3 text-center text-sm text-white font-mono border border-white/15 bg-white/20">
                08/24
              </div>
            )}

            {post.id === 108 && (
              <div className="w-fit mx-auto mt-10 mb-10 py-1 px-3 text-center text-sm text-white font-mono border border-white/15 bg-white/20">
                08/25
              </div>
            )}
            {/* 카드 위치 정렬 */}
            {post.location === "both" ? (
              // ✅ 가운데
              <article className="max-w-lg mx-auto rounded-2xl border border-white/15 bg-gray-700/20 backdrop-blur p-4 text-white shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                <div className="text-sm text-white/70">
                  {new Date(post.publish_at).toLocaleString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "UTC",
                  })}
                </div>
                <div className="mt-1 whitespace-pre-wrap">{post.content}</div>
              </article>
            ) : (
              // ✅ inside/outside
              <div
                className={`flex flex-col lg:flex-row ${
                  post.location === "inside"
                    ? "lg:justify-start"
                    : "lg:justify-end"
                }`}
              >
                <article
                  className={
                    "w-full lg:w-auto max-w-lg rounded-2xl border border-white/15 backdrop-blur p-4 text-white shadow " +
                    (post.location === "inside"
                      ? "bg-blue-800/30 mx-auto lg:mx-0 lg:mr-auto shadow-[0_0_30px_rgba(255,255,255,0.15)]"   // ⬅️ 기본은 가운데, lg부터 왼쪽
                      : "bg-red-800/30 mx-auto lg:mx-0 lg:ml-auto shadow-[0_0_30px_rgba(255,255,255,0.15)]")
                  }
                >
                  <div className="text-sm text-white/70">
                    {new Date(post.publish_at).toLocaleString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                      timeZone: "UTC",
                    })}
                  </div>
                  <div className="mt-1 whitespace-pre-wrap">{post.content}</div>
                </article>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>

  );
}

export default DeathfinalPage;

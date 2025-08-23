import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import { useUser } from '@/shared/user';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import supabase from '@/shared/supabase';




function DeathPage() {
  const user = useUser();

  // const [insideUrl, setInsideUrl] = useState("");

  // useEffect(() => {
  //   const { data } = supabase
  //     .storage
  //     .from("death")
  //     .getPublicUrl("inside.jpg");

  //   setInsideUrl(data.publicUrl);
  // }, []);

  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date().toLocaleTimeString("ko-KR", {
        timeZone: "Asia/Seoul",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      setTime(now);
    };

    update();

    const timer = setInterval(update, 60 * 1000);

    return () => clearInterval(timer); // cleanup
  }, []);


  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const nowKST = new Date().toLocaleString("sv-SE", {
        timeZone: "Asia/Seoul"
      }); 

      const { data, error } = await supabase
        .from("death_inside")
        .select("*")
        .lte("publish_at", nowKST) // 현재 KST 시각 이전 게시물만
        .in("location", ["inside", "both"])
        .order("created_at", { ascending: false });
      
      if (error) console.error(error);
      else setPosts(data);
      };

    fetchPosts();
  }, []);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const { data, error } = await supabase
  //       .from("death_inside")
  //       .select("*")
  //       .eq("enable", true)
  //       .in("location", ["inside", "both"])
  //       .order("created_at", { ascending: false })
  //       .limit(3);

  //     if (error) {
  //       console.error("Error fetching posts:", error);
  //     } else {
  //       setPosts(data || []);
  //     }
  //   };

  //   fetchPosts();
  // }, []);

  const latest = posts[0];
  const rest = posts.slice(1);

  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const { data, error } = await supabase
        .from("death_member")
        .select("*")
        .eq("location", "inside")
        .order("id", { ascending: true });

      if (error) {
        console.error(error);
      } else {
        setMembers(data || []);
      }
    };

    fetchMembers();
  }, []);

  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-20"
        style={{ backgroundImage: "url('images/inside.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/60 -z-10" />
      <div className="w-full h-full flex flex-col items-center overflow-auto py-6 px-2">
        <div className="lg:w-3xl w-full flex flex-col items-center text-center text-white gap-8">
          <div className="text-2xl">
            EX급 게이트(내부) 현황판
          </div>
          <Link to="/notice_outgate" className="-mt-5 border-1 text-white/60  border-white/60 hover:text-white hover:border-white transition text-sm p-1 rounded-sm">외부 현황 바로가기</Link>
          <div className="w-full p-2 border-b-1 border-t-1 border-white flex flex-row justify-between">
            <div className="">2020.08.24</div>
            <div className="">{time}</div>
          </div>
          <div className="w-full">
            {rest.slice().reverse().map((post) => (
              <div key={post.id} className="flex justify-end space-x-2 items-stretch pr-2">
                {/* 텍스트 */}
                <div className="text-right flex items-center py-1 text-sm">
                  [{post.time}] {post.content}
                </div>
                {/* 타임라인 */}
                <div className="relative flex flex-col items-center">
                  <div className="w-px bg-white flex-1"></div> {/* 세로줄 */}
                  <div className="w-2 h-2 rounded-full bg-white absolute top-1/2 -translate-y-1/2"></div> {/* 점 */}
                </div>
              </div>
            ))}
            {latest && (
              <div className="w-full p-2 bg-white/70 rounded-md shadow-[0_0_10px_rgba(35,144,255,0.5)] text-gray-800 text-lg">
                <div className="text-[#1768bc] font-semibold">{latest.time}</div>
                <div className="whitespace-pre-line">{latest.content}</div>                 
              </div>
            )}
          </div>
          <div className="w-full">
            <div
              className="cursor-pointer font-semibold"
              onClick={() => setOpen(!open)}
            >
              에스퍼 리스트 {open ? "[닫기]" : "[열기]"}
            </div>
            {open && (
              <div className="mt-2 flex flex-col gap-3">
                {members.map((m) => (
                  <div
                    key={m.id}
                    className="w-full flex p-4 rounded-2xl items-center  bg-black/40 shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                    <div className="">
                      <img
                        src={`images/death/${m.name}.png`}
                        className="w-30 h-30 rounded-md"/>
                    </div>
                    <div className="flex-1 ml-4">
                      <div className="w-full border-b-1 border-white flex flex-row justify-between px-1 items-end">
                        <div className="font-semibold text-2xl">
                          {m.name}
                        </div>
                        <div className="text-sm">
                          {m.status}
                        </div>
                      </div>
                      <div className="text-left mt-1.5">
                        나이 - {m.age}
                      </div>
                      <div className="text-left">
                        능력 - {m.ability}
                      </div>
                      <div className="mt-1.5">
                        {m.name === "F" && (
                          <div className="w-full h-3 bg-gray-700 rounded-xs overflow-hidden flex items-center justify-center relative mb-1 opacity-0 hover:opacity-100 transition duration-300">
                            <div
                              className="h-full absolute left-0 top-0 bg-[#3f1c1c]"
                              style={{ width: `${m.marker}%` }}
                            />
                            <span className="z-10 text-white text-xs">?</span>
                          </div>
                        )}
                        <div className="w-full h-6 bg-gray-700 rounded-sm overflow-hidden flex items-center justify-center relative">
                          <div
                            className="h-full bg-[#1759cc] absolute left-0 top-0"
                            style={{ width: `${m.hp}%` }}
                          />
                          <span className="z-10 text-white text-sm font-bold">HP</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>        
      </div>
    </div>
  );
}

export default DeathPage;
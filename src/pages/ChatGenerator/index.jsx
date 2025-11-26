import React, { useState, useEffect, useRef } from "react";
import { toPng } from "html-to-image";
import AdChat from "@/components/AdChat";
import supabase from "@/shared/supabase";

export default function ChatGenerator() {
  const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  const [isAdminSectionOpen, setIsAdminSectionOpen] = useState(false);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [myName, setMyName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [profileImages, setProfileImages] = useState({});
  const [customNames, setCustomNames] = useState({});
  const chatRef = useRef(null);

  /* -------------------------------
    관리자 모드 상태
  -------------------------------- */
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true"
  );
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");

  /* -------------------------------
    관리자 로그인 함수
    → 관리자 테마 불러오기 RPC 호출
  -------------------------------- */
  async function handleAdminLogin() {
    setAdminError("");

    // 관리자 테마까지 포함해 불러오는 RPC
    const { data, error } = await supabase.rpc(
      "text_ooc_get_themes_admin",
      { pw: adminPassword }
    );

    if (error) {
      console.error(error);
      if (error.message?.includes("Invalid password")) {
        setAdminError("패스워드가 틀렸습니다.");
      } else {
        setAdminError("서버 오류");
      }
      return;
    }

    if (data && data.length > 0) {
      setIsAdmin(true);
      localStorage.setItem("isAdmin", "true");

      localStorage.setItem("admin_pw", adminPassword);

      setDbThemes(data);
      localStorage.setItem("ooc_themes", JSON.stringify(data));

      if (!theme) setTheme(data[0].theme_name);
    }
  }

  async function reloadAdminThemes() {
    const savedPw = localStorage.getItem("admin_pw");
    if (!savedPw) return; // 저장된 PW 없으면 종료

    const { data, error } = await supabase.rpc(
      "text_ooc_get_themes_admin",
      { pw: savedPw }
    );

    if (error) {
      console.error("관리자 테마 재로드 실패:", error);
      return;
    }

    if (data && data.length > 0) {
      setIsAdmin(true);
      setDbThemes(data);
      localStorage.setItem("ooc_themes", JSON.stringify(data));

      if (!theme) setTheme(data[0].theme_name);
    }
  }



  /* -------------------------------
    테마 목록 상태
  -------------------------------- */
  const [dbThemes, setDbThemes] = useState([]);
  const [theme, setTheme] = useState("");

  /* -------------------------------
    첫 로드
    → 캐시 있으면 캐시 사용
    → 없으면 public RPC 사용
  -------------------------------- */
  useEffect(() => {
    const cached = localStorage.getItem("ooc_themes");

    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setDbThemes(parsed);

        if (parsed.length > 0 && !theme) {
          setTheme(parsed[0].theme_name);
        }
        return;  
      } catch (e) {
        console.error("캐시 파싱 오류:", e);
      }
    }

    // 캐시 없으면 public 버전 호출
    loadPublicThemes();
  }, []);


  /* -------------------------------
    일반 사용자용 — public 테마만 불러오기
  -------------------------------- */
  async function loadPublicThemes() {
    const { data, error } = await supabase.rpc("text_ooc_get_themes_public");

    if (error) {
      console.error("public 테마 불러오기 실패:", error);
      return;
    }

    if (data) {
      setDbThemes(data);
      localStorage.setItem("ooc_themes", JSON.stringify(data));

      if (data.length > 0 && !theme) {
        setTheme(data[0].theme_name);
      }
    }
  }


  /* -------------------------------
    테마 목록 분리
  -------------------------------- */
  const normalThemes = dbThemes.filter((t) => !t.is_admin_only);
  const adminThemes = dbThemes.filter((t) => t.is_admin_only);


  const activeTheme = dbThemes.find((t) => t.theme_name === theme) || null;


  // ===============================
  //           파싱 로직
  // ===============================
  const parseMessages = (inputText) => {
    if (!inputText.trim()) return [];

    const normalized = inputText
      .replace(/>\s*\[/g, ">\n[")
      .replace(/\]\s*</g, "]\n<");

    const lines = normalized.split("\n").map((l) => l.trim());

    const messages = [];
    let currentHeader = null;
    let pendingBody = null;

    for (let line of lines) {
      if (!line) continue;

      // --- HEADER ---
      const headerMatch = line.match(/^<\s*([^>]+?)\s*>\s*$/);
      if (headerMatch) {
        if (currentHeader && pendingBody !== null) {
          messages.push({
            from: currentHeader.from,
            time: currentHeader.time,
            to: currentHeader.to,
            body: pendingBody.trim(),
          });
        }

        const parts = headerMatch[1]
          .split("/")
          .map((s) => s.trim());

        currentHeader = {
          from: parts[0] || "",
          time: (parts[1] || "").replace(/:$/, ""),
          to: parts[2] || "",
        };

        pendingBody = null;
        continue;
      }

      // --- MESSAGE START ---
      if (line.startsWith("[")) {
        const withoutStartBracket = line.substring(1);

        if (line.endsWith("]")) {
          const content = withoutStartBracket.slice(0, -1);
          messages.push({
            from: currentHeader?.from || "",
            time: currentHeader?.time || "",
            to: currentHeader?.to || "",
            body: content.trim(),
          });
          pendingBody = null;
        } else {
          pendingBody = withoutStartBracket;
        }
        continue;
      }

      // --- MULTILINE ---
      if (pendingBody !== null) {
        if (line.endsWith("]")) {
          const withoutEndBracket = line.slice(0, -1);
          pendingBody += "\n" + withoutEndBracket;

          messages.push({
            from: currentHeader.from,
            time: currentHeader.time,
            to: currentHeader.to,
            body: pendingBody.trim(),
          });

          pendingBody = null;
        } else {
          pendingBody += "\n" + line;
        }
        continue;
      }
    }

    if (currentHeader && pendingBody !== null) {
      messages.push({
        from: currentHeader.from,
        time: currentHeader.time,
        to: currentHeader.to,
        body: pendingBody.trim(),
      });
    }

    return messages;
  };

  // ===============================
  //         입력 처리
  // ===============================
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    const parsed = parseMessages(value);
    setMessages(parsed);

    const senders = [...new Set(parsed.map((m) => m.from))];

    if (parsed.length > 0) {
      if (senders.length === 2) {
        setMyName(senders[1]);
      } else {
        setMyName(senders[0]);
      }
    }

    const newNames = {};
    senders.forEach((s) => {
      newNames[s] = customNames[s] ?? s;
    });
    setCustomNames(newNames);

    updateRoomName(newNames, myName, senders);
  };

  const updateRoomName = (namesMap, my, senders) => {
    if (senders.length <= 1) return;

    if (senders.length === 2) {
      const other = senders.find((s) => s !== my);
      setRoomName(namesMap[other]);
    } else {
      setRoomName("단톡방");
    }
  };

  const handleMyNameChange = (newMyName) => {
    setMyName(newMyName);
    const senders = [...new Set(messages.map((m) => m.from))];
    updateRoomName(customNames, newMyName, senders);
  };

  const handleSenderRename = (original, newName) => {
    const updated = {
      ...customNames,
      [original]: newName,
    };
    setCustomNames(updated);

    const senders = [...new Set(messages.map((m) => m.from))];
    updateRoomName(updated, myName, senders);
  };

  // ===============================
  //      이미지 다운로드
  // ===============================
  const waitForImages = () =>
    Promise.all(
      Array.from(chatRef.current.querySelectorAll("img")).map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete) resolve();
            else img.onload = resolve;
          })
      )
    );

  const handleDownload = async () => {
    if (!chatRef.current) return;

    await waitForImages();

    const dataUrl = await toPng(chatRef.current, {
      cacheBust: true,
      pixelRatio: 2,
    });

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "chat.png";
    link.click();
  };

  const senderList = [...new Set(messages.map((m) => m.from))];

  const handleUpload = (sender, file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setProfileImages((prev) => ({
        ...prev,
        [sender]: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  // ===============================
  //      복사 기능
  // ===============================
  const [copyText, setCopyText] = useState("복사하기");

  const handleCopy = () => {
    const text = document.getElementById("copy-content").innerText;
    navigator.clipboard.writeText(text);

    setCopyText("복사됨!");
    setTimeout(() => {
      setCopyText("복사하기");
    }, 1500);
  };

  // ============================================================
  // =========================  UI  ==============================
  // ============================================================
  return (
    <div className="flex flex-col items-center gap-6 w-full py-8">
      <div className="lg:p-8 p-2 flex flex-col max-w-xl items-center gap-6 w-full">

        <h1 className="text-xl font-bold text-gray-800 text-center">
          챗 OOC 제너레이터
        </h1>

        {/* 복사 영역 */}
        <div className="w-full">
          <div className="text-sm font-medium">OOC From 이루룽 X @Iru_rurung</div>

          <div
            id="copy-content"
            className="text-xs opacity-80 bg-white mt-1 px-3 py-2 rounded border border-gray-300 whitespace-pre-line"
          >
            {`*[OOC: NPC와 PC의 평범한 문자내역을 출력한다. 일상적인 내용이나, 서로의 문자메세지를 메모장으로 쓰거나, 다른 사람에게 보낼 문자, 그 외 문자(예시: 장난스럽거나, 심각하거나, 놀리는 문자, 혹은 실수로 보내거나 등)일 수 있다.

            문자는
            < 보낸사람 / 발신시간 / 받는사람 >
            [ 메시지 내용 ]
            으로 묘사한다.

            대괄호 내부의 내용은 PC와 NPC의 감정이나 느낌에 따라 html형식(글씨크기변동, 볼드체, 기울임체, 취소선)사용 가능. 필요할 경우 오타를 내도 괜찮다.
            사담 없이 문자메세지들만 출력할 것, 최소 700단어 이상 서술할 것.]*`}
          </div>

          <button
            className="text-xs mt-2 px-3 py-1 bg-gray-800 text-white rounded hover:bg-black transition"
            onClick={handleCopy}
          >
            {copyText}
          </button>
        </div>

        {/* 테마 선택 + 내 이름 */}
        <div className="w-full max-w-xl flex flex-col gap-4">
          <AdChat />

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium">테마 선택</label>
              <select
                className="w-full border p-2 rounded-md mt-1"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              >
                {normalThemes.map((t) => (
                  <option key={t.theme_name} value={t.theme_name}>
                    {t.theme_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="text-sm font-medium">내 이름 선택</label>
              <select
                className="w-full border p-2 rounded-md mt-1"
                value={myName}
                onChange={(e) => handleMyNameChange(e.target.value)}
              >
                {senderList.length === 0 && <option>-</option>}
                {senderList.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* --- 후원자(관리자) 모드 토글 --- */}    
          {!isAdmin && (
            <div className="w-full max-w-xl mt-2">
              <button
                onClick={() => setIsAdminSectionOpen(!isAdminSectionOpen)}
                className="w-full text-left px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md font-medium transition text-sm"
              >
                {isAdminSectionOpen ? "▼ 후원자 모드 닫기" : "▶ 후원자 모드 열기"}
              </button>

              {/* 토글 시에만 관리자 로그인 폼 보여줌 */}
              {isAdminSectionOpen && (
                <div className="mt-2 p-3 border rounded bg-white shadow">

                  <input
                    type="password"
                    className="border w-full px-3 py-1 rounded text-xs"
                    placeholder="후원자 코드를 입력해주세요."
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                  />

                  {adminError && (
                    <div className="text-red-500 text-xs mt-1">{adminError}</div>
                  )}

                  <button
                    onClick={handleAdminLogin}
                    className="mt-2 bg-gray-800 text-white px-3 py-1 rounded hover:bg-black text-xs"
                  >
                    로그인
                  </button>
                </div>
              )}
            </div>
          )}



          {isAdmin && (
            <div className="">
              <div className="text-sm font-medium mb-2">후원자 전용 테마</div>

              <div className="grid grid-cols-3 gap-2">
                {adminThemes.map((t) => (
                  <button
                    key={t.theme_name}
                    onClick={() => setTheme(t.theme_name)}
                    className="p-3 rounded-lg shadow text-xs font-medium"
                    style={{
                      background: t.area_bg_gradient
                        ? `linear-gradient(145deg, ${t.area_bg}, ${t.area_bg_gradient})`
                        : t.area_bg,
                      color: t.name_color,
                    }}
                  >
                    {t.theme_name}
                  </button>
                ))}
              </div>
              <div className="mt-2 flex justify-center">
                <button
                  onClick={reloadAdminThemes}
                  className="px-3 py-1 bg-gray-700 text-white text-xs rounded hover:bg-gray-900 transition"
                >
                  테마 새로고침
                </button>
              </div>
            </div>
          )}


          {/* 채팅방 이름 */}
          <div>
            <label className="text-sm font-medium">채팅방 이름 수정</label>
            <input
              className="w-full border p-2 rounded-md mt-1"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
          </div>
        </div>

        {/* 참여자 이름 변경 */}
        {senderList.length > 0 && (
          <div className="w-full max-w-xl p-4 border rounded-md bg-white shadow-sm">
            <div className="text-sm font-medium mb-3">참여자 이름 변경</div>

            {senderList.map((s) => (
              <div key={s} className="flex flex-col mb-3">
                <span className="text-sm mb-1">{s}</span>
                <input
                  className="border p-2 rounded w-full"
                  value={customNames[s] ?? s}
                  onChange={(e) => handleSenderRename(s, e.target.value)}
                />
              </div>
            ))}
          </div>
        )}

        {/* 프로필 업로드 */}
        {senderList.map(
          (s) =>
            s !== myName && (
              <div key={s} className="flex items-center gap-3 py-2">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    {profileImages[s] ? (
                      <img
                        src={profileImages[s]}
                        alt={s}
                        crossOrigin="anonymous"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-full h-full rounded-full"
                        style={{
                          backgroundColor: activeTheme?.profile_color,
                        }}
                      />
                    )}
                  </div>

                  <label
                    htmlFor={`upload-${s}`}
                    className="absolute bottom-0 right-0 bg-black/60 hover:bg-black/80
                      text-white w-5 h-5 rounded-full flex items-center justify-center cursor-pointer transition"
                  >
                    +
                  </label>

                  <input
                    id={`upload-${s}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleUpload(s, e.target.files[0])}
                  />
                </div>

                <span className="text-sm break-words max-w-[120px]">
                  {customNames[s] ?? s}
                </span>
              </div>
            )
        )}

        {/* 입력창 */}
        <textarea
          className="w-full max-w-xl h-60 p-4 border rounded-md shadow-sm bg-white"
          placeholder={`예시 형식:

  < 다야 / AM 10:19 / M >
  [물 타서 아메리카노 해먹으면 딱이겠네~ 🧊☕ ]
  
  < M / AM 10:20 / 다야 >
  [ 커피에 물을 타서 희석시킨다는 발상은 도대체 어디서 나오는 겁니까? ]
            `}
          value={input}
          onChange={handleInputChange}
        />
      </div>

      {/* 채팅 메시지 UI */}
      <div
        ref={chatRef}
        className="rounded-xl w-full max-w-xl overflow-hidden"
        style={{
          background: activeTheme?.area_bg_gradient
            ? `linear-gradient(135deg, ${activeTheme.area_bg}, ${activeTheme.area_bg_gradient})`
            : activeTheme?.area_bg,
        }}
      >

        {/* 헤더 */}
        <div
          className="px-4 py-4 flex items-center justify-between shadow-sm text-[17px] font-semibold"
          style={{
            backgroundColor: activeTheme?.header_bg,
            color: activeTheme?.header_text,
          }}
        >
          <div className="w-8 flex justify-start opacity-80">←</div>
          <div className="flex-1 text-center truncate px-2">{roomName}</div>
          <div className="w-8 flex justify-end opacity-80">⋮</div>
        </div>

        {/* 메시지 */}
        <div className="lg:p-6 p-3 py-6">
          {messages.map((m, idx) => {
            const isMe = m.from === myName;
            const displayName = customNames[m.from] ?? m.from;

            const prev = messages[idx - 1];
            const next = messages[idx + 1];

            const isFirstOfGroup =
              !prev || prev.from !== m.from || prev.time !== m.time;

            const isLastOfGroup =
              !next || next.from !== m.from || next.time !== m.time;

            return (
              <div
                key={idx}
                className={`flex mb-1 ${
                  isMe ? "justify-end" : "justify-start"
                } items-start`}
              >
                {/* 프로필 */}
                {!isMe && (
                  <div className="mr-2">
                    {isFirstOfGroup ? (
                      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                        {profileImages[m.from] ? (
                          <img
                            src={profileImages[m.from]}
                            crossOrigin="anonymous"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div
                            className="w-full h-full rounded-full"
                            style={{
                              backgroundColor: activeTheme?.profile_color,
                            }}
                          />
                        )}
                      </div>
                    ) : (
                      <div className="w-10" />
                    )}
                  </div>
                )}

                {/* 메시지 버튼 */}
                <div className="flex flex-col max-w-[70%]">
                  {/* 이름 */}
                  {!isMe && isFirstOfGroup && (
                    <div
                      className="text-xs opacity-70 mb-1 ml-1"
                      style={{ color: activeTheme?.name_color }}
                    >
                      {displayName}
                    </div>
                  )}

                  {isMe && isFirstOfGroup && (
                    <div
                      className="text-xs opacity-70 mb-1 text-right mr-1"
                      style={{ color: activeTheme?.name_color }}
                    >
                      {displayName}
                    </div>
                  )}

                  {/* 버블 */}
                  <div
                    className={`px-4 py-2 rounded-2xl text-sm ${
                      isiOS ? "" : "shadow"
                    } ${
                      isFirstOfGroup && !isMe
                        ? "rounded-tl-none"
                        : ""
                    } ${
                      isFirstOfGroup && isMe
                        ? "rounded-tr-none"
                        : ""
                    } ${!isLastOfGroup ? "mb-0.5" : "mb-1"}`}
                    style={{
                      backgroundColor: isMe
                        ? activeTheme?.me_bg
                        : activeTheme?.other_bg,
                      color: isMe
                        ? activeTheme?.me_text
                        : activeTheme?.other_text,
                    }}
                  >
                    <div
                      className="leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: m.body.replace(/\n/g, "<br>"),
                      }}
                    />
                  </div>

                  {/* 시간 */}
                  {isLastOfGroup && (
                    <div
                      className={`text-[10px] opacity-60 ${
                        isMe ? "text-left ml-1" : "text-right mr-1"
                      }`}
                      style={{ color: activeTheme?.time_color }}
                    >
                      {m.time}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 다운로드 */}
      <button
        onClick={handleDownload}
        className="px-4 py-2 bg-gray-800 text-white rounded-lg shadow hover:bg-black"
      >
        이미지로 다운로드
      </button>

      {/* Thanks to */}
      <div className="text-center text-xs opacity-60 mt-6">
        OOC 원작자 - 룽 - 에게 감사의 인사를 남깁니다.<br />
        개발한 사람: 중중
      </div>
    </div>
  );
}

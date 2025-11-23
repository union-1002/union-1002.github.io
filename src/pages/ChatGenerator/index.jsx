import React, { useState, useRef } from "react";
import { toPng } from "html-to-image";
import AdChat from "@/components/AdChat";

export default function ChatGenerator() {
  const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [theme, setTheme] = useState("blue");
  const [myName, setMyName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [profileImages, setProfileImages] = useState({});
  const [customNames, setCustomNames] = useState({}); // ← sender 이름 변경 기능
  const chatRef = useRef(null);

  // --- 테마 목록 ---
  const themes = {
    blue: {
      meBg: "bg-blue-500",
      meText: "text-white",
      otherBg: "bg-white",
      otherText: "text-gray-900",
      areaBg: "bg-gray-100",
      headerBg: "bg-blue-500",
      headerText: "text-white",
      profileColor: "bg-blue-300",
      nameColor: "text-blue-700",
      timeColor: "text-gray-400",
      areaBgColor: "#f3f4f6",    // gray-100
    },

    green: {
      meBg: "bg-green-500",
      meText: "text-white",
      otherBg: "bg-white",
      otherText: "text-gray-900",
      areaBg: "bg-green-50",
      headerBg: "bg-green-600",
      headerText: "text-white",
      profileColor: "bg-green-300",
      nameColor: "text-green-700",
      timeColor: "text-gray-400",
      areaBgColor: "#f0fdf4",    // green-50
    },

    dark: {
      meBg: "bg-gray-800",
      meText: "text-white",
      otherBg: "bg-gray-700",
      otherText: "text-gray-50",
      areaBg: "bg-gray-900",
      headerBg: "bg-gray-800",
      headerText: "text-white",
      profileColor: "bg-gray-600",
      nameColor: "text-gray-300",
      timeColor: "text-gray-500",
      areaBgColor: "#111827",    // gray-900
    },

    kakao: {
      meBg: "bg-yellow-300",
      meText: "text-black",
      otherBg: "bg-white",
      otherText: "text-black",
      areaBg: "bg-yellow-50",
      headerBg: "bg-yellow-400",
      headerText: "text-black",
      profileColor: "bg-yellow-200",
      nameColor: "text-yellow-700",
      timeColor: "text-gray-500",
      areaBgColor: "#fefce8",    // yellow-50
    },

    mint: {
      meBg: "bg-[#B4FDFD]",        // 나 버블
      meText: "text-black",
      otherBg: "bg-white",
      otherText: "text-gray-900",

      areaBg: "bg-[#EFFFFF]",      // 전체 배경 - 좀 더 은은한 톤
      headerBg: "bg-[#A3F5F5]",    // 헤더
      headerText: "text-black",

      profileColor: "bg-[#99F0F0]", // 프로필 기본색

      nameColor: "text-[#009999]",  // 이름 색 (민트 대비 어두운 청록)
      timeColor: "text-[#66A0A0]",  // 시간 색
    },
  };



  const t = themes[theme];

  // --- 파싱 ---
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

      // ---- HEADER ----
      const headerMatch = line.match(/^<\s*([^>]+?)\s*>\s*$/);
      if (headerMatch) {
        // 이전 메시지 flush
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

      // ---- MESSAGE START ----
      if (line.startsWith("[")) {
        const withoutStartBracket = line.substring(1); // [ 제거
        if (line.endsWith("]")) {
          // 단일줄 메시지
          const content = withoutStartBracket.slice(0, -1); // ] 제거
          messages.push({
            from: currentHeader?.from || "",
            time: currentHeader?.time || "",
            to: currentHeader?.to || "",
            body: content.trim(),
          });
          pendingBody = null;
        } else {
          // 멀티라인 시작
          pendingBody = withoutStartBracket;
        }
        continue;
      }

      // ---- MULTILINE 메시지 처리 ----
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

    // 마지막 메시지 flush
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





  // --- 입력 처리 ---
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    const parsed = parseMessages(value);
    setMessages(parsed);

    const senders = [...new Set(parsed.map((m) => m.from))];

    // 초기 myName 설정

    // 새로운 입력이 들어오면 내 이름도 다시 잡아준다
    if (parsed.length > 0) {
      if (senders.length === 2) {
        // 두 명일 때는 두 번째가 '나'
        setMyName(senders[1]);
      } else {
        // 세 명 이상이면 첫 번째를 '나'로
        setMyName(senders[0]);
      }
    }


    // 기본 customNames 초기화
    const newNames = {};
    senders.forEach((s) => {
      newNames[s] = customNames[s] ?? s;
    });
    setCustomNames(newNames);

    updateRoomName(newNames, myName, senders);
  };

  // --- 룸네임 자동 생성 ---
  const updateRoomName = (namesMap, my, senders) => {
    if (senders.length <= 1) return;

    if (senders.length === 2) {
      const other = senders.find((s) => s !== my);
      setRoomName(namesMap[other]);
    } else {
      setRoomName("단톡방");
    }
  };

  // --- 내 이름 선택 변경 시 룸네임 동기화 ---
  const handleMyNameChange = (newMyName) => {
    setMyName(newMyName);

    const senders = [...new Set(messages.map((m) => m.from))];
    updateRoomName(customNames, newMyName, senders);
  };

  // --- sender 이름 변경 ---
  const handleSenderRename = (original, newName) => {
    const updated = {
      ...customNames,
      [original]: newName,
    };
    setCustomNames(updated);

    const senders = [...new Set(messages.map((m) => m.from))];
    updateRoomName(updated, myName, senders);
  };

  // --- 이미지 다운로드 ---
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
        [sender]: reader.result,  // ← Base64 DataURL
      }));
    };
    reader.readAsDataURL(file);
  };


  return (
    <div className="flex flex-col items-center gap-6 w-full py-8">

      <div className="lg:p-8 p-2 flex flex-col items-center gap-6 w-full">

        {/* 상단 페이지 제목 */}
        <h1 className="text-xl font-bold text-gray-800 text-center">
          챗 OOC 제너레이터
        </h1>
      

        
        <div className="w-full max-w-xl flex flex-col gap-4">

          <AdChat />
          {/* --- 테마 선택 + 내 이름 선택 --- */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium">테마 선택</label>
              <select
                className="w-full border p-2 rounded-md mt-1"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              >
                <option value="blue">파랑 테마</option>
                <option value="green">초록 테마</option>
                <option value="dark">다크 테마</option>
                <option value="kakao">카카오톡 스타일</option>
                <option value="mint">즈!!!</option>
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
                    {s}   {/* ✔ 원래 sender 이름만 표시 */}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 채팅방 이름 수정 */}
          <div>
            <label className="text-sm font-medium">채팅방 이름 수정</label>
            <input
              className="w-full border p-2 rounded-md mt-1"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
          </div>
        </div>

        {/* --- 보내는 사람 이름 개별 수정 --- */}
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

        {senderList.map(
          (s) =>
            s !== myName && (
              <div key={s} className="flex items-center gap-3 py-2">
                
                {/* 프로필 + 업로드 버튼 */}
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
                      <div className={`w-full h-full rounded-full ${t.profileColor}`} />
                    )}
                  </div>

                  {/* 업로드 버튼 */}
                  <label
                    htmlFor={`upload-${s}`}
                    className="
                      absolute bottom-0 right-0
                      bg-black/60 hover:bg-black/80
                      text-white
                      w-5 h-5
                      rounded-full
                      flex items-center justify-center
                      cursor-pointer
                      transition
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        d="M12 5v14m7-7H5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </label>

                  {/* 실제 input은 숨기기 */}
                  <input
                    id={`upload-${s}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleUpload(s, e.target.files[0])}
                  />
                </div>

                {/* 이름 */}
                <span className="text-sm break-words max-w-[120px]">
                  {customNames[s] ?? s}
                </span>

              </div>
            )
        )}


        {/* --- 입력창 --- */}
        <textarea
          className="w-full max-w-xl h-60 p-4 border rounded-md shadow-sm bg-white"
          placeholder={`예시 형식:

  < M / PM 12:28 >
  [상황 보고 바랍니다…]

  < 비광 / PM 12:29 >
  [실패. 동일한 수법…]`}
          value={input}
          onChange={handleInputChange}
        />
      
      </div>

      {/* --- 채팅 UI 본문 --- */}
      <div
        ref={chatRef}
        className={`${t.areaBg} rounded-xl w-full max-w-xl ${isiOS ? "" : "shadow-lg"} overflow-hidden`}
      >
        {/* 헤더 */}
        <div
          className={`
            ${t.headerBg} ${t.headerText}
            px-4 py-4
            flex items-center justify-between
            border-b border-black/10
            shadow-sm
            text-[17px]
            font-semibold
          `}
        >
          {/* Left: Back icon */}
          <div className="w-8 flex justify-start opacity-80">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>

          {/* Title */}
          <div className="flex-1 text-center truncate px-2">{roomName}</div>

          {/* Right: menu */}
          <div className="w-8 flex justify-end items-center opacity-80">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 block leading-none"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 3a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
            </svg>
          </div>
        </div>

        {/* 메시지 영역 */}
        <div className="lg:p-6 p-3 py-6">
          {messages.map((m, idx) => {
            const isMe = m.from === myName;
            const displayName = customNames[m.from] ?? m.from;

            const prev = messages[idx - 1];
            const next = messages[idx + 1];

            const isFirstOfGroup =
              !prev ||
              prev.from !== m.from ||
              prev.time !== m.time; // ← 시간 달라도 새 그룹

            const isLastOfGroup =
              !next ||
              next.from !== m.from ||
              next.time !== m.time; // ← 시간 달라도 그룹 종료


            return (
              <div
                key={idx}
                className={`flex mb-1 ${isMe ? "justify-end" : "justify-start"} items-start`}
              >
                {/* 왼쪽 프로필 (첫 메시지만) */}
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
                          <div className={`w-full h-full rounded-full ${t.profileColor}`} />
                        )}
                      </div>
                    ) : (
                      <div className="w-10" />
                    )}
                  </div>
                )}

                {/* 오른쪽 컬럼 (이름 + 말풍선 그룹) */}
                <div className="flex flex-col max-w-[70%]">

                  {/* 이름 – 프로필과 수평 정렬되도록 bubble 밖에 둠 */}
                  {!isMe && isFirstOfGroup && (
                    <div className={`text-xs opacity-70 mb-1 ml-1 ${t.nameColor}`}>
                      {displayName}
                    </div>
                  )}

                  {isMe && isFirstOfGroup && (
                    <div className={`text-xs opacity-70 mb-1 text-right mr-1 ${t.nameColor}`}>
                      {displayName}
                    </div>
                  )}

                  {/* 말풍선 */}
                  <div
                    className={`
                      px-4 py-2 rounded-2xl text-sm
                      ${isiOS ? "" : "shadow"}
                      ${isMe ? `${t.meBg} ${t.meText}` : `${t.otherBg} ${t.otherText}`}
                      ${isFirstOfGroup && !isMe ? "rounded-tl-none" : ""}
                      ${isFirstOfGroup && isMe ? "rounded-tr-none" : ""}
                      ${!isLastOfGroup ? "mb-0.5" : "mb-1"}
                    `}
                  >

                    <div
                      dangerouslySetInnerHTML={{ __html: m.body }}
                      className="leading-relaxed"
                    />
                  </div>

                  {/* 시간 */}
                  {isLastOfGroup && (
                    <div
                      className={`
                        text-[10px] opacity-60 ${t.timeColor}
                        ${isMe ? "text-left ml-1" : "text-right mr-1"}
                      `}
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


      {/* --- 다운로드 버튼 --- */}
      <button
        onClick={handleDownload}
        className="px-4 py-2 bg-gray-800 text-white rounded-lg shadow hover:bg-black"
      >
        이미지로 다운로드
      </button>

      {/* --- Thanks to --- */}
      <div className="text-center text-xs opacity-60 mt-6">
        OOC 개발자 - 룽 - 에게 감사의 인사를 남깁니다.
      </div>
    </div>
  );
}

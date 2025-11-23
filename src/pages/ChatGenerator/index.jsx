import React, { useState, useRef } from "react";
import { toPng } from "html-to-image";
import AdChat from "../../components/AdChat";

export default function ChatGenerator() {
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
    },

    mint: {
      meBg: "bg-[#B4FDFD]",        
      meText: "text-black",
      otherBg: "bg-white",
      otherText: "text-gray-900",
      areaBg: "bg-[#EFFFFF]",      
      headerBg: "bg-[#A3F5F5]",    
      headerText: "text-black",
      profileColor: "bg-[#99F0F0]",
      nameColor: "text-[#009999]", 
      timeColor: "text-[#66A0A0]", 
    },
  };



  const t = themes[theme];

  // --- 파싱 ---
  const parseMessages = (inputText) => {
    if (!inputText.trim()) return [];

    const lines = inputText.split("\n").map((l) => l.trim());

    const messages = [];
    let currentHeader = null;

    for (let line of lines) {
      if (!line) continue;

      // --- 1) 헤더 판별 (문장 맨 앞이 '<' 이어야 함)
      const headerMatch = line.match(/^<([^>]+)>$/);
      if (headerMatch) {
        const header = headerMatch[1].trim();
        const parts = header.split("/").map((s) => s.trim());

        const from = parts[0] || "";
        const time = parts[1] || "";
        const to   = parts[2] || "";

        currentHeader = { from, time, to };
        continue;
      }

      // --- 2) 본문 메시지 처리 (여러 [ ] 각각 별도 메시지)
      const bodyMatch = line.match(/^\[(.*)\]$/s);
      if (bodyMatch && currentHeader) {
        messages.push({
          from: currentHeader.from,
          time: currentHeader.time,
          to: currentHeader.to,
          body: bodyMatch[1].trim(),
        });
        continue;
      }

      // HTML 태그 있는 메시지도 안전하게 처리
      // (예: [<b><span ...>텍스트</span></b>])
      const complexBodyMatch = line.match(/^\[(.+)\]$/);
      if (complexBodyMatch && currentHeader) {
        messages.push({
          from: currentHeader.from,
          time: currentHeader.time,
          to: currentHeader.to,
          body: complexBodyMatch[1].trim(),
        });
      }
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

    if (parsed.length > 0 && !myName) {
      if (senders.length === 2) {
        // 두 명이라면 “첫 번째 발신자 = 상대방”
        // “두 번째 발신자 = 나”
        setMyName(senders[1]);
      } else {
        // 3명 이상일 때는 첫 번째를 ‘나’로 둬도 무방
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
    <div className="p-8 flex flex-col items-center gap-6 w-full">

      <AdChat/>

      {/* --- 테마 선택 + 내 이름 선택 --- */}
      <div className="w-full max-w-xl flex flex-col gap-4 mt-2">

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
            <div key={s} className="flex items-center gap-3 mb-2">
              <span className="w-20 text-sm">{s}</span>
              <input
                className="border p-1 rounded flex-1"
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
              <span className="text-sm w-20">{customNames[s] ?? s}</span>
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

      {/* --- 채팅 UI 본문 --- */}
      <div
        ref={chatRef}
        className={`${t.areaBg} rounded-xl w-full max-w-xl shadow-lg overflow-hidden`}
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
          <div className="w-8 flex justify-end opacity-80">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 3a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
            </svg>
          </div>
        </div>

        {/* 메시지 영역 */}
        <div className="p-6">
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
                      px-4 py-2 rounded-2xl text-sm shadow
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
    </div>
  );
}

import { useState } from "react";
import _ from 'lodash';
import { useSearchParams } from 'react-router';
import MainLayout from '@/shared/MainLayout';
import PageLayout from '@/shared/PageLayout';
import { MENU_PROPS } from '@/shared/SideNavigationBar';
import { createPost, createReply, deletePost, deleteReply, makeContext, updatePost, updateReply, usePosts } from './hooks';
import { useUser } from "@/shared/user";
import { RenderdCheckbox, TextEdit, TextEditTailButton } from "./components";
import { FaCode } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";

const BOARD_ID = 'good';

function GoodPage() {
  // URL 쿼리 파라미터
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number.parseInt(searchParams.get('page') ?? 1);
  // 페이지 목록
  const pageSize = 10;  // 한 페이지에 보여질 글 개수
  const pageListRange = 2;  // 현재 페이지 양 옆에 보여줄 번호 수
  const { loading, error, data: posts, update, nPages } = usePosts(BOARD_ID, page, pageSize);
  const pageListStart = Math.max(1, Math.min(nPages, page - pageListRange));
  const pageListEnd = Math.max(1, Math.min(nPages, page + pageListRange));
  const [currentCommandId, setCurrentCommandId] = useState(null);
  const goToPage = (i) => { setSearchParams({ page: i }) };
  const updateOnCreatePost = async () => {
    if (page === 1) {
      await update();
    }
    else {
      goToPage(1);
    }
  }

  const user = useUser();

  return (
    <MainLayout>
      <PageLayout
        title="칭찬합니다"
        sidebar={MENU_PROPS['직원 마당']}
      >
        <div className="relative">
          {error && <pre className="text-red-500 whitespace-pre-wrap">{JSON.stringify(error)}</pre>}
          {loading && 
            <div className="absolute w-full h-full z-10 flex justify-center items-center backdrop-brightness-90"><Loading /></div>
          }

          {user.isLoggedIn() &&
            <PostWriter update={updateOnCreatePost} />
          }

          <div className="flex flex-wrap lg:flex-nowrap items-start text-sm font-semibold border-b border-gray-400 pb-4">
            <div className="w-[50px] lg:w-[60px] text-center shrink-0">번호</div>
            <div className="hidden lg:block w-[60px] text-center font-medium shrink-0">작성자</div>
            <div className="flex justify-center items-center w-[calc(100%-50px)]  lg:flex-grow lg:mt-0 lg:ml-5">내용</div>
          </div>

          {/* 게시글 목록 */}
          {posts.map((post, index) => (
            <div
              key={post.id}
              className="border-gray-300 
                        border-b 
                        border-y-0"
            >
              {/* 메인 글 */}
              <PostItem
                post={post}
                update={update}
                currentCommandId={currentCommandId}
                setCurrentCommandId={setCurrentCommandId}
              />

              {/* 답글들 */}
              {post.replies.map((reply) => (
                <ReplyItem
                  key={reply.id}
                  reply={reply}
                  update={update}
                  currentCommandId={currentCommandId}
                  setCurrentCommandId={setCurrentCommandId}
                />
              ))}
            </div>
          ))}

          {/* 페이지 목록 */}
          <div className="flex items-center justify-center space-x-2 mt-6">
            <button
              onClick={() => goToPage(page - 1)}
              disabled={page <= 1}
              className="px-3 py-1 rounded-md border text-sm select-none cursor-pointer disabled:cursor-default bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
            >
              이전
            </button>

            {_.range(pageListStart, pageListEnd+1).map((i) =>
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={`px-3 py-1 rounded-md border text-sm select-none cursor-pointer disabled:cursor-default ${
                  i === page
                    ? "bg-[#435373] text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {i}
              </button>
            )}

            <button
              onClick={() => goToPage(page + 1)}
              disabled={page >= nPages}
              className="px-3 py-1 rounded-md border text-sm select-none cursor-pointer disabled:cursor-default bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
            >
              다음
            </button>
          </div>
        </div>
      </PageLayout>
    </MainLayout>
  );
}

function renderText(text, context) {
  if (typeof text === 'function') {
    try {
      return text(context);
    }
    catch (e) {
      return '<error>';
    }
  }
  else {
    return text;
  }
}

function PostItem({ post, update, currentCommandId, setCurrentCommandId }) {
  const COMMAND_EDIT_POST = `edit_post_${post.id}`;
  const COMMAND_WRITE_REPLY = `write_reply_${post.id}`;

  const user = useUser();
  const context = { user };
  const isAdmin = user.isAdmin;
  const isMine = post.authorId === user.uid;
  const isRepliable = user.isLoggedIn();
  const isEditable = isMine || user.isAdmin;
  const isDeletable = isMine || user.isAdmin;
  const toggleEditMode = () => setCurrentCommandId(currentCommandId !== COMMAND_EDIT_POST ? COMMAND_EDIT_POST : null);
  const toggleReplyWriter = () => setCurrentCommandId(currentCommandId !== COMMAND_WRITE_REPLY ? COMMAND_WRITE_REPLY : null);
  
  const editMode = currentCommandId === COMMAND_EDIT_POST;
  const [username, setUsername] = useState(isAdmin ? post.author : user.username);
  const [jsMode, setJsMode] = useState(typeof post.text === 'function');
  const [editingText, setEditingText] = useState(typeof post.text === 'function' ? post.text.toString() : post.text);
  const isUsernameEditable = isAdmin;
  const isTextEditable = true;

  const handleReply = () => {
    if (!isRepliable || editMode) {
      return;
    }
    toggleReplyWriter();
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!confirm("정말 삭제하시겠습니까?")) {
      return;
    }

    try {
      await deletePost(BOARD_ID, post.id);
      await update();
    }
    catch (e) {
      alert("오류가 발생하였습니다. 관리자에게 문의해주세요.");
    }
  };

  const handleEdit = async (e) => {
    e.stopPropagation();
    toggleEditMode();
  };

  const handleEditSubmit = async (e) => {
    e.stopPropagation();
    toggleEditMode();

    try {
      await updatePost(BOARD_ID, post.id, user, username, jsMode, editingText);
      await update();
    }
    catch (e) {
      alert("오류가 발생하였습니다. 관리자에게 문의해주세요.");
    }
  };

  return (
    <div>
      <div onClick={handleReply} className={`${isRepliable && 'cursor-pointer '} group relative flex flex-wrap lg:flex-nowrap items-start text-sm py-4 hover:bg-gray-50 transition`}>
        <div className="w-[50px] lg:w-[60px] text-center shrink-0">
          {post.id}
          {(editMode && isAdmin) &&
            <RenderdCheckbox className="p-1 relative inline-block" title="JS Mode" value={jsMode} onChange={(e) => setJsMode(e.target.checked)}>
              <FaCode />
            </RenderdCheckbox>
          }
        </div>
        <div className="w-[50px] lg:w-[60px] text-left lg:text-center font-medium shrink-0">
          {editMode && isUsernameEditable
            ? <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full" />
            : post.author
          }
        </div>
        <div className="w-full lg:flex-grow ml-12 mt-1.5 lg:mt-0 lg:ml-5">
          {editMode && isTextEditable
            ? <div className="pe-14">
                <TextEdit
                  className="w-full"
                  placeholder="내용을 입력하세요."
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  tail={<TextEditTailButton onClick={handleEditSubmit}>수정하기</TextEditTailButton>}
                />
              </div>
            : renderText(post.text, context)
          }
        </div>
        {isEditable &&
          <div onClick={handleEdit} className="absolute right-7 cursor-pointer opacity-0 group-hover:opacity-100 text-gray-600">
            <svg className="w-5 h-5 text-inherit dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
            </svg>
          </div>
        }
        {isDeletable &&
          <div onClick={handleDelete} className="absolute right-2 cursor-pointer opacity-0 group-hover:opacity-100 text-gray-600">
            <svg className="w-5 h-5 text-inherit dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
            </svg>
          </div>
        }
      </div>
      {currentCommandId === COMMAND_WRITE_REPLY &&
        <div className="group relative flex flex-wrap lg:flex-nowrap items-start text-sm px-4 hover:bg-gray-50 transition">
          <ReplyWriter post={post} update={update} close={toggleReplyWriter} />
        </div>
      }
    </div>
  );
}

function PostWriter({ update }) {
  const [username, setUsername] = useState('');
  const [jsMode, setJsMode] = useState(false);
  const [text, setText] = useState('');

  const user = useUser();
  const isAdmin = user.isAdmin;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.trim() == '') {
      alert("내용을 입력하세요.");
      return;
    }

    try {
      await createPost(BOARD_ID, user, username, jsMode, text);
      await update();
    }
    catch (e) {
      alert("오류가 발생하였습니다. 관리자에게 문의해주세요.");
    }
    setText('');
  };
  return (
    <form className="flex pb-5">
      {isAdmin &&
        <RenderdCheckbox className="p-1 relative inline-block" title="JS Mode" value={jsMode} onChange={(e) => setJsMode(e.target.checked)}>
          <FaCode />
        </RenderdCheckbox>
      }
      {isAdmin &&
        <TextEdit
          icon={<FaUser />}
          placeholder="작성자"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      }
      <TextEdit
        className="grow"
        placeholder="내용을 입력하세요."
        value={text}
        onChange={(e) => setText(e.target.value)}
        tail={<button onClick={handleSubmit} className="cursor-pointer text-white absolute h-full end-0 bottom-0 bg-[#435373] hover:bg-[#3457A0] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-e-lg text-sm px-4 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">글쓰기</button>}
      />
    </form>
  );
}

function ReplyItem({ reply, update, currentCommandId, setCurrentCommandId }) {
  const COMMAND_EDIT_REPLY = `edit_reply_${reply.id}`;

  const user = useUser();
  const context = makeContext(user);
  const isAdmin = user.isAdmin;
  const isMine = reply.authorId === user.uid;
  const isEditable = isMine || user.isAdmin;
  const isDeletable = isMine || user.isAdmin;
  const toggleEditMode = () => setCurrentCommandId(currentCommandId !== COMMAND_EDIT_REPLY ? COMMAND_EDIT_REPLY : null);

  const editMode = currentCommandId === COMMAND_EDIT_REPLY;
  const [username, setUsername] = useState(isAdmin ? reply.author : user.username);
  const [jsMode, setJsMode] = useState(typeof reply.text === 'function');
  const [editingText, setEditingText] = useState(typeof reply.text === 'function' ? reply.text.toString() : reply.text);
  const isUsernameEditable = isAdmin;
  const isTextEditable = true;

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!confirm("정말 삭제하시겠습니까?")) {
      return;
    }

    try {
      await deleteReply(BOARD_ID, reply.id);
      await update();
    }
    catch (e) {
      alert("오류가 발생하였습니다. 관리자에게 문의해주세요.");
    }
  };

  const handleEdit = async (e) => {
    e.stopPropagation();
    toggleEditMode();
  };

  const handleEditSubmit = async (e) => {
    e.stopPropagation();
    toggleEditMode();

    try {
      await updateReply(BOARD_ID, reply.id, user, username, jsMode, editingText);
      await update();
    }
    catch (e) {
      alert("오류가 발생하였습니다. 관리자에게 문의해주세요.");
    }
  };

  return (
    <div className="group flex flex-wrap lg:flex-nowrap items-start text-sm text-gray-600 border-t border-gray-200 py-2">
      <div className="w-[50px] lg:w-[60px] text-center shrink-0 text-xs">
        ⤷
        {(editMode && isAdmin) &&
          <RenderdCheckbox className="p-1 relative inline-block" title="JS Mode" value={jsMode} onChange={(e) => setJsMode(e.target.checked)}>
            <FaCode />
          </RenderdCheckbox>
        }
      </div>
      <div className="w-[50px] lg:w-[60px] text-left lg:text-center shrink-0">
        {editMode && isUsernameEditable
          ? <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full" />
          : reply.author
        }
      </div>
      <div className="w-full lg:flex-grow ml-12 mt-1.5 lg:mt-0 lg:ml-5">
        {editMode && isTextEditable
          ? <div className="pe-14">
              <TextEdit
                className="w-full"
                placeholder="내용을 입력하세요."
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                tail={<button onClick={handleEditSubmit} className="cursor-pointer text-white absolute h-full end-0 bottom-0 bg-[#435373] hover:bg-[#3457A0] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-e-lg text-sm px-4 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">수정하기</button>}
              />
            </div>
          : renderText(reply.text, context)
        }
      </div>
      {isEditable &&
        <div onClick={handleEdit} className="absolute right-7 cursor-pointer opacity-0 group-hover:opacity-100 text-gray-600">
          <svg className="w-5 h-5 text-inherit dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
          </svg>
        </div>
      }
      {isDeletable &&
        <div onClick={handleDelete} className="absolute right-2 cursor-pointer opacity-0 group-hover:opacity-100 text-gray-600">
          <svg className="w-5 h-5 text-inherit dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
          </svg>
        </div>
      }
    </div>
  );
}

function ReplyWriter({ post, update, close }) {
  const [jsMode, setJsMode] = useState(false);
  const [username, setUsername] = useState('');
  const [text, setText] = useState('');

  const user = useUser();
  const isAdmin = user.isAdmin;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.trim() == '') {
      alert("내용을 입력하세요.");
      return;
    }

    try {
      await createReply(BOARD_ID, post.id, user, username, jsMode, text);
      await update();
    }
    catch (e) {
      alert("오류가 발생하였습니다. 관리자에게 문의해주세요.");
    }
    setText('');
    close();
  };
  return (
    <form className="flex w-full">
      {isAdmin &&
        <RenderdCheckbox className="p-1 relative inline-block" title="JS Mode" value={jsMode} onChange={(e) => setJsMode(e.target.checked)}>
          <FaCode size="1rem" />
        </RenderdCheckbox>
      }
      {isAdmin &&
        <TextEdit
          icon={<FaUser />}
          placeholder="작성자"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      }
      <TextEdit
        className="grow"
        placeholder="댓글을 입력하세요."
        value={text}
        onChange={(e) => setText(e.target.value)}
        tail={<TextEditTailButton onClick={handleSubmit}>댓글쓰기</TextEditTailButton>}
      />
    </form>
  );
}

function Loading() {
  return (    
    <div role="status">
      <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default GoodPage;

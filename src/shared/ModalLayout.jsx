import React from 'react';

function ModalLayout ({ className, isOpen, handleClose, children }) {
  const preventPropagation = (e) => e.stopPropagation();

  return (
    <>
      {isOpen && (
        <div onClick={handleClose} className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50">
          <div onClick={preventPropagation} className={`bg-white rounded-2xl shadow-xl p-6 relative ${className}`}>
            {/* 닫기 버튼 */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl cursor-pointer"
              onClick={handleClose}
            >
              &times;
            </button>

            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default ModalLayout;

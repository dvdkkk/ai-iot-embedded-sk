
import React, { useEffect, useState } from 'react';

export const FloatingCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 스크롤이 조금 발생하면 버튼 표시
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`fixed bottom-6 right-6 z-50 pointer-events-none transition-all duration-500 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
    >
      <a 
        href="https://naver.me/GyYmEEvT" 
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto bg-purple-800 hover:bg-purple-700 text-white font-bold text-sm w-16 h-16 rounded-full shadow-[0_4px_15px_rgba(107,33,168,0.4)] flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
        aria-label="문의 신청하기 (새창 열림)"
        title="상담신청 바로가기 (새창)"
      >
        문의
      </a>
    </div>
  );
};

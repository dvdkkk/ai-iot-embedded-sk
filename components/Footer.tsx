import React, { useEffect, useState } from 'react';

export const Footer: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobileUa = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobileUa || window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // 리포트2.0 로그분석코드 시작
    const sTime = new Date().getTime();
    (function(i: any, s: any, o: any, g: any, r: any, a?: any, m?: any){
      i['webObject']=g;
      i['webUid']=r;
      a=s.createElement(o);
      m=s.getElementsByTagName(o)[0];
      a.async=1;
      a.src=g;
      m.parentNode.insertBefore(a,m)
    })(window,document,'script','//nayang81.weblog.cafe24.com/weblog.js?v='+sTime,'nayang81_9');
    // 리포트2.0 로그분석코드 완료

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePhoneClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isMobile) {
      e.preventDefault();
      const link = document.createElement('a');
      link.href = "https://naver.me/GyYmEEvT";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <footer className="bg-black text-zinc-500 py-6 border-t border-zinc-900 text-sm">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
                <h5 className="text-white font-bold mb-4 text-base">한국직업능력교육원 안산</h5>
                <p className="leading-relaxed mb-4">
                    본 과정은 고용노동부 주관 직업능력개발훈련 과정입니다.<br/>
                    최고의 시설과 강사진으로 여러분의 취업 성공을 끝까지 책임지겠습니다.
                </p>
            </div>
            <div className="md:text-right">
                <p className="font-bold text-zinc-400 mb-2">고객센터</p>
                <a 
                  href={isMobile ? "tel:16618126" : "https://naver.me/GyYmEEvT"}
                  target={isMobile ? undefined : "_blank"}
                  rel={isMobile ? undefined : "noopener noreferrer"}
                  onClick={handlePhoneClick}
                  className="text-2xl font-bold text-white hover:text-purple-400 transition-colors inline-block"
                  title={isMobile ? "전화 걸기" : "상담신청 바로가기 (새창)"}
                >
                  1661-8126
                </a>
            </div>
        </div>

        <div className="border-t border-zinc-900 pt-8 space-y-2 text-xs md:text-sm">
            <p>상호명 : 한국직업능력교육원 안산</p>
            <p>지점 : 안산캠퍼스</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
                <p>사업자등록번호 : 119-81-54852</p>
                <p>개인정보보호책임자 : 김진철</p>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mt-4">
                <p className="text-zinc-600">Copyright ⓒ 한국직업능력교육원 안산 All rights reserved.</p>
            </div>
        </div>
      </div>
    </footer>
  );
};
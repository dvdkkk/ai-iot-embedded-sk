
import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { Phone, MapPin, ExternalLink, CheckCircle2, Sparkles } from 'lucide-react';

// 스크롤 애니메이션 컴포넌트
interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const Reveal: React.FC<RevealProps> = ({ children, className = "", delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: '0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-200 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export const ConsultationForm: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobileUa = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobileUa || window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
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
    <section id="consultation" className="py-12 md:py-16 bg-purple-900 text-white scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* Left Text */}
          <div className="space-y-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-purple-200 text-xs font-bold mb-3">
                <Sparkles size={14} className="text-yellow-400" />
                <span>1:1 맞춤형 국비지원 무료 컨설팅</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-6">
                망설이지 마세요.<br/>
                교육 전문가가 <br/>
                친절하게 안내해드립니다.
              </h2>
              <p className="text-base md:text-lg font-medium text-white/80 mb-6 leading-relaxed">
                국비지원 자격 여부부터 취업·교육과정까지<br/>
                <span className="border-b-2 border-white pb-0.5">무료로 상담해드립니다.</span>
              </p>
              
              <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white text-purple-900 rounded-2xl flex items-center justify-center shrink-0 shadow-md">
                          <Phone size={22} />
                      </div>
                      <div>
                          <p className="text-xs font-bold text-white/70">교육문의</p>
                          <a 
                            href={isMobile ? "tel:16618126" : "https://naver.me/GyYmEEvT"}
                            target={isMobile ? undefined : "_blank"}
                            rel={isMobile ? undefined : "noopener noreferrer"}
                            onClick={handlePhoneClick}
                            className="text-2xl md:text-3xl font-black block hover:text-purple-200 transition-colors"
                            title={isMobile ? "전화 걸기" : "상담신청 바로가기 (새창)"}
                          >
                            1661-8126
                          </a>
                      </div>
                  </div>
                  <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white text-purple-900 rounded-2xl flex items-center justify-center shrink-0 shadow-md">
                          <MapPin size={22} />
                      </div>
                      <div>
                          <p className="text-xs font-bold text-white/70">교육장소</p>
                          <p className="text-lg md:text-xl font-bold">한국직업능력교육원 안산</p>
                      </div>
                  </div>
              </div>
              <p className="font-bold text-base md:text-lg mt-6 text-purple-200">여러분의 새로운 도전을 진심으로 응원합니다!</p>
            </Reveal>
          </div>

          {/* Right Consultation CTA Card (Replacing previous form) */}
          <Reveal delay={200} className="h-full">
            <div className="bg-white rounded-3xl p-6 md:p-8 lg:p-10 shadow-2xl text-zinc-900 border border-purple-100 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-900 font-black text-xs">
                    <span className="w-2 h-2 rounded-full bg-purple-600 animate-ping"></span>
                    실시간 온라인 접수 중
                  </span>
                  <span className="text-xs font-bold text-gray-500">
                    수강료 국비지원
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-black text-zinc-900 mb-3 tracking-tight">
                  빠른 상담신청
                </h3>
                
                <p className="text-sm md:text-base text-gray-600 mb-6 leading-relaxed break-keep">
                  복잡한 서류 준비 없이 1분 만에 신청하세요.<br className="hidden sm:inline" />
                  전담 상담사가 맞춤 국비지원 혜택과 상세 교육 커리큘럼을 친절히 상담해드립니다.
                </p>

                <div className="space-y-3 mb-8 bg-zinc-50 rounded-2xl p-4 md:p-5 border border-zinc-100">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-purple-700 shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm font-semibold text-zinc-700">
                      수강료 국비 지원
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-purple-700 shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm font-semibold text-zinc-700">
                      매월 최대 훈련장려금 지급 혜택 지원
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-purple-700 shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm font-semibold text-zinc-700">
                      Cortex-M4 ARM 실습 키트 및 교재 무상 제공
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-purple-700 shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm font-semibold text-zinc-700">
                      1:1 취업 컨설팅 및 우수 협약기업 연계 추천
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <a
                  href="https://naver.me/GyYmEEvT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full group inline-flex items-center justify-center gap-3 bg-purple-800 hover:bg-purple-900 text-white font-black py-4 px-6 rounded-2xl text-lg md:text-xl shadow-[0_10px_25px_rgba(107,33,168,0.35)] hover:shadow-[0_15px_35px_rgba(107,33,168,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
                >
                  <span>상담신청하기</span>
                  <ExternalLink size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <p className="text-[11px] md:text-xs text-center text-gray-500 mt-3 font-medium">
                  클릭 시 네이버 폼 상담신청 페이지로 바로 이동합니다.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

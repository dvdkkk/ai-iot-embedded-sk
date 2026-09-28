import React, { useRef, useState, useEffect, ReactNode } from 'react';
import { BookOpen, Database, Smartphone, Brain, Rocket, CheckCircle2, Code2, Terminal, Server, Camera, Cpu, Layers } from 'lucide-react';

// Animation Component
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
      { threshold: 0.1, rootMargin: '0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const CURRICULUM_STEPS = [
  {
    step: "STEP 1",
    title: "프로그래밍 실습",
    category: "기초 프로그래밍",
    description: "프로그래밍 기초 요소 학습 / 파일 조작과 문서 탐색 / 오픈소스 활용 및 실습",
    stacks: ["프로그래밍 언어", "HTML5", "CSS3", "JavaScript"],
    icon: Terminal
  },
  {
    step: "STEP 2",
    title: "서버 프로그래밍과 데이터베이스 구현",
    category: "백엔드 & DB",
    description: "서버프로그래밍 기초 요소 / 데이터베이스 구현과 관리 / 서버와 데이터베이스 실습",
    stacks: ["서버와 데이터베이스 실습", "SQL", "jQuery"],
    icon: Database
  },
  {
    step: "STEP 3",
    title: "임베디드 시스템과 펌웨어 프로그래밍",
    category: "임베디드 펌웨어",
    description: "펌웨어 프로그래밍 기초 / 마이크로컨트롤러 기반 프로그래밍 / 센서와 액추에이터 활용",
    stacks: ["아두이노", "센서 IF 신호처리", "MCU 프로그래밍 실습", "Server/Client/Serial 통신 터미널 GUI"],
    icon: Cpu
  },
  {
    step: "STEP 4",
    title: "애플리케이션개발언어",
    category: "알고리즘 & 자료구조",
    description: "자료구조 파악 / 알고리즘 파악 및 실습",
    stacks: ["자료구조 파악", "알고리즘 파악 및 실습", "HTML5", "CSS3", "JavaScript"],
    icon: Code2
  },
  {
    step: "STEP 5",
    title: "임베디드시스템과 라즈베리파이 활용",
    category: "SBC & MCU 응용",
    description: "라즈베리파이로 프로그래밍 / 센서 및 데이터 활용 / MCU(STM32, ESP32) 활용",
    stacks: ["라즈베리파이", "USB Web 카메라 영상처리 제어 프로그램 개발 실습"],
    icon: Server
  },
  {
    step: "STEP 6",
    title: "리눅스 기초와 활용",
    category: "임베디드 리눅스",
    description: "리눅스 환경구축 / 리눅스 운영체제 소개와 기본 명령어 / 파일 시스템 관리 및 권한 설정",
    stacks: ["ESP32 펌웨어 제어 실습", "UART / USART 시리얼 통신 제어 프로그램 개발"],
    icon: Layers
  },
  {
    step: "STEP 7",
    title: "컴퓨터 비전 활용",
    category: "AI & 영상인식",
    description: "컴퓨터 비전 기초 / OpenCV 활용 프로그래밍 / 응용 프로젝트 / 딥러닝을 통한 이미지 분류 / 확장된 이미지 처리 기술",
    stacks: ["OpenCV 활용 프로그래밍", "영상처리 및 인식 프로그램 개발 실습"],
    icon: Camera
  },
  {
    step: "STEP 8",
    title: "웹 대시보드 디자인과 활용",
    category: "IoT 관제 & 대시보드",
    description: "웹 프론트엔드 기초 / 데이터 시각화와 대시보드 구현",
    stacks: ["데이터 시각화 및 대시보드 구현 실습", "Network 소켓 통신 프로그램 실습"],
    icon: BookOpen
  }
];

export const CourseSection: React.FC = () => {
  return (
    <section id="courses" className="py-24 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-800/30 to-transparent"></div>
      <div className="absolute right-0 top-1/3 w-96 h-96 bg-purple-800/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <Reveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-800/10 border border-purple-800/30 text-purple-800 mb-4">
            <Code2 size={14} />
            <span className="text-xs font-bold tracking-wide uppercase">CURRICULUM ROADMAP</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
            체계적인 <span className="text-purple-800">9단계 마스터 로드맵</span>
          </h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-2xl mx-auto">
            기초 프로그래밍부터 임베디드 펌웨어, AI 컴퓨터 비전 및 최종 스마트팜 캡스톤 프로젝트까지 완벽하게 완성합니다.
          </p>
        </Reveal>

        {/* 1 ~ 8 Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {CURRICULUM_STEPS.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Reveal key={index} delay={index * 50}>
                <div className="h-full bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between hover:border-purple-800/50 transition-all duration-300 group hover:-translate-y-1 shadow-lg">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-black text-purple-800 bg-purple-800/10 px-2.5 py-1 rounded-full border border-purple-800/20">
                        {item.step}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-zinc-800/80 flex items-center justify-center text-purple-400 group-hover:bg-purple-800 group-hover:text-black transition-colors">
                        <IconComponent size={20} />
                      </div>
                    </div>

                    <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-black text-white mb-3 tracking-tight group-hover:text-purple-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-zinc-400 text-xs md:text-sm leading-relaxed mb-6 break-keep">
                      {item.description}
                    </p>
                  </div>

                  <div>
                    <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap gap-1.5">
                      {item.stacks.map((stack, sIdx) => (
                        <span key={sIdx} className="text-[10px] font-medium bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-md">
                          #{stack}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* STEP 9: Wide Highlight Card for Final Capstone Project */}
        <Reveal delay={400}>
          <div className="relative rounded-3xl bg-gradient-to-r from-zinc-900 via-purple-950/40 to-zinc-900 border border-purple-800/40 p-8 md:p-12 overflow-hidden shadow-2xl group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-800/10 rounded-full blur-[120px] pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="space-y-4 max-w-3xl">
                <div className="inline-flex items-center gap-2">
                  <span className="text-xs font-mono font-black text-black bg-purple-800 px-3 py-1 rounded-full uppercase tracking-wider">
                    STEP 9 · FINAL CAPSTONE
                  </span>
                  <span className="text-xs text-purple-400 font-bold">종합 실무 프로젝트</span>
                </div>
                
                <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight">
                  SmartFarm 통합 IOT 관리 시스템<br />
                  <span className="text-purple-400">개발 프로젝트</span>
                </h3>
                
                <p className="text-zinc-300 text-sm md:text-base leading-relaxed break-keep">
                  스마트팜 제작, 컴퓨터 비전 기반 스마트팜 제어, 화재감지 모니터링 시스템 등 전 과정에서 배운 MCU 펌웨어와 웹 대시보드 기술을 총동원하여 실제 동작하는 하드웨어-소프트웨어 융합 시스템을 완성합니다.
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-xs font-bold bg-purple-800/20 text-purple-300 border border-purple-800/30 px-3 py-1 rounded-lg"># 스마트팜 제작</span>
                  <span className="text-xs font-bold bg-purple-800/20 text-purple-300 border border-purple-800/30 px-3 py-1 rounded-lg"># 컴퓨터비전 스마트팜</span>
                  <span className="text-xs font-bold bg-purple-800/20 text-purple-300 border border-purple-800/30 px-3 py-1 rounded-lg"># 화재감지 모니터링 시스템</span>
                </div>
              </div>

              <div className="shrink-0">
                <a
                  href="https://naver.me/GyYmEEvT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-purple-800 hover:bg-purple-700 text-black font-black px-8 py-4 rounded-2xl text-base transition-all hover:scale-105 shadow-[0_0_30px_rgba(107,33,168,0.4)]"
                >
                  <Rocket size={18} />
                  지원 문의하기
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Education Inquiry Button */}
        <Reveal className="w-full mt-20 flex justify-center">
          <a
            href="https://naver.me/GyYmEEvT"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-purple-800 to-purple-900 text-black font-black text-lg md:text-xl px-10 py-4 rounded-full shadow-[0_0_30px_rgba(107,33,168,0.4)] hover:shadow-[0_0_50px_rgba(107,33,168,0.6)] hover:scale-105 transition-all duration-300"
          >
            <span className="absolute inset-0 rounded-full bg-white/20 animate-ping" style={{ animationDuration: '2s' }}></span>
            상담신청하기
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </Reveal>

      </div>
    </section>
  );
};

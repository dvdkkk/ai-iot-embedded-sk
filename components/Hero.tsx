
import React from 'react';
import { Star, Calendar, Clock, MapPin, Home, UserCheck, Flame, Cpu, ArrowRight } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

export const Hero: React.FC = () => {
  const { content } = useContent();
  const { hero } = content;

  // Icon mapping for stats (Recruitment Summary)
  const statIcons = [
    <Flame size={18} className="text-red-500 animate-pulse" />,
    <Clock size={18} className="text-purple-800" />,
    <Calendar size={18} className="text-purple-800" />,
    <MapPin size={18} className="text-purple-800" />,
    <Home size={18} className="text-purple-800" />,
    <UserCheck size={18} className="text-purple-800" />,
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black pt-28 pb-16">
      
      {/* Background Image & Multi-layer Dark Gradient Overlays (z-0) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="https://postfiles.pstatic.net/MjAyNjA5MTVfNjkg/MDAxNzg5NDUzNzgwMzc3.pTnYakJdg9ORqrFyJA2NldeMvytmwI8Jh3dBu2dHLHEg.ZG44_0USliLs-SdmPNyYPp3r-QIg6Ewdzglo-ZwfkyYg.PNG/2654.png?type=w966"
          alt="Hero Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-95 brightness-105 scale-105 transform animate-fade-in"
        />
        {/* Multi-layer Dark Gradient Overlay for optimal readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(107,33,168,0.15)_0%,transparent_70%)]" />
      </div>

      {/* Content (z-10) - Left Aligned */}
      <div className="container mx-auto px-4 z-10 relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-8 text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-800/20 border border-purple-800/40 text-purple-400 backdrop-blur-md shadow-[0_0_25px_rgba(107,33,168,0.2)] animate-fade-in-up">
              <Star size={15} fill="currentColor" />
              <span className="text-xs font-black tracking-wide">{hero.badge}</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.15] tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
              <span className="text-purple-400 block mb-2 font-bold text-2xl md:text-3xl">{hero.title}</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-purple-300 whitespace-pre-line">
                {hero.highlight}
              </span>
            </h1>
            
            <p className="text-base md:text-xl text-zinc-300 max-w-2xl font-medium leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] break-keep">
              {hero.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="https://naver.me/GyYmEEvT"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-purple-800 hover:bg-purple-700 text-black font-black px-8 py-4 rounded-2xl text-base transition-all hover:scale-105 shadow-[0_0_30px_rgba(107,33,168,0.4)]"
              >
                무료 상담 신청하기
                <ArrowRight size={18} />
              </a>
              <a
                href="#courses"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 bg-zinc-900/80 hover:bg-zinc-800 text-white font-bold px-7 py-4 rounded-2xl text-base border border-white/10 backdrop-blur-md transition-all"
              >
                커리큘럼 보기
              </a>
            </div>
          </div>

          {/* Right Side: Official Course Name Card */}
          <div className="lg:col-span-4">
            <div className="relative p-6 md:p-8 rounded-3xl bg-zinc-900/80 backdrop-blur-xl border border-white/15 overflow-hidden shadow-2xl group">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-purple-800 via-purple-600 to-purple-800"></div>
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500"></span>
                  </span>
                  <span className="text-xs font-black text-purple-400 uppercase tracking-[0.2em]">Official Certification</span>
                </div>
                
                <div className="flex items-start gap-3 pt-2">
                  <Cpu className="text-purple-400 shrink-0 mt-1" size={28} />
                  <h2 className="text-lg md:text-xl font-black text-white tracking-tight leading-snug break-keep">
                    AI사물인터넷 MCU기반<br />
                    (STM32,ESP32)<br />
                    <span className="text-purple-400">임베디드 펌웨어 전문가 양성</span>
                  </h2>
                </div>

                <div className="pt-4 border-t border-white/10 mt-2 text-xs text-zinc-400 space-y-1.5">
                  <p className="flex items-center gap-2">✔ 고용노동부 지원 국비훈련과정</p>
                  <p className="flex items-center gap-2">✔ 훈련수당 매달 지급 (조건부)</p>
                  <p className="flex items-center gap-2">✔ 취업 연계 1:1 밀착 컨설팅</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Recruitment Info Summary Stats Grid (6 Items) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mt-16 w-full border-t border-white/15 pt-8 bg-zinc-950/60 backdrop-blur-md p-4 md:p-6 rounded-3xl border border-white/10 shadow-xl">
          {hero.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 hover:border-purple-800/40 transition-all group">
              <div className="flex items-center gap-1.5 mb-1.5">
                {statIcons[idx]}
                <p className="text-zinc-400 text-[11px] font-bold uppercase tracking-wider">{stat.label}</p>
              </div>
              <p className={`text-xs md:text-sm font-black text-center break-keep ${idx === 0 ? 'text-purple-400 font-extrabold' : 'text-white'}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};


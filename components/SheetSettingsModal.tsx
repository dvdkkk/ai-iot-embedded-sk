import React, { useState } from 'react';
import { Settings, RefreshCw, Check, AlertCircle, X, ExternalLink } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

export const SheetSettingsModal: React.FC = () => {
  const { sheetStatus, setSheetUrl, refreshSheetData } = useContent();
  const [isOpen, setIsOpen] = useState(false);
  const [inputUrl, setInputUrl] = useState(sheetStatus.sheetUrl || '');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    const success = await setSheetUrl(inputUrl);
    setIsSubmitting(false);

    if (success) {
      setStatusMessage({ type: 'success', text: '성공적으로 구글 시트 데이터를 가져와 교육기간(D4)에 반영했습니다!' });
    } else {
      setStatusMessage({ 
        type: 'error', 
        text: sheetStatus.error || '시트 데이터를 가져오지 못했습니다. "웹에 게시(CSV)" URL인지 확인해주세요.' 
      });
    }
  };

  const handleRefresh = async () => {
    setIsSubmitting(true);
    setStatusMessage(null);
    const success = await refreshSheetData();
    setIsSubmitting(false);
    if (success) {
      setStatusMessage({ type: 'success', text: '최신 시트 데이터로 갱신되었습니다.' });
    } else {
      setStatusMessage({ type: 'error', text: sheetStatus.error || '새로고침에 실패했습니다.' });
    }
  };

  return (
    <>
      {/* Discreet footer trigger button */}
      <button
        onClick={() => {
          setInputUrl(sheetStatus.sheetUrl || localStorage.getItem('google_sheet_url') || '');
          setStatusMessage(null);
          setIsOpen(true);
        }}
        className="inline-flex items-center gap-1.5 text-[11px] text-zinc-500 hover:text-purple-400 transition-colors py-1 px-2.5 rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-900/60"
        title="구글 시트 연동 설정"
      >
        <Settings size={12} />
        <span>개강일 시트 연동 설정</span>
      </button>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative text-left">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-900/50 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Settings size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">구글 시트 자동 연동 설정</h3>
                <p className="text-xs text-zinc-400">PapaParse 라이브러리로 CSV 데이터를 실시간 파싱합니다.</p>
              </div>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                  구글 시트 웹 게시 CSV URL
                </label>
                <input
                  type="url"
                  placeholder="https://docs.google.com/spreadsheets/d/e/.../pub?output=csv"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-500 text-xs focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div className="text-[11px] text-zinc-400 bg-zinc-950/70 p-3 rounded-xl border border-zinc-800 space-y-1 leading-relaxed">
                <p className="font-semibold text-zinc-300 flex items-center gap-1">
                  💡 구글 시트 URL 복사 방법:
                </p>
                <p>1. 구글 시트 상단 메뉴 <strong>[파일] → [공유] → [웹에 게시]</strong></p>
                <p>2. 형식에서 <strong>[쉼표로 구분된 값(.csv)]</strong> 선택 후 [게시] 클릭</p>
                <p>3. 생성된 URL을 위 입력창에 붙여넣기 후 [저장 및 불러오기] 클릭</p>
              </div>

              {/* Status Message */}
              {statusMessage && (
                <div
                  className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
                    statusMessage.type === 'success'
                      ? 'bg-green-950/50 border border-green-800/60 text-green-300'
                      : 'bg-red-950/50 border border-red-800/60 text-red-300'
                  }`}
                >
                  {statusMessage.type === 'success' ? (
                    <Check size={16} className="shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  )}
                  <span>{statusMessage.text}</span>
                </div>
              )}

              {sheetStatus.lastUpdated && (
                <p className="text-[11px] text-zinc-500">
                  최근 동기화 시간: {sheetStatus.lastUpdated}
                </p>
              )}

              <div className="flex items-center justify-between pt-2">
                {sheetStatus.sheetUrl && (
                  <button
                    type="button"
                    onClick={handleRefresh}
                    disabled={isSubmitting || sheetStatus.isLoading}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-300 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 transition-colors"
                  >
                    <RefreshCw size={14} className={isSubmitting || sheetStatus.isLoading ? 'animate-spin' : ''} />
                    <span>지금 갱신</span>
                  </button>
                )}

                <div className="flex items-center gap-2 ml-auto">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                  >
                    닫기
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || sheetStatus.isLoading}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-700 hover:bg-purple-600 disabled:bg-purple-900 transition-colors shadow-lg"
                  >
                    {isSubmitting || sheetStatus.isLoading ? '불러오는 중...' : '저장 및 불러오기'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

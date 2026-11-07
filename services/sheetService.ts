/**
 * Google Sheet / CSV D4 셀 개강일 파싱 서비스
 */

// CSV 문자열을 2차원 배열로 파싱 (따옴표 및 쉼표 처리)
export function parseCSV(text: string): string[][] {
  const lines = text.trim().split(/\r?\n/);
  return lines.map(line => {
    const row: string[] = [];
    let inQuotes = false;
    let current = '';
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        row.push(current.trim().replace(/^["']|["']$/g, ''));
        current = '';
      } else {
        current += char;
      }
    }
    row.push(current.trim().replace(/^["']|["']$/g, ''));
    return row;
  });
}

/**
 * 2차원 배열에서 D4(4행 D열, 0-indexed [3][3]) 값 추출
 */
export function extractD4Value(rows: string[][]): string | null {
  if (!rows || rows.length < 4) return null;

  // 1. 직접적인 D4 위치 (Row 4, Col 4 -> 0-indexed [3][3])
  const directD4 = rows[3]?.[3]?.trim();
  if (directD4) return directD4;

  // 2. 3행에서 '개강일' 컬럼 헤더를 찾아 4행의 해당 컬럼 값 추출 (헤더 매칭)
  const headerRow = rows[2] || [];
  const openingDateColIndex = headerRow.findIndex(cell => cell.includes('개강일'));
  if (openingDateColIndex !== -1 && rows[3]?.[openingDateColIndex]?.trim()) {
    return rows[3][openingDateColIndex].trim();
  }

  // 3. 4행에서 한직교 행의 마지막 유효 셀 확인
  const row4 = rows[3] || [];
  for (let c = row4.length - 1; c >= 0; c--) {
    const val = row4[c]?.trim();
    if (val && (val.includes('개강') || val.includes('개월') || /\d{2}\.\d{2}/.test(val))) {
      return val;
    }
  }

  return null;
}

/**
 * Google Sheet URL이 주어졌을 때 CSV 내보내기 URL로 변환
 */
export function formatGoogleSheetUrl(url: string): string {
  if (!url) return '';
  if (url.includes('/pub?output=csv') || url.includes('/export?format=csv') || url.includes('/gviz/tq?tqx=out:csv')) {
    return url;
  }
  const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) {
    const sheetId = match[1];
    const gidMatch = url.match(/[#&?]gid=([0-9]+)/);
    const gidParam = gidMatch ? `&gid=${gidMatch[1]}` : '';
    return `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv${gidParam}`;
  }
  return url;
}

/**
 * 페이지 접속/새로고침 시마다 시트/CSV에서 D4 값을 비동기로 가져옵니다.
 */
export async function fetchOpeningDateFromSheet(): Promise<string | null> {
  const timestamp = Date.now();

  // 사용자 지정 구글 시트 URL (localStorage 또는 윈도우 전역 객체)
  const customUrl = typeof window !== 'undefined'
    ? (localStorage.getItem('opening_date_sheet_url') || (window as any).OPENING_DATE_SHEET_URL)
    : null;

  const candidateUrls: string[] = [];

  if (customUrl) {
    candidateUrls.push(formatGoogleSheetUrl(customUrl));
  }

  // 기본 static CSV 엔드포인트 (캐시 방지 쿼리 추가)
  candidateUrls.push(`/opening_date.csv?t=${timestamp}`);
  candidateUrls.push(`/assets/aistudio/_______________bdb6642d?t=${timestamp}`);

  for (const url of candidateUrls) {
    try {
      const response = await fetch(url, {
        cache: 'no-store',
        headers: {
          'Accept': 'text/csv, text/plain, */*'
        }
      });

      if (response.ok) {
        const text = await response.text();
        const rows = parseCSV(text);
        const d4Val = extractD4Value(rows);
        if (d4Val) {
          return d4Val;
        }
      }
    } catch (e) {
      // 다음 후보 URL 시도
      continue;
    }
  }

  return null;
}

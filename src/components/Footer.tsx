import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-2xl font-bold tracking-tighter mb-4 block">
              동승
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              서울특별시 종로구 종로 266 (종로6가) 동대문종합시장<br />
              대표전화: 02-2262-0114<br />
              팩스: 02-2262-0115
            </p>
            <p className="text-gray-500 text-xs mt-6">
              © {new Date().getFullYear()} DONGSEUNG. All rights reserved.
            </p>
          </div>

          <div>
            <ul className="space-y-3 mt-8">
              <li>
                <Link to="/privacy" className="text-sm text-gray-300 hover:text-white transition-colors">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link to="/cctv" className="text-sm text-gray-300 hover:text-white transition-colors">
                  영상정보처리기기 운영·관리 방침
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">패밀리사이트</h3>
            <select 
              className="w-full bg-gray-900 border border-gray-700 text-white text-sm rounded-md focus:ring-gray-500 focus:border-gray-500 block p-2.5"
              onChange={(e) => {
                if(e.target.value) window.open(e.target.value, '_blank');
              }}
            >
              <option value="">패밀리사이트 선택</option>
              <option value="http://www.ddm-mall.com/">동대문종합시장</option>
              <option value="https://www.marriott.co.kr/hotels/travel/seldp-jw-marriott-dongdaemun-square-seoul/">JW메리어트 동대문 스퀘어 서울</option>
              <option value="https://www.marriott.co.kr/hotels/travel/selcy-courtyard-seoul-botanic-park/">코트야드 바이 메리어트 평택</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
}

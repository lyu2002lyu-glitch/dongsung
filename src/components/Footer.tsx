import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-20 border-t border-white/10">
      <div className="container-default">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-h4 tracking-widest mb-8 block uppercase">
              (주)동승
            </Link>
            <div className="text-gray-400 text-body-s max-w-sm space-y-2">
              <p>서울특별시 종로구 종로 266</p>
              <p>대표전화: 02-2262-0114 | 팩스: 02-2262-0111</p>
            </div>
            <p className="text-gray-500 text-body-s font-medium tracking-widest uppercase mt-12">
              © {new Date().getFullYear()} DONGSEUNG. All rights reserved.
            </p>
          </div>

          <div>
            <ul className="space-y-4 mt-2">
              <li>
                <Link to="/privacy" className="text-body-s font-bold text-gray-400 hover:text-white transition-colors tracking-widest uppercase">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link to="/cctv" className="text-body-s font-bold text-gray-400 hover:text-white transition-colors tracking-widest uppercase">
                  영상정보처리기기 운영·관리 방침
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="relative mt-2">
              <select 
                className="w-full bg-transparent border border-white/30 text-gray-300 text-body-s font-bold tracking-[0.2em] rounded-md focus:ring-white/20 focus:border-white block p-4 appearance-none cursor-pointer hover:border-white transition-colors uppercase"
                onChange={(e) => {
                  if(e.target.value) window.open(e.target.value, '_blank');
                }}
              >
                <option value="" className="bg-black text-white">FAMILY SITE</option>
                <option value="http://www.ddm-mall.com/" className="bg-black text-white">동대문종합시장</option>
                <option value="https://www.marriott.co.kr/hotels/travel/seldp-jw-marriott-dongdaemun-square-seoul/" className="bg-black text-white">JW메리어트 동대문 스퀘어 서울</option>
                <option value="https://www.marriott.co.kr/hotels/travel/selcy-courtyard-seoul-botanic-park/" className="bg-black text-white">코트야드 바이 메리어트 평택</option>
                <option value="https://icheon.newspring.co.kr/Home/Index" className="bg-black text-white">㈜동승 골프앤리조트</option>
                <option value="https://sangju.newspring.co.kr/Home/Index" className="bg-black text-white">㈜동승 레저</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
            <Link to="/admin/write" className="text-body-s text-gray-600 hover:text-white transition-colors mt-6 inline-block uppercase tracking-widest font-bold">
              ADMIN ACCESS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

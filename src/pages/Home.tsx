import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Building2, Briefcase, Globe } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/corporate/1920/1080?grayscale&blur=2"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight"
          >
            새로운 가치를 창조하는<br />글로벌 리더, 동승
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto"
          >
            전통과 혁신을 바탕으로 더 나은 내일을 만들어갑니다.
          </motion.p>
        </div>
      </section>

      {/* Business Areas */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-black mb-4">주요 사업영역</h2>
          <p className="text-gray-500 text-lg">다양한 분야에서 최고의 가치를 제공합니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Parent Company */}
          <Link to="/business/parent" className="group block">
            <div className="bg-gray-50 rounded-2xl p-10 h-full border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Building2 size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">모회사</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                동대문종합시장, JW메리어트 동대문 스퀘어 서울 등 그룹의 핵심 사업을 이끌어갑니다.
              </p>
              <div className="flex items-center text-black font-medium group-hover:text-gray-600">
                <span>자세히 보기</span>
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Subsidiary */}
          <Link to="/business/subsidiary" className="group block">
            <div className="bg-gray-50 rounded-2xl p-10 h-full border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Globe size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">종속회사</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                코트야드 바이 메리어트 평택, (주)동승 파크앤리조트 등 글로벌 확장을 주도합니다.
              </p>
              <div className="flex items-center text-black font-medium group-hover:text-gray-600">
                <span>자세히 보기</span>
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Affiliate */}
          <Link to="/business/affiliate" className="group block">
            <div className="bg-gray-50 rounded-2xl p-10 h-full border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Briefcase size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">관계회사</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                (주)동승 골프앤리조트, (주)동승 레저 등 레저 및 라이프스타일 산업을 선도합니다.
              </p>
              <div className="flex items-center text-black font-medium group-hover:text-gray-600">
                <span>자세히 보기</span>
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Trust Indicator / History Highlight */}
      <section className="bg-black text-white py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 leading-tight">
                반세기의 신뢰,<br />
                100년을 향한 도약
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                1970년 동대문종합시장 설립 이래, 동승은 끊임없는 도전과 혁신으로 대한민국 유통 및 호스피탈리티 산업의 발전을 이끌어왔습니다. 앞으로도 변함없는 신뢰를 바탕으로 더 큰 미래를 열어가겠습니다.
              </p>
              <Link to="/company/history" className="inline-flex items-center border border-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition-colors">
                연혁 보기
                <ArrowRight size={20} className="ml-2" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="border-t border-gray-800 pt-6">
                <div className="text-5xl font-light mb-2">1970</div>
                <div className="text-gray-500">창립 연도</div>
              </div>
              <div className="border-t border-gray-800 pt-6">
                <div className="text-5xl font-light mb-2">8+</div>
                <div className="text-gray-500">주요 계열사</div>
              </div>
              <div className="border-t border-gray-800 pt-6">
                <div className="text-5xl font-light mb-2">No.1</div>
                <div className="text-gray-500">업계 위상</div>
              </div>
              <div className="border-t border-gray-800 pt-6">
                <div className="text-5xl font-light mb-2">Global</div>
                <div className="text-gray-500">사업 영역</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notice & IR */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12 border-b border-black pb-4">
          <h2 className="text-3xl font-bold text-black">공시 및 공지사항</h2>
          <Link to="/ir/notice" className="text-gray-500 hover:text-black flex items-center">
            전체보기 <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="divide-y divide-gray-200">
          {[
            { date: '2024.03.15', title: '제54기 정기주주총회 소집공고', category: '전자공고' },
            { date: '2024.02.28', title: '2023년 결산 재무제표 공시', category: '재무정보' },
            { date: '2023.11.10', title: '신규 임원 선임 안내', category: '공시정보' },
          ].map((item, idx) => (
            <Link key={idx} to="/ir/notice" className="group flex flex-col sm:flex-row sm:items-center py-6 hover:bg-gray-50 transition-colors px-4 -mx-4 rounded-lg">
              <div className="flex items-center mb-2 sm:mb-0 sm:w-48 shrink-0">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-wider w-24">{item.category}</span>
                <span className="text-gray-500">{item.date}</span>
              </div>
              <h3 className="text-lg font-medium text-black group-hover:underline decoration-1 underline-offset-4">{item.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

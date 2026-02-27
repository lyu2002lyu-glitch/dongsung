import PageHeader from '../../components/PageHeader';
import { Building2, Globe, Map, Briefcase } from 'lucide-react';

export default function Subsidiary() {
  const companies = [
    {
      name: '코트야드 바이 메리어트 평택',
      desc: '평택의 새로운 랜드마크로서 비즈니스와 레저 고객 모두에게 최상의 서비스와 편안한 휴식을 제공하는 프리미엄 호텔입니다.',
      icon: <Building2 size={40} className="text-gray-400 mb-6" strokeWidth={1.5} />,
    },
    {
      name: '(주)동승 파크앤리조트',
      desc: '자연과 어우러진 휴식 공간을 조성하고, 고객에게 특별한 경험을 선사하는 종합 리조트 개발 및 운영 전문 기업입니다.',
      icon: <Map size={40} className="text-gray-400 mb-6" strokeWidth={1.5} />,
    },
    {
      name: '(주)동승 글로벌',
      desc: '동승 그룹의 글로벌 네트워크를 확장하고, 해외 시장 개척 및 신규 사업 발굴을 주도하는 글로벌 비즈니스 허브입니다.',
      icon: <Globe size={40} className="text-gray-400 mb-6" strokeWidth={1.5} />,
    },
    {
      name: '(주)동승 US',
      desc: '미국 시장 내 동승 그룹의 입지를 강화하고, 현지 파트너십 구축 및 투자 기회를 모색하는 미주 지역 거점 법인입니다.',
      icon: <Briefcase size={40} className="text-gray-400 mb-6" strokeWidth={1.5} />,
    },
  ];

  return (
    <div className="bg-white">
      <PageHeader 
        title="종속회사" 
        subtitle="글로벌 확장을 주도하는 동승의 종속회사를 소개합니다." 
        imageSrc="https://picsum.photos/seed/subsidiary/1920/400?grayscale"
      />
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {companies.map((company, idx) => (
            <div key={idx} className="bg-gray-50 border border-gray-100 rounded-2xl p-10 hover:shadow-xl transition-shadow duration-300">
              {company.icon}
              <h3 className="text-2xl font-bold text-black mb-4">{company.name}</h3>
              <p className="text-gray-600 leading-relaxed">
                {company.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

import PageHeader from '../../components/PageHeader';
import { ArrowRight, Star, Zap, Heart, Coffee } from 'lucide-react';
import { GENERATED_IMAGES } from '../../constants/images';
import { motion } from 'motion/react';

export default function Subsidiary() {
  const companies = [
    {
      name: '코트야드 바이 메리어트 평택',
      desc: '코트야드 메리어트 평택은 삼성전자, 캠프 험프리스 등과 인접한 평택 최초의 글로벌 호텔로, 230개의 현대적 객실과 다양한 다이닝 공간, 실내 수영장, 피트니스 센터 등을 갖추고 있습니다. 비즈니스 및 레저 여행객을 위한 최적의 입지를 바탕으로, 고품격 서비스와 시설로 차별화된 숙박 경험을 제공합니다.',
      img: '/b_sub_01.jpg',
      link: 'https://link24.kr/90ceGcH',
    },
    {
      name: '㈜동승글로벌',
      desc: '동승글로벌은 동대문 종합시장을 기반으로 성장해 온 동승의 사업경험을 바탕으로  글로벌 섬유·원단 시장의 지평을 넓히기 위해 2026년 설립된 섬유 유통 및 개발 전문 법인입니다.\n우리는 동대문 시장이 보유한 우수한 품질의 원단과 혁신적인 소재를 발굴하여 국내외 시장에 전략적으로 소개하고 있으며, 대한민국 섬유 산업의 강력한 경쟁력을 세계 무대로 연결하는 핵심적인 글로벌 교두보(Gateway) 역할을 수행하고 있습니다.\n동승글로벌은 체계적인 글로벌 네트워크와 전문적인 소재 유통 역량을 결합하여, 단순한 유통을 넘어 패션 및 섬유 산업 전반에 걸쳐 새로운 미래 가치와 비즈니스 솔루션을 창출해 나가고 있습니다.',
      img: '/b_sub_03.jpg',
      link: '#',
    },
    {
      name: '해외현지 특수목적법인 (SPC)',
      desc: '동승은 글로벌 사업 확장의 일환으로 해외(미국) 현지 법인을 설립하여 주거용 부동산 투자 및 임대 사업을 운영하고 있습니다.\n현지 시장 분석과 안정적인 주거 수요를 기반으로 주거용 자산을 확보하고 있으며, 체계적인 자산 관리와 임대 운영을 통해 안정적인 임대수익을 창출하고 있습니다.\n동승은 향후 글로벌 부동산 투자 기회를 지속적으로 발굴하여 해외 사업 포트폴리오를 확대해 나갈 계획입니다.',
      img: '/b_sub_04.jpg',
      link: '#',
    },
    {
      name: '㈜동승파크앤리조트',
      desc: '자연과 사람의 조화를 컨셉으로 한 유기농 식자재의 재배와 친환경적인 테마파크 및 휴양림 조성 등 청정 자연환경의 보존을 통한 복합 인프라를 개발하고 있습니다.',
      img: '/b_sub_02.jpg',
      link: '#',
    },
  ];

  const highlights = [
    { icon: <Star />, title: "글로벌 스탠다드", desc: "세계적인 브랜드와의 협업을 통한 글로벌 수준의 서비스" },
    { icon: <Zap />, title: "미래 성장 동력", desc: "신규 시장 개척을 통한 지속 가능한 성장 기반 마련" },
    { icon: <Heart />, title: "고객 감동 경영", desc: "고객의 기대를 뛰어넘는 특별한 경험과 가치 선사" },
    { icon: <Coffee />, title: "라이프스타일 선도", desc: "새로운 휴식과 문화 트렌드를 제안하는 선구자" }
  ];

  return (
    <div className="bg-white">
      <PageHeader 
        title="종속회사" 
        subtitle="글로벌 확장을 주도하는 동승의 종속회사를 소개합니다." 
        imageSrc={GENERATED_IMAGES.SUBSIDIARY}
      />
      <section className="section-padding container-default">
        <div className="space-y-48 mb-40">
          {companies.map((company, idx) => (
            <div key={idx} className={`flex flex-col lg:flex-row gap-24 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="w-full lg:w-[61.8%] relative">
                <div className="aspect-[1.618/1] overflow-hidden border border-gray-100 rounded-xl">
                  <img 
                    src={company.img} 
                    alt={company.name} 
                    className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gray-50 -z-10 rounded-xl"></div>
              </div>
              <div className="w-full lg:w-[38.2%] space-y-10">
                <div className="space-y-6">
                  <span className="text-[11px] font-bold text-gray-300 uppercase tracking-[0.4em]">Subsidiary</span>
                  <h2 className="text-h3 text-black tracking-tight">{company.name}</h2>
                </div>
                <p className="text-body-m text-gray-500 whitespace-pre-line">
                  {company.desc}
                </p>
                {company.name === '코트야드 바이 메리어트 평택' && (
                  <div className="pt-10">
                    <a 
                      href={company.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-primary rounded-md group"
                    >
                      <span className="text-[14px] font-bold tracking-widest uppercase">공식 홈페이지 방문</span>
                      <ArrowRight size={16} className="ml-3 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-100 p-16 md:p-24 relative overflow-hidden rounded-xl">
          <div className="relative z-10">
            <div className="text-center mb-24">
              <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.6em] mb-8">Key Highlights</h3>
              <h4 className="text-h2 tracking-tight">사업 경쟁력</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-gray-100 rounded-xl overflow-hidden">
              {highlights.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-12 border-b sm:border-b-0 sm:border-r border-gray-100 last:border-r-0 hover:bg-gray-50 transition-all flex flex-col items-center text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-black text-white mb-10 rounded-md">
                    {item.icon}
                  </div>
                  <h5 className="text-h4 tracking-tight mb-6">{item.title}</h5>
                  <p className="text-gray-500 text-body-m">{item.desc}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-32 pt-24 border-t border-gray-100 flex flex-wrap justify-center gap-24 text-center">
              {[
                { label: "Global Reach", value: "15+" },
                { label: "Market Share", value: "42%" },
                { label: "Growth Rate", value: "12.5%" }
              ].map((stat, idx) => (
                <div key={idx}>
                  <div className="text-h1 font-light mb-4">{stat.value}</div>
                  <div className="text-body-s font-bold tracking-widest uppercase text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

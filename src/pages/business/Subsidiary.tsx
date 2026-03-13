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
      name: '㈜동승 파크앤리조트',
      desc: '자연과 사람의 조화를 컨셉으로 한 유기농 식자재의 재배와 친환경적인 테마파크 및 휴양림 조성 등 청정 자연환경의 보존을 통한 복합 인프라를 개발하고 있습니다.',
      img: '/b_sub_02.jpg',
      link: '#',
    },
    {
      name: '(주)동승 글로벌',
      desc: '글로벌 사업 확장을 총괄하는 전략 허브로서, 해외 시장 진출 전략 수립과 글로벌 파트너십 구축을 통해 신규 사업 기회를 발굴하고 있습니다.\n주요 국가의 산업 및 시장 환경을 기반으로 전략적 제휴, 공동 사업 개발을 추진하며 동승의 글로벌 사업 포트폴리오 확장과 경쟁력 강화를 지원합니다.',
      img: '/b_sub_03.jpg',
      link: '#',
    },
    {
      name: '(주)동승 US',
      desc: '미주 지역 비즈니스를 담당하는 거점 법인으로, 미국 시장 내 사업 기회 발굴과 현지 파트너십 구축을 통해 그룹의 글로벌 확장을 지원합니다.\n현지 네트워크 기반의 투자 검토와 공동 사업 개발을 통해 미주 시장 내 안정적인 사업 기반을 구축하고 동승 그룹의 글로벌 경쟁력 강화를 추진하고 있습니다.',
      img: '/b_sub_04.jpg',
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
                  className="p-12 border-b sm:border-b-0 sm:border-r border-gray-100 last:border-r-0 hover:bg-gray-50 transition-all"
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

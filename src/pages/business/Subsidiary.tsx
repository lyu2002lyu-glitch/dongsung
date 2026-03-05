import PageHeader from '../../components/PageHeader';
import { ArrowRight, Star, Zap, Heart, Coffee } from 'lucide-react';
import { GENERATED_IMAGES } from '../../constants/images';
import { motion } from 'motion/react';

export default function Subsidiary() {
  const companies = [
    {
      name: '코트야드 바이 메리어트 평택',
      desc: '평택의 새로운 랜드마크로서 비즈니스와 레저 고객 모두에게 최상의 서비스와 편안한 휴식을 제공하는 프리미엄 호텔입니다.',
      img: 'https://picsum.photos/seed/pyeongtaek/800/600',
      link: '#',
    },
    {
      name: '(주)동승 파크앤리조트',
      desc: '자연과 어우러진 휴식 공간을 조성하고, 고객에게 특별한 경험을 선사하는 종합 리조트 개발 및 운영 전문 기업입니다.',
      img: 'https://picsum.photos/seed/resort/800/600',
      link: '#',
    },
    {
      name: '(주)동승 글로벌',
      desc: '동승 그룹의 글로벌 네트워크를 확장하고, 해외 시장 개척 및 신규 사업 발굴을 주도하는 글로벌 비즈니스 허브입니다.',
      img: 'https://picsum.photos/seed/global/800/600',
      link: '#',
    },
    {
      name: '(주)동승 US',
      desc: '미국 시장 내 동승 그룹의 입지를 강화하고, 현지 파트너십 구축 및 투자 기회를 모색하는 미주 지역 거점 법인입니다.',
      img: 'https://picsum.photos/seed/us/800/600',
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
      <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-48 mb-40">
          {companies.map((company, idx) => (
            <div key={idx} className={`flex flex-col lg:flex-row gap-24 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="w-full lg:w-3/5 relative">
                <div className="aspect-[16/9] overflow-hidden border border-gray-100">
                  <img 
                    src={company.img} 
                    alt={company.name} 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gray-50 -z-10"></div>
              </div>
              <div className="w-full lg:w-2/5 space-y-10">
                <div className="space-y-6">
                  <span className="text-[11px] font-bold text-gray-300 uppercase tracking-[0.4em]">Subsidiary</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-black leading-tight tracking-tight">{company.name}</h2>
                </div>
                <p className="text-base text-gray-500 leading-relaxed font-light">
                  {company.desc}
                </p>
                {company.name === '코트야드 바이 메리어트 평택' && (
                  <div className="pt-10">
                    <a 
                      href={company.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group inline-flex items-center px-10 py-5 bg-black text-white transition-all duration-300 hover:bg-gray-800"
                    >
                      <span className="text-[11px] font-bold tracking-widest uppercase">공식 홈페이지 방문</span>
                      <ArrowRight size={16} className="ml-3 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-100 p-16 md:p-24 relative overflow-hidden">
          <div className="relative z-10">
            <div className="text-center mb-24">
              <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.6em] mb-8">Key Highlights</h3>
              <h4 className="text-4xl md:text-5xl font-bold tracking-tight">사업 경쟁력</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-gray-100">
              {highlights.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-12 border-r border-gray-100 last:border-r-0 hover:bg-gray-50 transition-all"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-black text-white mb-10">
                    {item.icon}
                  </div>
                  <h5 className="text-xl font-bold tracking-tight mb-6">{item.title}</h5>
                  <p className="text-gray-500 text-sm font-light leading-relaxed">{item.desc}</p>
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
                  <div className="text-5xl font-light mb-4">{stat.value}</div>
                  <div className="text-[10px] font-bold tracking-widest uppercase text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

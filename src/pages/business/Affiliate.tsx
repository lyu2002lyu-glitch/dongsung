import PageHeader from '../../components/PageHeader';
import { ArrowRight, Trophy, MapPin, Star, Users } from 'lucide-react';
import { GENERATED_IMAGES } from '../../constants/images';
import { motion } from 'motion/react';

export default function Affiliate() {
  const companies = [
    {
      name: '(주)동승 골프앤리조트',
      desc: '자연과 조화를 이루는 친환경 골프 코스와 최고급 시설을 갖춘 리조트를 통해 골퍼들에게 잊지 못할 라운딩 경험을 선사합니다.',
      img: 'https://picsum.photos/seed/golf/800/600',
      link: '#',
    },
    {
      name: '(주)동승 레저',
      desc: '다양한 레저 시설과 프로그램을 기획하고 운영하여, 고객의 건강하고 활기찬 라이프스타일을 지원하는 종합 레저 전문 기업입니다.',
      img: 'https://picsum.photos/seed/leisure/800/600',
      link: '#',
    },
  ];

  const features = [
    { icon: <Trophy />, title: "최고의 시설", desc: "국내 최고 수준의 레저 시설과 인프라 구축" },
    { icon: <MapPin />, title: "전략적 위치", desc: "접근성이 뛰어난 최적의 입지 조건 확보" },
    { icon: <Star />, title: "차별화된 서비스", desc: "고객 맞춤형 프리미엄 서비스 제공" },
    { icon: <Users />, title: "커뮤니티 활성화", desc: "회원 간의 유대감 형성을 위한 다양한 프로그램" }
  ];

  return (
    <div className="bg-white">
      <PageHeader 
        title="관계회사" 
        subtitle="레저 및 라이프스타일 산업을 선도하는 관계회사를 소개합니다." 
        imageSrc={GENERATED_IMAGES.AFFILIATE}
      />
      <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-48 mb-40">
          {companies.map((company, idx) => (
            <div key={idx} className={`flex flex-col lg:flex-row gap-24 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="w-full lg:w-[61.8%] relative">
                <div className="aspect-[1.618/1] overflow-hidden border border-gray-100">
                  <img 
                    src={company.img} 
                    alt={company.name} 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gray-50 -z-10"></div>
              </div>
              <div className="w-full lg:w-[38.2%] space-y-10">
                <div className="space-y-6">
                  <span className="text-[11px] font-bold text-gray-300 uppercase tracking-[0.4em]">Affiliate</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-black leading-tight tracking-tight">{company.name}</h2>
                </div>
                <p className="text-base text-gray-500 leading-relaxed font-light">
                  {company.desc}
                </p>
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
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-gray-100 mb-40">
          {features.map((item, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-12 border-r border-gray-100 last:border-r-0 hover:bg-gray-50 transition-all group bg-white"
            >
              <div className="w-12 h-12 bg-gray-50 border border-gray-100 flex items-center justify-center mb-10 text-black group-hover:bg-black group-hover:text-white transition-colors">
                {item.icon}
              </div>
              <h4 className="text-xl font-bold mb-6 tracking-tight">{item.title}</h4>
              <p className="text-gray-500 text-sm font-light leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Affiliate Infographic */}
        <div className="bg-white border border-gray-100 p-16 md:p-24 flex flex-col lg:flex-row items-center gap-24">
          <div className="lg:w-[38.2%]">
            <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.6em] mb-8">Leisure Vision</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-black mb-12 tracking-tight leading-tight">
              라이프스타일의<br />
              <span className="text-gray-300">새로운 가치</span>
            </h3>
            <p className="text-gray-500 text-lg font-light leading-relaxed mb-12">
              동승은 레저와 문화를 통해 고객의 삶에 풍요로움을 더하고, 새로운 라이프스타일 트렌드를 선도합니다.
            </p>
          </div>
          <div className="lg:w-[61.8%] grid grid-cols-2 gap-8">
            <div className="bg-gray-50 p-12 border border-gray-100 text-center">
              <div className="text-5xl font-light text-black mb-4">20+</div>
              <div className="text-[10px] font-bold tracking-widest uppercase text-gray-400">Programs</div>
            </div>
            <div className="bg-black p-12 text-white text-center">
              <div className="text-5xl font-bold mb-4">98%</div>
              <div className="text-[10px] font-bold tracking-widest uppercase opacity-60">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

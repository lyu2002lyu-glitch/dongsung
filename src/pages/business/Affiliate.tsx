import PageHeader from '../../components/PageHeader';
import { ArrowRight, Trophy, MapPin, Star, Users } from 'lucide-react';
import { GENERATED_IMAGES } from '../../constants/images';
import { motion } from 'motion/react';

export default function Affiliate() {
  const companies = [
    {
      name: '㈜동승골프앤리조트',
      desc: '뉴스프링빌 CC (경기도 이천)는 소수정예 고객님들께 최상의 맞춤 서비스를 제공하는 품격 높은 컨트리 클럽을 지향하고 있습니다.\n자연의 아름다움과 편안함을 담아 설계한 코스와 이천을 한눈에 내려다볼 수 있는 호텔급 골프텔 매종드시엘에서 품격 있는 차별화된 서비스를 경험할 수 있습니다.',
      img: '/c_sub_01.jpg',
      link: 'https://icheon.newspring.co.kr/Home/Index',
    },
    {
      name: '㈜동승레저',
      desc: '뉴스프링빌 Ⅱ CC (경상북도 상주)는 병풍처럼 펼쳐진 아름다운 백화산과 어울리는 자연친화적인 코스 설계를 통해 고객님들께 운동의 즐거움과 자연의 편안함의 통시에 전해드리고 있습니다. 스페니쉬 스타일의 클럽하우스와 풍미 깊은 와인을 즐기실 수 있는 와이너리, 최상의 숙박시설을 갖춘 게스트하우스, 등 자연 속에서 고객님들께서 즐거움과 편안함을 즐기실 수 있도록 준비했습니다.',
      img: '/c_sub_02.jpg',
      link: 'https://sangju.newspring.co.kr/Home/Index',
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
        title="특수관계회사" 
        subtitle="레저 및 라이프스타일 산업을 선도하는 특수관계회사를 소개합니다." 
        imageSrc={GENERATED_IMAGES.AFFILIATE}
        paddingTop="pt-[100px] md:pt-0"
        paddingBottom="pb-[20px] md:pb-0"
        pcVerticalAlignment="bottom"
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
                  <span className="text-[11px] font-bold text-gray-300 uppercase tracking-[0.4em]">Affiliate</span>
                  <h2 className="text-h3 text-black tracking-tight">{company.name}</h2>
                </div>
                <p className="text-body-m text-gray-500 whitespace-pre-line">
                  {company.desc}
                </p>
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
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-gray-100 mb-40 rounded-xl overflow-hidden">
          {features.map((item, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-12 border-b sm:border-b-0 sm:border-r border-gray-100 last:border-r-0 hover:bg-gray-50 transition-all group bg-white flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 bg-gray-50 border border-gray-100 flex items-center justify-center mb-10 text-black group-hover:bg-black group-hover:text-white transition-colors rounded-md">
                {item.icon}
              </div>
              <h4 className="text-h4 mb-6 tracking-tight">{item.title}</h4>
              <p className="text-gray-500 text-body-m">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Affiliate Infographic */}
        <div className="bg-white border border-gray-100 p-16 md:p-24 flex flex-col lg:flex-row items-center gap-24 rounded-xl">
          <div className="lg:w-[38.2%]">
            <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.6em] mb-8">Leisure Vision</h2>
            <h3 className="text-h2 text-black mb-12 tracking-tight">
              라이프스타일의<br />
              <span className="text-gray-300">새로운 가치</span>
            </h3>
            <p className="text-gray-500 text-body-l mb-12">
              동승은 레저와 문화를 통해 고객의 삶에 풍요로움을 더하고, 새로운 라이프스타일 트렌드를 선도합니다.
            </p>
          </div>
          <div className="lg:w-[61.8%] grid grid-cols-2 gap-8">
            <div className="bg-gray-50 p-12 border border-gray-100 text-center rounded-lg">
              <div className="text-h1 font-light text-black mb-4">36+</div>
              <div className="text-body-s font-bold tracking-widest uppercase text-gray-400">Golf Courses</div>
            </div>
            <div className="bg-black p-12 text-white text-center rounded-lg">
              <div className="text-h1 font-bold mb-4">98%</div>
              <div className="text-body-s font-bold tracking-widest uppercase opacity-60">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

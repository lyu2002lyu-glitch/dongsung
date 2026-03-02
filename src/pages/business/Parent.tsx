import PageHeader from '../../components/PageHeader';
import { ArrowRight } from 'lucide-react';
import { GENERATED_IMAGES } from '../../constants/images';

export default function Parent() {
  const companies = [
    {
      name: '동대문종합시장',
      desc: '1970년 개장 이래 대한민국 원단 및 의류 부자재 유통의 중심지로서 패션 산업의 발전을 이끌어온 동양 최대 규모의 단일 시장입니다.',
      img: GENERATED_IMAGES.MARKET,
      link: 'http://www.ddm-mall.com/',
    },
    {
      name: 'JW메리어트 동대문 스퀘어 서울',
      desc: '서울의 중심, 동대문에 위치한 럭셔리 호텔로, 한국의 전통적인 아름다움과 현대적인 세련미가 조화를 이루는 최상의 휴식 공간을 제공합니다.',
      img: GENERATED_IMAGES.HOTEL,
      link: 'https://www.marriott.co.kr/hotels/travel/seldp-jw-marriott-dongdaemun-square-seoul/',
    },
  ];

  return (
    <div className="bg-white">
      <PageHeader 
        title="모회사" 
        subtitle="동승 그룹의 핵심 사업을 소개합니다." 
        imageSrc={GENERATED_IMAGES.PARENT}
      />
      <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Business Infographic */}
        <div className="mb-40 bg-white border border-gray-100 p-16 md:p-24 relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-24">
            <div className="lg:w-1/2">
              <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.6em] mb-8">Business Structure</h2>
              <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-12">그룹의 핵심 역량</h3>
              <div className="grid grid-cols-2 gap-8">
                <div className="p-10 bg-gray-50 border border-gray-100">
                  <div className="text-4xl font-light mb-3">50+</div>
                  <div className="text-[10px] font-bold tracking-widest uppercase text-gray-400">Years</div>
                </div>
                <div className="p-10 bg-gray-50 border border-gray-100">
                  <div className="text-4xl font-light mb-3">1.2T</div>
                  <div className="text-[10px] font-bold tracking-widest uppercase text-gray-400">Assets</div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 w-full space-y-10">
              {[
                { label: "Market Leadership", value: 95 },
                { label: "Service Quality", value: 98 },
                { label: "Innovation Index", value: 88 }
              ].map((item, idx) => (
                <div key={idx} className="space-y-4">
                  <div className="flex justify-between text-[10px] font-bold tracking-widest uppercase text-gray-400">
                    <span>{item.label}</span>
                    <span className="text-black">{item.value}%</span>
                  </div>
                  <div className="h-[1px] w-full bg-gray-100">
                    <div className="h-full bg-black" style={{ width: `${item.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-48">
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
                  <span className="text-[11px] font-bold text-gray-300 uppercase tracking-[0.4em]">Core Business</span>
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
      </section>
    </div>
  );
}

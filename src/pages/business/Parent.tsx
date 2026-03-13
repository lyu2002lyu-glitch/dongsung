import PageHeader from '../../components/PageHeader';
import { ArrowRight } from 'lucide-react';
import { GENERATED_IMAGES } from '../../constants/images';

export default function Parent() {
  const companies = [
    {
      name: '동대문종합시장',
      desc: '동대문종합시장은 1970년 12월 동양최대규모의 단일시장으로 출범하여 40여 년 동안 품질이 우수한 상품을 합리적인 가격으로 고객들께 제공하는 세계적인 의류재료 전문상가로 지속적인 관심과 사랑을 받아왔습니다.\n\n원단, 의류부자재, 액세서리를 비롯하여 최신 혼수용품의 도소매까지, 패션 토탈 쇼핑몰로서 더욱 쉽고 편안한 One-stop Shopping 인프라를 제공하기 위해 노력하고 있습니다. 동대문종합시장은 앞으로 국제적인 디자인허브로 자리매김할 수 있도록 더욱더 역량을 집중하고 있습니다.',
      img: GENERATED_IMAGES.MARKET,
      link: 'http://www.ddm-mall.com/',
    },
    {
      name: 'JW메리어트 동대문 스퀘어 서울',
      desc: '패션의 메카 동대문 지역의 유일한 특 1급 호텔인 JW Marriott Dongdaemun Square Seoul를 소유ㆍ운영하는 회사로서 대한민국의 보물 흥인지문과 함께 지역을 대표하는 랜드마크로 자리 잡을 수 있도록 국내외 최고의 호텔리어들이 모여 아낌없는 노력을 기울이고 있습니다.',
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
      <section className="section-padding container-default">
        {/* Business Infographic */}
        <div className="mb-40 bg-white border border-gray-100 p-16 md:p-24 relative overflow-hidden rounded-xl">
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-24">
            <div className="lg:w-[38.2%]">
              <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.6em] mb-8">Business Structure</h2>
              <h3 className="text-h2 tracking-tight mb-12">그룹의 핵심 역량</h3>
              <div className="grid grid-cols-2 gap-8">
                <div className="p-10 bg-gray-50 border border-gray-100 rounded-lg">
                  <div className="text-h2 font-light mb-3">50+</div>
                  <div className="text-body-s font-bold tracking-widest uppercase text-gray-400">Years</div>
                </div>
                <div className="p-10 bg-gray-50 border border-gray-100 rounded-lg">
                  <div className="text-h2 font-light mb-3">1.2T</div>
                  <div className="text-body-s font-bold tracking-widest uppercase text-gray-400">Assets</div>
                </div>
              </div>
            </div>
            <div className="lg:w-[61.8%] w-full space-y-10">
              {[
                { label: "Market Leadership", value: 95 },
                { label: "Service Quality", value: 98 },
                { label: "Innovation Index", value: 88 }
              ].map((item, idx) => (
                <div key={idx} className="space-y-4">
                  <div className="flex justify-between text-body-s font-bold tracking-widest uppercase text-gray-400">
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
            <div id={`company-${idx}`} key={idx} className={`flex flex-col lg:flex-row gap-24 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
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
                  <span className="text-[11px] font-bold text-gray-300 uppercase tracking-[0.4em]">Core Business</span>
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
      </section>
    </div>
  );
}

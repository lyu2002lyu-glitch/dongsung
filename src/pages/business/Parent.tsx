import PageHeader from '../../components/PageHeader';
import { ArrowRight } from 'lucide-react';

export default function Parent() {
  const companies = [
    {
      name: '동대문종합시장',
      desc: '1970년 개장 이래 대한민국 원단 및 의류 부자재 유통의 중심지로서 패션 산업의 발전을 이끌어온 동양 최대 규모의 단일 시장입니다.',
      img: 'https://picsum.photos/seed/market/800/600?grayscale',
      link: 'http://www.ddm-mall.com/',
    },
    {
      name: 'JW메리어트 동대문 스퀘어 서울',
      desc: '서울의 중심, 동대문에 위치한 럭셔리 호텔로, 한국의 전통적인 아름다움과 현대적인 세련미가 조화를 이루는 최상의 휴식 공간을 제공합니다.',
      img: 'https://picsum.photos/seed/hotel/800/600?grayscale',
      link: 'https://www.marriott.co.kr/hotels/travel/seldp-jw-marriott-dongdaemun-square-seoul/',
    },
  ];

  return (
    <div className="bg-white">
      <PageHeader 
        title="모회사" 
        subtitle="동승 그룹의 핵심 사업을 소개합니다." 
        imageSrc="https://picsum.photos/seed/parent/1920/400?grayscale"
      />
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto fade-in">
        <div className="space-y-32">
          {companies.map((company, idx) => (
            <div key={idx} className={`flex flex-col md:flex-row gap-12 items-center ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className="w-full md:w-1/2">
                <img 
                  src={company.img} 
                  alt={company.name} 
                  className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <h2 className="text-4xl font-bold text-black">{company.name}</h2>
                <div className="w-12 h-1 bg-black"></div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {company.desc}
                </p>
                <a 
                  href={company.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-black font-bold hover:text-gray-500 transition-colors mt-4 group"
                >
                  홈페이지 바로가기
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

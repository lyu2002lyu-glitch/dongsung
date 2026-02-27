import PageHeader from '../../components/PageHeader';
import { Flag, Tent } from 'lucide-react';

export default function Affiliate() {
  const companies = [
    {
      name: '(주)동승 골프앤리조트',
      desc: '자연과 조화를 이루는 친환경 골프 코스와 최고급 시설을 갖춘 리조트를 통해 골퍼들에게 잊지 못할 라운딩 경험을 선사합니다.',
      icon: <Flag size={40} className="text-gray-400 mb-6" strokeWidth={1.5} />,
    },
    {
      name: '(주)동승 레저',
      desc: '다양한 레저 시설과 프로그램을 기획하고 운영하여, 고객의 건강하고 활기찬 라이프스타일을 지원하는 종합 레저 전문 기업입니다.',
      icon: <Tent size={40} className="text-gray-400 mb-6" strokeWidth={1.5} />,
    },
  ];

  return (
    <div className="bg-white">
      <PageHeader 
        title="관계회사" 
        subtitle="레저 및 라이프스타일 산업을 선도하는 관계회사를 소개합니다." 
        imageSrc="https://picsum.photos/seed/affiliate/1920/400?grayscale"
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

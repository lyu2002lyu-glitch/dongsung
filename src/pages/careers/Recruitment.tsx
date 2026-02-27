import PageHeader from '../../components/PageHeader';
import { Search, UserPlus, Users } from 'lucide-react';

export default function Recruitment() {
  const steps = [
    {
      title: '서류전형',
      desc: '지원자의 역량과 경험을 종합적으로 검토합니다.',
      icon: <Search size={32} className="text-gray-400 mb-4" strokeWidth={1.5} />,
    },
    {
      title: '면접전형',
      desc: '직무 적합성과 인성을 심층적으로 평가합니다.',
      icon: <Users size={32} className="text-gray-400 mb-4" strokeWidth={1.5} />,
    },
    {
      title: '최종합격',
      desc: '동승의 새로운 가족으로 합류하게 됩니다.',
      icon: <UserPlus size={32} className="text-gray-400 mb-4" strokeWidth={1.5} />,
    },
  ];

  return (
    <div className="bg-white">
      <PageHeader 
        title="채용정보" 
        subtitle="동승과 함께 미래를 이끌어갈 인재를 모십니다." 
        imageSrc="https://picsum.photos/seed/careers/1920/400?grayscale"
      />
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto fade-in">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-black mb-4">인재상</h2>
          <p className="text-gray-600 text-lg">
            도전과 혁신을 두려워하지 않으며, 협력을 통해 시너지를 창출하는 인재
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="bg-gray-50 p-8 rounded-2xl text-center border border-gray-100">
            <h3 className="text-xl font-bold text-black mb-2">도전</h3>
            <p className="text-gray-500">현실에 안주하지 않고<br />새로운 목표를 향해 나아가는 인재</p>
          </div>
          <div className="bg-gray-50 p-8 rounded-2xl text-center border border-gray-100">
            <h3 className="text-xl font-bold text-black mb-2">혁신</h3>
            <p className="text-gray-500">창의적인 사고로<br />변화를 주도하는 인재</p>
          </div>
          <div className="bg-gray-50 p-8 rounded-2xl text-center border border-gray-100">
            <h3 className="text-xl font-bold text-black mb-2">협력</h3>
            <p className="text-gray-500">존중과 배려를 바탕으로<br />팀워크를 발휘하는 인재</p>
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-black mb-4">채용 절차</h2>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center relative">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center border border-gray-200 mb-6 z-10">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-black mb-2">{step.title}</h3>
              <p className="text-gray-500 max-w-[200px]">{step.desc}</p>
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[calc(50%+3rem)] w-[calc(100%-6rem)] h-px bg-gray-300 -z-10"></div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <h2 className="text-2xl font-bold text-black mb-6">진행중인 채용공고</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 text-gray-500">
            현재 진행중인 채용공고가 없습니다.
          </div>
        </div>
      </section>
    </div>
  );
}

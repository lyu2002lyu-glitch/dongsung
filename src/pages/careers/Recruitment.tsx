import PageHeader from '../../components/PageHeader';
import { Search, UserPlus, Users, Gift, Sun, Coffee, ShieldCheck } from 'lucide-react';
import { GENERATED_IMAGES } from '../../constants/images';

export default function Recruitment() {
  const steps = [
    {
      title: '서류전형',
      desc: '지원자의 역량과 경험을 종합적으로 검토합니다.',
      icon: <Search size={32} strokeWidth={1.5} />,
    },
    {
      title: '면접전형',
      desc: '직무 적합성과 인성을 심층적으로 평가합니다.',
      icon: <Users size={32} strokeWidth={1.5} />,
    },
    {
      title: '최종합격',
      desc: '동승의 새로운 가족으로 합류하게 됩니다.',
      icon: <UserPlus size={32} strokeWidth={1.5} />,
    },
  ];

  const benefits = [
    { icon: <Gift />, title: "경조사 지원", desc: "각종 경조금 및 경조 휴가 지원" },
    { icon: <Sun />, title: "장기근속 포상", desc: "장기 근속자 대상 포상 및 휴가 제공" },
    { icon: <Coffee />, title: "복지시설 이용", desc: "계열사 호텔 및 리조트 이용 혜택" },
    { icon: <ShieldCheck />, title: "건강검진", desc: "임직원 건강 관리를 위한 정기 검진" }
  ];

  return (
    <div className="bg-white">
      <PageHeader 
        title="채용정보" 
        subtitle="동승과 함께 미래를 이끌어갈 인재를 모십니다." 
        imageSrc={GENERATED_IMAGES.CAREERS}
      />
      <section className="section-padding container-default">
        <div className="text-center mb-32">
          <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.6em] mb-8">Ideal Talent</h2>
          <h3 className="text-h2 text-black mb-12 tracking-tight">동승의 인재상</h3>
          <p className="text-gray-500 text-body-l max-w-3xl mx-auto">
            도전과 혁신을 두려워하지 않으며, 협력을 통해 시너지를 창출하는 인재를 기다립니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-100 mb-40 rounded-xl overflow-hidden">
          {[
            { title: "도전", desc: "현실에 안주하지 않고 새로운 목표를 향해 나아가는 인재" },
            { title: "혁신", desc: "창의적인 사고로 변화를 주도하는 인재" },
            { title: "협력", desc: "존중과 배려를 바탕으로 팀워크를 발휘하는 인재" }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-16 text-center border-b md:border-b-0 md:border-r border-gray-100 last:border-r-0 hover:bg-black hover:text-white transition-all duration-500 group">
              <h3 className="text-h4 mb-6 tracking-tight">{item.title}</h3>
              <p className="text-gray-500 group-hover:text-gray-400 text-body-m">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mb-40">
          <div className="text-center mb-24">
            <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.6em] mb-8">Process</h2>
            <h3 className="text-h2 text-black tracking-tight">채용 절차</h3>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-16 md:gap-32 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center relative w-full max-w-[240px] group">
                <div className="w-24 h-24 bg-white border border-gray-200 text-black flex items-center justify-center mb-10 transition-all duration-500 group-hover:border-black group-hover:bg-black group-hover:text-white rounded-full shadow-sm relative z-20">
                  {step.icon}
                </div>
                <h3 className="text-h4 text-black mb-6 tracking-tight">{step.title}</h3>
                <p className="text-gray-500 text-body-m">{step.desc}</p>
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[calc(50%+3rem)] w-[calc(100%+2rem)] h-[1px] bg-gray-200 z-0"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white border border-gray-100 p-16 md:p-24 mb-40 rounded-xl">
          <div className="text-center mb-24">
            <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.6em] mb-8">Benefits</h2>
            <h3 className="text-h2 text-black tracking-tight">복리후생</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">
            {benefits.map((item, idx) => (
              <div key={idx} className="text-center space-y-8">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-black text-white mb-6 rounded-md">
                  {item.icon}
                </div>
                <h5 className="text-h5 tracking-tight">{item.title}</h5>
                <p className="text-gray-500 text-body-m">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-h4 text-black mb-12 tracking-tight">진행중인 채용공고</h2>
          <div className="bg-white border border-gray-100 p-24 text-gray-400 text-body-m tracking-widest uppercase rounded-xl">
            현재 진행중인 채용공고가 없습니다.
          </div>
        </div>
      </section>
    </div>
  );
}

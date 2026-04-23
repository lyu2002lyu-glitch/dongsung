import PageHeader from '../../components/PageHeader';
import { ArrowRight, Heart, GraduationCap, BookOpen, Star, Users } from 'lucide-react';
import { GENERATED_IMAGES } from '../../constants/images';
import { motion } from 'motion/react';

export default function Foundation() {
  const foundations = [
    {
      name: '(재)동승문화재단',
      desc: '교육과 인재를 중시하는 동승의 철학을 공익 사업으로 실천하고자 1990년에 설립되었습니다.\n설립 이래 우수한 인재들이 경제적 여건에 구애받지 않고 학문에 정진할 수 있도록 장학금과 연구비 지원 사업을 꾸준히 이어오고 있습니다.\n나아가 동승그룹의 사업 영역과 연계하여 관광 및 패션 분야 학생들을 위한 장학 사업과 멘토링 프로그램을 함께 운영함으로써, 해당 분야의 미래를 이끌어갈 전문 인재 육성에도 앞장서고 있습니다.',
      img: '/d_sub_01.jpg',
      link: '#',
    }
  ];

  const features = [
    { icon: <Heart size={24} />, title: "공익철학 실천", desc: "교육과 인재를 중시하는 동승의 철학을 공익 사업으로 실현" },
    { icon: <GraduationCap size={24} />, title: "장학금 지원", desc: "꿈을 향해 정진하는 학생들을 위한 지속적인 장학금 지급" },
    { icon: <BookOpen size={24} />, title: "연구비 지원", desc: "사회의 발전을 이끄는 다양한 공익적 학술 연구 활동 지원" },
    { icon: <Star size={24} />, title: "차세대 인재육성", desc: "관광·패션 분야 학생들을 위한 특화 장학 및 멘토링 전개" }
  ];

  return (
    <div className="bg-white">
      <PageHeader 
        title="문화재단" 
        subtitle="교육과 인재육성을 통해 더 밝은 미래와 따뜻한 세상을 열어갑니다." 
        imageSrc="/d_wide_img.jpg"
        paddingTop="pt-[100px] md:pt-0"
        paddingBottom="pb-[20px] md:pb-0"
        pcVerticalAlignment="bottom"
      />
      <section className="section-padding container-default">
        <div className="space-y-48 mb-40">
          {foundations.map((foundation, idx) => (
            <div key={idx} className={`flex flex-col lg:flex-row gap-24 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="w-full lg:w-[61.8%] relative">
                <div className="aspect-[1.618/1] overflow-hidden border border-gray-100 rounded-xl">
                  <img 
                    src={foundation.img} 
                    alt={foundation.name} 
                    className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gray-50 -z-10 rounded-xl"></div>
              </div>
              <div className="w-full lg:w-[38.2%] space-y-10">
                <div className="space-y-6">
                  <span className="text-[11px] font-bold text-gray-300 uppercase tracking-[0.4em]">Foundation</span>
                  <h2 className="text-h3 text-black tracking-tight">{foundation.name}</h2>
                </div>
                <p className="text-body-m text-gray-500 whitespace-pre-line leading-relaxed">
                  {foundation.desc}
                </p>
                {foundation.link !== '#' && (
                  <div className="pt-10">
                    <a 
                      href={foundation.link} 
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

        {/* Vision Section */}
        <div className="bg-gray-50 p-16 md:p-24 flex flex-col lg:flex-row items-center gap-24 rounded-xl border border-gray-100">
          <div className="lg:w-full text-center max-w-4xl mx-auto">
            <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.6em] mb-8">Foundation Mission</h2>
            <h3 className="text-h2 text-black mb-12 tracking-tight">
              나눔의 기쁨이 꽃피는<br />
              <span className="text-gray-400">행복한 세상을 꿈꿉니다.</span>
            </h3>
            <p className="text-gray-500 text-body-l mb-12 leading-relaxed">
              동승문화재단은 교육과 인재를 중시하는 동승의 철학을 공익 사업으로 펼치고자 설립되었습니다. <br className="hidden md:block" />
              우리는 앞으로도 변함없이 더불어 잘 사는 사회를 위해 진정성 있는 행보를 이어갈 것입니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

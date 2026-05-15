import PageHeader from '../../components/PageHeader';
import { GENERATED_IMAGES } from '../../constants/images';
import { motion } from 'motion/react';
import { Target, Lightbulb, Users } from 'lucide-react';

export default function Greeting() {
  const philosophy = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "신의경영",
      desc: "고객과의 두터운 신뢰를 바탕으로 정직하고 투명한 경영을 실천합니다."
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "윤리경영",
      desc: "기업의 사회적 책임을 다하며 도덕적 가치를 경영의 최우선으로 삼습니다."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "정도경영",
      desc: "원칙과 기준을 준수하며 올바른 길을 걷는 건실한 성장을 추구합니다."
    }
  ];

  return (
    <div className="bg-white">
      <PageHeader 
        title="인사말" 
        subtitle="동승을 찾아주신 여러분을 진심으로 환영합니다." 
        imageSrc={GENERATED_IMAGES.GREETING}
        paddingTop="pt-[100px] md:pt-0"
        paddingBottom="pb-[20px] md:pb-0"
        pcVerticalAlignment="bottom"
      />
      
      <section className="section-padding container-default">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-stretch mb-32">
          <div className="relative h-full">
            <div className="h-full overflow-hidden rounded-xl">
              <img 
                src="/a_sub_01.jpg" 
                alt="Greeting" 
                className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 border border-gray-100 -z-10 hidden lg:block rounded-xl"></div>
          </div>
          
          <div className="space-y-10 flex flex-col justify-center h-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-h2 mb-10 tracking-tight leading-tight font-light">
                <span className="text-gray-300">
                  패션 크리에이터에게 영감을 주는<br />
                  가장 창의적인 생태계를 구축합니다,
                </span>{" "}
                <span className="font-bold text-black">동승</span>
              </h2>
              <div className="text-gray-700 space-y-6 text-body-m leading-relaxed">
                <p>
                  ㈜동승이 지난 50 년간 일관되게 집중해온 회사의 소명은, 패션 크리에이터에게 영감을 주는 생태계를 구축하는 것입니다.
                </p>
                <p>
                  당사는 동대문종합시장 개장 이래, 원단·부자재·가죽·액세서리·실·금속 등 패션 소재 전반을 공급하는 국내 최대 규모의 B2B 패션 상권을 운영해 왔습니다. 학생과 소규모 디자이너부터 대형 패션 브랜드에 이르기까지, 국내 패션 크리에이터라면 누구나 반드시 거쳐가는 핵심 인프라로 자리매김하며, 빠르고 합리적인 가격으로 소재를 확보할 수 있는 환경을 만들어 왔습니다. 현재 본 생태계에는 약 5천개의 업체가 입점해 있으며, 연간 약 1천만명의 크리에이터가 방문하고, 연간 약 5조 원 규모의 거래가 이루어지고 있습니다. 최근에는 인플루언서와 DIY 창작자 등으로 대표되는 일반인 크리에이터의 유입 또한 빠르게 확대되며, 생태계의 저변이 더욱 넓어지고 있습니다.
                </p>
                <p>
                  당사는 단순한 재료 상가를 넘어, 패션 산업 전반을 움직이는 생태계로서 기능하기 위해 지속적으로 영역을 확장하고 있습니다. 재료 공급을 넘어 샘플·패턴·봉제·라벨·물류 등에 이르는 제작 밸류체인 전반의 인프라를 구축하였으며, 사무실·업무공간·전시·스튜디오·금융·교육 등 패션 크리에이터에게 필요한 다양한 기능들을 한곳에 집적해 제공하고 있습니다.
                </p>
                <p>
                  또한, 국내 오프라인 중심 구조의 한계를 넘어, 생태계를 보다 근원적으로 확장하기 위해, 디지털화와 글로벌화에 대한 투자도 지속적으로 추진하고 있습니다. 2014년부터 당사가 운영 중인 JW 메리어트 호텔 (동대문스퀘어서울) 은 해외 크리에이터들이 동대문 인프라를 보다 편리하게 방문하고, 이 생태계를 깊이 경험할 수 있도록 지원하는 거점으로 기능하고 있습니다. 최근에는 동대문 생태계 자체를 해외로 연결하거나, 해외의 B2B 패션 브랜드를 국내에 소개·유통하는 글로벌 에이전시 역할까지 직접 수행하며, 새로운 수출입 경로를 만들어가고 있습니다. 아울러 기존 오프라인 방문객 기반의 거래와 경험을 온라인으로 확장하여 새로운 방식으로 생태계를 이용할 수 있도록 IT플랫폼 구축을 본격적으로 추진하고 있습니다.
                </p>
                <p>
                  국내 B2B 패션의 핵심 생태계로서의 역할을 지속적으로 확장해 나감으로써, 패션 크리에이터들이 보다 효율적으로 창작하고 생산할 수 있는 환경을 구축하고, 이를 통해 더 다양하고 완성도 높은 상품과 콘텐츠가 시장과 소비자에게 이어지는데에 기여할 수 있도록, 지속적으로 노력해나가겠습니다.
                </p>
                <div className="pt-12 border-t border-gray-100">
                  <p className="text-h4 text-black text-right tracking-tight">
                    ㈜동승 대표이사 정종환
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="bg-white border-t border-gray-100 pt-32 relative">
          <div className="relative z-10">
            <div className="text-center mb-24">
              <h3 className="text-body-s font-bold text-gray-400 uppercase tracking-[0.6em] mb-8">Management Philosophy</h3>
              <h4 className="text-h2 tracking-tight">경영철학</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-100 rounded-xl overflow-hidden">
              {philosophy.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="p-12 md:p-16 border-b md:border-b-0 md:border-r border-gray-100 last:border-r-0 hover:bg-gray-50 transition-colors duration-500 flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 bg-black text-white flex items-center justify-center mb-10 rounded-md">
                    {item.icon}
                  </div>
                  <h5 className="text-h4 mb-6 tracking-tight">{item.title}</h5>
                  <p className="text-gray-500 text-body-m">{item.desc}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-32 pt-24 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              {[
                { label: "창립 연도", value: "1969" },
                { label: "임직원 수", value: "200+" },
                { label: "업계 위상", value: "No.1" },
                { label: "사업 영역", value: "Global" }
              ].map((stat, idx) => (
                <div key={idx}>
                  <div className="text-h2 font-light mb-3">{stat.value}</div>
                  <div className="text-body-s font-bold tracking-widest uppercase text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

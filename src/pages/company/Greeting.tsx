import PageHeader from '../../components/PageHeader';
import { GENERATED_IMAGES } from '../../constants/images';
import { motion } from 'motion/react';
import { Target, Lightbulb, Users } from 'lucide-react';

export default function Greeting() {
  const philosophy = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "고객 가치 창출",
      desc: "고객의 기대를 뛰어넘는 최상의 서비스와 가치를 제공합니다."
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "끊임없는 혁신",
      desc: "현실에 안주하지 않고 새로운 미래를 향해 끊임없이 도전합니다."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "사회적 책임",
      desc: "기업의 이익을 사회에 환원하며 함께 성장하는 공동체를 만듭니다."
    }
  ];

  return (
    <div className="bg-white">
      <PageHeader 
        title="인사말" 
        subtitle="동승을 찾아주신 여러분을 진심으로 환영합니다." 
        imageSrc={GENERATED_IMAGES.GREETING}
      />
      
      <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-stretch mb-32">
          <div className="relative h-full">
            <div className="h-full overflow-hidden">
              <img 
                src={GENERATED_IMAGES.GREETING} 
                alt="Greeting" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 border border-gray-100 -z-10 hidden lg:block"></div>
          </div>
          
          <div className="space-y-10 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-[45px] font-bold mb-10 leading-tight text-black tracking-tight">
                "고객과 함께 성장하는 기업,<br />
                <span className="text-gray-300">동승입니다."</span>
              </h2>
              <div className="text-gray-500 space-y-8 text-base leading-relaxed font-light">
                <p>
                  안녕하십니까? (주)동승 홈페이지를 방문해 주신 여러분을 진심으로 환영합니다.
                </p>
                <p>
                  (주)동승은 1969년 설립 이래 '동대문종합시장'을 기반으로 대한민국 섬유·패션 산업의 메카로서 그 역할을 다해왔으며, 끊임없는 변화와 혁신을 통해 호텔, 레저, 문화 등 다양한 분야로 사업 영역을 확장해 왔습니다.
                </p>
                <p>
                  우리는 '고객 가치 창출'과 '사회적 책임'을 최우선으로 생각하며, JW메리어트 동대문 스퀘어 서울과 같은 세계적인 럭셔리 호텔 운영을 통해 글로벌 호스피탈리티의 새로운 기준을 제시하고 있습니다.
                </p>
                <p>
                  또한, 동승문화재단과 동진장학회를 통해 문화 예술 지원과 인재 양성에도 힘쓰며, 기업의 이익을 사회에 환원하는 나눔의 경영을 실천하고 있습니다.
                </p>
                <p>
                  앞으로도 (주)동승은 반세기의 역사를 자산 삼아, 다가올 미래에도 고객에게 사랑받고 사회에 공헌하는 지속 가능한 기업이 되기 위해 최선을 다하겠습니다.
                </p>
                <p>
                  여러분의 가정에 건강과 행복이 가득하시길 기원합니다. 감사합니다.
                </p>
                <div className="pt-16 border-t border-gray-100">
                  <p className="text-xl font-bold text-black text-right tracking-tight uppercase">
                    (주)동승 대표이사 <span className="text-2xl ml-3">정종환</span>
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
              <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.6em] mb-8">Management Philosophy</h3>
              <h4 className="text-4xl md:text-5xl font-bold tracking-tight">동승의 경영철학</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-100">
              {philosophy.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="p-16 border-r border-gray-100 last:border-r-0 hover:bg-gray-50 transition-colors duration-500"
                >
                  <div className="w-12 h-12 bg-black text-white flex items-center justify-center mb-10">
                    {item.icon}
                  </div>
                  <h5 className="text-xl font-bold mb-6 tracking-tight">{item.title}</h5>
                  <p className="text-gray-500 text-sm font-light leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-32 pt-24 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              {[
                { label: "Founded", value: "1969" },
                { label: "Employees", value: "500+" },
                { label: "Assets", value: "1.2T" },
                { label: "Global", value: "No.1" }
              ].map((stat, idx) => (
                <div key={idx}>
                  <div className="text-4xl font-light mb-3">{stat.value}</div>
                  <div className="text-[10px] font-bold tracking-widest uppercase text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

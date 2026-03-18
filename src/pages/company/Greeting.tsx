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
                  신의경영, 윤리경영, 정도경영을 바탕으로<br />
                  고객과 사회에 책임을 다하는 기업,
                </span>{" "}
                <span className="font-bold text-black">동승</span>
              </h2>
              <div className="text-gray-700 space-y-6 text-body-m leading-relaxed">
                <p>
                  서울의 역사가 녹아있는 변화의 중심지 동대문에서 1969년 설립된 동승은 원단의 메카 동대문종합시장을 시작으로 호텔업 등으로 사업을 확장하며 50여 년 동안 건실하고 경쟁력 있는 기업으로 성장해 왔습니다.
                </p>
                <p>
                  동승은 신의경영, 윤리경영, 정도경영의 기업 이념을 바탕으로 새로운 사업 기회를 발굴하고, 우수한 인재 확보와 적극적인 해외 진출을 통해 글로벌 경쟁력을 강화시켜 건강한 성장을 지속할 수 있도록 노력하고 있습니다. 세계적인 명품 호텔 JW Marriott Dongdaemun Square Seoul의 오픈을 통해 패션타운 동대문 지역의 활성화에 중추적인 역할을 다하고 있습니다.
                </p>
                <p>
                  급변하는 경영 환경 속에서 지속적으로 성장할 수 있는 기업, 사회와 함께 성장하고 사회를 변화시키는데 앞서가는 기업으로 힘차게 나아갈 수 있도록 앞으로도 고객 여러분의 지속적인 관심 부탁드리겠습니다.<br />
                  패션의 중심에서 레저를 통한 생활의 업그레이드까지, 동승은 고객 여러분께 더욱 가까이 다가설 것을 약속드립니다.
                </p>
                <p>
                  감사합니다.
                </p>
                <div className="pt-12 border-t border-gray-100">
                  <p className="text-h4 text-black text-right tracking-tight flex items-center justify-end gap-4">
                    ㈜동승 대표이사
                    <img 
                      src="/sign.png" 
                      alt="정종환 서명" 
                      className="h-16 w-auto object-contain"
                      referrerPolicy="no-referrer"
                    />
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

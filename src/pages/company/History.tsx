import PageHeader from '../../components/PageHeader';
import { GENERATED_IMAGES } from '../../constants/images';
import { ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function History() {
  const historyData = [
    {
      year: '2025',
      events: [
        { month: '05', title: '코트야드 바이 메리어트 평택 호텔 개관', desc: '동승은 글로벌 호텔 브랜드 메리어트와 함께 평택 지역에 새로운 라이프스타일 호텔을 선보이며, 호텔·관광·서비스 분야의 사업 경쟁력을 한층 강화했습니다.' },
      ],
    },
    {
      year: '2020',
      events: [
        { month: '03', title: '모범납세자상 수상', desc: '성실한 납세와 투명한 경영 활동을 인정받아 기획재정부로부터 모범납세자상을 수상하며, 책임 있는 기업으로서의 신뢰를 공고히 했습니다.' },
      ],
    },
    {
      year: '2014',
      events: [
        { month: '02', title: 'JW 메리어트 동대문 스퀘어 서울 호텔 개관', desc: '서울 동대문 중심부에 JW 메리어트 동대문 스퀘어 서울 호텔을 개관하며, 프리미엄 호텔 사업 영역을 본격적으로 확장했습니다.' },
        { month: '02', title: 'DS ART HALL 개관', desc: '호텔 공간과 문화예술 콘텐츠를 연계한 DS ART HALL을 개관하여, 고객에게 보다 풍성한 문화 경험을 제공하는 복합문화공간을 조성했습니다.' },
        { month: '02', title: 'DS GALLERY 개관', desc: '예술과 공간이 어우러지는 DS GALLERY를 개관하며, 동승만의 문화적 가치와 감각적인 브랜드 경험을 선보였습니다.' },
      ],
    },
    {
      year: '2011',
      events: [
        { month: '03', title: '납세자의 날 표창 수상', desc: '성실한 세무 이행과 건전한 기업 운영을 바탕으로 기획재정부장관 표창을 수상하며, 지속가능한 경영의 기반을 다졌습니다.' },
      ],
    },
    {
      year: '2010',
      events: [
        { month: '07', title: '지방세 성실납부 공로표창 수상', desc: '지방세 성실납부에 기여한 공로를 인정받아 서울특별시장 표창을 수상하며, 지역사회와 함께 성장하는 기업의 책임을 실천했습니다.' },
      ],
    },
    {
      year: '2006',
      events: [
        { month: '02', title: 'DSAF, LLC 설립', desc: '미국 조지아주 애틀란타에 DSAF, LLC를 설립하며, 동승의 해외 사업 기반을 확대하고 글로벌 네트워크를 강화했습니다.' },
        { month: '03', title: 'DSAK, LLC 설립', desc: '미국 조지아주 애틀란타에 DSAK, LLC를 설립하여 해외 법인 운영 역량을 강화하고, 글로벌 사업 확장의 토대를 마련했습니다.' },
        { month: '03', title: '강진 테마파크 조성사업 착수', desc: '지역 관광 활성화와 레저 문화 확산을 목표로 강진 테마파크 조성사업에 착수하며, 복합 관광 개발 분야로 사업 영역을 넓혔습니다.' },
      ],
    },
    {
      year: '2003',
      events: [
        { month: '06', title: 'DSAG, LLC 설립', desc: '미국 조지아주 애틀란타에 DSAG, LLC를 설립하며, 해외 시장 진출을 위한 법인 기반을 강화했습니다.' },
        { month: '06', title: 'DSAI, LLC 설립', desc: '미국 조지아주 애틀란타에 DSAI, LLC를 설립하여 글로벌 비즈니스 추진을 위한 현지 사업 구조를 확립했습니다.' },
      ],
    },
    {
      year: '2001',
      events: [
        { month: '03', title: '납세자의 날 석탑산업훈장 수상', desc: '성실한 납세와 국가 경제 발전에 기여한 공로를 인정받아 납세자의 날 석탑산업훈장을 수상했습니다.' },
      ],
    },
    {
      year: '1991',
      events: [
        { month: '02', title: '회사명 변경: 동대문종합시장㈜ → ㈜동승', desc: '기업의 미래 성장 방향과 확장성을 반영하여 회사명을 ㈜동승으로 변경하고, 새로운 도약의 전환점을 마련했습니다.' },
        { month: '03', title: '납세의무이행 공로 국무총리 표창 수상', desc: '성실한 납세의무 이행과 기업의 사회적 책임 실천을 인정받아 국무총리 표창을 수상했습니다.' },
      ],
    },
    {
      year: '1990',
      events: [
        { month: '12', title: '재단법인 동승문화재단 설립', desc: '문화예술 발전과 사회공헌 활동을 체계적으로 추진하기 위해 재단법인 동승문화재단을 설립했습니다.' },
      ],
    },
    {
      year: '1988',
      events: [
        { month: '11', title: '88 올림픽 공로 서울특별시장 표창 수상', desc: '서울올림픽의 성공적인 개최에 기여한 공로를 인정받아 서울특별시장 표창을 수상했습니다.' },
      ],
    },
    {
      year: '1982',
      events: [
        { month: '03', title: '납세자의 날 석탑산업훈장 수상', desc: '성실한 납세와 국가 경제 발전에 대한 기여를 인정받아 납세자의 날 석탑산업훈장을 수상했습니다.' },
        { month: '12', title: '대통령 표창 수상', desc: '사회정화운동 유공을 인정받아 대통령 표창을 수상하며, 기업의 사회적 책임과 공익적 역할을 실천했습니다.' },
        { month: '12', title: '동대문쇼핑타운 오픈', desc: '동대문 지역 상권 활성화와 유통 인프라 확대를 위한 동대문쇼핑타운을 오픈했습니다.' },
      ],
    },
    {
      year: '1970',
      events: [
        { month: '12', title: '동대문종합시장 오픈', desc: '동대문종합시장을 오픈하며, 국내 대표 유통 상권으로 성장할 수 있는 기반을 마련했습니다.' },
      ],
    },
    {
      year: '1969',
      events: [
        { month: '07', title: '동대문종합시장㈜ 창립', desc: '동대문종합시장㈜를 창립하며, 동승의 역사가 시작되었습니다. 이후 유통, 문화, 레저, 호텔 사업으로 확장해 나가는 성장의 출발점이 되었습니다.' },
      ],
    }
  ];

  return (
    <div className="bg-white">
      <PageHeader 
        title="연혁" 
        subtitle="동승이 걸어온 발자취입니다." 
        imageSrc={GENERATED_IMAGES.HISTORY}
        paddingTop="pt-[100px] md:pt-0"
        paddingBottom="pb-[20px] md:pb-0"
        pcVerticalAlignment="bottom"
      />
      <section className="section-padding container-default max-w-5xl">
        <div className="relative">
          {/* Vertical Line with gradient */}
          <div className="absolute left-[120px] md:left-[160px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-gray-100 via-gray-200 to-gray-100"></div>
          
          <div className="space-y-24">
            {historyData.map((item, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row gap-8 md:gap-16 group relative"
              >
                {/* Background Year Text */}
                <div className="absolute -top-10 left-0 text-[120px] font-black text-gray-50 opacity-50 select-none z-0 tracking-tighter transition-all duration-500 group-hover:text-gray-100 group-hover:-translate-y-2">
                  {item.year}
                </div>

                {/* Year & Icon */}
                <div className="flex items-start gap-6 md:gap-10 w-full md:w-auto shrink-0 relative z-10 pt-4">
                  <div className="text-h2 text-gray-800 w-20 md:w-24 text-right tracking-tighter group-hover:text-black transition-colors">
                    {item.year}
                  </div>
                  <div className="w-8 h-8 bg-white border-2 border-gray-200 flex items-center justify-center mt-1 shrink-0 group-hover:border-black group-hover:bg-black transition-all duration-300 rounded-full shadow-sm">
                    <ChevronRight className="text-gray-300 w-4 h-4 group-hover:text-white transition-colors" />
                  </div>
                </div>

                {/* Events */}
                <div className="flex-1 space-y-8 pt-4 relative z-10">
                  {item.events.map((event, eIdx) => (
                    <div key={eIdx} className="flex flex-col gap-4 p-6 md:p-8 bg-white border border-gray-100 shadow-sm hover:shadow-md rounded-2xl transition-all duration-300">
                      <div className="flex items-center gap-4">
                        <div className="text-h3 text-black font-bold shrink-0">
                          {event.month}월
                        </div>
                        <h4 className="text-h4 font-bold text-black tracking-tight">{event.title}</h4>
                      </div>
                      <p className="text-gray-600 text-body-m leading-relaxed">
                        {event.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

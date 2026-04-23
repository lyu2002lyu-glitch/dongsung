import PageHeader from '../../components/PageHeader';
import { GENERATED_IMAGES } from '../../constants/images';
import { ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function History() {
  const historyData = [
    {
      year: '2025',
      events: [
        { month: '05', desc: ['코트야드 바이 메리어트 평택 호텔 개관'] },
      ],
    },
    {
      year: '2022',
      events: [
        { month: '08', desc: ['고덕국제신도시 코트야드 바이 메리어트 호텔 건축허가'] },
      ],
    },
    {
      year: '2020',
      events: [
        { month: '03', desc: ['모범납세자상 수상(기획재정부)'] },
      ],
    },
    {
      year: '2014',
      events: [
        { month: '02', desc: ['JW 메리어트 동대문 스퀘어 서울 호텔 개관', 'DS ART HALL 개관', 'DS GALLERY 개관'] },
      ],
    },
    {
      year: '2011',
      events: [
        { month: '03', desc: ['납세자의 날 표창(기획재정부장관)'] },
        { month: '11', desc: ['(주)동승골프앤리조트 호텔 메종드시엘 오픈'] },
      ],
    },
    {
      year: '2010',
      events: [
        { month: '07', desc: ['지방세 성실납부 공로표창(서울특별시장)'] },
      ],
    },
    {
      year: '2008',
      events: [
        { month: '05', desc: ['뉴스프링빌Ⅱ CC(백화산) 오픈'] },
      ],
    },
    {
      year: '2006',
      events: [
        { month: '02', desc: ['DSAF, LLC(미국 조지아주 애틀란타) 설립'] },
        { month: '03', desc: ['DSAK, LLC(미국 조지아주 애틀란타) 설립', '강진 테마파크 조성사업 착수'] },
      ],
    },
    {
      year: '2003',
      events: [
        { month: '06', desc: ['DSAG, LLC(미국 조지아주 애틀란타) 설립', 'DSAI, LLC(미국 조지아주 애틀란타) 설립'] },
      ],
    },
    {
      year: '2001',
      events: [
        { month: '03', desc: ['납세자의 날 석탑산업훈장 수상'] },
      ],
    },
    {
      year: '1994',
      events: [
        { month: '07', desc: ['뉴스프링빌CC 오픈'] },
      ],
    },
    {
      year: '1991',
      events: [
        { month: '02', desc: ['회사명변경: 동대문종합시장(주) -> (주)동승'] },
        { month: '03', desc: ['납세의무이행공로 국무총리 표창'] },
      ],
    },
    {
      year: '1990',
      events: [
        { month: '12', desc: ['(재)동승문화재단 설립'] },
      ],
    },
    {
      year: '1988',
      events: [
        { month: '11', desc: ['88올림픽공로 서울특별시장 표창'] },
      ],
    },
    {
      year: '1982',
      events: [
        { month: '03', desc: ['납세자의 날 석탑산업훈장 수상'] },
        { month: '12', desc: ['대통령 표창(사회정화운동 유공)', '동대문쇼핑타운 오픈'] },
      ],
    },
    {
      year: '1970',
      events: [
        { month: '12', desc: ['동대문종합시장 오픈'] },
      ],
    },
    {
      year: '1969',
      events: [
        { month: '07', desc: ['동대문종합시장(주) 창립'] },
      ],
    },
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
                <div className="flex-1 space-y-10 pt-4 relative z-10">
                  {item.events.map((event, eIdx) => (
                    <div key={eIdx} className="flex gap-6 md:gap-10 p-6 bg-white/80 backdrop-blur-sm border border-transparent hover:border-gray-100 hover:shadow-lg hover:shadow-gray-100/50 rounded-2xl transition-all duration-300">
                      <div className="text-h4 text-black w-10 shrink-0">
                        {event.month}
                      </div>
                      <div className="flex-1 space-y-3 pt-1">
                        {event.desc.map((line, lIdx) => (
                          <div key={lIdx} className="text-gray-700 text-body-m">
                            {line}
                          </div>
                        ))}
                      </div>
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

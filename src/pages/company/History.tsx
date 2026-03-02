import PageHeader from '../../components/PageHeader';
import { GENERATED_IMAGES } from '../../constants/images';

export default function History() {
  const historyData = [
    {
      year: '2020s',
      events: [
        { year: '2020', desc: '코트야드 바이 메리어트 평택 착공' },
        { year: '2019', desc: '창립 50주년 기념식 거행' },
      ],
    },
    {
      year: '2010s',
      events: [
        { year: '2014', desc: 'JW메리어트 동대문 스퀘어 서울 오픈' },
        { year: '2011', desc: 'JW메리어트 서울 동대문스퀘어 호텔 착공' },
        { year: '2010', desc: '지방세 성실납부 공로표창 (서울특별시장)' },
      ],
    },
    {
      year: '2000s',
      events: [
        { year: '2008', desc: '동대문종합시장 C동 증축 및 리모델링' },
        { year: '2006', desc: '합진산업(주), 강진군과 테마파크 조성을 위한 MOU 체결' },
        { year: '2005', desc: '영동레저(주) 인수 및 (주)동승레저로 상호 변경' },
        { year: '2003', desc: '미국 쇼핑몰 인수 (DSAG) 및 DS America 설립' },
        { year: '2001', desc: '동대문종합시장 D동 신축 오픈' },
      ],
    },
    {
      year: '1990s',
      events: [
        { year: '1994', desc: '(주)이덕 뉴스프링빌 C.C 오픈' },
        { year: '1991', desc: '상호 변경 : (주)동승' },
        { year: '1990', desc: '동승문화재단 설립 및 국민훈장 모란장 수상' },
      ],
    },
    {
      year: '1980s',
      events: [
        { year: '1988', desc: '(주)이덕 법인 설립 및 88올림픽 공로 표창' },
        { year: '1988', desc: '정승소 회장 취임' },
        { year: '1985', desc: '동대문쇼핑타운 개장' },
        { year: '1982', desc: '석탑산업훈장 수상 (조세의 날)' },
        { year: '1981', desc: '정승소 대표이사 취임' },
        { year: '1980', desc: '동진장학회 발족' },
      ],
    },
    {
      year: '1970s',
      events: [
        { year: '1970', desc: '동대문 종합상가 개장 및 시장 개관식' },
      ],
    },
    {
      year: '1960s',
      events: [
        { year: '1969', desc: '동대문종합시장(주) 설립 및 창립총회' },
      ],
    },
  ];

  return (
    <div className="bg-white">
      <PageHeader 
        title="연혁" 
        subtitle="동승이 걸어온 발자취입니다." 
        imageSrc={GENERATED_IMAGES.HISTORY}
      />
      <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* History Infographic */}
        <div className="mb-40 bg-white border border-gray-100 p-16 md:p-24 flex flex-col lg:flex-row items-center gap-24">
          <div className="lg:w-1/2">
            <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.6em] mb-8">Milestones</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-black mb-12 tracking-tight leading-tight">
              반세기를 이어온<br />
              <span className="text-gray-300">성장의 발자취</span>
            </h3>
            <div className="space-y-8">
              {[
                { year: "1969", text: "동승 설립 및 사업 개시" },
                { year: "1970", text: "동대문종합시장 설립" },
                { year: "2014", text: "JW메리어트 동대문 스퀘어 서울 개관" },
                { year: "2020", text: "글로벌 호스피탈리티 확장" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-8">
                  <span className="text-xl font-bold text-black w-16">{item.year}</span>
                  <div className="h-[1px] flex-grow bg-gray-100"></div>
                  <span className="text-gray-500 text-sm font-light">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 grid grid-cols-2 gap-8">
            <div className="bg-gray-50 p-12 border border-gray-100 text-center">
              <div className="text-5xl font-light text-black mb-4">50+</div>
              <div className="text-[10px] font-bold tracking-widest uppercase text-gray-400">Years of Trust</div>
            </div>
            <div className="bg-black p-12 text-white text-center">
              <div className="text-5xl font-bold mb-4">100%</div>
              <div className="text-[10px] font-bold tracking-widest uppercase opacity-60">Commitment</div>
            </div>
            <div className="col-span-2 bg-gray-50 p-12 border border-gray-100 flex items-center justify-between">
              <div className="text-left">
                <div className="text-2xl font-bold text-black mb-2 tracking-tight">Heritage & Future</div>
                <div className="text-gray-400 text-xs font-light tracking-widest uppercase">전통과 미래가 공존하는 가치</div>
              </div>
              <div className="w-12 h-12 bg-white border border-gray-200 flex items-center justify-center">
                <div className="w-4 h-4 bg-black animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gray-100 -translate-x-1/2 hidden md:block"></div>
          
          <div className="space-y-32">
            {historyData.map((decade, idx) => (
              <div key={idx} className="relative">
                <div className="flex flex-col md:flex-row items-center mb-16">
                  <div className="md:w-1/2 flex justify-end md:pr-16">
                    <h3 className="text-6xl md:text-8xl font-bold text-gray-50 md:text-right select-none tracking-tighter">
                      {decade.year}
                    </h3>
                  </div>
                  <div className="absolute left-0 md:left-1/2 w-3 h-3 bg-black -translate-x-1/2 z-10 hidden md:block"></div>
                  <div className="md:w-1/2 md:pl-16"></div>
                </div>

                <div className="space-y-16">
                  {decade.events.map((event, eIdx) => (
                    <div 
                      key={eIdx}
                      className={`flex flex-col md:flex-row gap-6 md:gap-0 ${eIdx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                    >
                      <div className={`md:w-1/2 ${eIdx % 2 === 0 ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'}`}>
                        <div className="text-xl font-bold text-black mb-2 tracking-tight">{event.year}</div>
                        <div className="text-base text-gray-500 font-light leading-relaxed">{event.desc}</div>
                      </div>
                      <div className="hidden md:flex items-center justify-center relative">
                        <div className="w-2 h-2 bg-gray-200 z-10"></div>
                      </div>
                      <div className="md:w-1/2"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

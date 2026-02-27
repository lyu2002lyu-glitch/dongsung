import PageHeader from '../../components/PageHeader';

export default function History() {
  const historyData = [
    {
      year: '2020s',
      events: [
        { year: '2023', desc: '코트야드 바이 메리어트 평택 오픈' },
        { year: '2021', desc: '(주)동승 글로벌 설립' },
      ],
    },
    {
      year: '2010s',
      events: [
        { year: '2014', desc: 'JW메리어트 동대문 스퀘어 서울 오픈' },
        { year: '2012', desc: '(주)동승 파크앤리조트 설립' },
      ],
    },
    {
      year: '1970s',
      events: [
        { year: '1970', desc: '동대문종합시장 설립 및 개장' },
      ],
    },
  ];

  return (
    <div className="bg-white">
      <PageHeader 
        title="연혁" 
        subtitle="동승이 걸어온 발자취입니다." 
        imageSrc="https://picsum.photos/seed/history/1920/400?grayscale"
      />
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto fade-in">
        <div className="space-y-20">
          {historyData.map((decade, idx) => (
            <div key={idx} className="flex flex-col md:flex-row gap-8 md:gap-16">
              <div className="md:w-1/4 shrink-0">
                <h3 className="text-4xl font-bold text-black border-b-2 border-black pb-4 inline-block">
                  {decade.year}
                </h3>
              </div>
              <div className="md:w-3/4 space-y-8 pt-2">
                {decade.events.map((event, eIdx) => (
                  <div key={eIdx} className="flex gap-6">
                    <div className="text-xl font-bold text-gray-400 w-20 shrink-0">{event.year}</div>
                    <div className="text-lg text-gray-700">{event.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

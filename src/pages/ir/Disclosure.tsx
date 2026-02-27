import PageHeader from '../../components/PageHeader';

export default function Disclosure() {
  const disclosures = [
    { id: 1, title: '신규 임원 선임 안내', date: '2023.11.10', views: 124 },
    { id: 2, title: '타법인 주식 및 출자증권 취득결정', date: '2023.08.25', views: 89 },
    { id: 3, title: '유형자산 취득결정', date: '2023.05.12', views: 156 },
    { id: 4, title: '단일판매ㆍ공급계약체결', date: '2023.02.01', views: 210 },
    { id: 5, title: '대표이사 변경 안내', date: '2022.12.15', views: 345 },
  ];

  return (
    <div className="bg-white">
      <PageHeader 
        title="공시정보" 
        subtitle="주요 경영사항을 신속하고 정확하게 알려드립니다." 
        imageSrc="https://picsum.photos/seed/disclosure/1920/400?grayscale"
      />
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto fade-in">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-y border-gray-200">
                <th className="p-4 font-bold text-gray-600 w-20 text-center">번호</th>
                <th className="p-4 font-bold text-gray-600">제목</th>
                <th className="p-4 font-bold text-gray-600 w-32 text-center">작성일</th>
                <th className="p-4 font-bold text-gray-600 w-24 text-center">조회수</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {disclosures.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors cursor-pointer group">
                  <td className="p-4 text-gray-500 text-center">{item.id}</td>
                  <td className="p-4 font-medium text-black group-hover:underline decoration-1 underline-offset-4">{item.title}</td>
                  <td className="p-4 text-gray-500 text-center">{item.date}</td>
                  <td className="p-4 text-gray-500 text-center">{item.views}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="flex justify-center mt-12 space-x-2">
          <button className="px-4 py-2 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 transition-colors">&lt;</button>
          <button className="px-4 py-2 bg-black text-white rounded-md font-bold">1</button>
          <button className="px-4 py-2 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 transition-colors">2</button>
          <button className="px-4 py-2 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 transition-colors">3</button>
          <button className="px-4 py-2 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 transition-colors">&gt;</button>
        </div>
      </section>
    </div>
  );
}

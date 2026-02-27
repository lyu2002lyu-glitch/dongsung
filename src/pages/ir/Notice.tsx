import PageHeader from '../../components/PageHeader';

export default function Notice() {
  const notices = [
    { id: 1, title: '제54기 정기주주총회 소집공고', date: '2024.03.15', views: 450 },
    { id: 2, title: '전자증권 전환 대상 주권 권리자(주주) 보호 및 조치사항 안내', date: '2023.10.05', views: 320 },
    { id: 3, title: '제53기 정기주주총회 소집공고', date: '2023.03.14', views: 512 },
    { id: 4, title: '명의개서정지 공고', date: '2022.12.15', views: 289 },
    { id: 5, title: '제52기 정기주주총회 소집공고', date: '2022.03.15', views: 480 },
  ];

  return (
    <div className="bg-white">
      <PageHeader 
        title="전자공고" 
        subtitle="법령 및 정관에 따른 공고사항을 게시합니다." 
        imageSrc="https://picsum.photos/seed/notice/1920/400?grayscale"
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
              {notices.map((item) => (
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

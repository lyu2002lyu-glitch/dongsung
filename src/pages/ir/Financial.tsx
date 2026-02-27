import PageHeader from '../../components/PageHeader';
import { Download } from 'lucide-react';

export default function Financial() {
  const reports = [
    { year: '2023', title: '제54기 결산 재무제표', date: '2024.02.28' },
    { year: '2022', title: '제53기 결산 재무제표', date: '2023.02.27' },
    { year: '2021', title: '제52기 결산 재무제표', date: '2022.02.25' },
  ];

  return (
    <div className="bg-white">
      <PageHeader 
        title="재무정보" 
        subtitle="투명하고 신뢰할 수 있는 재무 정보를 제공합니다." 
        imageSrc="https://picsum.photos/seed/financial/1920/400?grayscale"
      />
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto fade-in">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-black mb-6">요약 재무제표</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-4 font-bold text-gray-600">구분 (단위: 백만원)</th>
                  <th className="p-4 font-bold text-gray-600">2023년</th>
                  <th className="p-4 font-bold text-gray-600">2022년</th>
                  <th className="p-4 font-bold text-gray-600">2021년</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-black">자산총계</td>
                  <td className="p-4 text-gray-600">1,234,567</td>
                  <td className="p-4 text-gray-600">1,123,456</td>
                  <td className="p-4 text-gray-600">1,012,345</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-black">부채총계</td>
                  <td className="p-4 text-gray-600">456,789</td>
                  <td className="p-4 text-gray-600">432,109</td>
                  <td className="p-4 text-gray-600">410,987</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-black">자본총계</td>
                  <td className="p-4 text-gray-600">777,778</td>
                  <td className="p-4 text-gray-600">691,347</td>
                  <td className="p-4 text-gray-600">601,358</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-black">매출액</td>
                  <td className="p-4 text-gray-600">890,123</td>
                  <td className="p-4 text-gray-600">812,345</td>
                  <td className="p-4 text-gray-600">754,321</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-black">영업이익</td>
                  <td className="p-4 text-gray-600">123,456</td>
                  <td className="p-4 text-gray-600">110,987</td>
                  <td className="p-4 text-gray-600">98,765</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-400 mt-4 text-right">* 상기 재무정보는 K-IFRS 기준으로 작성되었습니다.</p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-black mb-6">감사보고서 다운로드</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reports.map((report, idx) => (
              <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <span className="text-sm font-bold text-gray-400 mb-2 block">{report.year}</span>
                  <h3 className="text-lg font-bold text-black mb-4">{report.title}</h3>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-sm text-gray-500">{report.date}</span>
                  <button className="text-black hover:text-gray-500 transition-colors">
                    <Download size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

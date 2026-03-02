import PageHeader from '../../components/PageHeader';
import { Download, TrendingUp, PieChart, BarChart3 } from 'lucide-react';
import { GENERATED_IMAGES } from '../../constants/images';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function Financial() {
  const reports = [
    { year: '2024', title: '제55기 결산 재무제표', date: '2025.04.03' },
    { year: '2023', title: '제54기 결산 재무제표', date: '2024.04.03' },
    { year: '2022', title: '제53기 결산 재무제표', date: '2023.04.04' },
  ];

  const chartData = [
    { name: '2022', revenue: 654, profit: 156 },
    { name: '2023', revenue: 712, profit: 178 },
    { name: '2024', revenue: 789, profit: 199 },
  ];

  return (
    <div className="bg-white">
      <PageHeader 
        title="재무정보" 
        subtitle="투명하고 신뢰할 수 있는 재무 정보를 제공합니다." 
        imageSrc={GENERATED_IMAGES.FINANCIAL}
      />
      <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="mb-32">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.6em] mb-6">Financial Status</h2>
              <h3 className="text-4xl font-bold text-black tracking-tight">주요 재무 현황</h3>
            </div>
            <div className="text-gray-400 text-sm font-light tracking-widest uppercase">단위: 억원 (2024년 기준)</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-100 mb-24">
            <div className="p-12 border-r border-gray-100 last:border-r-0 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 bg-black text-white flex items-center justify-center">
                  <TrendingUp size={18} strokeWidth={1.5} />
                </div>
                <span className="font-bold text-gray-400 uppercase tracking-[0.2em] text-[10px]">매출액</span>
              </div>
              <div className="text-5xl font-light text-black mb-4 tracking-tight">789억</div>
              <div className="text-[11px] text-black font-bold flex items-center gap-2 tracking-widest uppercase">
                <span>↑ 10.8%</span>
                <span className="text-gray-300 font-normal">전년 대비</span>
              </div>
            </div>

            <div className="p-12 border-r border-gray-100 last:border-r-0 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 bg-black text-white flex items-center justify-center">
                  <BarChart3 size={18} strokeWidth={1.5} />
                </div>
                <span className="font-bold text-gray-400 uppercase tracking-[0.2em] text-[10px]">영업이익</span>
              </div>
              <div className="text-5xl font-light text-black mb-4 tracking-tight">199억</div>
              <div className="text-[11px] text-black font-bold flex items-center gap-2 tracking-widest uppercase">
                <span>↑ 11.4%</span>
                <span className="text-gray-300 font-normal">전년 대비</span>
              </div>
            </div>

            <div className="p-12 border-r border-gray-100 last:border-r-0 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 bg-black text-white flex items-center justify-center">
                  <PieChart size={18} strokeWidth={1.5} />
                </div>
                <span className="font-bold text-gray-400 uppercase tracking-[0.2em] text-[10px]">당기순이익</span>
              </div>
              <div className="text-5xl font-light text-black mb-4 tracking-tight">244억</div>
              <div className="text-[11px] text-black font-bold flex items-center gap-2 tracking-widest uppercase">
                <span>↑ 14.4%</span>
                <span className="text-gray-300 font-normal">전년 대비</span>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="bg-white border border-gray-100 p-16 mb-32">
            <h4 className="text-xl font-bold mb-16 text-center tracking-tight">연도별 성장 추이</h4>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 500 }}
                    dy={10}
                  />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                    contentStyle={{ borderRadius: '0px', border: '1px solid #f3f4f6', boxShadow: 'none' }}
                  />
                  <Bar dataKey="revenue" name="매출액" radius={[0, 0, 0, 0]} barSize={40}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 2 ? '#000000' : '#e5e7eb'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white border border-gray-100 p-16 mb-32 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-8 tracking-tight">기업 신용분석</h3>
              <p className="text-gray-500 text-base leading-relaxed max-w-3xl font-light">
                (주)동승은 신용능력이 동종업계에서 상위인 기업으로 평가받고 있으며, 안정적인 재무 구조와 높은 수익성을 바탕으로 지속적인 성장을 이어가고 있습니다. 특히 유동비율과 부채비율에서 매우 건전한 지표를 유지하고 있습니다.
              </p>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 -translate-y-1/2 translate-x-1/2"></div>
          </div>

          <h2 className="text-2xl font-bold text-black mb-12 tracking-tight">요약 재무제표</h2>
          <div className="overflow-x-auto border border-gray-100">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-8 font-bold text-gray-400 text-[11px] uppercase tracking-widest">구분 (단위: 백만원)</th>
                  <th className="p-8 font-bold text-black text-[11px] uppercase tracking-widest">2024년</th>
                  <th className="p-8 font-bold text-gray-400 text-[11px] uppercase tracking-widest">2023년</th>
                  <th className="p-8 font-bold text-gray-400 text-[11px] uppercase tracking-widest">2022년</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="p-8 font-bold text-black text-sm">매출액</td>
                  <td className="p-8 font-bold text-black text-sm">78,933</td>
                  <td className="p-8 text-gray-500 text-sm font-light">71,245</td>
                  <td className="p-8 text-gray-500 text-sm font-light">65,432</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="p-8 font-bold text-black text-sm">영업이익</td>
                  <td className="p-8 font-bold text-black text-sm">19,932</td>
                  <td className="p-8 text-gray-500 text-sm font-light">17,890</td>
                  <td className="p-8 text-gray-500 text-sm font-light">15,678</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="p-8 font-bold text-black text-sm">당기순이익</td>
                  <td className="p-8 font-bold text-black text-sm">24,422</td>
                  <td className="p-8 text-gray-500 text-sm font-light">21,345</td>
                  <td className="p-8 text-gray-500 text-sm font-light">19,876</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-gray-300 mt-8 text-right font-bold tracking-widest uppercase">* 상기 재무정보는 NICE평가정보 및 공시자료를 바탕으로 작성되었습니다.</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-black mb-16 tracking-tight">감사보고서 다운로드</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-100">
            {reports.map((report, idx) => (
              <div key={idx} className="group bg-white border-r border-gray-100 last:border-r-0 p-12 flex flex-col justify-between hover:bg-gray-50 transition-all">
                <div>
                  <span className="text-[10px] font-bold text-gray-300 mb-6 block uppercase tracking-[0.3em]">{report.year} Report</span>
                  <h3 className="text-lg font-bold text-black mb-12 leading-tight tracking-tight">{report.title}</h3>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400 font-light tracking-widest">{report.date}</span>
                  <button className="w-10 h-10 bg-black text-white flex items-center justify-center transition-all hover:scale-110">
                    <Download size={16} strokeWidth={1.5} />
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

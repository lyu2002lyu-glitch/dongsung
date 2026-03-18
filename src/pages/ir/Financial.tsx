import PageHeader from '../../components/PageHeader';
import { Download, TrendingUp, PieChart, BarChart3, ArrowUpRight, FileText, ShieldCheck, Award } from 'lucide-react';
import { GENERATED_IMAGES } from '../../constants/images';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, AreaChart, Area, LabelList } from 'recharts';
import { motion } from 'motion/react';

export default function Financial() {
  const reports = [
    { year: '2024', title: '제55기 결산 재무제표', date: '2025.04.03', size: '1.2MB', url: '/fiscalyear2024.pdf' },
    { year: '2023', title: '제54기 결산 재무제표', date: '2024.04.03', size: '1.1MB', url: '/fiscalyear2023.pdf' },
    { year: '2022', title: '제53기 결산 재무제표', date: '2023.04.04', size: '1.3MB', url: '/fiscalyear2022.pdf' },
  ];

  const chartData = [
    { name: '2021', revenue: 564, profit: 102 },
    { name: '2022', revenue: 724, profit: 215 },
    { name: '2023', revenue: 796, profit: 241 },
    { name: '2024', revenue: 789, profit: 199 },
  ];

  const stats = [
    { 
      label: '매출액 (2024년 정보)', 
      value: '789억', 
      growth: '-0.9%', 
      icon: <TrendingUp className="text-black" size={20} />,
      desc: '지속적인 임대 수익 및 사업 확장'
    },
    { 
      label: '영업이익 (2024년 정보)', 
      value: '199억', 
      growth: '-17.1%', 
      icon: <BarChart3 className="text-black" size={20} />,
      desc: '효율적인 운영 관리를 통한 수익 극대화'
    },
    { 
      label: '당기순이익 (2024년 정보)', 
      value: '244억', 
      growth: '+0.3%', 
      icon: <PieChart className="text-black" size={20} />,
      desc: '안정적인 자산 가치 상승 반영'
    }
  ];

  return (
    <div className="bg-white">
      <PageHeader 
        title="재무정보" 
        subtitle="투명한 경영과 견고한 재무 구조를 바탕으로 신뢰를 쌓아갑니다." 
        imageSrc={GENERATED_IMAGES.FINANCIAL}
        paddingTop="pt-[100px] md:pt-0"
        paddingBottom="pb-[20px] md:pb-0"
        pcVerticalAlignment="bottom"
      />
      
      <section className="py-24 container-default max-w-7xl">
        {/* Industry Rank Highlight */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 bg-black text-white p-8 md:p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <Award className="text-gray-400" size={24} />
              <span className="text-gray-400 font-bold tracking-widest text-xs uppercase">Industry Leadership</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
              Urban Real Estate Hospitality 플랫폼
            </h2>
            <p className="text-gray-400 max-w-xl">
              Asset Value + Stable Cash flow + Growth
            </p>
          </div>
          <div className="text-center md:text-right relative z-10">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl inline-block">
              <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">Credit Rating</div>
              <div className="text-3xl font-bold text-white">A+ <span className="text-sm font-normal text-gray-400">Stable</span></div>
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 bg-gray-50 p-6 rounded-2xl text-gray-600 text-sm leading-relaxed"
        >
          본 사업 내용은 ㈜동승의 별도 기준 사업 내용을 설명하고 있습니다. 법인별 재무정보는 개별 사업보고서 및 감사보고서를 참고해 주시기 바랍니다.
        </motion.div>

        {/* Key Metrics Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm transition-all group"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="p-3 bg-gray-50 rounded-2xl transition-colors">
                  {stat.icon}
                </div>
                <div className="flex items-center gap-1 text-black font-bold text-sm">
                  <ArrowUpRight size={16} />
                  {stat.growth}
                </div>
              </div>
              <div className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-2">{stat.label}</div>
              <div className="text-4xl font-bold text-black mb-4 tracking-tight">{stat.value}</div>
              <p className="text-sm text-gray-500 leading-relaxed">{stat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm"
          >
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-bold tracking-tight">연도별 매출 추이</h3>
              <span className="text-xs text-gray-400 font-medium">단위: 억원</span>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 30, right: 30, left: 20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#000000" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#000000" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9CA3AF', fontSize: 14 }}
                    dy={10}
                    interval={0}
                  />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#000000" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                  >
                    <LabelList dataKey="revenue" position="top" fill="#4a4a4a" fontSize={14} formatter={(value: number) => `${value}억`} />
                  </Area>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm"
          >
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-bold tracking-tight">영업이익 성장률</h3>
              <span className="text-sm text-gray-400 font-medium">단위: 억원</span>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9CA3AF', fontSize: 14 }}
                    dy={10}
                    interval={0}
                  />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{ fill: '#F9FAFB' }}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="profit" radius={[8, 8, 0, 0]} barSize={32}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === chartData.length - 1 ? '#000000' : '#E5E7EB'} />
                    ))}
                    <LabelList dataKey="profit" position="top" fill="#4a4a4a" fontSize={14} formatter={(value: number) => `${value}억`} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Summary Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-24"
        >
          <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
            <h3 className="text-xl font-bold tracking-tight">요약 재무제표</h3>
            <span className="text-sm text-gray-400 font-medium">단위: 백만원</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-400 text-xs uppercase tracking-widest font-bold">
                  <th className="px-8 py-6">항목</th>
                  <th className="px-8 py-6 text-black">2024년 (제55기)</th>
                  <th className="px-8 py-6">2023년 (제54기)</th>
                  <th className="px-8 py-6">2022년 (제53기)</th>
                  <th className="px-8 py-6">2021년 (제52기)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { label: '매출액', v24: '78,933', v23: '79,633', v22: '72,368', v21: '56,366' },
                  { label: '영업이익', v24: '19,932', v23: '24,053', v22: '21,514', v21: '10,173' },
                  { label: '당기순이익', v24: '24,423', v23: '24,361', v22: '17,266', v21: '10,436' },
                  { label: '자산총계', v24: '374,276', v23: '360,935', v22: '347,236', v21: '329,053' },
                  { label: '자본총계', v24: '163,215', v23: '136,798', v22: '112,207', v21: '93,122' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-8 py-6 font-bold text-gray-900 text-base">{row.label}</td>
                    <td className="px-8 py-6 font-bold text-black text-base">{row.v24}</td>
                    <td className="px-8 py-6 text-gray-600 text-base font-medium">{row.v23}</td>
                    <td className="px-8 py-6 text-gray-600 text-base font-medium">{row.v22}</td>
                    <td className="px-8 py-6 text-gray-600 text-base font-medium">{row.v21}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 bg-gray-50/30 text-right">
            <p className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">
              * 상기 재무정보는 NICE평가정보 및 금융감독원 공시자료를 바탕으로 작성되었습니다.
            </p>
          </div>
        </motion.div>

        {/* Audit Reports Download Section - Redesigned */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1 bg-gray-200"></div>
            <h2 className="text-2xl font-bold tracking-tight px-4">감사보고서 다운로드</h2>
            <div className="h-px flex-1 bg-gray-200"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reports.map((report, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-white p-1 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-12">
                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
                      <FileText size={24} strokeWidth={1.5} />
                    </div>
                    <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                      Verified
                    </div>
                  </div>
                  
                  <div className="mb-12">
                    <span className="text-[10px] font-bold text-gray-400 mb-2 block uppercase tracking-[0.3em]">Fiscal Year {report.year}</span>
                    <h3 className="text-xl font-bold text-black leading-tight group-hover:text-black transition-colors">{report.title}</h3>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Release Date</span>
                      <span className="text-xs font-medium text-gray-600">{report.date}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1 block">File Size</span>
                      <span className="text-xs font-medium text-gray-600">{report.size}</span>
                    </div>
                  </div>
                </div>

                <a 
                  href={report.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-5 bg-gray-50 group-hover:bg-black text-gray-400 group-hover:text-white flex items-center justify-center gap-3 font-bold text-xs uppercase tracking-widest transition-all duration-500"
                >
                  <Download size={16} />
                  Download Report
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust Badge */}
        <div className="mt-24 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-white border border-gray-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
            <ShieldCheck className="text-black" size={32} />
          </div>
          <h4 className="text-lg font-bold mb-2">투명한 재무 공시</h4>
          <p className="text-gray-500 text-sm max-w-md">
            (주)동승은 주주 및 투자자 여러분께 정확하고 투명한 재무 정보를 제공하기 위해 
            외부 회계법인의 엄격한 감사를 거친 보고서를 공시하고 있습니다.
          </p>
        </div>
      </section>
    </div>
  );
}

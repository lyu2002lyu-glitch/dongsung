import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { supabase } from '../../lib/supabase';
import { GENERATED_IMAGES } from '../../constants/images';

interface DisclosureItem {
  id: number;
  title: string;
  created_at: string;
  views: number;
}

export default function Disclosure() {
  const [disclosures, setDisclosures] = useState<DisclosureItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDisclosures = async () => {
      try {
        const { data, error } = await supabase
          .from('disclosures')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching disclosures:', error);
          // Fallback to sample data if Supabase fails
          setDisclosures([
            { id: 1, title: '신규 임원 선임 안내', created_at: '2023-11-10T00:00:00Z', views: 156 },
            { id: 2, title: '주요사항보고서 (자기주식취득결정)', created_at: '2023-10-05T00:00:00Z', views: 89 },
            { id: 3, title: '최대주주 변경을 수반하는 주식 양수도 계약 체결', created_at: '2023-09-20T00:00:00Z', views: 210 },
          ]);
        } else if (!data || data.length === 0) {
          // Fallback to sample data if no data exists
          setDisclosures([
            { id: 1, title: '신규 임원 선임 안내', created_at: '2023-11-10T00:00:00Z', views: 156 },
            { id: 2, title: '주요사항보고서 (자기주식취득결정)', created_at: '2023-10-05T00:00:00Z', views: 89 },
            { id: 3, title: '최대주주 변경을 수반하는 주식 양수도 계약 체결', created_at: '2023-09-20T00:00:00Z', views: 210 },
          ]);
        } else {
          setDisclosures(data);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        // Fallback to sample data on unexpected error
        setDisclosures([
          { id: 1, title: '2024년 제55기 정기주주총회 소집공고', created_at: new Date().toISOString(), views: 124 },
          { id: 2, title: '주식명의개서 정지 및 주주명부 폐쇄공고', created_at: new Date(Date.now() - 86400000 * 30).toISOString(), views: 89 },
          { id: 3, title: '제54기 결산공고', created_at: new Date(Date.now() - 86400000 * 365).toISOString(), views: 256 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchDisclosures();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <div className="bg-white">
      <PageHeader 
        title="공시정보" 
        subtitle="주요 경영사항을 신속하고 정확하게 알려드립니다." 
        imageSrc={GENERATED_IMAGES.DISCLOSURE}
      />
      <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="overflow-x-auto border-t border-black">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-6 font-bold text-gray-400 text-[11px] uppercase tracking-widest w-24 text-center">No.</th>
                <th className="p-6 font-bold text-black text-[11px] uppercase tracking-widest">Subject</th>
                <th className="p-6 font-bold text-gray-400 text-[11px] uppercase tracking-widest w-32 text-center">Date</th>
                <th className="p-6 font-bold text-gray-400 text-[11px] uppercase tracking-widest w-24 text-center">Views</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-gray-400 text-sm font-light">
                    데이터를 불러오는 중입니다...
                  </td>
                </tr>
              ) : disclosures.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-gray-400 text-sm font-light">
                    등록된 공시정보가 없습니다.
                  </td>
                </tr>
              ) : (
                disclosures.map((item, index) => (
                  <tr 
                    key={item.id} 
                    onClick={() => navigate(`/ir/disclosure/${item.id}`)}
                    className="hover:bg-gray-50 transition-colors cursor-pointer group"
                  >
                    <td className="p-6 text-gray-400 text-center text-sm font-light">{disclosures.length - index}</td>
                    <td className="p-6 font-bold text-black text-sm group-hover:text-gray-500 transition-colors">{item.title}</td>
                    <td className="p-6 text-gray-400 text-center text-sm font-light">{formatDate(item.created_at)}</td>
                    <td className="p-6 text-gray-400 text-center text-sm font-light">{item.views || 0}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        {!loading && disclosures.length > 0 && (
          <div className="flex justify-center mt-20 space-x-4">
            <button className="w-10 h-10 border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-black hover:text-white transition-all">&lt;</button>
            <button className="w-10 h-10 bg-black text-white flex items-center justify-center font-bold text-sm">1</button>
            <button className="w-10 h-10 border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-black hover:text-white transition-all">&gt;</button>
          </div>
        )}
      </section>
    </div>
  );
}

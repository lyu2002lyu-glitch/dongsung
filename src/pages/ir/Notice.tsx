import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { supabase } from '../../lib/supabase';
import { GENERATED_IMAGES } from '../../constants/images';

interface NoticeItem {
  id: number;
  title: string;
  created_at: string;
  views: number;
}

export default function Notice() {
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const { data, error } = await supabase
          .from('notices')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching notices:', error);
          // Fallback to sample data if Supabase fails
          setNotices([
            { id: 1, title: '제54기 정기주주총회 소집공고', created_at: '2024-03-15T00:00:00Z', views: 342 },
            { id: 2, title: '주식명의개서 정지 및 주주명부 폐쇄공고', created_at: '2024-02-10T00:00:00Z', views: 112 },
            { id: 3, title: '제53기 결산공고', created_at: '2023-03-20T00:00:00Z', views: 456 },
          ]);
        } else if (!data || data.length === 0) {
          // Fallback to sample data if no data exists
          setNotices([
            { id: 1, title: '제54기 정기주주총회 소집공고', created_at: '2024-03-15T00:00:00Z', views: 342 },
            { id: 2, title: '주식명의개서 정지 및 주주명부 폐쇄공고', created_at: '2024-02-10T00:00:00Z', views: 112 },
            { id: 3, title: '제53기 결산공고', created_at: '2023-03-20T00:00:00Z', views: 456 },
          ]);
        } else {
          setNotices(data);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        // Fallback to sample data on unexpected error
        setNotices([
          { id: 1, title: '제55기 정기주주총회 소집공고', created_at: new Date().toISOString(), views: 124 },
          { id: 2, title: '주식명의개서 정지 및 주주명부 폐쇄공고', created_at: new Date(Date.now() - 86400000 * 30).toISOString(), views: 89 },
          { id: 3, title: '제54기 결산공고', created_at: new Date(Date.now() - 86400000 * 365).toISOString(), views: 256 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <div className="bg-white">
      <PageHeader 
        title="전자공고" 
        subtitle="법령 및 정관에 따른 공고사항을 게시합니다." 
        imageSrc={GENERATED_IMAGES.NOTICE}
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
              ) : notices.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-gray-400 text-sm font-light">
                    등록된 전자공고가 없습니다.
                  </td>
                </tr>
              ) : (
                notices.map((item, index) => (
                  <tr 
                    key={item.id} 
                    onClick={() => navigate(`/ir/notice/${item.id}`)}
                    className="hover:bg-gray-50 transition-colors cursor-pointer group"
                  >
                    <td className="p-6 text-gray-400 text-center text-sm font-light">{notices.length - index}</td>
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
        {!loading && notices.length > 0 && (
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

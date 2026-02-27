import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { supabase } from '../../lib/supabase';

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
        } else {
          setDisclosures(data || []);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
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
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">
                    데이터를 불러오는 중입니다...
                  </td>
                </tr>
              ) : disclosures.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">
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
                    <td className="p-4 text-gray-500 text-center">{disclosures.length - index}</td>
                    <td className="p-4 font-medium text-black group-hover:underline decoration-1 underline-offset-4">{item.title}</td>
                    <td className="p-4 text-gray-500 text-center">{formatDate(item.created_at)}</td>
                    <td className="p-4 text-gray-500 text-center">{item.views || 0}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        {!loading && disclosures.length > 0 && (
          <div className="flex justify-center mt-12 space-x-2">
            <button className="px-4 py-2 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 transition-colors">&lt;</button>
            <button className="px-4 py-2 bg-black text-white rounded-md font-bold">1</button>
            <button className="px-4 py-2 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 transition-colors">&gt;</button>
          </div>
        )}
      </section>
    </div>
  );
}

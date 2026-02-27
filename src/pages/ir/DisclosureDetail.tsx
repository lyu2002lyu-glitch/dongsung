import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { supabase } from '../../lib/supabase';

interface DisclosureDetailData {
  id: number;
  title: string;
  content?: string;
  created_at: string;
  views: number;
}

export default function DisclosureDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<DisclosureDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchDetail = async () => {
      try {
        const { data: items, error } = await supabase
          .from('disclosures')
          .select('*')
          .eq('id', Number(id))
          .limit(1);

        if (error) {
          console.error('Error fetching disclosure detail:', error);
          setData(null);
        } else if (items && items.length > 0) {
          setData(items[0]);
        } else {
          setData(null);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

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
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto fade-in">
        {loading ? (
          <div className="text-center py-20 text-gray-500">데이터를 불러오는 중입니다...</div>
        ) : !data ? (
          <div className="text-center py-20 text-gray-500">게시글을 찾을 수 없습니다.</div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="p-8 border-b border-gray-200 bg-gray-50">
              <h1 className="text-2xl font-bold text-black mb-4">{data.title}</h1>
              <div className="flex items-center text-sm text-gray-500 gap-6">
                <span>작성일: {formatDate(data.created_at)}</span>
                <span>조회수: {data.views || 0}</span>
              </div>
            </div>
            <div className="p-8 min-h-[300px] text-gray-700 leading-relaxed whitespace-pre-wrap">
              {data.content || '상세 내용이 없습니다.'}
            </div>
            <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-center">
              <button 
                onClick={() => navigate('/ir/disclosure')}
                className="px-8 py-3 bg-black text-white font-bold rounded-md hover:bg-gray-800 transition-colors"
              >
                목록으로
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

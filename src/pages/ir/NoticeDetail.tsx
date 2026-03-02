import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { supabase } from '../../lib/supabase';
import { GENERATED_IMAGES } from '../../constants/images';

interface NoticeDetailData {
  id: number;
  title: string;
  content?: string;
  created_at: string;
  views: number;
}

export default function NoticeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<NoticeDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchDetail = async () => {
      try {
        const { data: items, error } = await supabase
          .from('notices')
          .select('*')
          .eq('id', Number(id))
          .limit(1);

        if (error) {
          console.error('Error fetching notice detail:', error);
          // Fallback to sample data
          setData({
            id: Number(id),
            title: id === '1' ? '제54기 정기주주총회 소집공고' : '샘플 전자 공고',
            content: id === '1'
              ? '제54기 정기주주총회를 아래와 같이 개최하오니 참석하여 주시기 바랍니다.\n\n1. 일시: 2024년 3월 28일 오전 10시\n2. 장소: 본사 대강당\n3. 의안: 제54기 재무제표 승인, 이사 선임, 감사 선임 등'
              : '본 게시물은 데이터베이스 연결 전 노출되는 샘플 데이터입니다.',
            created_at: id === '1' ? '2024-03-15T00:00:00Z' : new Date().toISOString(),
            views: 342
          });
        } else if (items && items.length > 0) {
          setData(items[0]);
        } else {
          // Fallback to sample data if not found
          setData({
            id: Number(id),
            title: '샘플 전자 공고',
            content: '상세 내용을 불러올 수 없어 샘플 데이터를 표시합니다.',
            created_at: new Date().toISOString(),
            views: 0
          });
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
        title="전자공고" 
        subtitle="법령 및 정관에 따른 공고사항을 게시합니다." 
        imageSrc={GENERATED_IMAGES.NOTICE}
      />
      <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {loading ? (
          <div className="text-center py-32 text-gray-400 text-sm font-light">데이터를 불러오는 중입니다...</div>
        ) : !data ? (
          <div className="text-center py-32 text-gray-400 text-sm font-light">게시글을 찾을 수 없습니다.</div>
        ) : (
          <div className="bg-white border-t border-black overflow-hidden">
            <div className="p-12 border-b border-gray-100 bg-gray-50">
              <h1 className="text-3xl font-bold text-black mb-8 tracking-tight">{data.title}</h1>
              <div className="flex items-center text-[11px] text-gray-400 gap-10 font-bold uppercase tracking-widest">
                <span>Date: {formatDate(data.created_at)}</span>
                <span>Views: {data.views || 0}</span>
              </div>
            </div>
            <div className="p-12 min-h-[400px] text-gray-600 leading-loose whitespace-pre-wrap font-light text-base">
              {data.content || '상세 내용이 없습니다.'}
            </div>
            <div className="p-12 border-t border-gray-100 flex justify-center">
              <button 
                onClick={() => navigate('/ir/notice')}
                className="px-12 py-5 bg-black text-white text-[11px] font-bold uppercase tracking-widest transition-all hover:bg-gray-800"
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

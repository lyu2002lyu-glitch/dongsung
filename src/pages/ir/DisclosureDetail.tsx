import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { supabase } from '../../lib/supabase';
import { GENERATED_IMAGES } from '../../constants/images';

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
          // Fallback to sample data
          setData({
            id: Number(id),
            title: id === '1' ? '신규 임원 선임 안내' : '샘플 공시 정보',
            content: id === '1' 
              ? '신규 임원 선임에 관한 안내 말씀 드립니다.\n\n당사는 이번 정기주주총회를 통해 역량 있는 신규 임원을 선임하였습니다.\n\n1. 선임 임원: 홍길동 상무\n2. 주요 경력: OO전자 전략기획팀장\n3. 선임 사유: 글로벌 시장 확대 및 전략적 의사결정 강화'
              : '본 게시물은 데이터베이스 연결 전 노출되는 샘플 데이터입니다.',
            created_at: id === '1' ? '2023-11-10T00:00:00Z' : new Date().toISOString(),
            views: 156
          });
        } else if (items && items.length > 0) {
          setData(items[0]);
        } else {
          // Fallback to sample data if not found
          setData({
            id: Number(id),
            title: '샘플 공시 정보',
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
        title="공시정보" 
        subtitle="주요 경영사항을 신속하고 정확하게 알려드립니다." 
        imageSrc={GENERATED_IMAGES.DISCLOSURE}
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
                onClick={() => navigate('/ir/disclosure')}
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

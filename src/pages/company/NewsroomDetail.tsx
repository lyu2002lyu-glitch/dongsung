import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { supabase } from '../../lib/supabase';
import { GENERATED_IMAGES } from '../../constants/images';
import { ArrowLeft } from 'lucide-react';

interface NewsItem {
  id: number;
  title: string;
  content: string;
  image_url?: string;
  created_at: string;
}

export default function NewsroomDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const { data, error } = await supabase
          .from('newsroom')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Error fetching news detail:', error);
          // Fallback to sample data if Supabase fails
          const sampleData = [
            { 
              id: 1, 
              title: '동승, 글로벌 시장 진출 가속화', 
              content: '동승이 글로벌 시장 진출을 본격화합니다. 이번 진출을 통해 동승은 세계적인 기업으로 발돋움할 계획입니다. 다양한 파트너십과 혁신적인 기술력을 바탕으로 새로운 시장을 개척해 나갈 것입니다.',
              image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
              created_at: '2024-03-15T00:00:00Z' 
            },
            { 
              id: 2, 
              title: '2024년 상반기 신입사원 공개채용', 
              content: '동승에서 2024년 상반기 신입사원을 모집합니다. 열정과 도전 정신을 가진 인재들의 많은 지원을 바랍니다. 서류 접수는 3월 31일까지 진행되며, 자세한 사항은 채용 홈페이지를 참고해 주세요.',
              image_url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop',
              created_at: '2024-02-10T00:00:00Z' 
            },
            { 
              id: 3, 
              title: '친환경 경영 선포식 개최', 
              content: '동승은 지속가능한 미래를 위해 친환경 경영을 선포했습니다. 탄소 배출 절감과 자원 순환을 위한 다양한 이니셔티브를 발표하며, ESG 경영을 선도하는 기업으로 자리매김할 것을 약속했습니다.',
              image_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
              created_at: '2023-11-20T00:00:00Z' 
            },
            { 
              id: 4, 
              title: '신규 브랜드 런칭 기념 행사 성료', 
              content: '동승의 새로운 브랜드 런칭 행사가 성공적으로 마무리되었습니다. 많은 고객과 파트너사들이 참석한 가운데, 신제품의 혁신적인 기능과 디자인이 큰 호응을 얻었습니다.',
              image_url: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=2070&auto=format&fit=crop',
              created_at: '2023-09-05T00:00:00Z' 
            },
          ];
          const found = sampleData.find(item => item.id === Number(id));
          setNews(found || null);
        } else {
          setNews(data);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNewsDetail();
    }
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-gray-400 text-body-m">데이터를 불러오는 중입니다...</div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="bg-white min-h-screen flex flex-col items-center justify-center gap-8">
        <div className="text-gray-400 text-body-m">뉴스를 찾을 수 없습니다.</div>
        <button 
          onClick={() => navigate('/company/newsroom')}
          className="btn-primary"
        >
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <PageHeader 
        title="뉴스룸" 
        subtitle="동승의 최신 소식과 다양한 활동을 전해드립니다." 
        imageSrc={GENERATED_IMAGES.GREETING}
        paddingTop="pt-[100px] md:pt-0"
        paddingBottom="pb-[20px] md:pb-0"
        pcVerticalAlignment="bottom"
      />
      <section className="section-padding container-default max-w-4xl">
        <div className="mb-12">
          <button 
            onClick={() => navigate('/company/newsroom')}
            className="flex items-center gap-2 text-[11px] font-bold text-gray-400 hover:text-black tracking-widest uppercase transition-colors mb-12"
          >
            <ArrowLeft size={16} />
            Back to List
          </button>
          
          <div className="border-b-2 border-black pb-8 mb-12">
            <h1 className="text-h3 font-bold text-black mb-6 leading-tight">{news.title}</h1>
            <div className="flex items-center justify-between text-body-s text-gray-500">
              <span className="font-bold tracking-widest uppercase">{formatDate(news.created_at)}</span>
            </div>
          </div>

          <div className="prose prose-lg max-w-none prose-headings:font-bold prose-p:text-gray-600 prose-p:leading-relaxed">
            {news.image_url && (
              <div className="mb-12 flex justify-center">
                <div className="w-1/2 rounded-xl overflow-hidden shadow-sm">
                  <img 
                    src={news.image_url} 
                    alt={news.title} 
                    className="w-full h-auto object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            )}
            <div className="whitespace-pre-wrap text-body-l leading-relaxed text-gray-800 text-left">
              {news.content}
            </div>
          </div>
          <div className="mt-24 flex justify-center">
            <button 
              onClick={() => navigate('/company/newsroom')}
              className="btn-primary rounded-md px-12 py-4"
            >
              <span className="text-[14px] font-bold uppercase tracking-widest">목록으로</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

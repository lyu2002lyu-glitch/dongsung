import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { supabase } from '../../lib/supabase';
import { GENERATED_IMAGES } from '../../constants/images';
import { motion } from 'motion/react';

interface NewsItem {
  id: number;
  title: string;
  content: string;
  image_url?: string;
  created_at: string;
}

export default function Newsroom() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data, error } = await supabase
          .from('newsroom')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching news:', error);
          // Fallback to sample data if Supabase fails (e.g., table doesn't exist)
          setNews([
            { 
              id: 1, 
              title: '동승, 글로벌 시장 진출 가속화', 
              content: '동승이 글로벌 시장 진출을 본격화합니다...',
              image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
              created_at: '2024-03-15T00:00:00Z' 
            },
            { 
              id: 2, 
              title: '2024년 상반기 신입사원 공개채용', 
              content: '동승에서 2024년 상반기 신입사원을 모집합니다...',
              image_url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop',
              created_at: '2024-02-10T00:00:00Z' 
            },
            { 
              id: 3, 
              title: '친환경 경영 선포식 개최', 
              content: '동승은 지속가능한 미래를 위해 친환경 경영을 선포했습니다...',
              image_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
              created_at: '2023-11-20T00:00:00Z' 
            },
            { 
              id: 4, 
              title: '신규 브랜드 런칭 기념 행사 성료', 
              content: '동승의 새로운 브랜드 런칭 행사가 성공적으로 마무리되었습니다...',
              image_url: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=2070&auto=format&fit=crop',
              created_at: '2023-09-05T00:00:00Z' 
            },
          ]);
        } else {
          setNews(data || []);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <div className="bg-white">
      <PageHeader 
        title="뉴스룸" 
        subtitle="동승의 최신 소식과 다양한 활동을 전해드립니다." 
        imageSrc={GENERATED_IMAGES.GREETING}
      />
      <section className="section-padding container-default max-w-7xl">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-[1px] bg-black"></div>
          <h2 className="text-h4 tracking-tight uppercase">Latest News</h2>
        </div>

        {loading ? (
          <div className="py-20 text-center text-gray-400 text-body-m">
            데이터를 불러오는 중입니다...
          </div>
        ) : news.length === 0 ? (
          <div className="py-20 text-center text-gray-400 text-body-m">
            등록된 뉴스가 없습니다.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(`/company/newsroom/${item.id}`)}
                className="group cursor-pointer flex flex-col h-full border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
                  {item.image_url ? (
                    <img 
                      src={item.image_url} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 font-bold tracking-widest uppercase">
                      No Image
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>
                <div className="p-8 flex flex-col flex-1 bg-white">
                  <div className="text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-4">
                    {formatDate(item.created_at)}
                  </div>
                  <h3 className="text-h5 font-bold text-black mb-4 line-clamp-2 group-hover:text-gray-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-body-s text-gray-500 line-clamp-3 mt-auto">
                    {item.content.replace(/<[^>]*>?/gm, '')}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        {/* Pagination placeholder */}
        {!loading && news.length > 0 && (
          <div className="flex justify-center mt-20 space-x-4">
            <button className="w-10 h-10 border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-black hover:text-white transition-all rounded-md">&lt;</button>
            <button className="w-10 h-10 bg-black text-white flex items-center justify-center font-bold text-sm rounded-md">1</button>
            <button className="w-10 h-10 border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-black hover:text-white transition-all rounded-md">&gt;</button>
          </div>
        )}
      </section>
    </div>
  );
}

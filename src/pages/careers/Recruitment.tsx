import { useState, useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
import { Search, UserPlus, Users, Gift, Sun, Coffee, ShieldCheck, ExternalLink, Heart, Lightbulb, Flame, Baby, Utensils, HeartPulse, Briefcase, PartyPopper } from 'lucide-react';
import { GENERATED_IMAGES } from '../../constants/images';
import { supabase } from '../../lib/supabase';

interface RecruitmentPost {
  id: number;
  title: string;
  type: string;
  url: string;
}

export default function Recruitment() {
  const [recruitments, setRecruitments] = useState<RecruitmentPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecruitments = async () => {
      try {
        const { data, error } = await supabase
          .from('notices')
          .select('*')
          .like('title', '[RECRUIT]%')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching recruitments:', error);
        } else if (data) {
          const formattedData = data.map(item => {
            let parsedContent = { type: '경력', url: '#' };
            try {
              parsedContent = JSON.parse(item.content);
            } catch (e) {
              console.error('Failed to parse recruitment content:', e);
            }
            return {
              id: item.id,
              title: item.title.replace('[RECRUIT] ', ''),
              type: parsedContent.type,
              url: parsedContent.url
            };
          });
          setRecruitments(formattedData);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecruitments();
  }, []);
  const steps = [
    {
      title: '서류전형',
      desc: '지원자의 소중한 이력을 검토',
      icon: <Search size={32} strokeWidth={1.5} />,
    },
    {
      title: '1차 면접',
      desc: '실무진과 직무·창의성 공유',
      icon: <Users size={32} strokeWidth={1.5} />,
    },
    {
      title: '2차 면접',
      desc: '경영진과 함께 동승의 비전을 나눔',
      icon: <Users size={32} strokeWidth={1.5} />,
    },
    {
      title: '최종합격',
      desc: '새로운 가족이 되신 것을 환영',
      icon: <UserPlus size={32} strokeWidth={1.5} />,
    },
  ];

  const benefits = [
    {
      category: "가족 · 출산친화",
      icon: <Baby className="w-6 h-6" />,
      items: [
        "01 결혼휴가",
        "02 임신기 근로시간 단축",
        "03 출산 전/후 휴가",
        "04 배우자 출산휴가",
        "05 가족돌봄"
      ]
    },
    {
      category: "식사 · 간식지원",
      icon: <Utensils className="w-6 h-6" />,
      items: [
        "01 점심, 저녁 식사지원",
        "02 간식코너",
        "03 분기별 팀웍크 활동"
      ]
    },
    {
      category: "건강 · 여가생활",
      icon: <HeartPulse className="w-6 h-6" />,
      items: [
        "01 일반, 특수건강검진",
        "02 근재보험가입",
        "03 법인콘도",
        "04 생일자 기프티콘 지급"
      ]
    },
    {
      category: "휴가 · 업무",
      icon: <Briefcase className="w-6 h-6" />,
      items: [
        "01 연차, 반차 자유롭게 사용",
        "02 개인별 노트북 + 별도 모니터",
        "03 지하철역과 바로연결"
      ]
    },
    {
      category: "경조",
      icon: <PartyPopper className="w-6 h-6" />,
      items: [
        "01 경조비, 화환",
        "02 경조휴가"
      ]
    }
  ];

  return (
    <div className="bg-white">
      <PageHeader 
        title="채용정보" 
        subtitle="동승과 함께 미래를 이끌어갈 인재를 모십니다." 
        imageSrc={GENERATED_IMAGES.CAREERS}
        paddingTop="pt-[100px] md:pt-0"
        paddingBottom="pb-[20px] md:pb-0"
        pcVerticalAlignment="bottom"
      />
      <section className="section-padding container-default">
        <div className="text-center mb-32">
          <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.6em] mb-8">Mission</h2>
          <h3 className="text-h2 text-black mb-12 tracking-tight flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 break-keep">
            <span className="font-bold text-black">우리의 미션은 "디자이너에게 영감을 주는 것"입니다.</span>
          </h3>
          <p className="text-gray-500 text-body-m max-w-4xl mx-auto leading-relaxed">
            우리는 패션 창작을 위한 모든 재료(원단, 부자재, 액세서리 등)가 집약된 전 세계 3위 규모의 클러스터로서, <br />
            국내 패션 브랜드, 디자이너, 개인 창작자 등 패션을 창조하는 크리에이터들이 반드시 방문해야 하는 필수 생태계입니다.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 mt-16">
            <div className="bg-white border border-gray-200 p-8 rounded-xl text-center hover:border-black transition-colors">
              <h4 className="text-h5 font-bold mb-4 border-b border-gray-100 pb-4">고객본부</h4>
              <p className="text-gray-600 text-body-m">고객(판매자+구매자)을<br />위한 서비스 미션수행</p>
            </div>
            <div className="bg-white border border-gray-200 p-8 rounded-xl text-center hover:border-black transition-colors">
              <h4 className="text-h5 font-bold mb-4 border-b border-gray-100 pb-4">시설본부</h4>
              <p className="text-gray-600 text-body-m">매력적인 공간 조성을 위한 미션수행</p>
            </div>
            <div className="bg-white border border-gray-200 p-8 rounded-xl text-center hover:border-black transition-colors">
              <h4 className="text-h5 font-bold mb-4 border-b border-gray-100 pb-4">관리본부</h4>
              <p className="text-gray-600 text-body-m">구성원들을 위한 일하기<br />좋은 환경 미션 수행</p>
            </div>
            <div className="bg-white border border-gray-200 p-8 rounded-xl text-center hover:border-black transition-colors">
              <h4 className="text-h5 font-bold mb-4 border-b border-gray-100 pb-4">MD본부</h4>
              <p className="text-gray-600 text-body-m">지속가능한 상권구성<br />= 컨셉 + 실현</p>
            </div>
            <div className="bg-white border border-gray-200 p-8 rounded-xl text-center hover:border-black transition-colors">
              <h4 className="text-h5 font-bold mb-4 border-b border-gray-100 pb-4">안전관리실</h4>
              <p className="text-gray-600 text-body-m">안전한 환경을 만들기 위한 미션수행</p>
            </div>
          </div>
        </div>

        <div className="text-center mb-32">
          <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.6em] mb-8">Ideal Talent</h2>
          <h3 className="text-h2 text-black mb-12 tracking-tight">우리는 이런 인재를 원합니다.</h3>
          <p className="text-gray-500 text-body-l max-w-3xl mx-auto">
            열정적인 행동과 배려의 마인드를 갖춘 창의적 인재를 원합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-100 mb-40 rounded-xl overflow-hidden">
          {[
            { 
              num: "1", 
              title: "열정", 
              desc: "뜨겁고 강한 마음으로 동기와 헌신의 힘으로 모든 것에 의미를 부여하는 인재",
              icon: <Flame className="w-8 h-8 mb-4 text-gray-400 group-hover:text-white transition-colors" />
            },
            { 
              num: "2", 
              title: "배려", 
              desc: "겸손과 존중의 마인드로 모두에게 진정성 있게 소통하며 상생의 가치를 추구하는 인재",
              icon: <Heart className="w-8 h-8 mb-4 text-gray-400 group-hover:text-white transition-colors" />
            },
            { 
              num: "3", 
              title: "창의", 
              desc: "유연한 사고와 지속적 학습으로 도전적인 아이디어를 제시하며 조직의 성장을 주도하는 인재",
              icon: <Lightbulb className="w-8 h-8 mb-4 text-gray-400 group-hover:text-white transition-colors" />
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-16 text-center border-b md:border-b-0 md:border-r border-gray-100 last:border-r-0 hover:bg-black hover:text-white transition-all duration-500 group flex flex-col items-center">
              {item.icon}
              <div className="flex items-center gap-2 mb-6">
                <span className="text-h4 font-bold text-gray-300 group-hover:text-gray-500">{item.num}</span>
                <h3 className="text-h4 tracking-tight">{item.title}</h3>
              </div>
              <p className="text-gray-500 group-hover:text-gray-400 text-body-m leading-relaxed break-keep px-2 lg:px-6">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mb-40">
          <div className="text-center mb-24">
            <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.6em] mb-8">Process</h2>
            <h3 className="text-h2 text-black tracking-tight">채용 절차</h3>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-8 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center relative w-full max-w-[220px] group">
                <div className="w-24 h-24 bg-white border border-gray-200 text-black flex items-center justify-center mb-8 transition-all duration-500 group-hover:border-black group-hover:bg-black group-hover:text-white rounded-full shadow-sm relative z-20">
                  {step.icon}
                </div>
                <h3 className="text-h5 text-black mb-4 tracking-tight">{step.title}</h3>
                <p className="text-gray-500 text-body-m leading-relaxed">{step.desc}</p>
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[calc(50%+3rem)] w-[calc(100%-2rem)] h-[1px] bg-gray-200 z-0"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-gray-50 p-16 md:p-24 mb-40 rounded-2xl">
          <div className="text-center mb-20">
            <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.6em] mb-8">Work Environment</h2>
            <h3 className="text-h2 text-black tracking-tight">근무환경</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-4">
                  <div className="w-12 h-12 bg-gray-100 text-black rounded-lg flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h4 className="text-h5 font-bold text-gray-900">{item.category}</h4>
                </div>
                <ul className="space-y-3">
                  {item.items.map((desc, i) => (
                    <li key={i} className="text-gray-600 text-body-m flex items-center">
                      <span className="text-black mr-2 font-bold text-sm">{desc.split(' ')[0]}</span>
                      <span className="leading-none mt-[2px]">{desc.substring(desc.indexOf(' ') + 1)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-h4 text-black mb-12 tracking-tight">진행중인 채용공고</h2>
          {loading ? (
            <div className="bg-white border border-gray-100 p-24 text-gray-400 text-body-m tracking-widest uppercase rounded-xl">
              채용공고를 불러오는 중입니다...
            </div>
          ) : recruitments.length === 0 ? (
            <div className="bg-white border border-gray-100 p-24 text-gray-400 text-body-m tracking-widest uppercase rounded-xl">
              현재 진행중인 채용공고가 없습니다.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 text-left">
              {recruitments.map((job) => (
                <a 
                  key={job.id}
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-8 bg-white border border-gray-100 rounded-xl hover:border-black hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-6 mb-4 sm:mb-0">
                    <span className={`px-4 py-1 text-[11px] font-bold rounded-full ${
                      job.type === '신입' ? 'bg-blue-50 text-blue-600' : 
                      job.type === '경력' ? 'bg-orange-50 text-orange-600' : 
                      'bg-emerald-50 text-emerald-600'
                    }`}>
                      {job.type}
                    </span>
                    <h4 className="text-h5 text-black group-hover:text-gray-600 transition-colors">{job.title}</h4>
                  </div>
                  <div className="flex items-center text-gray-400 group-hover:text-black transition-colors">
                    <span className="text-[11px] font-bold uppercase tracking-widest mr-2">공고 확인</span>
                    <ExternalLink size={16} />
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

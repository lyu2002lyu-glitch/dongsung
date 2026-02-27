import PageHeader from '../../components/PageHeader';

export default function Greeting() {
  return (
    <div className="bg-white">
      <PageHeader 
        title="인사말" 
        subtitle="동승을 찾아주신 여러분을 진심으로 환영합니다." 
        imageSrc="https://picsum.photos/seed/greeting/1920/400?grayscale"
      />
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center fade-in">
        <h2 className="text-3xl font-bold mb-8 leading-tight">
          "고객과 함께 성장하는 기업, 동승입니다."
        </h2>
        <div className="text-gray-600 space-y-6 text-lg leading-relaxed text-left">
          <p>
            1970년 동대문종합시장을 시작으로, 동승은 반세기가 넘는 시간 동안 대한민국 유통 및 호스피탈리티 산업의 발전을 이끌어왔습니다.
          </p>
          <p>
            우리는 변화하는 시대의 흐름 속에서도 '고객 중심'이라는 변치 않는 가치를 지키며, JW메리어트 동대문 스퀘어 서울, 코트야드 바이 메리어트 평택 등 세계적인 브랜드와의 협력을 통해 글로벌 수준의 서비스를 제공하고 있습니다.
          </p>
          <p>
            앞으로도 동승은 끊임없는 혁신과 도전을 통해 새로운 가치를 창출하고, 사회적 책임을 다하는 신뢰받는 기업으로 성장해 나갈 것을 약속드립니다.
          </p>
          <p className="pt-8 font-bold text-right text-black">
            동승 대표이사
          </p>
        </div>
      </section>
    </div>
  );
}

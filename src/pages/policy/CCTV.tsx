import PageHeader from '../../components/PageHeader';

export default function CCTV() {
  return (
    <div className="bg-white">
      <PageHeader 
        title="영상정보처리기기 운영·관리 방침" 
        subtitle="안전한 환경 조성을 위한 영상정보처리기기 운영 방침입니다." 
      />
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto fade-in">
        <div className="prose prose-gray max-w-none">
          <h2 className="text-2xl font-bold mb-4">1. 영상정보처리기기의 설치 근거 및 설치 목적</h2>
          <p className="text-gray-600 mb-8">
            동승은 개인정보보호법 제25조 제1항에 따라 다음과 같은 목적으로 영상정보처리기기를 설치·운영 합니다.
            <br />- 시설안전 및 화재 예방
            <br />- 고객의 안전을 위한 범죄 예방
          </p>

          <h2 className="text-2xl font-bold mb-4">2. 설치 대수, 설치 위치 및 촬영범위</h2>
          <p className="text-gray-600 mb-8">
            - 설치 대수: 각 사업장별 상이 (안내판 참조)
            <br />- 설치 위치 및 촬영 범위: 건물 내·외부 주요 시설물 및 이동 동선
          </p>

          <h2 className="text-2xl font-bold mb-4">3. 관리책임자 및 접근권한자</h2>
          <p className="text-gray-600 mb-8">
            귀하의 영상정보를 보호하고 개인영상정보와 관련한 불만을 처리하기 위하여 아래와 같이 개인영상정보 보호책임자를 두고 있습니다.
            <br />- 관리책임자: 시설관리팀장
          </p>

          <p className="text-gray-400 text-sm mt-16 pt-8 border-t border-gray-200">
            본 방침은 2024년 1월 1일부터 시행됩니다.
          </p>
        </div>
      </section>
    </div>
  );
}

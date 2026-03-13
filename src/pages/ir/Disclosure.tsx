import PageHeader from '../../components/PageHeader';
import { GENERATED_IMAGES } from '../../constants/images';

export default function Disclosure() {
  return (
    <div className="bg-white">
      <PageHeader 
        title="공시정보" 
        subtitle="주요 경영사항을 신속하고 정확하게 알려드립니다." 
        imageSrc={GENERATED_IMAGES.DISCLOSURE}
      />
      <section className="section-padding container-default max-w-5xl">
        <div className="w-full h-[800px] border border-gray-200 rounded-xl overflow-hidden">
          <iframe 
            src="https://dart.fss.or.kr/dsab001/main.do?textCrpNm=%EB%8F%99%EC%8A%B9&textCrpCik=00172811&startDate=20210304&endDate=20260304&finalReport=true" 
            width="100%" 
            height="100%" 
            style={{ border: 'none' }}
            title="DART 공시정보"
          />
        </div>
      </section>
    </div>
  );
}

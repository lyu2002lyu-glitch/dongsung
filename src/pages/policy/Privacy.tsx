import PageHeader from '../../components/PageHeader';
import { GENERATED_IMAGES } from '../../constants/images';

export default function Privacy() {
  return (
    <div className="bg-white">
      <PageHeader 
        title="개인정보처리방침" 
        subtitle="동승은 개인정보보호법에 따라 정보주체의 개인정보를 보호하고 원활하게 처리하기 위하여 본 개인정보처리방침을 공개합니다." 
        imageSrc={GENERATED_IMAGES.DISCLOSURE}
        paddingTop="pt-[100px] md:pt-0"
        paddingBottom="pb-[20px] md:pb-0"
        pcVerticalAlignment="bottom"
      />
      <section className="section-padding container-default max-w-4xl">
        <div className="prose prose-gray max-w-none text-gray-600 text-body-m">
          
          <h2 className="text-h4 text-black mb-8 tracking-tight">1. 개인정보처리방침 의의</h2>
          <p className="mb-6 font-bold text-black">o 개인정보처리방침은 다음과 같은 중요한 의미를 가지고 있습니다.</p>
          <ul className="list-disc pl-5 mb-12 space-y-3">
            <li>동승이 어떤 정보를 수집하고, 수집한 정보를 어떻게 사용하며, 필요에 따라 수집한 정보를 누구와 공유(위탁 또는 제공)하며, 이용목적을 달성한 정보를 언제·어떻게 파기하는지 등의 정보를 제공합니다.</li>
            <li>정보주체로서 이용자는 자신의 개인정보에 대해 권리를 가지고 있으며, 이를 어떤 방법과 절차로 행사할 수 있는지를 알려드립니다.</li>
            <li>개인정보 침해사고가 발생하는 경우, 추가적인 피해를 예방하고 이미 발생한 피해를 복구하기 위해 누구에게 연락하여 어떤 도움을 받을 수 있는지 알려 드립니다.</li>
            <li>개인정보와 관련하여 동승과 이용자간의 권리 및 의무 관계를 규정하여 이용자의 ‘개인정보 자기결정권’을 보장하는 수단이 됩니다.</li>
          </ul>

          <h2 className="text-h4 text-black mb-8 tracking-tight">2. 수집하는 개인정보</h2>
          <p className="mb-6 font-bold text-black">o 동승에서 수집하는 개인정보는 아래와 같습니다.</p>
          <ul className="list-disc pl-5 mb-8 space-y-3">
            <li>임대계약 : 고객명, 업체명, 이메일, 연락처, 주소, 계약자정보, 사업자등록정보, 주민등록번호, 임대료, 관리비</li>
            <li>촬영협조 : 비밀번호, 이름, 이메일, 주소, 연락처, 촬영일시, 촬영시간, 촬영장소, 촬영인원, 촬영장비, 촬영내용</li>
            <li>구인·채용 : 이름, 이메일, 연락처(휴대전화, 자택전화), 생년월일, 주소, 보훈 및 장애 대상여부, 학력, 학과 및 성적, 외국어자격사항, 기타자격, 병역, 해외 체류 및 연수활동, 사회활동, 어학 및 수상경력, 자기소개, 경력사항 및 경력기술서(경력직 해당)</li>
          </ul>
          <p className="mb-6 font-bold text-black">o 개인정보 수집방법은 아래와 같습니다.</p>
          <ul className="list-disc pl-5 mb-8 space-y-3">
            <li>홈페이지 : 직접 정보를 입력하는 경우, 해당 개인정보를 수집</li>
            <li>서면양식 : 임대차계약에 따른 서면 계약서 혹은 오프라인으로 진행되는 이벤트, 설문에서 개인정보를 수집</li>
            <li>전화, 이메일 : 상담 과정에 해당 개인정보를 수집</li>
          </ul>
          <ul className="list-disc pl-5 mb-12 space-y-3">
            <li>이용자는 회원가입 없이 매장안내, 부대시설 등 정보를 이용할 수 있습니다.</li>
            <li>점주 이용자는 운영하는 매장의 카테고리, 전화번호등 정보를 수정할 수 있습니다.</li>
            <li>점주 이용자는 구인안내 항목을 자유롭게 사용할 수 있습니다.</li>
          </ul>

          <h2 className="text-h4 text-black mb-8 tracking-tight">3. 개인정보의 이용</h2>
          <p className="mb-6 font-bold text-black">o 동승은 아래의 목적으로만 개인정보를 이용합니다.</p>
          <ul className="list-disc pl-5 mb-12 space-y-3">
            <li>서비스 제공을 위한 임대계약 및 정산(점포, 시설물)</li>
            <li>채용진행에 따른 입사지원/ 채용진행사항/ 관련 안내, 향후 채용가능 자원의 관리 및 본인 식별</li>
            <li>시설내 촬영 목적으로 방문 경우 이용객(자)의 원활한 서비스 제공과 안전을 위한 시설물 관리(동선, 장소 임대)</li>
            <li>설문조사, 접속 빈도 파악 또는 회원의 서비스 이용</li>
            <li>고지사항 전달, 본인의사 확인, 불만처리 등 의사소통</li>
            <li>고객정보 분석 및 분석정보 통계적 활용</li>
            <li>이벤트 정보 및 광고성 정보 제공 등 마케팅 및 프로모션 목적으로 이용</li>
          </ul>

          <h2 className="text-h4 text-black mb-8 tracking-tight">4. 개인정보의 제공과 위탁</h2>
          <ul className="list-disc pl-5 mb-8 space-y-3">
            <li>원칙적으로 이용자의 사전 동의 없이 개인정보를 처리 및 외부에 제공하지 않습니다.</li>
            <li>동승은 수집한 개인정보를 아래에 고지한 목적 범위 내에서만 사용하며, 이용자의 동의 없이 개인정보를 외부에 제공하지 않습니다.</li>
          </ul>
          <p className="mb-6 font-bold text-black">o 단, 관련 법령에 의거해 개인정보 제공이 가능한 아래와 같은 경우 외부에 제공 됩니다.</p>
          <ul className="list-disc pl-5 mb-8 space-y-3">
            <li>이용자와 체결한 계약을 이행하기 위해 필요한 경우</li>
            <li>이용자와 계약 체결 과정에서 정보주체의 요청에 따른 조치를 이행하기 위해 필요한 경우</li>
            <li>이용자 또는 제 3 자의 급박한 생명·신체·재산의 이익을 위해 필요한 경우</li>
            <li>공중위생 등 공공의 안전과 안녕을 위해 긴급히 필요한 경우</li>
          </ul>
          <p className="mb-6 font-bold text-black">o 동승은 서비스 향상을 위해 수집한 개인정보의 일부를 아래와 같이 위탁하여 처리하고 있습니다.</p>
          <div className="overflow-x-auto mb-12 border-t-2 border-black">
            <table className="w-full border-collapse text-[11px] uppercase tracking-widest">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-4 text-center font-bold text-black">업체</th>
                  <th className="p-4 text-center font-bold text-black">제공 내용</th>
                  <th className="p-4 text-center font-bold text-black">개인정보의 보유 및 이용기간</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr>
                  <td className="p-4 text-center font-bold text-black">헥토파이낸셜</td>
                  <td className="p-4 text-gray-500">납입·반환, 임·관리비 납입을 위한 가상계좌 활용</td>
                  <td className="p-4 text-center text-gray-500">5년<br/><span className="text-[9px] opacity-60">▶대금결제 및 재화 등의 공급에 관한 기록</span></td>
                </tr>
                <tr>
                  <td className="p-4 text-center font-bold text-black">지트파워</td>
                  <td className="p-4 text-gray-500">상가관리시스템 유지보수</td>
                  <td className="p-4 text-center text-gray-500">5년</td>
                </tr>
                <tr>
                  <td className="p-4 text-center font-bold text-black" rowSpan={2}>더존비즈온</td>
                  <td className="p-4 text-gray-500">인사시스템 유지보수</td>
                  <td className="p-4 text-center text-gray-500">3년</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-500">그룹웨어시스템 유지보수</td>
                  <td className="p-4 text-center text-gray-500">5년</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-h4 text-black mb-8 tracking-tight">5. 개인정보의 파기</h2>
          <p className="mb-6 font-bold text-black">o 동승은 원칙적으로 개인정보의 이용 목적 달성 시 수집된 개인정보를 아래와 같은 방법으로 지체없이 파기하고 있습니다.</p>
          <ul className="list-disc pl-5 mb-8 space-y-3">
            <li>전자적 파일 형태의 경우 복구 및 재생되지 않도록 기술적인 포맷으로 삭제</li>
            <li>출력물 등은 분쇄하거나 소각하는 방식으로 파기</li>
          </ul>
          <p className="mb-6 font-bold text-black">o 단, 아래와 같은 경우 이용자의 개인정보를 보관합니다.</p>
          <ul className="list-disc pl-5 mb-8 space-y-3">
            <li>이용자에게 개인정보 보관기간에 대해 별도의 동의를 얻은 경우</li>
            <li>법령에서 일정기간 정보보관 의무를 부과하는 경우</li>
          </ul>
          <ul className="list-disc pl-5 mb-12 space-y-3">
            <li>전자상거래 등에서 소비자 보호에 관한 법률
              <ul className="list-[circle] pl-5 mt-2 space-y-1">
                <li>계약 또는 청약철회 등에 관한 기록 : 5년 보관</li>
                <li>대금결제 및 재화 등의 공급에 관한 기록 : 5년 보관</li>
                <li>소비자의 불만 또는 분쟁처리에 관한 기록 : 3년 보관</li>
              </ul>
            </li>
            <li>통신비밀보호법
              <ul className="list-[circle] pl-5 mt-2 space-y-1">
                <li>로그인 기록 : 3개월</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-h4 text-black mb-8 tracking-tight">6. 이용자 권리와 행사방법</h2>
          <ul className="list-disc pl-5 mb-8 space-y-3">
            <li>이용자는 언제든지 개인정보를 조회하거나 처리의 정지를 요청할 수 있습니다.</li>
            <li>개인정보 오류에 대한 정정 요청의 경우에는 정정을 완료하기 전까지 당해 개인정보를 이용 또는 제공하지 않습니다.</li>
            <li>또한 잘못된 개인정보를 제 3 자에게 이미 제공한 경우 정정 처리결과를 제 3 자에게 지체없이 통지하여 정정이 이루어지도록 조치하겠습니다.</li>
          </ul>
          <p className="mb-6 font-bold text-black">o 개인정보 열람 및 정정, 철회</p>
          <ul className="list-disc pl-5 mb-8 space-y-3">
            <li>임대계약 관련 : 영업팀 02-2262-0303</li>
            <li>채용 관련 : 총무팀 02-2262-0213</li>
            <li>촬영 관련 : 기획팀 02-2262-0146</li>
          </ul>
          <p className="mb-6 font-bold text-black">o 단. 아래의 경우에는 개인정보 열람을 제한할 수 있습니다.</p>
          <ul className="list-disc pl-5 mb-12 space-y-3">
            <li>법률에 따라 열람이 금지되거나 제한되는 경우</li>
            <li>제 3 자의 생명, 신체, 재산 또는 권익을 부당하게 침해할 우려가 있는 경우</li>
          </ul>

          <h2 className="text-h4 text-black mb-8 tracking-tight">7. 개인정보보호를 위한 노력</h2>
          <p className="mb-6 font-bold text-black">o 동승은 이용자의 개인정보가 안전하게 관리되도록 개인정보보호법에서 요구하는 안전성 확보를 위해 아래와 같이 조치를 취하고 있습니다.</p>
          <ul className="list-disc pl-5 mb-12 space-y-3">
            <li>관리적 조치 : 내부계획 수립과 시행, 정기적 직원 교육 등</li>
            <li>기술적 조치 : 개인정보 접근 권한 제한, 정보유출방지시스템 설치, 고유식별정보 암호화, 보안프로그램 설치 등</li>
            <li>물리적 조치 : 전산실, IDC, 자료보관실 등의 접근통제 등</li>
          </ul>

          <h2 className="text-h4 text-black mb-8 tracking-tight">8. 개인정보 보호책임자 및 담당자 안내</h2>
          <p className="mb-6 font-bold text-black">o 동승은 이용자의 개인정보 관련 문의사항 및 불만 처리 등을 위해 아래와 같이 개인정보 보호 책임자 및 담당자를 지정하고 있습니다.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-gray-100 mb-12 rounded-xl overflow-hidden">
            <div className="p-10 border-b md:border-b-0 md:border-r border-gray-100 last:border-r-0 bg-gray-50">
              <h3 className="text-body-m font-bold mb-8 text-black uppercase tracking-widest border-b border-gray-200 pb-4">개인정보 보호담당자</h3>
              <div className="space-y-2 text-gray-500 text-body-m">
                <p>이 름 : 권령용</p>
                <p>전화 : 02-2262-0192</p>
                <p>메일 : rykwon@dongsungin.com</p>
                <p>소 속 : 전산팀</p>
                <p>직 위 : 차장</p>
              </div>
            </div>
            <div className="p-10 border-b md:border-b-0 md:border-r border-gray-100 last:border-r-0 bg-gray-50">
              <h3 className="text-body-m font-bold mb-8 text-black uppercase tracking-widest border-b border-gray-200 pb-4">개인정보 보호책임자</h3>
              <div className="space-y-2 text-gray-500 text-body-m">
                <p>이 름 : 이상식</p>
                <p>전화 : 02-2262-0312</p>
                <p>메일 : sslee@dongsungin.com</p>
                <p>소 속 : 관리본부</p>
                <p>직 위 : 상무</p>
              </div>
            </div>
          </div>

          <p className="mb-6 font-bold text-black">o 기타 개인정보 침해에 대한 신고나 상담이 필요한 경우 아래 기관에 문의 가능합니다.</p>
          <ul className="list-disc pl-5 mb-12 space-y-3">
            <li>개인정보침해신고센터 (privacy.kisa.or.kr / 국번없이 118)</li>
            <li>대검찰청 사이버수사과 (www.spo.go.kr / 국번없이 1301)</li>
            <li>경찰청 사이버수사국 (police.go.kr / 국번없이 182)</li>
          </ul>

          <h2 className="text-h4 text-black mb-8 tracking-tight">9. 개인정보 자동수집 장치(쿠키)의 설치, 운영 및 그 거부에 관한 사항</h2>
          <ul className="list-disc pl-5 mb-12 space-y-3">
            <li>동승은 웹사이트 사용을 지원하고 관련 서비스 제공을 위해 쿠키를 운영합니다.</li>
            <li>이용자는 쿠키의 저장을 거부할 수 있습니다.
              <ul className="list-[circle] pl-5 mt-2 space-y-1">
                <li>Internet Explorer 경우 : 웹 브라우저 설정 및 기타 메뉴 &gt; 설정 &gt; 쿠키 및 사이트 권한</li>
                <li>Chrome : 웹 브라우저 설정 메뉴 &gt; 화면 하단 고급 설정 표시 &gt; 개인정보의 콘텐츠 설정 &gt; 쿠키</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-h4 text-black mb-8 tracking-tight">10. 개인정보 처리방침 변경</h2>
          <p className="mb-6 font-bold text-black">o 본 개인정보 처리방침은 2025. 2. 21 부터 적용됩니다.</p>
          <p className="mb-6 font-bold text-black">o 이전 개인정보처리 방침은 아래에서 확인할 수 있습니다.</p>
          <ul className="list-disc pl-5 mb-12 space-y-2 text-[11px] text-gray-400 font-bold uppercase tracking-widest">
            <li>최초 제정 : 2016. 9. 1 ~ 2018. 7. 31 적용</li>
            <li>1 차 개정 : 2018. 8. 1 ~ 2019. 12. 1 적용</li>
            <li>2 차 개정 : 2019. 12. 2 ~ 2020. 12. 7 적용</li>
            <li>3 차 개정 : 2020. 12. 8 ~ 2022. 8. 26 적용</li>
            <li>4 차 개정 : 2022. 8. 27 ~ 2024. 1. 31 적용</li>
            <li>5 차 개정 : 2024. 2. 1 ~ 2025. 2. 20 적용</li>
          </ul>

        </div>
      </section>
    </div>
  );
}

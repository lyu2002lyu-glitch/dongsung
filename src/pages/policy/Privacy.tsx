import PageHeader from '../../components/PageHeader';

export default function Privacy() {
  return (
    <div className="bg-white">
      <PageHeader 
        title="개인정보처리방침" 
        subtitle="고객님의 소중한 개인정보를 안전하게 보호합니다." 
      />
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto fade-in">
        <div className="prose prose-gray max-w-none">
          <h2 className="text-2xl font-bold mb-4">1. 개인정보의 처리 목적</h2>
          <p className="text-gray-600 mb-8">
            동승은 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
          </p>

          <h2 className="text-2xl font-bold mb-4">2. 개인정보의 처리 및 보유 기간</h2>
          <p className="text-gray-600 mb-8">
            동승은 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
          </p>

          <h2 className="text-2xl font-bold mb-4">3. 정보주체와 법정대리인의 권리·의무 및 그 행사방법</h2>
          <p className="text-gray-600 mb-8">
            정보주체는 동승에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.
          </p>

          <p className="text-gray-400 text-sm mt-16 pt-8 border-t border-gray-200">
            본 방침은 2024년 1월 1일부터 시행됩니다.
          </p>
        </div>
      </section>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { supabase } from '../../lib/supabase';

export default function AdminWrite() {
  const navigate = useNavigate();
  const [board, setBoard] = useState<'disclosures' | 'notices'>('disclosures');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from(board)
        .insert([{ title, content }]);

      if (error) throw error;

      alert('게시글이 성공적으로 등록되었습니다.');
      navigate(board === 'disclosures' ? '/ir/disclosure' : '/ir/notice');
    } catch (error) {
      console.error('Error inserting post:', error);
      alert('게시글 등록 중 오류가 발생했습니다. (Supabase 권한 설정을 확인해주세요)');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      <PageHeader
        title="관리자 글쓰기"
        subtitle="공시정보 및 전자공고 게시판에 새 글을 등록합니다."
        imageSrc="https://picsum.photos/seed/admin/1920/400?grayscale"
      />
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto fade-in">
        <form onSubmit={handleSubmit} className="space-y-6 bg-white border border-gray-200 p-8 rounded-xl shadow-sm">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">게시판 선택</label>
            <select
              value={board}
              onChange={(e) => setBoard(e.target.value as 'disclosures' | 'notices')}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-black focus:border-black"
            >
              <option value="disclosures">공시정보</option>
              <option value="notices">전자공고</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-black focus:border-black"
              placeholder="제목을 입력하세요"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">내용</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={15}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-black focus:border-black"
              placeholder="상세 내용을 입력하세요 (줄바꿈이 그대로 적용됩니다)"
              required
            />
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? '등록 중...' : '등록하기'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

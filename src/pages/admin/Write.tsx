import { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { supabase } from '../../lib/supabase';
import { GENERATED_IMAGES } from '../../constants/images';
import { Trash2 } from 'lucide-react';

interface Post {
  id: any;
  title: string;
  created_at: string;
  type: 'notices';
}

export default function AdminWrite() {
  const navigate = useNavigate();
  const [board, setBoard] = useState<'notices'>('notices');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts();
    }
  }, [isAuthenticated]);

  const fetchPosts = async () => {
    setIsLoadingPosts(true);
    try {
      const { data: noticeData, error: noticeError } = await supabase
        .from('notices')
        .select('id, title, created_at')
        .order('created_at', { ascending: false });

      if (noticeError) throw noticeError;

      const combined: Post[] = [
        ...(noticeData || []).map(p => ({ ...p, type: 'notices' as const }))
      ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      setPosts(combined);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoadingPosts(false);
    }
  };

  const handlePasswordSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password === '1234') {
      setIsAuthenticated(true);
    } else {
      alert('비밀번호가 틀렸습니다.');
      setPassword('');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) return;
    
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
      setTitle('');
      setContent('');
      fetchPosts();
    } catch (error) {
      console.error('Error inserting post:', error);
      alert('게시글 등록 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: any, type: 'notices') => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    try {
      // id가 숫자형 문자열인 경우에만 숫자로 변환 (UUID 등 방지)
      const targetId = (typeof id === 'string' && /^\d+$/.test(id)) ? parseInt(id, 10) : id;
      
      const { error, count } = await supabase
        .from(type)
        .delete({ count: 'exact' })
        .eq('id', targetId);

      if (error) throw error;
      
      if (count === 0) {
        alert('삭제할 게시글을 찾을 수 없거나 권한이 없습니다. (Supabase RLS 정책을 확인해주세요)');
        return;
      }

      alert('삭제되었습니다.');
      await fetchPosts();
    } catch (error: any) {
      console.error('Error deleting post:', error);
      alert(`삭제 중 오류가 발생했습니다: ${error.message || '알 수 없는 오류'}`);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-white min-h-screen flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md border border-gray-200 p-8 rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">관리자 인증</h2>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-black focus:border-black"
                placeholder="비밀번호를 입력하세요"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
            >
              확인
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <PageHeader
        title="ADMINISTRATION"
        subtitle="게시글 관리 및 신규 등록을 위한 관리자 페이지입니다."
      />
      
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto fade-in">
        {/* Registration Form */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-[1px] bg-black"></div>
            <h2 className="text-2xl font-bold tracking-tight uppercase">New Post</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8 bg-white border border-gray-100 p-10 shadow-sm">
            <div className="grid grid-cols-1 gap-8">
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-200 rounded-none p-4 focus:ring-0 focus:border-black transition-colors text-sm"
                  placeholder="게시글 제목을 입력하세요"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                className="w-full border border-gray-200 rounded-none p-4 focus:ring-0 focus:border-black transition-colors text-sm resize-none"
                placeholder="상세 내용을 입력하세요"
                required
              />
            </div>
            
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative px-16 py-5 bg-black text-white font-bold overflow-hidden transition-all duration-500 disabled:opacity-50"
              >
                <span className="relative z-10 tracking-[0.3em] text-[10px] uppercase">
                  {isSubmitting ? 'Submitting...' : 'Register Post'}
                </span>
                <div className="absolute inset-0 bg-gray-800 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </button>
            </div>
          </form>
        </div>

        {/* Management Table */}
        <div>
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-black"></div>
              <h2 className="text-2xl font-bold tracking-tight uppercase">Manage Posts</h2>
            </div>
            <button 
              onClick={fetchPosts}
              className="text-[10px] font-bold text-gray-400 hover:text-black tracking-widest uppercase transition-colors"
            >
              Refresh List
            </button>
          </div>

          <div className="overflow-x-auto border border-gray-100">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest w-24">Type</th>
                  <th className="p-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Title</th>
                  <th className="p-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest w-32">Date</th>
                  <th className="p-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest w-24 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {isLoadingPosts ? (
                  <tr>
                    <td colSpan={4} className="p-20 text-center text-gray-400 text-sm font-light tracking-widest uppercase">Loading...</td>
                  </tr>
                ) : posts.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-20 text-center text-gray-400 text-sm font-light tracking-widest uppercase">No posts found.</td>
                  </tr>
                ) : (
                  posts.map((post) => (
                    <tr key={`${post.type}-${post.id}`} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="p-6">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">
                          공고
                        </span>
                      </td>
                      <td className="p-6">
                        <span className="text-sm font-medium text-black group-hover:text-gray-600 transition-colors">{post.title}</span>
                      </td>
                      <td className="p-6">
                        <span className="text-[11px] font-bold text-gray-400 tracking-tighter">{formatDate(post.created_at)}</span>
                      </td>
                      <td className="p-6 text-center">
                        <button 
                          onClick={() => handleDelete(post.id, post.type)}
                          className="text-gray-300 hover:text-red-500 transition-colors p-2"
                          title="Delete Post"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

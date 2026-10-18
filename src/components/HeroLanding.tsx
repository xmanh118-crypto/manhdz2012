import React, { useState } from 'react';
import { Camera, Sparkles, Target, Eye, EyeOff, ShieldCheck, ArrowRight, UserCheck, BookOpen } from 'lucide-react';
import teacherClassroomHero from '../assets/images/teacher_classroom_hero_1792338342338.jpg';

interface HeroLandingProps {
  onOpenLiveDemo: () => void;
  onEnterStudentPortal: (classCode?: string) => void;
  onEnterTeacherDashboard: () => void;
}

export const HeroLanding: React.FC<HeroLandingProps> = ({
  onOpenLiveDemo,
  onEnterStudentPortal,
  onEnterTeacherDashboard,
}) => {
  const [authTab, setAuthTab] = useState<'login' | 'register' | 'studentQuick'>('login');
  const [email, setEmail] = useState('thuthay.toan@truongthcs.edu.vn');
  const [password, setPassword] = useState('Matkhau@123');
  const [showPassword, setShowPassword] = useState(false);
  const [studentCode, setStudentCode] = useState('TOAN8A1');
  const [studentName, setStudentName] = useState('Nguyễn Hoàng Nam');
  const [rememberMe, setRememberMe] = useState(true);

  const handleTeacherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEnterTeacherDashboard();
  };

  const handleStudentQuickJoin = (e: React.FormEvent) => {
    e.preventDefault();
    onEnterStudentPortal(studentCode);
  };

  return (
    <div className="w-full">
      {/* Main Split Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* CỘT TRÁI: GIỚI THIỆU & MÔ PHỎNG VỞ Ô LI CHẤM GỐC LỖI */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                Mỗi ý tưởng đều có một chỗ · Công nghệ chẩn đoán sai lầm nhận thức
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mt-2.5 leading-tight tracking-tight text-balance">
                Chụp bài, nộp bài, <span className="text-sky-600">AI chấm ngay.</span>
              </h1>
              <p className="text-slate-600 mt-4 text-base sm:text-lg leading-relaxed font-normal max-w-2xl">
                Giáo viên chụp bài làm hoặc học sinh nộp bằng điện thoại. AI đọc cả chữ viết tay, cho điểm, <strong className="text-slate-900 font-bold">chỉ đúng chỗ sai từng dòng</strong> và tự động gợi ý bài luyện thêm cho từng em.
              </p>
            </div>

            {/* Feature Bullets */}
            <div className="space-y-3.5 text-sm sm:text-base font-medium text-slate-700">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Camera className="w-4 h-4" />
                </div>
                <p>Chụp ảnh vở ô li, giấy kiểm tra hoặc gõ từng bước bài giải trên điện thoại & máy tính.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <p>AI chấm theo đáp án của thầy cô, định vị chính xác dòng sai và giải thích gốc rễ ngộ nhận kiến thức.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Target className="w-4 h-4" />
                </div>
                <p>Định hướng luyện tập cá nhân hóa: sinh bài tập tương thích cùng dạng để học sinh tự khắc phục ngay.</p>
              </div>
            </div>

            {/* KHỐI MÔ PHỎNG VỞ Ô LI CHẤM LỖI (GIỐNG ẢNH MẪU 100%) */}
            <div className="pt-2">
              <div className="notebook-paper rounded-2xl p-6 sm:p-7 relative max-w-xl border border-slate-200/80 shadow-md">
                
                {/* Con dấu điểm đỏ xoay nhẹ */}
                <div className="absolute right-6 top-6 w-18 h-18 rounded-full border-2 border-red-500/90 flex flex-col items-center justify-center text-red-600 rotate-6 bg-red-50/70 shadow-xs select-none">
                  <span className="text-2xl font-black leading-none handwriting">8,5</span>
                  <span className="text-[11px] font-bold tracking-tighter border-t border-red-400 mt-0.5 px-1">/ 10</span>
                </div>

                {/* Tiêu đề bài và dòng kẻ toán học */}
                <div className="pr-18">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Trích đoạn chấm bài thực tế</p>
                  <p className="font-bold text-slate-900 text-base mt-1">Câu 1. 3(5 - 2y) - y = 1</p>
                </div>

                <div className="space-y-2.5 mt-4 text-sm sm:text-base font-sans">
                  <p className="text-slate-700 font-mono math-font">Dòng 1: 3(5 - 2y) - y = 1</p>
                  <p className="text-slate-900 font-mono math-font">
                    Dòng 2: <span className="wavy-underline font-semibold text-red-700">15 - 2y</span> - y = 1
                  </p>
                  
                  {/* Lời phê sửa lỗi của AI */}
                  <div className="bg-red-50 border border-red-200/70 rounded-xl p-3 text-red-700 text-xs sm:text-sm font-sans flex items-start gap-2 mt-2">
                    <ArrowRight className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                    <div>
                      <span className="font-bold">Lỗi:</span> Nhân 3 với cả 2y: <span className="bg-red-100 px-1.5 py-0.5 rounded text-red-800 font-mono font-semibold">15 - 6y</span>.
                      <p className="text-slate-600 text-xs mt-1">
                        ↳ Gốc lỗi: Học sinh áp dụng sai tính chất phân phối của phép nhân đối với phép trừ.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Call-to-action xem tương tác */}
                <div className="mt-5 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-slate-500 font-medium">Hệ thống truy vết lỗi trong 0.8 giây</span>
                  <button
                    onClick={onOpenLiveDemo}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-800 bg-sky-50 hover:bg-sky-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    <span>Mở bài toán này trong Live Demo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>

            {/* Real Classroom Adoption Showcase */}
            <div className="flex items-center gap-4 p-3 bg-white/70 rounded-2xl border border-slate-200/70 shadow-2xs max-w-xl">
              <img
                src={teacherClassroomHero}
                alt="Lớp học thực tế áp dụng Tường học tập AI"
                referrerPolicy="no-referrer"
                className="w-20 h-14 object-cover rounded-xl shrink-0 border border-slate-200"
              />
              <div className="text-xs">
                <p className="font-bold text-slate-900">Thực nghiệm tại 15 trường THCS & THPT</p>
                <p className="text-slate-500 mt-0.5">Giáo viên tiết kiệm trung bình 65% thời gian chấm bài; học sinh nhận phản hồi tức thì trong tiết tự học.</p>
              </div>
            </div>

          </div>

          {/* CỘT PHẢI: FORM ĐĂNG NHẬP / ĐĂNG KÝ / VÀO LỚP HỌC SINH */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-sky-900/5 border border-slate-100">
              
              {/* Toggle Tabs */}
              <div className="grid grid-cols-3 p-1.5 bg-slate-100/90 rounded-2xl mb-6 text-xs">
                <button
                  type="button"
                  onClick={() => setAuthTab('login')}
                  className={`py-2 px-1 text-center font-bold rounded-xl transition cursor-pointer whitespace-nowrap truncate ${
                    authTab === 'login' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Đăng nhập
                </button>
                <button
                  type="button"
                  onClick={() => setAuthTab('studentQuick')}
                  className={`py-2 px-1 text-center font-bold rounded-xl transition cursor-pointer whitespace-nowrap truncate ${
                    authTab === 'studentQuick' ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Vào lớp học
                </button>
                <button
                  type="button"
                  onClick={() => setAuthTab('register')}
                  className={`py-2 px-1 text-center font-bold rounded-xl transition cursor-pointer whitespace-nowrap truncate ${
                    authTab === 'register' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Đăng ký
                </button>
              </div>

              {/* Subtext info */}
              <div className="text-xs text-slate-500 leading-relaxed text-center mb-5 px-2">
                {authTab === 'studentQuick' ? (
                  <p className="text-sky-800 font-medium bg-sky-50 p-2.5 rounded-xl border border-sky-100">
                    Học sinh vào lớp bằng <strong className="text-sky-900 font-bold">mã lớp hoặc link</strong> thầy cô gửi, không cần mật khẩu rườm rà.
                  </p>
                ) : (
                  <p>
                    Dành cho giáo viên quản lý lớp. Học sinh vào lớp bằng <strong className="text-slate-700 font-semibold">đường link thầy cô gửi</strong>, không cần tài khoản.
                  </p>
                )}
              </div>

              {/* Form Render */}
              {authTab === 'studentQuick' ? (
                <form onSubmit={handleStudentQuickJoin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Họ và tên học sinh
                    </label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Ví dụ: Nguyễn Hoàng Nam"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-hidden transition bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Mã lớp học (PIN Code)
                    </label>
                    <input
                      type="text"
                      required
                      value={studentCode}
                      onChange={(e) => setStudentCode(e.target.value.toUpperCase())}
                      placeholder="Ví dụ: TOAN8A1"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-mono uppercase tracking-wider focus:ring-2 focus:ring-sky-500 focus:outline-hidden transition bg-slate-50/50"
                    />
                    <div className="flex gap-1.5 mt-2 text-[11px] text-slate-500">
                      <span>Mã demo có sẵn:</span>
                      <button
                        type="button"
                        onClick={() => setStudentCode('TOAN8A1')}
                        className="text-sky-700 underline font-semibold cursor-pointer"
                      >
                        TOAN8A1
                      </button>
                      <span>·</span>
                      <button
                        type="button"
                        onClick={() => setStudentCode('TOAN9A2')}
                        className="text-sky-700 underline font-semibold cursor-pointer"
                      >
                        TOAN9A2
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl text-white font-bold text-sm bg-linear-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Vào phòng làm bài ngay</span>
                  </button>
                </form>
              ) : (
                <form onSubmit={handleTeacherSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Email giáo viên
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email đã đăng ký"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-hidden transition bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Mật khẩu
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mật khẩu của bạn"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-hidden transition bg-slate-50/50 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember me & forgot */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-slate-600 select-none">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 border-slate-300"
                      />
                      <span>Ghi nhớ đăng nhập</span>
                    </label>
                    <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Liên kết khôi phục mật khẩu đã được gửi đến email giáo viên.'); }} className="font-semibold text-sky-700 hover:underline">
                      Quên mật khẩu?
                    </a>
                  </div>

                  {/* Nút đăng nhập */}
                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl text-white font-bold text-sm bg-linear-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>{authTab === 'login' ? 'Đăng nhập giáo viên' : 'Đăng ký tài khoản mới'}</span>
                  </button>

                  {/* Fast 1-click teacher login for presentation */}
                  <div className="text-center pt-1">
                    <button
                      type="button"
                      onClick={onEnterTeacherDashboard}
                      className="text-xs font-semibold text-sky-700 hover:text-sky-800 underline cursor-pointer"
                    >
                      Bấm vào đây để vào ngay Bảng Giáo Viên mẫu (Cô Thu Hà)
                    </button>
                  </div>
                </form>
              )}

              {/* Cam kết an toàn dữ liệu (Tiêu chí số 5) */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-start gap-2.5 text-slate-500 text-[11px] leading-relaxed">
                <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <span>
                  Dữ liệu lưu an toàn trên máy chủ Tường học tập AI. Mỗi giáo viên chỉ thấy bảng và bài của lớp mình; học sinh chỉ thấy bài của em.
                </span>
              </div>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

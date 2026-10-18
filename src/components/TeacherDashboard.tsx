import React, { useState } from 'react';
import { 
  Users, 
  Share2, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  TrendingUp, 
  Clock, 
  ArrowLeft,
  Copy,
  Check,
  Search
} from 'lucide-react';
import { getClassMisconceptions } from '../utils/diagnosticEngine';
import teacherClassroomHero from '../assets/images/teacher_classroom_hero_1792338342338.jpg';

interface TeacherDashboardProps {
  onBackToHome: () => void;
  onOpenLiveDemo: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  onBackToHome,
  onOpenLiveDemo,
}) => {
  const [selectedClass, setSelectedClass] = useState<string>('8A1');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'error' | 'perfect'>('all');

  const misconceptions = getClassMisconceptions();

  // Mock class submission list
  const mockSubmissions = [
    {
      id: 'sub_1',
      studentName: 'Nguyễn Hoàng Nam',
      time: '10 phút trước',
      problem: '3(5 - 2y) - y = 1',
      score: 7.5,
      hasErrorRoot: true,
      errorDetail: 'Dòng 2: Sai quy tắc nhân phân phối',
      remedialStatus: 'Đã hoàn thành bài bù đắp',
    },
    {
      id: 'sub_2',
      studentName: 'Trần Thị Mai Anh',
      time: '25 phút trước',
      problem: '3(5 - 2y) - y = 1',
      score: 10,
      hasErrorRoot: false,
      errorDetail: 'Bài làm hoàn hảo, biến đổi chặt chẽ',
      remedialStatus: 'Không cần',
    },
    {
      id: 'sub_3',
      studentName: 'Lê Quang Huy',
      time: '45 phút trước',
      problem: '(x + 1)/3 - (x - 2)/2 = 1',
      score: 7.0,
      hasErrorRoot: true,
      errorDetail: 'Dòng 2: Quên nhân mẫu chung với vế phải',
      remedialStatus: 'Chưa làm bài bù đắp',
    },
    {
      id: 'sub_4',
      studentName: 'Phạm Minh Tuấn',
      time: '1 giờ trước',
      problem: '-3x + 7 < 1',
      score: 6.5,
      hasErrorRoot: true,
      errorDetail: 'Dòng 4: Quên đổi chiều khi chia số âm',
      remedialStatus: 'Chưa làm bài bù đắp',
    },
    {
      id: 'sub_5',
      studentName: 'Hoàng Bích Ngọc',
      time: '2 giờ trước',
      problem: 'A = (1/(x - √x) + 1/(√x - 1)) : ...',
      score: 10,
      hasErrorRoot: false,
      errorDetail: 'Đầy đủ điều kiện xác định, lập luận tốt',
      remedialStatus: 'Không cần',
    },
  ];

  const handleCopyLink = () => {
    navigator.clipboard?.writeText('https://tuonghoctap.ai/lop/TOAN8A1');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleExportReport = () => {
    alert('Đã tạo báo cáo chẩn đoán sư phạm Lớp 8A1 định dạng PDF chuẩn báo cáo nhà trường!');
  };

  const filteredSubmissions = mockSubmissions.filter((sub) => {
    const matchesSearch = sub.studentName.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          sub.problem.toLowerCase().includes(searchFilter.toLowerCase());
    if (statusFilter === 'error') return matchesSearch && sub.hasErrorRoot;
    if (statusFilter === 'perfect') return matchesSearch && !sub.hasErrorRoot;
    return matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
      
      {/* Top Banner: Teacher Info & Quick Actions */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToHome}
            className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            title="Quay lại Trang chủ"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="w-12 h-12 rounded-2xl bg-sky-700 text-white flex items-center justify-center font-black text-xl shrink-0 shadow-xs">
            TH
          </div>
          
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">Cô Nguyễn Thu Hà</h2>
              <span className="bg-sky-100 text-sky-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
                Giáo viên Toán THCS
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Trường THCS & THPT Thực nghiệm · Không gian quản lý lớp học AI
            </p>
          </div>
        </div>

        {/* Class switcher buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center p-1 bg-slate-100 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setSelectedClass('8A1')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                selectedClass === '8A1' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600'
              }`}
            >
              Lớp 8A1 (38 HS)
            </button>
            <button
              onClick={() => setSelectedClass('8A2')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                selectedClass === '8A2' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600'
              }`}
            >
              Lớp 8A2 (36 HS)
            </button>
            <button
              onClick={() => setSelectedClass('9A3')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                selectedClass === '9A3' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600'
              }`}
            >
              Lớp 9A3 (40 HS)
            </button>
          </div>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3 py-2 bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Đã copy link nộp bài' : 'Copy link gửi HS'}</span>
          </button>

          <button
            onClick={handleExportReport}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Xuất báo cáo PDF</span>
          </button>
        </div>
      </div>

      {/* KPI Overview Strip (Tiêu chí 6 & 7) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Tổng bài đã nộp</span>
            <FileText className="w-4 h-4 text-sky-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">38 / 38</p>
          <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> 100% tỷ lệ nộp bài hôm nay
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Thời gian chấm trung bình</span>
            <Clock className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-2xl font-black text-indigo-600">0.82 giây</p>
          <p className="text-[11px] text-slate-500">
            Tiết kiệm 2.5 giờ chấm bài mỗi tối
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Phát hiện gốc lỗi</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-amber-600">19 bài (50%)</p>
          <p className="text-[11px] text-slate-500">
            Có 19 học sinh cần sửa ngộ nhận
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Đã tự sửa bù đắp</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-emerald-600">14 / 19 (73.7%)</p>
          <p className="text-[11px] text-emerald-600 font-semibold">
            Tự chữa lành lỗ hổng trong 24h
          </p>
        </div>
      </div>

      {/* BẢN ĐỒ NHIỆT LỖ HỔNG NHẬN THỨC CỦA LỚP (BẮT BUỘC THEO TIÊU CHÍ 2 & 3) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg">
              Bản đồ nhiệt lỗ hổng nhận thức Lớp {selectedClass} (Misconception Heatmap)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Dữ liệu tổng hợp từ các bài kiểm tra viết tay, chỉ rõ dạng lỗi học sinh hay vấp ngã nhất
            </p>
          </div>
          <span className="text-xs font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-xl border border-sky-200">
            Đề xuất can thiệp sư phạm tự động
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {misconceptions.map((item, index) => (
            <div
              key={index}
              className={`p-4 rounded-2xl border transition-all ${
                item.severity === 'high'
                  ? 'bg-red-50/40 border-red-200/80'
                  : item.severity === 'medium'
                  ? 'bg-amber-50/30 border-amber-200/80'
                  : 'bg-slate-50/60 border-slate-200'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1 pr-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        item.severity === 'high'
                          ? 'bg-red-100 text-red-800'
                          : item.severity === 'medium'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-200 text-slate-800'
                      }`}
                    >
                      {item.severity === 'high' ? 'Lỗi nghiêm trọng' : item.severity === 'medium' ? 'Lỗi trung bình' : 'Lỗi nhẹ'}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {item.studentCount} học sinh mắc lỗi
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{item.skill}</h4>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xl font-black text-slate-900 font-mono">
                    {item.errorRatePercent}%
                  </span>
                  <p className="text-[10px] text-slate-500">Tỉ lệ mắc lỗi</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-3">
                <div
                  className={`h-full rounded-full ${
                    item.severity === 'high'
                      ? 'bg-red-500'
                      : item.severity === 'medium'
                      ? 'bg-amber-500'
                      : 'bg-sky-500'
                  }`}
                  style={{ width: `${item.errorRatePercent}%` }}
                ></div>
              </div>

              {/* Action for teacher */}
              <div className="mt-3 pt-2.5 border-t border-slate-200/60 text-xs text-slate-700 flex items-start gap-1.5">
                <span className="font-bold text-sky-800 shrink-0">Khuyến nghị cho GV:</span>
                <span>{item.remedyAction}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DANH SÁCH BÀI NỘP GẦN ĐÂY CỦA HỌC SINH */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Danh sách bài nộp & chấm tự động của lớp</h3>
            <p className="text-xs text-slate-500 mt-0.5">Bấm vào từng bài để xem chi tiết ảnh chụp gốc và các bước bóc tách</p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm tên học sinh..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
              />
            </div>

            <div className="flex items-center p-1 bg-slate-100 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  statusFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600'
                }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => setStatusFilter('error')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  statusFilter === 'error' ? 'bg-white text-red-700 shadow-2xs font-bold' : 'text-slate-600'
                }`}
              >
                Có lỗi
              </button>
              <button
                onClick={() => setStatusFilter('perfect')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  statusFilter === 'perfect' ? 'bg-white text-emerald-700 shadow-2xs font-bold' : 'text-slate-600'
                }`}
              >
                Điểm 10
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="py-3 px-3">Học sinh</th>
                <th className="py-3 px-3">Bài toán</th>
                <th className="py-3 px-3 text-center">Điểm AI</th>
                <th className="py-3 px-3">Chẩn đoán dòng sai</th>
                <th className="py-3 px-3">Khắc phục bù đắp</th>
                <th className="py-3 px-3 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSubmissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-3">
                    <p className="font-bold text-slate-900">{sub.studentName}</p>
                    <span className="text-[11px] text-slate-400">{sub.time}</span>
                  </td>
                  <td className="py-3.5 px-3 font-mono font-medium text-slate-800">
                    {sub.problem}
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <span
                      className={`inline-block font-black font-mono px-2 py-0.5 rounded-full ${
                        sub.score === 10
                          ? 'bg-emerald-100 text-emerald-800'
                          : sub.score >= 7
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {sub.score.toString().replace('.', ',')}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    {sub.hasErrorRoot ? (
                      <span className="text-red-700 font-semibold flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-red-500 shrink-0" />
                        <span>{sub.errorDetail}</span>
                      </span>
                    ) : (
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>{sub.errorDetail}</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                        sub.remedialStatus.includes('Đã hoàn thành')
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : sub.remedialStatus.includes('Chưa làm')
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {sub.remedialStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={onOpenLiveDemo}
                      className="px-2.5 py-1 text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors cursor-pointer"
                    >
                      Xem chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

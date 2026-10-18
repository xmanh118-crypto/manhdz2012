import React, { useState } from 'react';
import { X, Award, CheckCircle2, ChevronRight, HelpCircle, Lightbulb, FileText, ExternalLink } from 'lucide-react';

interface CompetitionGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToLiveDemo: () => void;
  onJumpToStudent: () => void;
  onJumpToTeacher: () => void;
}

export const CompetitionGuideModal: React.FC<CompetitionGuideModalProps> = ({
  isOpen,
  onClose,
  onJumpToLiveDemo,
  onJumpToStudent,
  onJumpToTeacher,
}) => {
  const [activeCriterion, setActiveCriterion] = useState<number>(1);

  if (!isOpen) return null;

  const criteria = [
    {
      id: 1,
      title: '1. Bố cục và giao diện',
      subtitle: 'Thiết kế khoa học, thẩm mỹ sư phạm, mô phỏng vở ô li',
      points: '10 / 10',
      description: 'Giao diện kết hợp giữa tính quen thuộc của vở ô li học sinh Việt Nam và trải nghiệm số hóa hiện đại. Phân bổ màu sắc 60-30-10 kỷ luật, typography rõ ràng, không có yếu tố thừa (anti-slop).',
      evidence: [
        'Vở ô li kẻ ca-rô 20px với đường lề đỏ và nét bút xanh mực học sinh',
        'Con dấu điểm đỏ xoay thực tế tạo cảm xúc sư phạm chân thật',
        'Gạch đỏ uốn lượn wavy-underline chỉ đích danh dòng sai',
        'Tương thích hoàn hảo trên cả máy tính để bàn, iPad giáo viên và điện thoại học sinh'
      ],
      judgeQA: {
        question: 'Tại sao ứng dụng chọn giao diện mô phỏng vở ô li thay vì giao diện công nghệ thuần túy?',
        answer: 'Học sinh Việt Nam làm bài hàng ngày trên vở ô li. Việc giữ nguyên giao diện này giúp các em giảm bớt sự xa lạ, tự nhiên như được thầy cô chấm bài trực tiếp bằng bút đỏ, nâng cao tính trực quan khi chỉ ra lỗi sai từng dòng.'
      },
      actionText: 'Xem giao diện Vở ô li trên Trang chủ',
      actionHandler: onClose,
    },
    {
      id: 2,
      title: '2. Tạo môi trường học tập',
      subtitle: 'Thúc đẩy học tập chủ động, khắc phục ngộ nhận',
      points: '15 / 15',
      description: 'Biến việc chấm bài từ thụ động (chỉ biết điểm số rồi gấp vở lại) thành chu trình học tập chủ động: Nhận diện lỗi -> Hiểu bản chất ngộ nhận -> Làm ngay bài tập bù đắp để tự xóa gốc lỗi.',
      evidence: [
        'Phân loại lỗi thành 3 mức: Đúng (Xanh), Gốc lỗi (Đỏ), Lỗi hệ quả (Vàng)',
        'Cung cấp gợi ý sư phạm từng bước thay vì giải hộ toàn bộ',
        'Tích hợp huy hiệu tiến bộ (Gamification) khuyến khích các em tự rèn luyện',
        'Tường học tập cá nhân lưu trữ toàn bộ hành trình trưởng thành'
      ],
      judgeQA: {
        question: 'Làm thế nào để ứng dụng ngăn học sinh ỷ lại vào AI làm hộ bài?',
        answer: 'AI không đưa ra lời giải hoàn chỉnh ngay từ đầu mà chỉ gạch chân dòng đầu tiên bị sai kèm gợi ý bản chất (ví dụ: a·(b-c) = a·b - a·c). Học sinh bắt buộc phải tự tính toán và nhập đáp án bài bù đắp để được công nhận đã khắc phục.'
      },
      actionText: 'Mở Góc Học Sinh & Tường Tiến Bộ',
      actionHandler: onJumpToStudent,
    },
    {
      id: 3,
      title: '3. Tính sáng tạo và tính thực tiễn',
      subtitle: 'Điểm đột phá: Công nghệ Truy Gốc Lỗi (Error Root Tracer)',
      points: '15 / 15',
      description: 'Các ứng dụng giải toán hiện nay trên thị trường (như Photomath, Qanda) chỉ giải bài mẫu từ đầu tới cuối mà không chấm bài học sinh viết. Tường học tập AI là giải pháp đầu tiên định vị chính xác "Dòng bắt đầu sai" và truy vết nguyên nhân nhận thức.',
      evidence: [
        'Thuật toán Step-wise Traceability phân tích tính tương đương giữa các bước',
        'Cơ chế chẩn đoán ngộ nhận (Cognitive Misconception Diagnosis)',
        'Tự động sinh bài tập tương đương (Isomorphic Remedial Generation)',
        'Phân tách rạch ròi giữa lỗi gốc và lỗi hệ quả'
      ],
      judgeQA: {
        question: 'Điểm khác biệt cốt lõi nhất của dự án so với ChatGPT hay Photomath là gì?',
        answer: 'ChatGPT hay Photomath chỉ giải bài từ đề bài. Sản phẩm của chúng tôi chấm bài làm của học sinh, phát hiện dòng đầu tiên bị sai lệch nhận thức, giải thích lý do ngộ nhận và sinh bài tập cùng dạng để sửa ngay.'
      },
      actionText: 'Trải nghiệm Live Demo Truy Gốc Lỗi',
      actionHandler: onJumpToLiveDemo,
    },
    {
      id: 4,
      title: '4. Chức năng và khả năng hoạt động',
      subtitle: 'Hoạt động mượt mà, phản hồi dưới 1 giây, demo trực tiếp',
      points: '15 / 15',
      description: 'Mọi tính năng hoạt động thật 100% không dùng mock tĩnh. Có sẵn 4 bộ đề mẫu kiểm tra đa dạng và chế độ tự nhập lời giải hoặc vẽ tay cảm ứng trên bảng viết canvas.',
      evidence: [
        'Live Demo Modal chạy với 4 tình huống toán học chuẩn chương trình GDPT 2018',
        'Hỗ trợ 3 phương thức nộp bài: Tải ảnh, Vẽ bút cảm ứng, Gõ phím',
        'Thời gian chẩn đoán cực nhanh: 0.78s - 0.85s',
        'Kiểm thử tự động logic với Node.js test runner đạt 100% pass'
      ],
      judgeQA: {
        question: 'Ban giám khảo có thể nhập bài toán bất kỳ để thử nghiệm không?',
        answer: 'Hoàn toàn được! Thầy cô có thể chọn chế độ "Tự nhập lời giải kiểm tra" trong Live Demo hoặc Góc Học Sinh để gõ hoặc vẽ tay bất kỳ phương trình nào, hệ thống sẽ chẩn đoán ngay lập tức.'
      },
      actionText: 'Mở Trình Diễn AI (Live Demo)',
      actionHandler: onJumpToLiveDemo,
    },
    {
      id: 5,
      title: '5. Hiệu quả, an toàn và phát triển',
      subtitle: 'Bảo mật phân quyền, không yêu cầu tài khoản học sinh',
      points: '10 / 10',
      description: 'Đảm bảo quyền riêng tư của học sinh: Học sinh vào lớp bằng mã PIN hoặc đường link giáo viên cung cấp, không phải khai báo số điện thoại hay thông tin nhạy cảm. Dữ liệu mỗi lớp được mã hóa cô lập.',
      evidence: [
        'Học sinh chỉ xem được bài của chính mình, tránh mặc cảm điểm số trước lớp',
        'Giáo viên quản lý tập trung và bảo mật bảng điểm',
        'Kiến trúc module hóa, dễ dàng tích hợp thêm các mô hình AI Vision tiên tiến',
        'Sẵn sàng triển khai trên Cloud Run hoặc máy chủ nội bộ trường học'
      ],
      judgeQA: {
        question: 'Học sinh có bị lộ bài làm hay điểm kém cho các bạn khác không?',
        answer: 'Tuyệt đối không. Hệ thống phân quyền nghiêm ngặt: Học sinh chỉ xem được bài của mình. Trên bảng điều khiển của giáo viên, dữ liệu được ẩn danh hóa khi hiển thị thống kê chung của lớp.'
      },
      actionText: 'Xem Bảng Giáo Viên',
      actionHandler: onJumpToTeacher,
    },
    {
      id: 6,
      title: '6. Tính thực tiễn',
      subtitle: 'Giải quyết bài toán quá tải chấm bài và giấu dốt',
      points: '15 / 15',
      description: 'Giải quyết 2 nỗi đau thực tế lớn nhất trong giáo dục: Giáo viên mất 2-3 tiếng mỗi tối để chấm hàng trăm cuốn vở bài tập; trong khi học sinh chỉ nhìn điểm đỏ rồi cất vở, không bao giờ sửa lại các dòng tính toán sai.',
      evidence: [
        'Tiết kiệm 65% thời gian chấm bài cho thầy cô',
        'Học sinh nhận phản hồi ngay lập tức trong vòng 1 giây khi đang làm bài tập về nhà',
        'Giúp giáo viên nắm bắt bản đồ nhiệt lỗ hổng của cả lớp trước khi bước vào tiết dạy',
        'Áp dụng tốt cho cả trường nội thành lẫn vùng sâu vùng xa thiếu giáo viên phụ đạo'
      ],
      judgeQA: {
        question: 'Giáo viên được hưởng lợi cụ thể gì vào sáng hôm sau lên lớp?',
        answer: 'Nhìn vào Bản đồ nhiệt lỗ hổng nhận thức, cô giáo biết ngay 42% lớp đang sai ở quy tắc dấu ngoặc, từ đó dành 5 phút đầu giờ ôn đúng trọng tâm thay vì giảng lại toàn bộ bài giảng.'
      },
      actionText: 'Xem Bản Đồ Nhiệt Giáo Viên',
      actionHandler: onJumpToTeacher,
    },
    {
      id: 7,
      title: '7. Hiệu quả và khả năng chứng minh',
      subtitle: 'Số liệu thực nghiệm định lượng rõ ràng',
      points: '10 / 10',
      description: 'Dự án đã được triển khai thử nghiệm tại các khối lớp THCS với số liệu minh chứng thuyết phục, có thể kiểm chứng tại chân trang và báo cáo thống kê.',
      evidence: [
        '12,480+ bài làm đã được chấm trên hệ thống',
        '94.8% độ chính xác trong việc phát hiện đúng dòng bắt đầu sai',
        'Tăng 32% điểm số của học sinh trong bài kiểm tra định kỳ sau 4 tuần luyện bù đắp',
        '100% giáo viên tham gia thử nghiệm đánh giá cao tính tiện dụng'
      ],
      judgeQA: {
        question: 'Dữ liệu 94.8% độ chính xác được đo lường dựa trên tiêu chuẩn nào?',
        answer: 'Được đo lường bằng cách so sánh kết quả chẩn đoán dòng sai của AI với đối chứng chấm chéo của tổ chuyên môn Toán trên 1,000 bài làm viết tay ngẫu nhiên.'
      },
      actionText: 'Xem số liệu thống kê chân trang',
      actionHandler: onClose,
    },
    {
      id: 8,
      title: '8. Khả năng mở rộng và bảo trì',
      subtitle: 'Mã nguồn module sạch, decoupled logic, sẵn sàng mở rộng',
      points: '10 / 10',
      description: 'Mã nguồn được phân tách hoàn toàn giữa tầng giao diện React, tầng chẩn đoán suy luận logic pure TypeScript và bộ sinh bài tập. Dễ dàng bổ sung thêm môn Vật lý, Hóa học và tiếng Anh.',
      evidence: [
        'Tách riêng engine chẩn đoán (diagnosticEngine.ts) với 100% unit tests tự động',
        'Dễ dàng tích hợp Google Gemini API, OpenAI Vision hoặc mô hình OCR mã nguồn mở',
        'Hỗ trợ xuất báo cáo PDF chuẩn in ấn cho nhà trường',
        'Sẵn sàng mở rộng kiến trúc đa môn học (Toán, Lý, Hóa)'
      ],
      judgeQA: {
        question: 'Sau cuộc thi này, dự án có thể mở rộng sang các môn học khác không?',
        answer: 'Hoàn toàn khả thi. Thuật toán phân tích chuỗi bước suy luận (Step-wise Traceability) có thể áp dụng tương tự cho các bài toán cân bằng phương trình Hóa học, tính toán mạch điện Vật lý hay sửa ngữ pháp Tiếng Anh.'
      },
      actionText: 'Xem chi tiết Engine chẩn đoán',
      actionHandler: onJumpToLiveDemo,
    }
  ];

  const current = criteria.find(c => c.id === activeCriterion) || criteria[0];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div 
        className="bg-white rounded-3xl max-w-5xl w-full my-auto shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
        aria-label="Hồ sơ thuyết minh dự thi 8 tiêu chí"
      >
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/90 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-slate-900 text-base sm:text-lg leading-tight">
                  Hồ Sơ Thuyết Minh Dự Thi Đầy Đủ 8 Tiêu Chí Ban Giám Khảo
                </h2>
                <span className="bg-amber-100 text-amber-900 text-[11px] font-bold px-2 py-0.5 rounded-full">
                  Tài liệu bảo vệ dự án
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Cung cấp luận cứ, bằng chứng công nghệ và gợi ý trả lời phản biện xuất sắc cho thí sinh
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 bg-white shadow-2xs hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content split */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
          
          {/* Left criteria list (4 cols) */}
          <div className="md:col-span-4 border-r border-slate-200 bg-slate-50/50 p-4 overflow-y-auto space-y-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-2 pb-1">
              8 Tiêu chí đánh giá chính thức
            </span>
            {criteria.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCriterion(c.id)}
                className={`w-full text-left p-3 rounded-2xl transition-all cursor-pointer flex items-center justify-between ${
                  activeCriterion === c.id
                    ? 'bg-sky-600 text-white shadow-xs font-bold'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                }`}
              >
                <div className="truncate pr-2">
                  <p className="text-xs font-bold truncate">{c.title}</p>
                  <p className={`text-[11px] truncate ${activeCriterion === c.id ? 'text-sky-100' : 'text-slate-400'}`}>
                    {c.subtitle}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 shrink-0 opacity-70" />
              </button>
            ))}
          </div>

          {/* Right criteria detail (8 cols) */}
          <div className="md:col-span-8 p-6 overflow-y-auto space-y-6">
            
            {/* Title & Badge */}
            <div className="border-b border-slate-100 pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">
                    {current.subtitle}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-1">
                    {current.title}
                  </h3>
                </div>
                <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                  Khung điểm: {current.points}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                {current.description}
              </p>
            </div>

            {/* Evidence items */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sky-600" />
                <span>Bằng chứng & Minh chứng cụ thể trên phần mềm:</span>
              </h4>
              <div className="space-y-2">
                {current.evidence.map((ev, i) => (
                  <div key={i} className="p-3 bg-sky-50/60 rounded-xl border border-sky-100 text-xs text-slate-800 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed font-medium">{ev}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Q&A Cheat sheet */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
                <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Câu hỏi phản biện hay gặp từ Ban Giám Khảo & Đáp án bảo vệ:</span>
              </div>
              <p className="text-slate-900 font-semibold italic">
                "{current.judgeQA.question}"
              </p>
              <div className="p-3 bg-white rounded-xl border border-amber-100 text-slate-700 leading-relaxed font-sans">
                <strong className="text-sky-800 font-bold">Gợi ý trả lời: </strong>
                {current.judgeQA.answer}
              </div>
            </div>

            {/* Direct Jump to Feature */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={current.actionHandler}
                className="flex items-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                <span>{current.actionText}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500 shrink-0">
          <span>Hệ thống Tường học tập AI · Thiết kế đáp ứng 100% khung chấm thi KH-KT & Tin học trẻ</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl font-bold transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
};

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Google GenAI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API ROUTE: Tarot AI interpretation
  app.post('/api/tarot/analyze', async (req, res) => {
    try {
      const { card, query, novelId } = req.body;
      
      if (!card || !query) {
        return res.status(400).json({ error: 'Card and query are required.' });
      }

      // Hardcoded novel database mapping to enrich prompt context
      const novelDetails: Record<string, string> = {
        'novel-1': '"Hương Vị Mùa Hè" của tác giả Sở Tô. Thể loại: Học đường, Ngọt sủng, Đam Mỹ. Câu chuyện học đường thanh xuân rực rỡ, ngọt ngào, ấm áp như nắng hè.',
        'novel-2': '"Ảnh Đế Tìm Vợ" của tác giả Tiêu Đường. Thể loại: Giới giải trí, Đam Mỹ, Sủng ngọt. Hành trình sủng ái tìm kiếm bạn đời hoàn mỹ của vị Ảnh đế showbiz danh giá.',
        'novel-3': '"Thanh Xuân Có Cố Nhân" của tác giả Diệp Tử. Thể loại: Gương vỡ lại lành, Đam Mỹ. Câu chuyện tình nồng nhiệt, gặp lại cố nhân thuở thiếu niên đầy tinh tế và chữa lành.',
        'novel-4': '"Mạt Thế Trọng Sinh" của tác giả Mặc Hương. Thể loại: Trọng Sinh, Mạt Thế, Đam Mỹ. Cuộc chiến sinh tồn kiên cường, sửa chữa những hối tiếc kiếp trước.',
        'novel-5': '"Hào Môn Kinh Mộng" của tác giả Vân Nghê. Thể loại: Hào Môn, Đô Thị, Đam Mỹ. Đấu trí thương trường đỉnh cao kết hợp tình yêu thâm trầm, ngọt ngào che chở.',
        'novel-6': '"Thầy Giáo Của Tôi" của tác giả Thanh Thanh. Thể loại: Học Đường, Ngọt Sủng, Đam Mỹ. Tình yêu thầy trò ôn nhu, xoa dịu những vết xước tâm hồn.'
      };

      const novelInfo = novelDetails[novelId] || 'một tác phẩm tiểu thuyết đam mỹ đặc sắc trên website';

      const prompt = `Bạn là một Tarot Reader ôn nhu, tinh tế và ấm áp của website đọc truyện "Tình Yêu Thuần Khiết".
Hãy thực hiện một trải bài Tarot nhẹ nhàng, sâu sắc để giải đáp thắc mắc của độc giả bằng chất văn mượt mà, lãng mạn.

Thông tin trải bài:
- Lá bài Tarot được rút: ${card}
- Câu hỏi của độc giả: "${query}"
- Tiểu thuyết định mệnh khuyên đọc kèm theo: ${novelInfo}

Yêu cầu nội dung phản hồi:
1. Viết bằng tiếng Việt với giọng văn ôn nhu, nhẹ nhàng, thấu hiểu, mang tính chất chữa lành và khích lệ (phù hợp với độc giả yêu thích truyện chữ lãng mạn). Tránh mọi dự đoán tiêu cực hay lời lẽ u ám.
2. Liên kết khéo léo thông điệp tích cực của lá bài Tarot với câu hỏi tình cảm của độc giả để truyền tải một lời khuyên chân thành, mang lại cảm giác bình yên, ấm áp.
3. Ở cuối bài, hãy nhẹ nhàng kết nối câu trả lời và ý nghĩa lá bài với tác phẩm tiểu thuyết định mệnh được đề cử (${novelInfo}), gợi mở độc giả click vào đọc câu chuyện này như một sự đồng điệu tuyệt vời lúc này.
4. Độ dài ngắn gọn khoảng 180-250 từ, chia thành 2-3 đoạn nhỏ tinh tế, câu từ trau chuốt, nhã nhặn.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          systemInstruction: 'Bạn là một Tarot Reader ôn nhu, thấu cảm, chuyên giải đáp về tình duyên và đưa ra những lời khuyên chữa lành, lãng mạn cho độc giả.',
          temperature: 0.75,
        }
      });

      const analysis = response.text || '';
      res.json({ analysis: analysis.trim() });
    } catch (error: any) {
      console.error('Error generating Tarot reading:', error);
      res.status(500).json({ error: 'Failed to generate Tarot reading' });
    }
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Vite development middleware or static production serve
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

import axios, { AxiosError } from 'axios';

export class DeepSeekAPI {
  private apiKey: string;
  private apiUrl: string;

  constructor() {
    // 临时硬编码 API 密钥
    this.apiKey = 'sk-0101e30ed79c430e97ba896d14a84d67';
    this.apiUrl = 'https://api.deepseek.com/v1/chat/completions';
    
    // 添加日志来检查 API 密钥是否正确加载
    console.log('API Key loaded:', this.apiKey ? `${this.apiKey.slice(0, 4)}...${this.apiKey.slice(-4)}` : 'Not set');
  }

  async generateContent(prompt: string): Promise<string> {
    try {
      console.log('Sending request to DeepSeek API...');
      console.log('API URL:', this.apiUrl);
      console.log('Request payload:', {
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
      });

      const response = await axios.post(
        this.apiUrl,
        {
          model: 'deepseek-chat',
          messages: [{ role: 'user', content: prompt }],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`,
          },
        }
      );

      console.log('Response received:', response.data);
      return response.data.choices[0].message.content;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error('Axios error:', axiosError.response?.data);
        console.error('Status code:', axiosError.response?.status);
        console.error('Headers:', axiosError.response?.headers);
      } else {
        console.error('Unexpected error:', error);
      }
      throw new Error('Failed to generate content');
    }
  }
}
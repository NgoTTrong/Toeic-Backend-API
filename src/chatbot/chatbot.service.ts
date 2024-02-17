import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateChatbotDto } from './dto/create-chatbot.dto';
import { UpdateChatbotDto } from './dto/update-chatbot.dto';
import {
  GenerateContentRequest,
  GenerateContentResponse,
} from '@google/generative-ai';

import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class ChatbotService {
  private apiKey = 'AIzaSyAueER6raTutLUxkVZCWUl_7tgxt1e6-_A';

  async generateText(
    prompt: string,
  ): Promise<GenerateContentResponse> {
    try {
      const genAI = new GoogleGenerativeAI(this.apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text() as GenerateContentResponse;
      return text;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new NotFoundException('Resource not found');
      } else {
        throw new HttpException(error.message, error.response?.status);
      }
    }
  }



  findAll() {
    return `This action returns all chatbot`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chatbot`;
  }

  update(id: number, updateChatbotDto: UpdateChatbotDto) {
    return `This action updates a #${id} chatbot`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatbot`;
  }
}

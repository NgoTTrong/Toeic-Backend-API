import { Injectable } from '@nestjs/common';
import { HfInference } from '@huggingface/inference';

import { config } from 'dotenv';
config();
const env = process.env;

@Injectable()
export class TransformerService {
  getHighestScoreLabel(results: any): string {
    // Sort the array based on the score in descending order
    results.sort((a, b) => b.score - a.score);

    // Get the label with the highest score
    const highestScoreLabel = results[0].label;

    return highestScoreLabel;
  }

  async classifyText(text: string): Promise<any> {
    const HF_ACCESS_TOKEN = process.env.HF_ACCESS_TOKEN;
    const model = process.env.model;
    const inference = new HfInference(HF_ACCESS_TOKEN);

    const result = await inference.textClassification({
      model: model,
      inputs: text,
    });
    return this.getHighestScoreLabel(result);
  }
}

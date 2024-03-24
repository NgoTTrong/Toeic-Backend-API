import { Injectable } from '@nestjs/common';
import { environments } from 'src/environments';
import { HfInference } from '@huggingface/inference';

@Injectable()
export class ToxicDetectionService {
  getHighestScoreLabel(results: any): string {
    // Sort the array based on the score in descending order
    results.sort((a, b) => b.score - a.score);

    // Get the label with the highest score
    const highestScoreLabel = results[0].label;

    return highestScoreLabel;
  }

  async classifyText(text: string): Promise<any> {
    const hfAccessToken = environments.hfAccessToken;
    const model = environments.model;
    const inference = new HfInference(hfAccessToken);

    const result = await inference.textClassification({
      model: model,
      inputs: text,
    });
    console.log(result);
    return this.getHighestScoreLabel(result);
  }
}

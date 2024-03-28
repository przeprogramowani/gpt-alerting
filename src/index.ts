import OpenAI from 'openai';
import 'dotenv/config';
import { Handler } from 'aws-lambda';
import { modelTools } from './tools';
import { buildPrompt } from './prompt';
import { handleToolCall } from './router';

interface EventInput {
  alert: string;
}

interface LambdaResponse {
  statusCode: number;
  body: string;
}

const OPENAI_MODEL_VERSION = 'gpt-4-0125-preview';

export const handler: Handler<EventInput, LambdaResponse> = async (event) => {
  const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'],
  });

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: buildPrompt(event.alert) }],
    tools: modelTools,
    model: OPENAI_MODEL_VERSION,
  });

  const toolCalls = chatCompletion.choices[0].message.tool_calls!;
  const fnName = toolCalls[0].function.name;
  const fnArgs = toolCalls[0].function.arguments;

  handleToolCall(fnName, fnArgs);

  return buildResponse(200, fnName);
};

function buildResponse(statusCode: number, body: string): LambdaResponse {
  return {
    statusCode,
    body,
  };
}

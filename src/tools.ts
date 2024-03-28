import { ChatCompletionTool } from 'openai/resources';

export const modelTools: ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'notifyFirstLineSupport',
      description: 'Notify first line support about low-severity and non-technical alerts',
      parameters: {
        type: 'object',
        properties: {
          alert: {
            type: 'string',
            description: 'Alert message',
          },
        },
        required: ['alert'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'notifySecondLineSupport',
      description: 'Notify second line support about medium-severity alerts',
      parameters: {
        type: 'object',
        properties: {
          alert: {
            type: 'string',
            description: 'Alert message',
          },
        },
        required: ['alert'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'notifyEngineers',
      description: 'Notify engineers about high-severity technical alerts',
      parameters: {
        type: 'object',
        properties: {
          alert: {
            type: 'string',
            description: 'Alert message',
          },
        },
        required: ['alert'],
      },
    },
  },
];

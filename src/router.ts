type ModelTool = (alert: string) => void;

function notifyFirstLineSupport(alert: string): void {
  console.log(`Notify first line support about low-severity and non-technical alerts: ${alert}`);
}

function notifySecondLineSupport(alert: string): void {
  console.log(`Notify second line support about medium-severity alerts: ${alert}`);
}

function notifyEngineers(alert: string): void {
  console.log(`Notify engineers about high-severity technical alerts: ${alert}`);
}

const tools: { [key: string]: ModelTool } = {
  notifyFirstLineSupport,
  notifySecondLineSupport,
  notifyEngineers,
};

export const handleToolCall = (toolName: string, alert: string): void => {
  const tool = tools[toolName];
  if (!tool) {
    throw new Error(`Unknown tool: ${toolName}`);
  }
  tool(alert);
};

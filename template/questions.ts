export interface Option {
  id: string;
  text: string;
  philosopherId: string;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
}

export const questions: Question[] = [
  {
    id: "1",
    text: "你认为知识的本质是什么?",
    options: [
      { id: "1a", text: "通过理性和逻辑推理获得", philosopherId: "plato" },
      { id: "1b", text: "来自经验和观察", philosopherId: "aristotle" },
      { id: "1c", text: "怀疑一切,不断质疑", philosopherId: "descartes" },
      { id: "1d", text: "实践中的应用和验证", philosopherId: "marx" },
    ],
  },
  {
    id: "2",
    text: "你如何看待道德和伦理?",
    options: [
      { id: "2a", text: "追求最大多数人的最大幸福", philosopherId: "mill" },
      { id: "2b", text: "遵循普遍适用的道德法则", philosopherId: "kant" },
      { id: "2c", text: "个人自由和选择至关重要", philosopherId: "sartre" },
      { id: "2d", text: "美德和品格的培养更为重要", philosopherId: "aristotle" },
    ],
  },
  // 可以继续添加更多问题...
];
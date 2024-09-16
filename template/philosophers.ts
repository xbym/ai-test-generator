export interface Philosopher {
  id: string;
  name: string;
  description: string;
}

export const philosophers: Philosopher[] = [
  {
    id: "plato",
    name: "柏拉图",
    description: "你像柏拉图一样,重视理性思考和抽象概念。你相信存在永恒不变的真理和理念。"
  },
  {
    id: "aristotle",
    name: "亚里士多德",
    description: "你像亚里士多德一样,注重经验观察和实证研究。你相信通过研究现实世界可以获得知识。"
  },
  {
    id: "descartes",
    name: "笛卡尔",
    description: "你像笛卡尔一样,喜欢怀疑和质疑。你相信通过理性思考和方法论可以获得确定性知识。"
  },
  {
    id: "kant",
    name: "康德",
    description: "你像康德一样,重视道德法则和理性。你相信存在普遍适用的道德准则。"
  },
  {
    id: "mill",
    name: "约翰·斯图尔特·密尔",
    description: "你像密尔一样,注重功利主义和个人自由。你相信应该追求最大多数人的最大幸福。"
  },
  // 可以继续添加更多哲学家...
];
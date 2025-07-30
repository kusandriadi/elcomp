// Level configuration for math operations

export const LEVEL_CONFIG = {
  addition: {
    'tk': { maxNum: 10 },
    '1': { maxNum: 20 },
    '2': { maxNum: 50 },
    '3': { maxNum: 100 },
    '4': { maxNum: 200 }
  },
  subtraction: {
    'tk': { maxNum: 10 },
    '1': { maxNum: 20 },
    '2': { maxNum: 50 },
    '3': { maxNum: 100 },
    '4': { maxNum: 200 }
  },
  multiplication: {
    'tk': { maxMult: 3 },
    '1': { maxMult: 5 },
    '2': { maxMult: 10 },
    '3': { maxMult: 12 },
    '4': { maxMult: 15 }
  },
  division: {
    'tk': { maxDiv: 10 },
    '1': { maxDiv: 20 },
    '2': { maxDiv: 50 },
    '3': { maxDiv: 100 },
    '4': { maxDiv: 200 }
  },
  mixed: {
    'tk': { maxMult: 3, allowDivision: false },
    '1': { maxMult: 5, allowDivision: false },
    '2': { maxMult: 10, allowDivision: false },
    '3': { maxMult: 12, allowDivision: false },
    '4': { maxMult: 15, allowDivision: true }
  }
};

export function getLevelConfig(operation, level) {
  const config = LEVEL_CONFIG[operation];
  if (!config) return null;
  return config[level] || config['tk'];
}
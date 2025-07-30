// Math operations data and configuration

export const OPERATIONS = [
  { value: 'penjumlahan', label: 'Penjumlahan (+)', symbol: '+' },
  { value: 'pengurangan', label: 'Pengurangan (-)', symbol: '-' },
  { value: 'perkalian', label: 'Perkalian (x)', symbol: '×' },
  { value: 'pembagian', label: 'Pembagian (÷)', symbol: '÷' },
  { value: 'campuran', label: 'Campuran (+,-,x,÷)', symbol: '±' },
  { value: 'persen', label: 'Persen (%)', symbol: '%' },
  { value: 'pecahan', label: 'Pecahan', symbol: '/' },
  { value: 'desimal', label: 'Desimal', symbol: '.' }
];

export const LEVEL_OPERATIONS = {
  'tk': ['penjumlahan', 'pengurangan'],
  '1': ['penjumlahan', 'pengurangan', 'perkalian'],
  '2': ['penjumlahan', 'pengurangan', 'perkalian', 'pembagian'],
  '3': ['penjumlahan', 'pengurangan', 'perkalian', 'pembagian', 'campuran'],
  '4': ['penjumlahan', 'pengurangan', 'perkalian', 'pembagian', 'campuran', 'persen', 'pecahan', 'desimal']
};

export function getOperationsForLevel(level) {
  const availableOps = LEVEL_OPERATIONS[level] || LEVEL_OPERATIONS['tk'];
  return OPERATIONS.filter(op => availableOps.includes(op.value));
}

export function getAllOperations() {
  return [...OPERATIONS];
}
export const transformEnumIntoStringList = (original: any): string[] => {
   return Object.values(original).filter(v => typeof v == 'string');
}

export const isEven = (entry: number): boolean => {
   return entry % 2 == 0;
}
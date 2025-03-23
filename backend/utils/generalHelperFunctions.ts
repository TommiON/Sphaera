export const transformEnumIntoStringList = (original: any): string[] => {
   return Object.values(original).filter(v => typeof v == 'string');
}
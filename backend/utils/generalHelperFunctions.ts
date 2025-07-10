export const transformEnumIntoStringList = (original: any): string[] => {
   return Object.values(original).filter(v => typeof v == 'string');
}

export const isEven = (entry: number): boolean => {
   return entry % 2 == 0;
}

export const getEverySecondElementFromList = (list: any[], getEvens: boolean): any[] => {
   if (!list || list.length == 0 || (!getEvens && list.length < 2)) {
      return [];
   }

   let result = [];

   for (let index = getEvens ? 0 : 1; index < list.length; index += 2) {
      result.push(list[index]);
   }

   return result;
}
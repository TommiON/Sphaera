import { getEverySecondElementFromList } from "../generalHelperFunctions";

test('general helpers / get every second element from list', () => {
    const testList = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

    const evenSubset = getEverySecondElementFromList(testList, true);
    expect(evenSubset.length).toBe(4);
    expect(evenSubset).toStrictEqual(['A', 'C', 'E', 'G']);

    const oddSubset = getEverySecondElementFromList(testList, false);
    expect(oddSubset.length).toBe(3);
    expect(oddSubset).toStrictEqual(['B', 'D', 'F']);
})
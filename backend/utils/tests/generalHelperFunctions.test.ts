import { getEverySecondElementFromList } from "../generalHelperFunctions";

test('general helpers / get every second element from list', () => {
    // GIVEN: list with some elements
    const testList = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

    // WHEN: getting every second element with evens=true
    let evenSubset = getEverySecondElementFromList(testList, true);

    // THEN: even-indexed elements returned
    expect(evenSubset.length).toBe(4);
    expect(evenSubset).toStrictEqual(['A', 'C', 'E', 'G']);

    // AND WHEN: getting every second element with evens=false
    let oddSubset = getEverySecondElementFromList(testList, false);

    // THEN: odd-indexed elements returned
    expect(oddSubset.length).toBe(3);
    expect(oddSubset).toStrictEqual(['B', 'D', 'F']);

    // GIVEN: list with only one element
    const shortTestList = ['zzzz'];

    // WHEN: getting every second element with evens=true
    evenSubset = getEverySecondElementFromList(shortTestList, true);

    // THEN: the only element is returned
    expect(evenSubset.length).toBe(1);
    expect(evenSubset).toStrictEqual(['zzzz']);

    // AND WHEN: getting every second element with evens=false
    oddSubset = getEverySecondElementFromList(shortTestList, false);

    // THEN: nothing returned
    expect(oddSubset.length).toBe(0);

    // GIVEN: empty list
    const veryShortTestList: any[] = [];

    // WHEN: getting every second element with evens=true
    evenSubset = getEverySecondElementFromList(veryShortTestList, true);

    // THEN: nothing returned
    expect(evenSubset.length).toBe(0);

    // AND WHEN: getting every second element with evens=false
    oddSubset = getEverySecondElementFromList(veryShortTestList, false);

    // THEN: nothing returned
    expect(oddSubset.length).toBe(0);
})
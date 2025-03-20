export function getRandomElement(elements: any[], distributionWeights?: number[]) : Error | any {
    if (!distributionWeights) {
        return elements[drawIndexFromFlatDistribution(elements.length)];
    } else {
        // jos on annettu vain jakauman alku, täytetään loppu tasavälein
        if (distributionWeights.length < elements.length) {
            const highestProvided = distributionWeights[distributionWeights.length - 1];
            const numberOfWeightsMissing = elements.length - distributionWeights.length;
            const rangeToBeFilled = 100 - highestProvided;
            const interval = rangeToBeFilled / numberOfWeightsMissing;
            let stepAddition = interval;

            for (let i = 0; i < numberOfWeightsMissing; i++) {
                distributionWeights.push(highestProvided + stepAddition);
                stepAddition += interval;
            }

        }

        return elements[drawIndexFromWeightedDistribution(distributionWeights)];
    }

    function drawIndexFromFlatDistribution(numberOfElements: number) : number {
        const randomNumber = Math.random() * 100;
        const stepTresholdPercentage = 100.0 / numberOfElements;
        let currentCeiling = stepTresholdPercentage;
        let pickedIndex = 0;
    
        while (randomNumber > currentCeiling) {
            currentCeiling += stepTresholdPercentage;
            pickedIndex++;
        }
    
        return pickedIndex;
    }

    function drawIndexFromWeightedDistribution(weights: number[]) : number {
        const randomNumber = Math.random() * 100;
        let pickedIndex = 0;
    
        for (let i = 0; i < weights.length; i++) {
            if (randomNumber <= weights[i]) {
                pickedIndex = i;
                break;
            } else {
                pickedIndex++;
            }
        }
    
        return pickedIndex;   
    }
}


export function getRandomNumberInRange(floor: number, ceiling: number): number {
    const randomNumber = Math.random() * 100;
    const stepTresholdPercentage = 100.0 / (ceiling - floor);
    let currentCeiling = stepTresholdPercentage;
    let increment = 0;

    while (randomNumber > currentCeiling) {
        currentCeiling += stepTresholdPercentage;
        increment++;
    }

    return floor + increment;
}
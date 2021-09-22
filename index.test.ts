import Size from "./models/Size";
import {fitObject} from "./index";
import FitObject from "./models/FitObject";

function compareNumbers(a: number, b: number): boolean {
    return Math.abs(a - b) < 0.000001;
}

function compareSizes(a: Size, b: Size): boolean {
    return compareNumbers(a.width, b.width) && compareNumbers(a.height, b.height);
}

function compareFitObjects(a: FitObject, b: FitObject): boolean {
    return compareSizes(a.size, b.size) && compareNumbers(a.scale, b.scale);
}

expect.extend({
    toBeFitObject(received: FitObject, actual: FitObject) {
        const areEqual = compareFitObjects(received, actual);

        const objectsString = `expected: ${JSON.stringify(received)}\nactual: ${JSON.stringify(actual)}`;
        return {
            message: () => `${areEqual ? "Passed" : "Failed"}\n${objectsString}`,
            pass: areEqual
        };
    }
});

test("1", () => {
    const objectSize: Size = {
        width: 300,
        height: 100
    };
    const containerSize: Size = {
        width: 200,
        height: 200
    };
    const expected: FitObject = {
        size: {
            width: 300 * 2/3,
            height: 100 * 2/3
        },
        scale: 2/3
    };
    const actual = fitObject(objectSize, containerSize);
    expect(actual).toBeFitObject(expected);
});

test("2", () => {
    const objectSize: Size = {
        width: 150,
        height: 300
    };
    const containerSize: Size = {
        width: 150,
        height: 150
    };
    const expected: FitObject = {
        size: {
            width: 150 * 1/2,
            height: 300 * 1/2
        },
        scale: 1/2
    };
    const actual = fitObject(objectSize, containerSize);
    expect(actual).toBeFitObject(expected);
});

test("3 no scale", () => {
    const objectSize: Size = {
        width: 200,
        height: 200
    };
    const containerSize: Size = {
        width: 200,
        height: 350
    };
    const expected: FitObject = {
        size: {
            width: 200,
            height: 200
        },
        scale: 1
    };
    const actual = fitObject(objectSize, containerSize);
    expect(actual).toBeFitObject(expected);
});

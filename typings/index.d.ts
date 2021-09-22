import FitObject from "../models/FitObject";

export {};

declare global {
    namespace jest {
        interface Matchers<R> {
            toBeFitObject(actual: FitObject): R;
        }
    }
}

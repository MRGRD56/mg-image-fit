import Size from "./models/Size";
import FitObject from "./models/FitObject";

export function fitObject(objectSize: Size, containerSize: Size): FitObject {
    if (containerSize.width >= objectSize.width
        && containerSize.height >= objectSize.height) {
        return {
            size: objectSize,
            scale: 1
        };
    }

    const objectAspectRatio = objectSize.width / objectSize.height;
    const containerAspectRatio = containerSize.width / containerSize.height;

    let fitSize: Size = objectAspectRatio > containerAspectRatio
        ? {
            width: containerSize.width,
            height: containerSize.width * (objectSize.height / objectSize.width)
        } : {
            width: containerSize.height * (objectSize.width / objectSize.height),
            height: containerSize.height
        };

    return {
        size: fitSize,
        scale: fitSize.width / objectSize.width
    }
}

export type ColorRGB = { r: number, g: number; b: number };

export const getColorRGBInterpolate = function (colorMin: ColorRGB, colorMax: ColorRGB, value: number, max: number): string {
    const r = (colorMin.r * value + colorMax.r * (max - value)) / max;
    const g = (colorMin.g * value + colorMax.g * (max - value)) / max;
    const b = (colorMin.b * value + colorMax.b * (max - value)) / max;

    return `rgb(${ r }, ${ g }, ${ b })`;
};
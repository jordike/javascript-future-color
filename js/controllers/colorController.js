import ColorModel from '../models/ColorModel.js';

export default class ColorController {
    static combineColors(colors) {
        return ColorModel.combineColors(colors);
    }
}

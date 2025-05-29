import { Hct, hexFromArgb } from "@material/material-color-utilities";
import { HexUtils } from '../utils/hex-utils'


// Represents a color using hue, chroma, and tone components.
export class HctColorModel {

    hue = 0;     // The color's hue component.
    chroma = 0;  // The color's chroma component.
    tone = 0;    // The color's tone component.
    hex;         // A hexadecimal color code.

    constructor() {
        // Init the HEX using HCT values.
        this.hex = calculateHex(this.hue, this.chroma, this.hex);
    }
    
    // Define a color using hexadecimal color code.
    fromHex(hex) {
        HexUtils.validateNumHex(hex);

        const hct = Hct.fromInt(hex);
        this.hue = hct.hue;
        this.chroma = hct.chroma;
        this.tone = hct.tone;
        this.hex = hex;
    };

    // Define a color using values of hue, chroma, and tone.
    fromHct(h, c, t) {
        if (typeof h !== "number" || isNaN(h) || h < 0 || h > 360) {
            throw new Error("Invalid hue value. It should be a number between 0 and 360.");
        } else if (typeof c !== "number" || isNaN(c) || c < 0 || c > 120) {
            throw new Error("Invalid chroma value. It should be a number between 0 and 120.");
        } else if (typeof t !== "number" || isNaN(t) || t < 0 || t > 100) {
            throw new Error("Invalid tone value. It should be a number between 0 and 100.");
        };

        this.hue = h;
        this.chroma = c;
        this.tone = t;
        this.hex = calculateHex(h, c, t);
    };
};

// Convert a RGB color to a hexadecimal color code.
function calculateHex(h, c, t) {
    const argb = Hct.from(h, c, t).toInt();
    const hex = hexFromArgb(argb);
    return HexUtils.stringToHex(hex.replace('#', ''));
};
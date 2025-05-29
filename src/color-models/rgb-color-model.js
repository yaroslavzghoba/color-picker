import { HexUtils } from '../utils/hex-utils'


// Represents a color using red, green, and blue components.
export class RgbColorModel {

    red = 0;    // The color's red component.
    green = 0;  // The color's green component.
    blue = 0;   // The color's blue component.
    hex;        // A hexadecimal color code.

    constructor() {
        // Init the HEX using RGB values.
        this.hex = calculateHex(this.red, this.green, this.blue);
    }
    
    // Define a color using hexadecimal color code.
    fromHex(hex) {
        HexUtils.validateNumHex(hex);
            
        this.red = (hex >> 16) & 255;
        this.green = (hex >> 8) & 255;
        this.blue = hex & 255;
        this.hex = hex;
    };

    // Define a color using values of red, green, and blue.
    fromRgb(r, g, b) {
        validateColorValue(r);
        validateColorValue(g);
        validateColorValue(b);

        this.red = r;
        this.green = g;
        this.blue = b;
        this.hex = calculateHex(r, g, b);
    };
};

// Check if the value is a number between 0 and 255.
function validateColorValue(value) {
    if (typeof value !== 'number' || (value < 0 || value > 255) || isNaN(value)) {
        throw new Error('Invalid color value. It should be a number between 0 and 255.');
    };
};

// Convert a RGB color to a hexadecimal color code.
function calculateHex(r, g, b) {
    return (r << 16) | (g << 8) | b;
};
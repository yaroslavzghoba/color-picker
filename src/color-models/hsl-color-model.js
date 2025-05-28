import convert from 'color-convert'
import { HexUtils } from '../utils/hex-utils'


// Represents a color using hue, saturation, and lightness components.
export class HslColorModel {

  hue = 0;         // The color's hue component.
  saturation = 0;  // The color's saturation component.
  lightness = 0;   // The color's lightness component.
  hex;             // A hexadecimal color code.

  constructor() {
    this.hex = calculateHex(this.hue, this.saturation, this.lightness);
  }

  // Define a color using hexadecimal color code.
  fromHex(hex) {
    HexUtils.validateNumHex(hex)

    this.hex = hex;
    const hsl = calculateHsl(hex);
    this.hue = hsl.hue;
    this.saturation = hsl.saturation;
    this.lightness = hsl.lightness;
  }

  // Define a color using values of hue, saturation, and lightness.
  fromHsl(h, s, l) {
    if (typeof h !== "number" || isNaN(h) || h < 0 || h > 360) {
      throw new Error("Invalid hue value. It should be a number between 0 and 360.");
    } else if (typeof s !== "number" || isNaN(s) || s < 0 || s > 100) {
      throw new Error("Invalid saturation value. It should be a number between 0 and 100.");
    } else if (typeof l !== "number" || isNaN(l) || l < 0 || l > 100) {
      throw new Error("Invalid lightness value. It should be a number between 0 and 100.");
    }

    this.hue = h;
    this.saturation = s;
    this.lightness = l;
    this.hex = calculateHex(h, s, l);
  }
}

// Convert a HSL to a HEX.
function calculateHex(h, s, l) {
  const strHex = convert.hsl.hex(h, s, l);
  return HexUtils.stringToHex(strHex);
}

// Convert a HEX to a HSL.
function calculateHsl(hex) {
  const strHex = HexUtils.hexToString(hex);
  const hsl = convert.hex.hsl(strHex);
  return {  
    hue: hsl[0],
    saturation: hsl[1],
    lightness: hsl[2]
  };
};
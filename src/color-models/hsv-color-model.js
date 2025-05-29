import convert from 'color-convert'
import { HexUtils } from '../utils/hex-utils'


// Represents a color using hue, saturation, and value (brightness) components.
export class HsvColorModel {

  hue = 0;         // The color's hue component.
  saturation = 0;  // The color's saturation component.
  value = 0;       // The color's value (brightness) component.
  hex;             // A hexadecimal color code.

  constructor() {
    this.hex = calculateHex(this.hue, this.saturation, this.value);
  }

  // Define a color using hexadecimal color code.
  fromHex(hex) {
    HexUtils.validateNumHex(hex)

    this.hex = hex;
    const hsl = calculateHsv(hex);
    this.hue = hsl.hue;
    this.saturation = hsl.saturation;
    this.value = hsl.value;
  }

  // Define a color using values of hue, saturation, and value (brightness).
  fromHsv(h, s, v) {
    if (typeof h !== "number" || isNaN(h) || h < 0 || h > 360) {
      throw new Error("Invalid hue value. It should be a number between 0 and 360.");
    } else if (typeof s !== "number" || isNaN(s) || s < 0 || s > 100) {
      throw new Error("Invalid saturation value. It should be a number between 0 and 100.");
    } else if (typeof v !== "number" || isNaN(v) || v < 0 || v > 100) {
      throw new Error("Invalid value (brightness) value. It should be a number between 0 and 100.");
    }

    this.hue = h;
    this.saturation = s;
    this.value = v;
    this.hex = calculateHex(h, s, v);
  }
}

// Convert a HSV/HSB to a HEX.
function calculateHex(h, s, v) {
  const strHex = convert.hsv.hex(h, s, v);
  return HexUtils.stringToHex(strHex);
}

// Convert a HEX to a HSV/HSB.
function calculateHsv(hex) {
  const strHex = HexUtils.hexToString(hex);
  const hsv = convert.hex.hsv(strHex);
  return {  
    hue: hsv[0],
    saturation: hsv[1],
    value: hsv[2]
  };
};
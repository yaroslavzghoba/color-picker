import { HctColorModel } from './color-models/hct-color-model';
import { HslColorModel } from './color-models/hsl-color-model'
import { RgbColorModel } from './color-models/rgb-color-model';
import { HexUtils } from './utils/hex-utils';


const SELECTED_COLOR_VAR_NAME = '--primary-color';
const root = document.documentElement;
// Input fields with color values
const hexInput = document.getElementById('hex-input');
const hslHueInput = document.getElementById('hsl-h-input');
const hslSaturationInput = document.getElementById('hsl-s-input');
const hslLightnessInput = document.getElementById('hsl-l-input');
const rgbRedInput = document.getElementById('rgb-r-input');
const rgbGreenInput = document.getElementById('rgb-g-input');
const rgbBlueInput = document.getElementById('rgb-b-input');
const hctHueInput = document.getElementById('hct-h-input');
const hctChromaInput = document.getElementById('hct-c-input');
const hctToneInput = document.getElementById('hct-t-input');

// Change the selected color in the CSS variable.
function changeSelectedCode(hexValue) {
    root.style.setProperty(SELECTED_COLOR_VAR_NAME, '#' + hexValue);
}

// Update the HEX code input field.
function updateHex(hex) {
    hexInput.value = hex;
}

// Update HSL input fields using a HEX code.
function useHexToUpdateHsl(hex) {
    const hslColorModel = new HslColorModel();
    hslColorModel.fromHex(HexUtils.stringToHex(hex));

    hslHueInput.value = hslColorModel.hue;
    hslSaturationInput.value = hslColorModel.saturation;
    hslLightnessInput.value = hslColorModel.lightness;
}

// Update RGB input fields using a HEX code.
function useHexToUpdateRgb(hex) {
    const rgbColorModel = new RgbColorModel();
    rgbColorModel.fromHex(HexUtils.stringToHex(hex));

    rgbRedInput.value = rgbColorModel.red;
    rgbGreenInput.value = rgbColorModel.green;
    rgbBlueInput.value = rgbColorModel.blue;
}

// Update HCT input fields using a HEX code.
function useHexToUpdateHct(hex) {
    const hctColorModel = new HctColorModel();
    hctColorModel.fromHex(HexUtils.stringToHex(hex));

    hctHueInput.value = Math.round(hctColorModel.hue);
    hctChromaInput.value = Math.round(hctColorModel.chroma);
    hctToneInput.value = Math.round(hctColorModel.tone);
}

// Update other color inputs and display a new color using HSL values.
function onHslUpdated() {
    const h = parseInt(hslHueInput.value);
    const s = parseInt(hslSaturationInput.value);
    const l = parseInt(hslLightnessInput.value);
    const hslColorModel = new HslColorModel();
    hslColorModel.fromHsl(h, s, l);

    const hex = HexUtils.hexToString(hslColorModel.hex);
    updateHex(hex);
    useHexToUpdateRgb(hex);
    useHexToUpdateHct(hex);
    changeSelectedCode(hex);
}

// Update other color inputs and display a new color using RGB values.
function onRgbUpdated() {
    const r = parseInt(rgbRedInput.value);
    const g = parseInt(rgbGreenInput.value);
    const b = parseInt(rgbBlueInput.value);
    const rgbColorModel = new RgbColorModel();
    rgbColorModel.fromRgb(r, g, b);

    const hex = HexUtils.hexToString(rgbColorModel.hex);
    updateHex(hex);
    useHexToUpdateHsl(hex);
    useHexToUpdateHct(hex);
    changeSelectedCode(hex);
}

// Update other color inputs and display a new color using HCT values.
function onHctUpdated() {
    const h = parseInt(hctHueInput.value);
    const c = parseInt(hctChromaInput.value);
    const t = parseInt(hctToneInput.value);
    const hctColorModel = new HctColorModel();
    hctColorModel.fromHct(h, c, t);

    const hex = HexUtils.hexToString(hctColorModel.hex)
    updateHex(hex);
    useHexToUpdateHsl(hex);
    useHexToUpdateRgb(hex);
    changeSelectedCode(hex);
}

// Update other color values using HSL values
function onHexUpdated() {
    const hex = hexInput.value;
    useHexToUpdateHsl(hex);
    useHexToUpdateRgb(hex);
    useHexToUpdateHct(hex);
    changeSelectedCode(hex);
};


// Set a listener to listen for HEX value input
hexInput.addEventListener('input', function() {
    onHexUpdated();
});

// Set listeners to listen for HSL values input
hslHueInput.addEventListener('input', function() {
    onHslUpdated()
});
hslSaturationInput.addEventListener('input', function() {
    onHslUpdated()
});
hslLightnessInput.addEventListener('input', function() {
    onHslUpdated()
});

// Set listeners to listen for RGB values input
rgbRedInput.addEventListener('input', function() {
    onRgbUpdated()
});
rgbGreenInput.addEventListener('input', function() {
    onRgbUpdated()
});
rgbBlueInput.addEventListener('input', function() {
    onRgbUpdated()
});

// Set listeners to listen for HCT values input
hctHueInput.addEventListener('input', function() {
    onHctUpdated()
});
hctChromaInput.addEventListener('input', function() {
    onHctUpdated()
});
hctToneInput.addEventListener('input', function() {
    onHctUpdated()
});
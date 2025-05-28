export class HexUtils {

    // Throw an error if the hex color code is not valid.
    static validateNumHex(hex) {
        if (!this.isNumHexValid(hex)) {
            throw new Error("Invalid hex color code. It should be a number between 0x000000 and 0xffffff.");
        };
    };

    // Throw an error if the hex color code is not valid.
    static validateStrHex(hex) {
        if (!this.isStrHexValid(hex)) {
            throw new Error("Invalid hex color code. It should be a string of length 6.");
        };
    };

    // Validate a hexidecimal color code and return a boolean value.
    static isNumHexValid(hex) {
        return !(typeof hex !== "number" || hex < 0x000000 || hex > 0xffffff || isNaN(hex));
    };

    // Validate a hexidecimal color code and return a boolean value.
    static isStrHexValid(hex) {
        return !(typeof hex !== "string" || hex.length !== 6);
    };

    // Convert a numeric hexidecimal color code to a string representation.
    static hexToString(hex) {
        this.validateNumHex(hex);
        let strHex = hex.toString(16);
        
        // Add zeros to the front of the string until it is 6 characters long.
        while (strHex.length < 6) {
            strHex = '0' + strHex;
        }

        this.validateStrHex(strHex);
        return strHex;
    };

    // Convert a string representation of a hexidecimal color code to a numeric value.
    static stringToHex(hex) {
        this.validateStrHex(hex);
        const numHex = parseInt(hex, 16);
        this.validateNumHex(numHex);
        return numHex;
    };
};
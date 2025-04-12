export default class ColorModel {

    static combineColors(colors) {
      let totalR = 0, totalG = 0, totalB = 0;
  
      for (let hex of colors) {
        //convert to hex for easier calculation
        const { r, g, b } = this.hexToRgb(hex); 
        totalR += r;
        totalG += g;
        totalB += b;
      }
  
      const length = colors.length;
      const avgR = Math.round(totalR / length);
      const avgG = Math.round(totalG / length);
      const avgB = Math.round(totalB / length);

      //revert to hex as thats the default value for the color
      return this.rgbToHex(avgR, avgG, avgB); 
    }
    
    static hexToRgb(hex) {
        hex = hex.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return { r, g, b };
    }
          
    static rgbToHex(r, g, b) {
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
    }
  }


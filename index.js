import fetch from 'node-fetch';

const COLORS_URL = 'https://nt-cdn.s3.amazonaws.com/colors.json';

/**
 * @param str the string to search inside of
 * @param substr the substring to check the existence of
 * @return Boolean
 */
const includesStr = (str, substr) => str.toUpperCase().includes(substr.toUpperCase());

/**
 * @param color color to check if matches
 * @param name filter for color name
 * @param hex filter for color hex code
 * @param compName filter for complementary color name
 * @param compHex filter for complementary color hex code
 * @returns Boolean
 */
const colorMatches = ({
  color, name, hex, compName, compHex,
}) => {
  let matches = true;
  matches &&= !name || includesStr(color.name, name);
  matches &&= !hex || color.hex === hex;
  matches &&= !compName || color.comp.some((compCol) => includesStr(compCol.name, compName));
  matches &&= !compHex || color.comp.some((compCol) => compCol.hex === compHex);

  return matches;
};

/**
 * @param name filter for color name
 * @param hex filter for color hex code
 * @param compName filter for complementary color name
 * @param compHex filter for complementary color hex code
 * @returns Promise
 */
const fetchColors = async ({
  name, hex, compName, compHex,
}) => {
  const response = await fetch(COLORS_URL);
  const colors = await response.json();

  return colors.filter((color) => colorMatches({
    color,
    name,
    hex,
    compName,
    compHex,
  }));
};

// Leave this here
export default fetchColors;

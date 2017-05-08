import { cloneDeep, each } from 'lodash';
import { HexUtils } from 'react-hexgrid';

export function createOceans(keyedHexes) {
  const updatedHexes = cloneDeep(keyedHexes);
  const blackList = {};

  each(updatedHexes, (hex, hexId) => {
    if (blackList[hex.terrainKey]) {
      updatedHexes[hexId].terrain = 'water';
    }
    // get hex coords of each neighboring hex;
    const neighbors = HexUtils.neighbours(hex);

    return each(neighbors, (neighbor) => {
      if (!updatedHexes[HexUtils.getID(neighbor)]) {
        // we are at a map edge!
        updatedHexes[hexId].terrain = 'water';
        blackList[hex.terrainKey] = true;
      }
    });
  });

  each(updatedHexes, (hex, hexId) => {
    if (hex.terrainKey !== 'water') {
      if (blackList[hex.terrainKey]) {
        updatedHexes[hexId].terrain = 'water';
      }
    }
  });

  return updatedHexes;
}

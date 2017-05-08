import { cloneDeep, each } from 'lodash';
import { HexUtils, getId } from 'react-hexgrid';

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
      if (!updatedHexes[getId(neighbor)]) {
        // we are at a map edge!
        updatedHexes[hexId].terrain = 'water';
        blackList[hex.terrainKey] = true;
      }
    });
  });

  // second pass
  // iterate over blacklist removing any hexes missed in the first round
  each(blackList, (terrainKey) => {
    each(updatedHexes, (hex, hexId) => {
      if (terrainKey === hex.terrainKey) {
        updatedHexes[hexId].terrain = 'water';
      }
    });
  });

  return updatedHexes;
}

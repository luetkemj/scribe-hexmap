import { cloneDeep, each, sample, random } from 'lodash';
import { HexUtils } from 'react-hexgrid';
import { idToHex, idMap, getRandomHexIdsShuffle } from './utils';

export function createMountains(keyedHexes, IDMap, length, d1, d2, spread) {
  const updatedHexes = cloneDeep(keyedHexes);
  // get start hex
  let hexId = sample(IDMap);

  for (let i = 0; i < length; i += 1) {
    // ignore hex if it is water
    if (updatedHexes[hexId] && updatedHexes[hexId].terrain !== 'water') {
      const hex = idToHex(hexId);
      const neighbors = getRandomHexIdsShuffle(HexUtils.neighbours(hex), spread);
      const hexesToMountain = idMap(neighbors);
      hexesToMountain.push(hexId);

      each(hexesToMountain, (hexToMountainId) => {
        if (updatedHexes[hexToMountainId].terrain !== 'water') {
          updatedHexes[hexToMountainId].terrain = 'mountains';
        }
      });
    }

    // reset hexId to the next hex
    const hex = idToHex(hexId);
    hexId = HexUtils.getID(HexUtils.neighbour(hex, random(d1, d2)));
  }

  return updatedHexes;
}

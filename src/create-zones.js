import { cloneDeep, each, orderBy, sample } from 'lodash';
import { HexUtils } from 'react-hexgrid';
import { idToHex } from './utils';

export function seedMap(keyedHexes, idMap, seedHexes, seedKind, seedVarieties) {
  const updatedHexes = cloneDeep(keyedHexes);
  const seedKey = `${seedKind}Key`;

  each(seedHexes, (seedHex, index) => {
    updatedHexes[seedHex] = {
      ...updatedHexes[seedHex],
      [seedKind]: sample(seedVarieties),
      [seedKey]: index,
    };
  });

  return updatedHexes;
}

export function growSeeds(keyedHexes, idMap, seedHexes, seedKind) {
  const updatedHexes = cloneDeep(keyedHexes);
  const seedKey = `${seedKind}Key`;

  each(updatedHexes, (hex, hexId) => {
    const distances = seedHexes.map(s => ({
      distance: HexUtils.distance(idToHex(s), hex),
      [seedKind]: updatedHexes[s][seedKind],
      [seedKey]: updatedHexes[s][seedKey],
    }));

    // order the distances by distance and grab the closest one as our seed
    const sprout = orderBy(distances, ['distance'])[0];

    updatedHexes[hexId] = {
      ...updatedHexes[hexId],
      [seedKind]: sprout[seedKind],
      [seedKey]: sprout[seedKey],
    };
  });

  return updatedHexes;
}

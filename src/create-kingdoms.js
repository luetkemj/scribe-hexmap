import { cloneDeep, each, orderBy } from 'lodash';
import { HexUtils } from 'react-hexgrid';
import { getRandomHexIdsSample, idToHex } from './utils';

function seedKingdoms(keyedHexes, idMap, seedKingdomHexes, kingdoms) {
  const updatedHexes = cloneDeep(keyedHexes);

  each(seedKingdomHexes, (hexId, index) => {
    if (updatedHexes[hexId].terrain !== 'water') {
      updatedHexes[hexId].kingdom = kingdoms[index];
      updatedHexes[hexId].kingdom = kingdoms[index];
    }
  });

  return updatedHexes;
}

function growKingdoms(keyedHexes, idMap, seedHexes) {
  const updatedHexes = cloneDeep(keyedHexes);

  each(updatedHexes, (hex, hexId) => {
    if (hex.terrain !== 'water') {
      const distances = seedHexes.map(s => ({
        distance: HexUtils.distance(idToHex(s), hex),
        kingdom: updatedHexes[s].kingdom,
        kingdomKey: updatedHexes[s].kingdomKey,
      }));

      // order the distances by distance and grab the closest one as our seed
      const sprout = orderBy(distances, ['distance'])[0];

      updatedHexes[hexId] = {
        ...updatedHexes[hexId],
        kingdom: sprout.kingdom,
        kingdomKey: sprout.kingdomKey,
      };
    }
  });

  return updatedHexes;
}

export function createKingdoms(keyedHexes, idMap, kingdoms) {
  const updatedHexes = cloneDeep(keyedHexes);
  const SEED_KINGDOM_HEXES = getRandomHexIdsSample(idMap, kingdoms.length);

  const seededUpdatedHexes = seedKingdoms(updatedHexes, idMap, SEED_KINGDOM_HEXES, kingdoms);

  return growKingdoms(seededUpdatedHexes, idMap, SEED_KINGDOM_HEXES, 'kingdoms');
}

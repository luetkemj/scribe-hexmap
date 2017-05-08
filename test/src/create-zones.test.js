import { seedMap, growSeeds } from '../../src/create-zones';
import { getHexagons, keyById, idMap } from '../../src/utils';

jest.unmock('../../src/utils');
const utils = require.requireActual('../../src/utils');

describe('/src/create-zones.js', () => {
  describe('seedMap', () => {
    const hexagons = getHexagons();
    const SEED_HEXES = ['1,2,-3', '-1,2,-1', '0,0,0'];
    const KEYED_HEXES = keyById(hexagons);
    const ID_MAP = idMap(hexagons);
    const SEEDS = ['forest'];

    it('should work', () => {
      utils.getRandomHexIdsSample = jest.fn(() => ['1,2,-3', '-1,2,-1', '0,0,0']);
      expect(seedMap(KEYED_HEXES, ID_MAP, SEED_HEXES, 'terrain', SEEDS, 5)).toEqual({
        '-1,2,-1': { q: -1, r: 2, s: -1, terrain: 'forest', terrainKey: 1 },
        '0,0,0': { q: -0, r: 0, s: 0, terrain: 'forest', terrainKey: 2 },
        '0,1,-1': { q: -0, r: 1, s: -1 },
        '0,2,-2': { q: 0, r: 2, s: -2 },
        '1,0,-1': { q: 1, r: 0, s: -1 },
        '1,1,-2': { q: 1, r: 1, s: -2 },
        '1,2,-3': { q: 1, r: 2, s: -3, terrain: 'forest', terrainKey: 0 },
        '2,0,-2': { q: 2, r: 0, s: -2 },
        '2,1,-3': { q: 2, r: 1, s: -3 },
      });
    });
  });

  describe('growSeeds', () => {
    const hexagons = getHexagons();
    const KEYED_HEXES = {
      '-1,2,-1': { q: -1, r: 2, s: -1, terrain: 'forest', terrainKey: 1 },
      '0,0,0': { q: -0, r: 0, s: 0, terrain: 'forest', terrainKey: 2 },
      '0,1,-1': { q: -0, r: 1, s: -1 },
      '0,2,-2': { q: 0, r: 2, s: -2 },
      '1,0,-1': { q: 1, r: 0, s: -1 },
      '1,1,-2': { q: 1, r: 1, s: -2 },
      '1,2,-3': { q: 1, r: 2, s: -3, terrain: 'forest', terrainKey: 0 },
      '2,0,-2': { q: 2, r: 0, s: -2 },
      '2,1,-3': { q: 2, r: 1, s: -3 },
    };
    const ID_MAP = idMap(hexagons);
    const SEED_HEXES = ['1,2,-3', '-1,2,-1', '0,0,0'];
    it('should work', () => {
      expect(growSeeds(KEYED_HEXES, ID_MAP, SEED_HEXES, 'terrain')).toEqual({
        '-1,2,-1': { q: -1, r: 2, s: -1, terrain: 'forest', terrainKey: 1 },
        '0,0,0': { q: -0, r: 0, s: 0, terrain: 'forest', terrainKey: 2 },
        '0,1,-1': { q: -0, r: 1, s: -1, terrain: 'forest', terrainKey: 1 },
        '0,2,-2': { q: 0, r: 2, s: -2, terrain: 'forest', terrainKey: 0 },
        '1,0,-1': { q: 1, r: 0, s: -1, terrain: 'forest', terrainKey: 2 },
        '1,1,-2': { q: 1, r: 1, s: -2, terrain: 'forest', terrainKey: 0 },
        '1,2,-3': { q: 1, r: 2, s: -3, terrain: 'forest', terrainKey: 0 },
        '2,0,-2': { q: 2, r: 0, s: -2, terrain: 'forest', terrainKey: 0 },
        '2,1,-3': { q: 2, r: 1, s: -3, terrain: 'forest', terrainKey: 0 },
      });
    });
  });
});

import {
  getHexagons,
  getRandomHexIdsSample,
  getRandomHexIdsShuffle,
  idMap,
  idToHex,
  keyById } from '../../src/utils';

describe('src/utils.js', () => {
  describe('getHexagons', () => {
    it('should work', () => {
      expect(getHexagons()).toEqual([
        { q: -0, r: 0, s: 0 },
        { q: 1, r: 0, s: -1 },
        { q: 2, r: 0, s: -2 },
        { q: -0, r: 1, s: -1 },
        { q: 1, r: 1, s: -2 },
        { q: 2, r: 1, s: -3 },
        { q: -1, r: 2, s: -1 },
        { q: 0, r: 2, s: -2 },
        { q: 1, r: 2, s: -3 },
      ]);
    });
  });

  describe('keyById', () => {
    it('should work', () => {
      const hexagons = getHexagons();
      expect(keyById(hexagons)).toEqual({
        '-1,2,-1': { q: -1, r: 2, s: -1 },
        '0,0,0': { q: -0, r: 0, s: 0 },
        '0,1,-1': { q: -0, r: 1, s: -1 },
        '0,2,-2': { q: 0, r: 2, s: -2 },
        '1,0,-1': { q: 1, r: 0, s: -1 },
        '1,1,-2': { q: 1, r: 1, s: -2 },
        '1,2,-3': { q: 1, r: 2, s: -3 },
        '2,0,-2': { q: 2, r: 0, s: -2 },
        '2,1,-3': { q: 2, r: 1, s: -3 },
      });
    });
  });

  describe('idMap', () => {
    it('should work', () => {
      const hexagons = getHexagons();
      expect(idMap(hexagons)).toEqual([
        '0,0,0',
        '1,0,-1',
        '2,0,-2',
        '0,1,-1',
        '1,1,-2',
        '2,1,-3',
        '-1,2,-1',
        '0,2,-2',
        '1,2,-3',
      ]);
    });
  });

  describe('idToHex', () => {
    it('should work', () => {
      expect(idToHex('0,0,0')).toEqual({ q: 0, r: 0, s: 0 });
    });
  });

  const CONFIG = {
    width: 100,
    height: 100,
    layout: { width: 1, height: 1, flat: false, spacing: 1 },
    origin: { x: 0, y: 0 },
    map: 'rectangle',
    mapProps: [100, 100],
  };

  describe('getRandomHexIdsSample', () => {
    const hexagons = getHexagons(CONFIG);
    const array = idMap(hexagons);
    describe('when unique flag is true', () => {
      test('should work', () => {
        expect(getRandomHexIdsSample(array, 5000, true).length < 5000).toBe(true);
      });
    });

    describe('when unique flag is false', () => {
      test('should work', () => {
        expect(getRandomHexIdsSample(array, 3).length).toBe(3);
      });
    });
  });

  describe('getRandomHexIdsShuffle', () => {
    const hexagons = getHexagons();
    const array = idMap(hexagons);
    test('should work', () => {
      expect(getRandomHexIdsShuffle(array, 3).length).toBe(3);
    });
  });
});

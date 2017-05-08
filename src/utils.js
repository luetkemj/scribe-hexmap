import { GridGenerator, HexUtils } from 'react-hexgrid';
import {
  keyBy,
  times,
  sample,
  shuffle,
  uniq } from 'lodash';

export function keyById(hexagons) {
  return keyBy(hexagons, hex => HexUtils.getID(hex));
}

export function idMap(hexagons) {
  return hexagons.map(hex => HexUtils.getID(hex));
}

// Much faster to get random ids
// unique = true : length is not guaranteed to be === n
// unique = false : length === n, uniqueness not guaranteed
export function getRandomHexIdsSample(array, n, unique) {
  const newArray = [];

  times(n, () => newArray.push(sample(array)));

  if (unique) {
    return uniq(newArray);
  }

  return newArray;
}

// Much much slower to get random ids but n and uniqueness are guaranteed
export function getRandomHexIdsShuffle(array, n) {
  return shuffle(array).slice(0, n);
}

export function getHexagons(config = {
  width: 3,
  height: 3,
  layout: { width: 1, height: 1, flat: false, spacing: 1 },
  origin: { x: 0, y: 0 },
  map: 'rectangle',
  mapProps: [3, 3],
}) {
  const generator = GridGenerator.getGenerator(config.map);
  return generator.apply(this, config.mapProps);
}

export function idToHex(id) {
  const coords = id.split(',');

  return {
    q: parseInt(coords[0], 10),
    r: parseInt(coords[1], 10),
    s: parseInt(coords[2], 10),
  };
}

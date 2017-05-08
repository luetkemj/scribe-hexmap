import React, { PropTypes } from 'react';
import { HexGrid, Layout, Hexagon, HexUtils, Text } from 'react-hexgrid';

import './hexmap.component.scss';

export default function HexMap({ width, height, size, flat, spacing, origin, hexes, hexDisplay }) {
  // let hexagonsToRender;
  function renderText(text) {
    if (text === 'mountains') {
      return (<Text>🏔️</Text>);
    } else if (text === 'hills') {
      return (<Text>⛰️</Text>);
    } else if (text === 'plains') {
      return (<Text>🌾</Text>);
    } else if (text === 'desert') {
      return (<Text>🌵</Text>);
    } else if (text === 'swamp') {
      return (<Text>🌿</Text>);
    } else if (text === 'forest') {
      return (<Text>🌳</Text>);
    } else if (text === 'water') {
      return '';
    }
    return (<Text>{text}</Text>);
  }

  const hexagonsToRender = hexes.map(hex => (
    <Hexagon
      className={`hex ${hex.terrain}`}
      key={HexUtils.getID(hex)}
      q={hex.q}
      r={hex.r}
      s={hex.s}
    >
      {renderText(hex[hexDisplay])}
    </Hexagon>
  ));

  return (
    <div className="hexGrid">
      <HexGrid width={width} height={height}>
        <Layout size={size} flat={flat} spacing={spacing} origin={origin}>
          {hexagonsToRender}
        </Layout>
      </HexGrid>
    </div>
  );
}

HexMap.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  size: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  flat: PropTypes.bool.isRequired,
  spacing: PropTypes.number.isRequired,
  origin: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  hexes: PropTypes.arrayOf({}).isRequired,
  hexDisplay: PropTypes.string.isRequired,
};

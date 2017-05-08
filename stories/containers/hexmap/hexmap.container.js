import React, { Component } from 'react';
import {
  getHexagons,
  keyById,
  idMap,
  getRandomHexIdsSample } from '../../../src/utils';
import { seedMap, growSeeds } from '../../../src/create-zones';
import { createOceans } from '../../../src/create-oceans';
import { createMountains } from '../../../src/create-mountains';


import HexMap from '../../components/hexmap/hexmap.component';
import './hexmap.container.scss';

export default class HexmapContainer extends Component {
  state = {
    hexMap: [],
    hexDisplay: 'terrain',
  }

  componentWillMount() {
    this.buildMap();
  }

  config = {
    width: 770,
    height: 660,
    layout: { width: 2.1, height: 2.1, flat: false, spacing: 1.03 },
    origin: { x: -55, y: -47 },
    map: 'rectangle',
    mapProps: [30, 30],
  };

  buildMap = () => {
    console.time('buildMap'); // eslint-disable-line no-console
    const HEXAGONS = getHexagons(this.config);
    const KEYED_HEXES = keyById(HEXAGONS);
    const ID_MAP = idMap(HEXAGONS);
    const SEED_HEXES = getRandomHexIdsSample(ID_MAP, 150);
    const SEEDS = ['hills', 'forest', 'plains', 'swamp', 'desert', 'hills', 'forest', 'plains', 'swamp', 'desert', 'water'];

    let hexagons = seedMap(KEYED_HEXES, ID_MAP, SEED_HEXES, 'terrain', SEEDS);
    hexagons = growSeeds(hexagons, ID_MAP, SEED_HEXES, 'terrain');
    hexagons = createOceans(hexagons);
    hexagons = createMountains(hexagons, ID_MAP, 15, 2, 0, 2);
    hexagons = createMountains(hexagons, ID_MAP, 35, 0, 2, 3);

    const hexMap = [];
    ID_MAP.map(id => hexMap.push(hexagons[id]));

    this.setState({
      hexMap,
    });
    console.timeEnd('buildMap'); // eslint-disable-line no-console
  }

  handleChange = (event) => {
    this.setState({ hexDisplay: event.target.value });
  }

  render() {
    return (
      <div>
        <div className="controls">
          <div className="actions">
            <button className="button" onClick={this.buildMap}>Generate Map</button>

            <form onSubmit={this.handleSubmit} className="form select">
              <label htmlFor="hex-display">
                Hexes should display:
                <select id="hex-display" value={this.state.hexDisplay} onChange={this.handleChange}>
                  <option value="nothing">Nothing</option>
                  <option value="terrain">terrain</option>
                  <option value="terrainKey">terrainKeys</option>
                </select>
              </label>
            </form>

          </div>
          <div className="legend">
            <div className="pair">
              <div className="key mountains" />
              <div className="value">mountains</div>
            </div>
            <div className="pair">
              <div className="key hills" />
              <div className="value">hills</div>
            </div>
            <div className="pair">
              <div className="key plains" />
              <div className="value">plains</div>
            </div>
            <div className="pair">
              <div className="key desert" />
              <div className="value">desert</div>
            </div>
            <div className="pair">
              <div className="key swamp" />
              <div className="value">swamp</div>
            </div>
            <div className="pair">
              <div className="key forest" />
              <div className="value">forest</div>
            </div>
            <div className="pair">
              <div className="key water" />
              <div className="value">water</div>
            </div>
          </div>
        </div>
        <HexMap
          width={this.config.width}
          height={this.config.height}
          size={{ x: this.config.layout.width, y: this.config.layout.height }}
          flat={false}
          spacing={this.config.layout.spacing}
          origin={this.config.origin}
          hexes={this.state.hexMap}
          hexDisplay={this.state.hexDisplay}
        />
      </div>
    );
  }
}

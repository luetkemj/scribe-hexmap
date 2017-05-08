import React from 'react';
import { storiesOf } from '@kadira/storybook';
import HexmapContainer from './containers/hexmap/hexmap.container';

storiesOf('Hexmap', module)
  .add('Hexmap Container', () => (
    <HexmapContainer />
  ));

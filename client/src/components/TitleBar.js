import React from 'react';
import ZombieTitle from '../images/ZombieTitle.png';

import { Image } from 'semantic-ui-react';

function TitleBar() {
  return (
    <div style={{ backgroundColor: 'black' }}>
      <Image className={'image-title'} src={ZombieTitle} size="large" />
    </div>
  );
}
export default TitleBar;

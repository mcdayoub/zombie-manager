import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import School from '../images/School.png';
import Hospital from '../images/Hospital.png';
import Warehouse from '../images/Warehouse.png';

function LocationImages() {
  const images = [Hospital, Warehouse, School];
  return (
    <>
      <Grid.Row>
        {images.map(image => (
          <Grid.Column key={image}>
            <Image className="image-title" src={image} size="medium" />
          </Grid.Column>
        ))}
      </Grid.Row>
    </>
  );
}

export default LocationImages;

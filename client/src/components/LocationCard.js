import React from 'react';
import { Card, List } from 'semantic-ui-react';
import ZombieCard from './ZombieCard';
import { Droppable } from 'react-beautiful-dnd';

function LocationCard({ location }) {
  return (
    <Droppable droppableId={location.id}>
      {provided => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <Card fluid>
            <Card.Content style={{ textAlign: 'center' }}>
              <Card.Header style={{ paddingTop: 15 }}>
                {location.name}
              </Card.Header>
              <Card.Description>
                # of Zombies: {location.zombies.length}
              </Card.Description>
            </Card.Content>
            <List>
              {location.zombies.map((zombie, index) => (
                <ZombieCard
                  key={zombie.id}
                  zombie={zombie}
                  id={zombie.zombieId}
                  index={index}
                ></ZombieCard>
              ))}
            </List>
          </Card>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
export default LocationCard;

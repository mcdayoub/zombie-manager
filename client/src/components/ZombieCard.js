import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { Draggable } from 'react-beautiful-dnd';
import ZombieHead from '../images/ZombieHead.png';
import MyPopup from '../util/MyPopup';

function ZombieCard({ zombie, id, index }) {
  return (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <MyPopup content={`Drag ${zombie.name} to another location`}>
            <Card fluid>
              <Card.Content style={{ textAlign: 'center' }}>
                <Image
                  src={ZombieHead}
                  width="50px"
                  style={{ paddingBottom: 10 }}
                ></Image>
                <Card.Header>{zombie.name}</Card.Header>
              </Card.Content>
            </Card>
          </MyPopup>
        </div>
      )}
    </Draggable>
  );
}
export default ZombieCard;

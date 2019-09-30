import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Grid } from 'semantic-ui-react';
import { DragDropContext } from 'react-beautiful-dnd';
import LocationCard from '../components/LocationCard';
import AddZombieForm from '../components/AddZombieForm';
import TitleBar from '../components/TitleBar';
import LocationImages from '../components/LocationImages';

const GET_LOCATIONS_QUERY = gql`
  query {
    getLocations {
      id
      name
      zombies {
        name
        id
        zombieId
      }
    }
  }
`;

const MOVE_ZOMBIE_MUTATION = gql`
  mutation moveZombie($zombieId: ID!, $locationId: String!) {
    moveZombie(zombieId: $zombieId, locationId: $locationId) {
      name
      id
      zombies {
        id
        name
        zombieId
      }
    }
  }
`;

export default function Home() {
  let locations = '';
  const { loading, data } = useQuery(GET_LOCATIONS_QUERY, {
    pollInterval: 100
  });
  if (data) {
    locations = { data: data.getLocations };
  }
  const [moveZombie, { error: mutationError }] = useMutation(
    MOVE_ZOMBIE_MUTATION,
    {
      onError(err) {
        return err.graphQLErrors[0].extensions.exception.errors;
      }
    }
  );

  function onDragEnd(result) {
    const { destination, draggableId } = result;
    if (!destination) {
      return;
    }
    moveZombie({
      variables: { zombieId: draggableId, locationId: destination.droppableId }
    });
  }

  return (
    <div className="container">
      <TitleBar></TitleBar>
      <AddZombieForm></AddZombieForm>
      <Grid columns={3}>
        <LocationImages></LocationImages>
        <DragDropContext onDragEnd={onDragEnd}>
          {loading ? (
            <h2>Loading Zombies...</h2>
          ) : (
            locations.data &&
            locations.data.map(location => (
              <Grid.Column key={location.id} style={{ marginBottom: 20 }}>
                <LocationCard location={location}></LocationCard>
              </Grid.Column>
            ))
          )}
        </DragDropContext>
      </Grid>
    </div>
  );
}

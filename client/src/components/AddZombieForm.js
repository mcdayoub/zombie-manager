import React from 'react';
import { Button, Form, Container } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from '../util/hooks';

const CREATE_ZOMBIE_MUTATION = gql`
  mutation createZombie($name: String!, $locationId: ID!) {
    createZombie(name: $name, locationId: $locationId) {
      id
      name
      locationId
    }
  }
`;

function AddZombieForm(props) {
  const { values, onChange, onSubmit } = useForm(createZombieCallback, {
    name: ''
  });
  const [createZombie, { error }] = useMutation(CREATE_ZOMBIE_MUTATION, {
    variables: { name: values.name, locationId: '5d8f83a4bbff3f3a7040ea34' },
    update() {
      values.name = '';
    },
    onError(err) {
      return err.graphQLErrors[0].extensions.exception.errors;
    }
  });
  function createZombieCallback() {
    createZombie();
  }

  return (
    <div style={{ paddingTop: 20, textAlign: 'center' }}>
      <h3 style={{ paddingBottom: 5 }}>
        Did your friend die? Add a new zombie here!
      </h3>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <Container
            textAlign="center"
            style={{ paddingBottom: 20, width: 450 }}
          >
            <Form.Input
              style={{ alignItems: 'center' }}
              placeholder="Name of new zombie"
              name="name"
              onChange={onChange}
              value={values.name}
              error={error ? true : false}
            ></Form.Input>
            {error && <div>{error.graphQLErrors[0].message}</div>}
          </Container>
          <Button type="submit" color="black">
            Submit
          </Button>
        </Form.Field>
      </Form>
    </div>
  );
}

export default AddZombieForm;

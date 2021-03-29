import React from "react";
import {
  ListGroup,
  ListGroupItem,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";

const form = ({ submitHandler, changeHandler }) => {
  return (
    <div className="row ml-5">
      <Form className="mr-5">
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="menu" className="mr-sm-2">
            Password
          </Label>
          <Input type="text" name="menu" id="menu" placeholder="Add menu" />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
      <div>
        <ListGroup>
          <ListGroupItem>Cras justo odio</ListGroupItem>
          <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
          <ListGroupItem>Morbi leo risus</ListGroupItem>
          <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
          <ListGroupItem>Vestibulum at eros</ListGroupItem>
        </ListGroup>
      </div>
    </div>
  );
};

export default form;

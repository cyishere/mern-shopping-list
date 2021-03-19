import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  Alert,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { register, clearError } from "../slices/authSlice";

const Register = () => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertVisible, setAlertVisible] = useState(true);

  const error = useSelector((state) => state.auth.error);

  const toggle = () => setModal(!modal);

  const onDismiss = () => setAlertVisible(false);

  const dispatch = useDispatch();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = unwrapResult(
        await dispatch(register({ name, email, password }))
      );

      if (result.type !== "error") {
        if (error) dispatch(clearError());
        setModal(false);
        alert("Register successfully!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setName("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      <Button color="primary" onClick={toggle}>
        Register
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          {error && (
            <Alert color="danger" isOpen={alertVisible} toggle={onDismiss}>
              {error}
            </Alert>
          )}
          <Form onSubmit={handleOnSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Please write your name here"
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your e-mail"
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Here's the password"
              />
            </FormGroup>
            <FormGroup>
              <Button color="primary" type="submit" className="mr-2">
                Save
              </Button>
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Register;

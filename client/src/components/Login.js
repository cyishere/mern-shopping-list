import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  Alert,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  NavLink,
} from "reactstrap";
import { login, clearError } from "../slices/authSlice";

const Register = () => {
  const [modal, setModal] = useState(false);
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
      const result = unwrapResult(await dispatch(login({ email, password })));

      if (result.type !== "error") {
        if (error) dispatch(clearError());
        setModal(false);
        alert("Login successfully!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      <NavLink href="#" onClick={toggle}>
        Login
      </NavLink>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          {error && (
            <Alert color="danger" isOpen={alertVisible} toggle={onDismiss}>
              {error}
            </Alert>
          )}
          <Form onSubmit={handleOnSubmit}>
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
                Submit
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

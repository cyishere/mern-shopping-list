import { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
} from "reactstrap";

const ShoppingItemModal = ({ handleAddItem }) => {
  const [modal, setModal] = useState(false);
  const [itemName, setItemName] = useState("");

  const toggle = () => setModal(!modal);

  return (
    <>
      <Button color="dark" className="mb-2" onClick={toggle}>
        Add Item
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add New Item</ModalHeader>
        <ModalBody>
          <Form
            onSubmit={(e) => {
              handleAddItem(e, itemName);
              setItemName("");
              toggle();
            }}
          >
            <FormGroup>
              <Input
                type="text"
                name="name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
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

export default ShoppingItemModal;

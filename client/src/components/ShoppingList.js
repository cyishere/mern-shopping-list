import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Alert, Spinner } from "reactstrap";
import {
  getAllItems,
  addItem,
  deleteItem,
  selectAllItems,
} from "../slices/itemSlice";
import ShoppingItem from "./ShoppingItem";
import ShoppingItemModal from "./ShoppingItemModal";

const ShoppingList = () => {
  const items = useSelector(selectAllItems);
  const fetchStatus = useSelector((state) => state.item.status);
  const error = useSelector((state) => state.item.error);

  const [alertVisible, setAlertVisible] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (fetchStatus === "idle") {
      dispatch(getAllItems());
    }
  });

  const onDismiss = () => setAlertVisible(false);

  const handleAddItem = (e, name) => {
    e.preventDefault();

    dispatch(addItem({ name }));
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteItem(id));
  };

  let content;

  if (fetchStatus === "loading") {
    content = (
      <Alert color="light">
        <Spinner type="grow" color="warning" />
      </Alert>
    );
  } else if (error) {
    content = (
      <Container>
        <Alert color="danger" isOpen={alertVisible} toggle={onDismiss}>
          {error}
        </Alert>
      </Container>
    );
  } else {
    content = <ShoppingItemModal handleAddItem={handleAddItem} />;
  }

  return (
    <Container>
      {content}

      <ShoppingItem items={items} handleDeleteItem={handleDeleteItem} />
    </Container>
  );
};

export default ShoppingList;

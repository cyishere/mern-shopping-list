import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { getAllItems } from "../slices/itemSlice";
import { Container, Button } from "reactstrap";
import ShoppingItem from "./ShoppingItem";

const ShoppingList = () => {
  const [items, setItems] = useState([]);

  const itemEntities = useSelector((state) => state.item.entities);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllItems());
    setItems(itemEntities);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Button
        color="dark"
        className="mb-2"
        onClick={() => {
          const name = prompt("Enter Item");
          if (name) {
            setItems([...items, { id: uuid(), name }]);
          }
        }}
      >
        Add Item
      </Button>

      <ShoppingItem items={items} setItems={setItems} />
    </Container>
  );
};

export default ShoppingList;

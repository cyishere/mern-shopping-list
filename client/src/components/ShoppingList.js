import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { getAllItems, addItem, deleteItem } from "../slices/itemSlice";
import { Container } from "reactstrap";
import ShoppingItem from "./ShoppingItem";
import ShoppingItemModal from "./ShoppingItemModal";

const ShoppingList = () => {
  const [items, setItems] = useState([]);

  const itemEntities = useSelector((state) => state.item.entities);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllItems());
    setItems(itemEntities);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemEntities]);

  const handleAddItem = (e, name) => {
    e.preventDefault();

    dispatch(addItem({ id: uuid(), name }));
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteItem(id));
  };

  return (
    <Container>
      <ShoppingItemModal handleAddItem={handleAddItem} />

      <ShoppingItem
        items={items}
        setItems={setItems}
        handleDeleteItem={handleDeleteItem}
      />
    </Container>
  );
};

export default ShoppingList;

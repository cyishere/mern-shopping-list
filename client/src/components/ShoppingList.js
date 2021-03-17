import { useState } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { v4 as uuid } from "uuid";

const ShoppingList = () => {
  const [items, setItems] = useState([
    { id: uuid(), name: "Coffee" },
    { id: uuid(), name: "Bra" },
    { id: uuid(), name: "Book" },
    { id: uuid(), name: "Shoes" },
  ]);

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

      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map((item) => (
            <CSSTransition key={item.id} timeout={500} classNames="fade">
              <ListGroupItem>
                <Button
                  className="remove-btn mr-2"
                  color="danger"
                  size="sm"
                  onClick={() => {
                    const newItems = items.filter((i) => i.id !== item.id);
                    setItems(newItems);
                  }}
                >
                  &times;
                </Button>
                {item.name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

export default ShoppingList;

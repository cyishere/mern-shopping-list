import { ListGroup, ListGroupItem, Button, Alert, Spinner } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ShoppingItem = ({ items, setItems }) => {
  if (items.length === 0)
    return (
      <Alert color="light">
        <Spinner type="grow" color="warning" />
      </Alert>
    );
  return (
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
  );
};

export default ShoppingItem;

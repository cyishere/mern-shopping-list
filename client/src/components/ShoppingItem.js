import { ListGroup, ListGroupItem, Button, Alert } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ShoppingItem = ({ items, handleDeleteItem, isAuth }) => {
  if (items.length === 0)
    return (
      <Alert color="light">
        <p>No item.</p>
      </Alert>
    );
  return (
    <ListGroup>
      <TransitionGroup className="shopping-list">
        {items.map((item) => (
          <CSSTransition key={item.id} timeout={500} classNames="fade">
            <ListGroupItem>
              {isAuth && (
                <Button
                  className="remove-btn mr-2"
                  color="danger"
                  size="sm"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  &times;
                </Button>
              )}

              {item.name}
            </ListGroupItem>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ListGroup>
  );
};

export default ShoppingItem;

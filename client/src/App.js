import Header from "./components/Header";
import ShoppingList from "./components/ShoppingList";
import { Provider } from "react-redux";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Header />
      <ShoppingList />
    </Provider>
  );
}

export default App;

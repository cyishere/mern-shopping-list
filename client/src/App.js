import { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { findMe } from "./slices/authSlice";
import Header from "./components/Header";
import ShoppingList from "./components/ShoppingList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const token = localStorage.getItem("shopping_token");

  useEffect(() => {
    if (token) {
      store.dispatch(findMe(token));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Provider store={store}>
      <Header />
      <ShoppingList />
    </Provider>
  );
}

export default App;

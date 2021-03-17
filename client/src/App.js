import Header from "./components/Header";
import ShoppingList from "./components/ShoppingList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <ShoppingList />
    </div>
  );
}

export default App;

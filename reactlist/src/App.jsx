import { useState } from "react";
import "./App.css";
import Logo from "./Components/Logo";
import Form from "./Components/Form";
import PackingList from "./Components/PackingList";
import Stats from "./Components/Stats";

/*const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 3, packed: true },
];
/*
const addItems = [];
function items({ id, description, quantity, packed }) {
  return addItems.push({ id, description, quantity, packed });
}

items({ id: 1, description: "Passports", quantity: 1, packed: true });
items({ id: 2, description: "Socks", quantity: 12, packed: false });
items({ id: 3, description: "Charger", quantity: 3, packed: true });
console.log(addItems);
*/
export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }
  //console.log(items);
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleCheckBox(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all item?"
    );
    if (confirmed) setItems([]);
  }
  return (
    <>
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onCheckItem={handleCheckBox}
        clearList={handleClearList}
      />
      <Stats item={items} />
    </>
  );
}

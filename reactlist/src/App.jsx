import { useState } from "react";
import "./App.css";

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
  return (
    <>
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onCheckItem={handleCheckBox}
      />
      <Stats item={items} />
    </>
  );
}

function Logo() {
  return <h1>🌲 Far Away 💼</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(event) {
    event.preventDefault();

    if (!description) return;

    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };
    //console.log(newItem);

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>what do you need for your trip</h3>
      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, index) => index + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="add item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onCheckItem }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;
  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      {sortedItems.length !== 0 ? (
        <ul>
          {items.map((item) => (
            <Item
              item={item}
              onDeleteItem={onDeleteItem}
              onCheckItem={onCheckItem}
              key={item.id}
            />
          ))}
        </ul>
      ) : (
        "Looks like you haven't added any item yet 👀"
      )}
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onCheckItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onCheckItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ item }) {
  if (!item.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );
  const numItems = +item.length;
  const packedItems = item.filter((items) => items.packed).length;
  const itemPercentage = Math.round((packedItems / numItems) * 100);
  console.log(itemPercentage);
  return (
    <footer className="stats">
      <em>
        {itemPercentage === 100
          ? "you've got everything needed for travelling ✈"
          : `💼 You have ${numItems} items on your list, and you have already packed${" "}
          ${packedItems} (${itemPercentage}%)`}
      </em>
    </footer>
  );
}

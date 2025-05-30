import { useState } from "react";
import Item from "./Items";
function PackingList({ items, onDeleteItem, onCheckItem, clearList }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;
  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items.slice().sort((a, b) => {
      if (a.description > b.description) return 1;
      if (a.description < b.description) return -1;
    });

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      {sortedItems.length !== 0 ? (
        <ul>
          {sortedItems.map((item) => (
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
        {sortedItems.length !== 0 ? (
          <button onClick={clearList}>Clear List</button>
        ) : null}
      </div>
    </div>
  );
}
export default PackingList;

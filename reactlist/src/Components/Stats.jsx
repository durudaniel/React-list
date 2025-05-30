export default function Stats({ item }) {
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

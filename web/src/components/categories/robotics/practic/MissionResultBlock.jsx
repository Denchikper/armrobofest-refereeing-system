import { useState, useEffect } from "react";
import MissionResultItem from "./MissionResultItem";
import MissionResultTotal from "./MissionResultTotal";

export default function MissionResultBlock({ items: initialItems }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  items.map((item, index) => console.log(item))


  const toggleItem = (id) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };
  
  const total = items.reduce(
    (sum, item) => sum + (item.checked ? item.points : 0),
    0
  );

  const maxTotal = items.reduce((sum, item) => sum + item.points, 0);

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 px-6">
      
      <div className="flex flex-col gap-4">
        {items.map((item, index) => (
          <MissionResultItem
            key={item.id}
            index={index + 1}
            text={item.text}
            checked={item.checked}
            onClick={() => toggleItem(item.id)}
          />
        ))}
      </div>

      <MissionResultTotal total={total} max={maxTotal} />

    </div>
  );
}
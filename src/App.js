import { useState } from "react";

const initialInventory = [
  { item: "Rum", goal: 6 },
  { item: "Tequila", goal: 12 },
  { item: "Gin", goal: 4 },
  { item: "Vodka", goal: 6 },
  { item: "Mezcal", goal: 8 },
  { item: "Triple Sec", goal: 3 },
  { item: "Prosecco", goal: 24 },
  { item: "Aperol", goal: 8 },
  { item: "Cointreau", goal: 1 },
  { item: "Whiskey", goal: 4 },
];

function App() {
  const [contributions, setContributions] = useState([]);
  const [form, setForm] = useState({ item: "Rum", name: "", quantity: 1 });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setContributions([...contributions, { ...form }]);
    setForm({ item: "Rum", name: "", quantity: 1 });
  };

  const getCurrentTotal = (itemName) =>
    contributions
      .filter((c) => c.item === itemName)
      .reduce((acc, curr) => acc + parseInt(curr.quantity), 0);

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>🍹 Kurtstock Community Bar Sign-Up</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <select
          value={form.item}
          onChange={(e) => setForm({ ...form, item: e.target.value })}
        >
          {initialInventory.map(({ item }) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={{ marginLeft: 10 }}
        />
        <input
          type="number"
          min="1"
          value={form.quantity}
          onChange={(e) =>
            setForm({ ...form, quantity: parseInt(e.target.value) })
          }
          style={{ marginLeft: 10, width: 60 }}
        />
        <button type="submit" style={{ marginLeft: 10 }}>
          Submit
        </button>
      </form>

      {initialInventory.map(({ item, goal }) => (
        <div
          key={item}
          style={{
            marginBottom: 10,
            padding: 10,
            border: "1px solid #ccc",
            borderRadius: 5,
          }}
        >
          <strong>{item}</strong> — Goal: {goal}, Collected:{" "}
          {getCurrentTotal(item)}
          <ul>
            {contributions
              .filter((c) => c.item === item)
              .map((c, i) => (
                <li key={i}>
                  {c.name} - {c.quantity} bottle(s)
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;

import { useArray } from "utils";

export const ArrayTestPage = () => {
  const data = ["Jack", "Tom", "Tina"];
  const { value, clear, removeIndex, add } = useArray(data);
  return (
    <div>
      <div>
        <button onClick={() => add("test")}>Add</button>
      </div>
      <div>
        <button onClick={() => removeIndex(0)}>Remove first</button>
      </div>
      <div>
        <button onClick={() => clear()}>Clear</button>
      </div>
      <div>
        {value.map((v, index) => (
          <p key={index + v}>{index + v}</p>
        ))}
      </div>
    </div>
  );
};

import { useArray } from "utils";

export const ArrayTestPage = () => {
  const data = ["Jack", "Tom", "Tina"];
  const arrayHook = useArray(data);
  return (
    <div>
      <div>
        <button onClick={() => arrayHook.add("test")}>Add</button>
      </div>
      <div>
        <button onClick={() => arrayHook.removeIndex(0)}>Remove first</button>
      </div>
      <div>
        <button onClick={() => arrayHook.clear()}>Clear</button>
      </div>
      <div>
        {arrayHook.value.map((v, index) => (
          <p key={index + v}>{index + v}</p>
        ))}
      </div>
    </div>
  );
};

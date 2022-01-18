import { useEffect, useState } from "react";
import { useInput } from "../hooks";

type Props = {
  collectionName: string | undefined;
  saveName: (name: string) => void;
  resetNewName: () => void;
};

function RenameCollectionView({
  collectionName,
  saveName,
  resetNewName,
}: Props) {
  const [newName, newNameReset, newNameBind] = useInput(collectionName || "");

  useEffect(() => newNameReset(), []);

  return (
    <div className="form-container">
      <h2>Rename Collection</h2>
      <div>
        <label>
          Collection Name
          <input autoFocus type="text" {...newNameBind} />
        </label>
      </div>
      <div>
        <button onClick={() => saveName(newName)}>Save</button>
        <button onClick={resetNewName}>Cancel</button>
      </div>
    </div>
  );
}

export default RenameCollectionView;

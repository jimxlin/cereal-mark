import { useContext } from "react";
import { useInput } from "../hooks";
import { DEFAULT_ERROR } from "../constants";
import { SetErrorContext } from "../App";

type Props = {
  collectionName: string | undefined;
  updateCollectionName: (name: string) => void;
  clearRenameCollectionForm: () => void;
};

function RenameCollectionView({
  collectionName,
  updateCollectionName,
  clearRenameCollectionForm,
}: Props) {
  const setError = useContext(SetErrorContext);
  const [newName, newNameBind] = useInput(collectionName || "");

  const disallowedName: boolean =
    newName.length === 0 || newName === collectionName;

  const resetNewName = (): void => {
    setError(undefined);
    clearRenameCollectionForm();
  };

  const saveName = (): void => {
    if (disallowedName) return;
    try {
      updateCollectionName(newName);
      resetNewName();
    } catch (err) {
      setError(err instanceof Error ? err.message : DEFAULT_ERROR);
    }
  };

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
        <button disabled={disallowedName} onClick={saveName}>
          Save
        </button>
        <button onClick={resetNewName}>Cancel</button>
      </div>
    </div>
  );
}

export default RenameCollectionView;

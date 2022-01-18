import { useEffect, useState } from "react";
import { Format } from "../types";
import { useInput } from "../hooks";
import AddSeriesView from "./AddSeriesView";

type Props = {
  collectionName: string | undefined;
  updateCollectionName: (name: string) => void;
  addSeries: (
    title: string,
    format: Format,
    act: number,
    saga: number | undefined,
    viewUrl: string | undefined
  ) => void;
};

function ManageCollection({
  addSeries,
  collectionName,
  updateCollectionName,
}: Props) {
  const [showRename, setShowRename] = useState(false);
  const [newName, newNameReset, newNameBind] = useInput(collectionName || "");
  const [showAddSeries, setShowAddSeries] = useState(false);

  useEffect(() => newNameReset(), [collectionName]);

  const resetNewName = (): void => {
    newNameReset();
    setShowRename(false);
  };

  const saveName = (): void => {
    updateCollectionName(newName);
    setShowRename(false);
  };

  const clearAddSeriesForm = (): void => {
    setShowAddSeries(false);
  };

  return (
    <div>
      {showRename && (
        <div className="form-container">
          <h2>Rename Collection</h2>
          <div>
            <label>
              Collection Name
              <input autoFocus type="text" {...newNameBind} />
            </label>
          </div>
          <div>
            <button onClick={saveName}>Save</button>
            <button onClick={resetNewName}>Cancel</button>
          </div>
        </div>
      )}
      {showAddSeries && (
        <AddSeriesView
          clearAddSeriesForm={clearAddSeriesForm}
          addSeries={addSeries}
        />
      )}
      <div>
        <h2>{collectionName || "Unnamed Collection"}</h2>
        <button onClick={() => setShowRename(true)}>Rename Collection</button>
      </div>
      <div>
        <button
          style={{ cursor: "pointer" }}
          onClick={() => setShowAddSeries(true)}
        >
          Add Series
        </button>
      </div>
    </div>
  );
}

export default ManageCollection;

import { useEffect, useState } from "react";
import { FORMAT, SeriesItem, Collection } from "../types";
import { useInput } from "../hooks";
import AddSeriesView from "./AddSeriesView";

type Props = {
  collectionName: string | undefined;
  updateCollectionName: (name: string) => void;
  addSeries: (
    title: string,
    format: typeof FORMAT.COMIC | typeof FORMAT.SHOW | typeof FORMAT.BOOK,
    act: number,
    saga?: number
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

  return (
    <div>
      <h1>Manage Collection Component</h1>
      {showRename ? (
        <div>
          <input type="text" {...newNameBind} />
          <button onClick={saveName}>Save</button>
          <button onClick={resetNewName}>Cancel</button>
        </div>
      ) : (
        <div>
          {collectionName || "New Collection"}
          <button onClick={() => setShowRename(true)}>Rename</button>
        </div>
      )}
      <br />
      {showAddSeries ? (
        <AddSeriesView
          setShowAddSeries={setShowAddSeries}
          addSeries={addSeries}
        />
      ) : (
        <div>
          <button
            style={{ cursor: "pointer" }}
            onClick={() => setShowAddSeries(true)}
          >
            Add Series
          </button>
        </div>
      )}
    </div>
  );
}

export default ManageCollection;

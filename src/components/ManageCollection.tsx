import { useEffect, useState } from "react";
import { FORMAT, SeriesItem, Collection } from "../types";

type Props = {
  collectionName: string | undefined;
  updateCollectionName: (name: string) => void;
  addSeries: (
    title: string,
    format: typeof FORMAT.COMIC | typeof FORMAT.SHOW | typeof FORMAT.BOOK,
    hasSagas: boolean
  ) => void;
};

function useInput(initialValue: any) {
  const [value, setValue] = useState(initialValue);
  const reset = (): void => setValue(initialValue);
  const bind = {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setValue(
        e.target.type === "checkbox" ? e.target.checked : e.target.value
      ),
    ...(typeof initialValue === "boolean" && { checked: value }),
  };
  return [value, reset, bind];
}

function ManageCollection({
  addSeries,
  collectionName,
  updateCollectionName,
}: Props) {
  const [showRename, setShowRename] = useState(false);
  const [newName, newNameReset, newNameBind] = useInput(collectionName || "");
  const [showAddSeries, setShowAddSeries] = useState(false);
  const [newSeriesName, resetNewSeriesName, bindNewSeriesName] = useInput("");
  const [newSeriesFormat, resetNewSeriesFormat, bindNewSeriesFormat] =
    useInput("");
  const [newSeriesSaga, resetNewSeriesSaga, bindNewSeriesSaga] =
    useInput(false);
  useEffect(() => newNameReset(), [collectionName]);

  const resetNewName = (): void => {
    newNameReset();
    setShowRename(false);
  };

  const saveName = (): void => {
    updateCollectionName(newName);
    setShowRename(false);
  };

  const resetNewSeries = (): void => {
    resetNewSeriesName();
    resetNewSeriesFormat();
    resetNewSeriesSaga();
    setShowAddSeries(false);
  };

  const saveSeries = (): void => {
    addSeries(newSeriesName, newSeriesFormat, newSeriesSaga);
    resetNewSeries();
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
        <div>{collectionName || "New Collection"}</div>
      )}
      <div>
        <button onClick={() => setShowRename(true)}>Rename</button>
      </div>
      <div>
        <button
          style={{ cursor: "pointer" }}
          onClick={() => setShowAddSeries(true)}
        >
          Add Series
        </button>
      </div>
      {showAddSeries && (
        <div>
          <input type="text" {...bindNewSeriesName} />
          <input type="text" {...bindNewSeriesFormat} />
          <input type="checkbox" {...bindNewSeriesSaga} />
          <button onClick={saveSeries}>Add</button>
          <button onClick={resetNewSeries}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default ManageCollection;

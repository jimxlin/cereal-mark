import { FORMAT, SeriesItem, Collection } from "../types";
import { useInput } from "../hooks";

type Props = {
  setShowAddSeries: (show: boolean) => void;
  addSeries: (
    title: string,
    format: typeof FORMAT.COMIC | typeof FORMAT.SHOW | typeof FORMAT.BOOK,
    act: number,
    saga?: number
  ) => void;
};

function AddSeriesView({ setShowAddSeries, addSeries }: Props) {
  const [name, resetName, bindName] = useInput("");
  const [format, resetFormat, bindFormat] = useInput(FORMAT.SHOW);
  // workaround for https://github.com/facebook/react/issues/6222#issuecomment-194061477
  const [saga, resetSaga, bindSaga] = useInput("");
  const [act, resetAct, bindAct] = useInput(1);

  const resetNewSeries = (): void => {
    resetName();
    resetFormat();
    resetSaga();
    resetAct();
    setShowAddSeries(false);
  };

  const saveSeries = (): void => {
    addSeries(name, format, act, saga.length === 0 ? undefined : saga);
    resetNewSeries();
  };

  return (
    <div>
      <div>
        <label>Name</label>
        <input type="text" {...bindName} />
      </div>
      <div>
        <label>Format</label>
        <select {...bindFormat}>
          <option value={FORMAT.SHOW}>Show</option>
          <option value={FORMAT.COMIC}>Comic</option>
          <option value={FORMAT.BOOK}>Book</option>
        </select>
      </div>
      <div>
        <label>{format === FORMAT.SHOW ? "Season" : "Volume"}</label>
        <input type="number" min="1" {...bindSaga} />
      </div>
      <div>
        <label>{format === FORMAT.SHOW ? "Episode" : "Chapter"}</label>
        <input type="number" min="1" {...bindAct} />
      </div>
      <button onClick={saveSeries}>Add</button>
      <button onClick={resetNewSeries}>Cancel</button>
    </div>
  );
}

export default AddSeriesView;

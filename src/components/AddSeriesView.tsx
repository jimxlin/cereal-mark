import { useContext } from "react";
import { SetErrorContext } from "../App";
import { FORMAT, Format } from "../types";
import { useInput } from "../hooks";

type Props = {
  clearAddSeriesForm: () => void;
  addSeries: (
    title: string,
    format: Format,
    act: number,
    saga?: number
  ) => void;
};

function AddSeriesView({ clearAddSeriesForm, addSeries }: Props) {
  const setError = useContext(SetErrorContext);
  const [name, resetName, bindName] = useInput("");
  const [format, resetFormat, bindFormat] = useInput("SHOW");
  // workaround for https://github.com/facebook/react/issues/6222#issuecomment-194061477
  const [saga, resetSaga, bindSaga] = useInput("");
  const [act, resetAct, bindAct] = useInput(1);

  const resetNewSeries = (): void => {
    setError(undefined);
    clearAddSeriesForm();
    resetName();
    resetFormat();
    resetSaga();
    resetAct();
  };

  const saveSeries = (): void => {
    try {
      addSeries(
        name,
        format,
        Number(act),
        saga.length === 0 ? undefined : Number(saga)
      );
      resetNewSeries();
    } catch (err) {
      setError(err instanceof Error ? err.message : JSON.stringify(err));
    }
  };

  return (
    <div>
      <h1>Add Seriew View Component</h1>
      <div>
        <label>Name</label>
        <input type="text" {...bindName} />
      </div>
      <div>
        <label>Format</label>
        <select {...bindFormat}>
          <option value="SHOW">{FORMAT.SHOW.NAME}</option>
          <option value="COMIC">{FORMAT.COMIC.NAME}</option>
          <option value="BOOK">{FORMAT.BOOK.NAME}</option>
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

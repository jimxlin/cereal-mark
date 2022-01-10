import { useContext } from "react";
import {
  FORMAT,
  DATE_LOCALE,
  DATE_OPTIONS,
  Session,
  SeriesItem,
} from "../types";
import { SetErrorContext } from "../App";
import { useInput } from "../hooks";

type Props = {
  seriesItem: SeriesItem;
  addSession: (seriesTitle: string, act: number, saga?: number) => void;
  clearAddSessionForm: () => void;
};

function AddSessionView({
  seriesItem,
  addSession,
  clearAddSessionForm,
}: Props) {
  const setError = useContext(SetErrorContext);
  const { title, format, updatedAtMs } = seriesItem;
  const lastSession: Session =
    seriesItem.sessions[seriesItem.sessions.length - 1];
  const { saga, act } = lastSession;

  const [newSaga, resetNewSaga, bindNewSaga] = useInput(saga);
  const [newAct, resetNewAct, bindNewAct] = useInput(act);

  const noChange: boolean = newSaga === saga && newAct === act;

  const saveSession = (): void => {
    if (noChange) return;
    try {
      addSession(
        seriesItem.title,
        Number(newAct),
        newSaga === undefined ? newSaga : Number(newSaga)
      );
      resetNewSession();
    } catch (err) {
      setError(err instanceof Error ? err.message : JSON.stringify(err));
    }
  };

  const resetNewSession = (): void => {
    setError(undefined);
    clearAddSessionForm();
    resetNewSaga();
    resetNewAct();
  };

  return (
    <div className="form-container">
      <h2>Update Progress</h2>
      <h3>{title}</h3>
      <div>
        <i>
          Last viewed on{" "}
          {new Date(updatedAtMs).toLocaleString(DATE_LOCALE, DATE_OPTIONS)}
        </i>
      </div>
      {saga && (
        <div>
          <label>
            {FORMAT[format].SAGA}
            <input type="number" min="1" {...bindNewSaga} />
          </label>
        </div>
      )}
      <div>
        <label>
          {FORMAT[format].ACT}
          <input type="number" min="1" {...bindNewAct} />
        </label>
      </div>
      <div>
        <button onClick={saveSession} disabled={noChange}>
          Save
        </button>
        <button onClick={resetNewSession}>Cancel</button>
      </div>
    </div>
  );
}

export default AddSessionView;

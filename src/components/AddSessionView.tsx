import { useContext } from "react";
import { FORMAT, Session, SeriesItem } from "../types";
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
  const { title, format } = seriesItem;
  const lastSession: Session =
    seriesItem.sessions[seriesItem.sessions.length - 1];
  const { saga, act } = lastSession;

  const [newSaga, resetNewSaga, bindNewSaga] = useInput(saga);
  const [newAct, resetNewAct, bindNewAct] = useInput(act);

  const saveSession = (): void => {
    if (newSaga === saga && newAct === act) return;
    try {
      addSession(seriesItem.title, Number(newAct), Number(newSaga));
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
    <div
      style={{
        position: "fixed",
        border: "0.5rem solid black",
        borderRadius: "1rem",
        backgroundColor: "#888",
        top: "10rem",
        left: "50vh",
      }}
    >
      <h2>Update Series View Component</h2>
      <p>{title}</p>
      <p>{FORMAT[format].NAME}</p>
      {saga && (
        <div>
          <label>{FORMAT[format].SAGA}</label>
          <input type="number" min="1" {...bindNewSaga} />
        </div>
      )}
      <div>
        <label>{FORMAT[format].ACT}</label>
        <input type="number" min="1" {...bindNewAct} />
      </div>
      <button onClick={saveSession}>Save</button>
      <button onClick={resetNewSession}>Cancel</button>
    </div>
  );
}

export default AddSessionView;

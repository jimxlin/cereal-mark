import { useContext } from "react";
import { Session, SeriesItem } from "../types";
import { FORMAT, DATE_LOCALE, DATE_OPTIONS } from "../constants";
import { SetErrorContext } from "../App";
import { useInput } from "../hooks";

type Props = {
  seriesItem: SeriesItem;
  addSession: (
    seriesTitle: string,
    act: number,
    saga: number | undefined,
    viewUrl: string | undefined
  ) => void;
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
  const { saga, act, viewUrl } = lastSession;

  const [newSaga, bindNewSaga] = useInput(saga);
  const [newAct, bindNewAct] = useInput(act);
  const [newViewUrl, bindViewUrl] = useInput(viewUrl || "");

  const noChange: boolean =
    newSaga === saga && newAct === act && viewUrl === newViewUrl;

  const saveSession = (): void => {
    if (noChange) return;
    try {
      addSession(
        seriesItem.title,
        Number(newAct),
        newSaga ? Number(newSaga) : undefined,
        newViewUrl && newViewUrl.length > 0
          ? encodeURI(newViewUrl.trim())
          : undefined
      );
      resetNewSession();
    } catch (err) {
      setError(err instanceof Error ? err.message : JSON.stringify(err));
    }
  };

  const resetNewSession = (): void => {
    setError(undefined);
    clearAddSessionForm();
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
          <input autoFocus type="number" min="1" {...bindNewAct} />
        </label>
      </div>
      <div>
        <label>
          Link
          <input
            type="url"
            placeholder="https://example.com"
            pattern="https://.*"
            {...bindViewUrl}
          />
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

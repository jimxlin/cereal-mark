import { Session, SeriesItem } from "../types";
import { FORMAT } from "../constants";

type Props = {
  seriesItem: SeriesItem;
  openSessionForm: (seriesItem: SeriesItem) => void;
};

function SeriesView({ seriesItem, openSessionForm }: Props) {
  const { title, format } = seriesItem;
  const lastSession: Session =
    seriesItem.sessions[seriesItem.sessions.length - 1];
  const { saga, act, viewUrl } = lastSession;

  return (
    <div className="series-row">
      <div>
        {title}{" "}
        {viewUrl && (
          <a href={viewUrl} target="_blank" rel="noreferrer noopener">
            Link
          </a>
        )}
      </div>
      <div>
        {saga && (
          <span>
            {FORMAT[format].SAGA} {saga} -{" "}
          </span>
        )}
        {FORMAT[format].ACT} {act}
      </div>
      <div>
        <button onClick={() => openSessionForm(seriesItem)}>Update</button>
      </div>
    </div>
  );
}

export default SeriesView;

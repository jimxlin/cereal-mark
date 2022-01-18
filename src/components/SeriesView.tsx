import { FORMAT, Session, SeriesItem } from "../types";

type Props = {
  seriesItem: SeriesItem;
  setSeriesToUpdate: (seriesItem: SeriesItem | undefined) => void;
};

function SeriesView({ seriesItem, setSeriesToUpdate }: Props) {
  const { title, format } = seriesItem;
  const lastSession: Session =
    seriesItem.sessions[seriesItem.sessions.length - 1];
  const { saga, act, viewUrl } = lastSession;

  const showSeriesUpdateForm = () => setSeriesToUpdate(seriesItem);

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
        <button onClick={showSeriesUpdateForm}>Update</button>
      </div>
    </div>
  );
}

export default SeriesView;

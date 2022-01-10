import { FORMAT, Session, SeriesItem } from "../types";

type Props = {
  seriesItem: SeriesItem;
  setSeriesToUpdate: (seriesItem: SeriesItem | undefined) => void;
};

function SeriesView({ seriesItem, setSeriesToUpdate }: Props) {
  const { title, format } = seriesItem;
  const lastSession: Session =
    seriesItem.sessions[seriesItem.sessions.length - 1];
  const { saga, act } = lastSession;

  const showSeriesUpdateForm = () => setSeriesToUpdate(seriesItem);

  return (
    <div>
      <p>{title}</p>
      <p>{FORMAT[format].NAME}</p>
      {saga && (
        <p>
          {FORMAT[format].SAGA}: {saga}
        </p>
      )}
      <p>
        {FORMAT[format].ACT}: {act}
      </p>
      <button onClick={showSeriesUpdateForm}>Update</button>
    </div>
  );
}

export default SeriesView;

import { FORMAT, Session, SeriesItem } from "../types";

type Props = {
  seriesItem: SeriesItem;
};

function SeriesView({ seriesItem }: Props) {
  const { title, format } = seriesItem;
  const lastSession = seriesItem.sessions[seriesItem.sessions.length - 1];
  const formatMap = {
    [FORMAT.SHOW]: "Show",
    [FORMAT.COMIC]: "Comic",
    [FORMAT.SHOW]: "Show",
  };

  return (
    <div>
      <h2>Series View Component</h2>
      <p>{title}</p>
      <p>{formatMap[format]}</p>
      {lastSession.saga && (
        <p>
          {format === FORMAT.SHOW ? "Season" : "Volume"}: {lastSession.saga}
        </p>
      )}
      <p>
        {format === FORMAT.SHOW ? "Episode" : "Chapter"}: {lastSession.act}
      </p>
    </div>
  );
}

export default SeriesView;

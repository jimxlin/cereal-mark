import { FORMAT, Session, SeriesItem } from "../types";

type Props = {
  seriesItem: SeriesItem;
};

function SeriesView({ seriesItem }: Props) {
  const { title, format } = seriesItem;
  const lastSession = seriesItem.sessions[seriesItem.sessions.length - 1];

  return (
    <div>
      <p>Series View Component</p>
      <p>{title}</p>
      <p>{format}</p>
      <p>{lastSession}</p>
    </div>
  );
}

export default SeriesView;

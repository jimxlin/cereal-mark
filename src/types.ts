export const FORMAT = {
  COMIC: {
    NAME: "Comic",
    SAGA: "Volume",
    ACT: "Chapter",
  },
  SHOW: {
    NAME: "Show",
    SAGA: "Season",
    ACT: "Episode",
  },
  BOOK: {
    NAME: "Book",
    SAGA: "Volume",
    ACT: "Chapter",
  },
};

export type Format = "COMIC" | "SHOW" | "BOOK";

export const SORT = {
  RECENCY: "recency_sort",
  TITLE: "title_sort",
};

export interface Session {
  saga?: number; // aka season, volume
  act: number; // aka chapter, episode
  createdAtMs: number;
  notes?: string;
}

export interface SeriesItem {
  title: string;
  sessions: Array<Session>;
  createdAtMs: number;
  updatedAtMs: number;
  archived: boolean;
  format: Format;
  tags: Array<string>;
}

export interface Collection {
  id: string;
  name?: string;
  seriesItems: Array<SeriesItem>;
  updatedAtMs: number;
}

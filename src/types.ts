export const TABLE_NAME = "CerealMark";

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

export const DATE_LOCALE = "en-US";

export const DATE_OPTIONS: any = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const SORT = {
  RECENCY: "recency_sort",
  TITLE: "title_sort",
};

export type Format = "COMIC" | "SHOW" | "BOOK";

export interface Session {
  saga?: number; // aka season, volume
  act: number; // aka chapter, episode
  viewUrl?: string;
  createdAtMs: number;
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

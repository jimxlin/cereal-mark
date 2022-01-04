export const FORMAT = {
  COMIC: "comic_format",
  SHOW: "show_format",
  BOOK: "book_format",
};

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
  format: typeof FORMAT.COMIC | typeof FORMAT.SHOW | typeof FORMAT.BOOK;
  tags: Array<string>;
}

export interface Collection {
  id: string;
  name?: string;
  seriesItems: Array<SeriesItem>;
  updatedAtMs: number;
}

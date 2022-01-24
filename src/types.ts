export type Format = "COMIC" | "SHOW" | "BOOK";

export interface Session {
  saga?: number; // aka season, volume
  act: number; // aka chapter, episode
  createdAtMs: number;
}

export interface SeriesItem {
  title: string;
  sessions: Array<Session>;
  createdAtMs: number;
  updatedAtMs: number;
  archived: boolean;
  format: Format;
  viewUrl?: string;
}

export interface Collection {
  id: string;
  name?: string;
  seriesItems: Array<SeriesItem>;
  updatedAtMs: number;
}

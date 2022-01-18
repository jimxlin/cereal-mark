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

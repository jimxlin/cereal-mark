export const COMIC_FORMAT = "comicFormat";
export const SHOW_FORMAT = "showFormat";
export const BOOK_FORMAT = "bookFormat";

export interface View {
  saga?: number; // aka season, volume
  act: number; // aka chapter, episode
  createdAtMs: number;
  notes?: string;
}

export interface SeriesItem {
  title: string;
  views: Array<View>;
  createdAtMs: number;
  updatedAtMs: number;
  archived: boolean;
  format: typeof COMIC_FORMAT | typeof SHOW_FORMAT | typeof BOOK_FORMAT;
  tags: Array<string>;
}

export interface Collection {
  id: string;
  name?: string;
  seriesItems: Array<SeriesItem>;
  updatedAtMs: number;
}

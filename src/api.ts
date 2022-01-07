// TODO: use localStorage, and save localStorage data to database api
import { Collection } from "./types";

export const createCollection = (
  collectionId: string,
  collection: Collection
): Promise<Collection | null> =>
  new Promise((resolve, reject) => {
    const existingCollection = localStorage.getItem(collectionId);
    if (existingCollection) {
      reject(new Error("Collection already exists"));
    }
    localStorage.setItem(collectionId, JSON.stringify(collection));
    resolve(JSON.parse(localStorage.getItem(collectionId) || "null"));
  });

export const updateCollection = (
  collection: Collection
): Promise<Collection | null> =>
  new Promise((resolve, reject) => {
    const existingCollection = localStorage.getItem(collection.id);
    if (!existingCollection && typeof existingCollection !== "object") {
      reject(new Error("Collection does not exist"));
    }
    localStorage.setItem(collection.id, JSON.stringify(collection));
    resolve(JSON.parse(localStorage.getItem(collection.id) || "null"));
  });

export const getCollection = (
  collectionId: string
): Promise<Collection | null> =>
  new Promise((resolve, reject) => {
    const existingCollection = localStorage.getItem(collectionId);
    resolve(JSON.parse(existingCollection || "null"));
  });

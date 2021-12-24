import { createCollection } from "../api";
import { Collection } from "../types";
import { xxhash3 } from "hash-wasm";

type Props = {
  setIsLoading: (loading: boolean) => void;
  setError: (msg: string | undefined) => void;
  invalidCollection: boolean;
};

function Initialize({ setIsLoading, setError, invalidCollection }: Props) {
  const initialize = async (): Promise<void> => {
    setIsLoading(false);
    setError(undefined);
    let uniqueId: string = Date.now().toString();
    uniqueId = uniqueId + navigator.userAgent;
    uniqueId = uniqueId + Math.floor(Math.random() * 1000).toString();
    const collectionId = await xxhash3(uniqueId);
    const collection: Collection = {
      id: collectionId,
      name: "",
      seriesItems: [],
      updatedAtMs: Date.now(),
    };
    try {
      setIsLoading(true);
      await createCollection(collectionId, collection);
      window.location.pathname = collectionId;
    } catch (err) {
      setError(err instanceof Error ? err.message : JSON.stringify(err));
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Initialize Component</h1>
      <div>About CerealMark, etc...</div>
      {invalidCollection && <div>Not a valid URL.</div>}
      <div style={{ cursor: "pointer" }} onClick={initialize}>
        + Create a New List
      </div>
    </div>
  );
}

export default Initialize;

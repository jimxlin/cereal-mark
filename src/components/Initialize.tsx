import { useContext } from "react";
import { xxhash3 } from "hash-wasm";
import { createCollection } from "../api";
import { Collection } from "../types";
import { SetErrorContext } from "../App";

type Props = {
  setIsLoading: (loading: boolean) => void;
  enterDemoMode: () => void;
};

function Initialize({ setIsLoading, enterDemoMode }: Props) {
  const setError = useContext(SetErrorContext);
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
      <h1>CerealMark</h1>
      <p>
        Keep track of series that you are following. Your data is backed up in
        the cloud, just use your URL to access it.
      </p>
      <div>
        <button onClick={initialize}>Create a New List</button>
      </div>
      <div>
        <button onClick={enterDemoMode}>Try the Demo</button>
      </div>
    </div>
  );
}

export default Initialize;

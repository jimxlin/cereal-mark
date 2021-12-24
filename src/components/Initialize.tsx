import { createCollection } from "../api";
import { xxhash3 } from "hash-wasm";

type Props = {
  invalidCollection: boolean;
};

function Initialize({ invalidCollection }: Props) {
  const initialize = async (): Promise<void> => {
    let data: string = Date.now().toString();
    data = data + navigator.userAgent;
    data = data + Math.floor(Math.random() * 1000).toString();
    const collectionId = await xxhash3(data);
    await createCollection(collectionId);
    window.location.pathname = collectionId;
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

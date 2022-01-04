import { useState, useEffect, Fragment } from "react";
import { FORMAT, SeriesItem, Session } from "./types";
import { getCollection, updateCollection } from "./api";
import logo from "./logo.svg";
import "./App.css";
import ManageCollection from "./components/ManageCollection";
import SeriesList from "./components/SeriesList";
import Initialize from "./components/Initialize";
import Loading from "./components/Loading";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [collectionId, setCollectionId] = useState<string | undefined>(
    undefined
  );
  const [updatedAtMs, setUpdatedAtMs] = useState<number | undefined>(undefined);
  const [collectionName, setCollectionName] = useState<string | undefined>(
    undefined
  );
  const [seriesItems, setSeriesItems] = useState<Array<SeriesItem> | undefined>(
    undefined
  );
  const [invalidCollection, setInvalidCollection] = useState(false);

  // initial load
  useEffect((): void => {
    setError(undefined);
    const id = window.location.pathname.substring(1);
    if (id.length === 0) {
      setIsLoading(false);
      return;
    }
    // https://www.robinwieruch.de/react-hooks-fetch-data/
    const fetchData = async () => {
      try {
        const collection = await getCollection(id);
        if (!collection) {
          setInvalidCollection(true);
          setIsLoading(false);
          return;
        }
        setCollectionId(collection?.id);
        setCollectionName(collection?.name);
        setSeriesItems(collection?.seriesItems);
        setUpdatedAtMs(collection?.updatedAtMs);
        setIsLoading(false);
      } catch (err) {
        // TODO: generic error message in prod
        setError(err instanceof Error ? err.message : JSON.stringify(err));
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // save changes
  useEffect((): void => {
    // do not get triggered by initial load
    if (!collectionId || !seriesItems || !updatedAtMs) return;
    updateCollection({
      id: collectionId,
      name: collectionName,
      seriesItems,
      updatedAtMs,
    });
  }, [collectionName, seriesItems]);

  const updateCollectionName = (name: string): void => {
    setUpdatedAtMs(Date.now());
    setCollectionName(name);
  };

  const addSeries = (
    title: string,
    format: typeof FORMAT.COMIC | typeof FORMAT.SHOW | typeof FORMAT.BOOK,
    act: number,
    saga?: number
  ): void => {
    setUpdatedAtMs(Date.now());
    const firstSession = {
      saga,
      act,
      createdAtMs: Date.now(),
    };
    setSeriesItems([
      ...(seriesItems || []),
      {
        title: title,
        sessions: [firstSession],
        createdAtMs: Date.now(),
        updatedAtMs: Date.now(),
        archived: false,
        format: format,
        tags: [],
      },
    ]);
  };

  return (
    <div className="App">
      {error && <h1 style={{ color: "#f00" }}>ERROR: {error}</h1>}
      {isLoading && (
        <header
          className="App-header"
          style={{ display: isLoading ? "flex" : "none" }}
        >
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      )}
      {isLoading && <Loading />}
      {!isLoading && seriesItems ? (
        <Fragment>
          <ManageCollection
            addSeries={addSeries}
            collectionName={collectionName}
            updateCollectionName={updateCollectionName}
          />
          <SeriesList seriesItems={seriesItems} />
        </Fragment>
      ) : (
        <Initialize
          setIsLoading={setIsLoading}
          setError={setError}
          invalidCollection={invalidCollection}
        />
      )}
    </div>
  );
}

export default App;

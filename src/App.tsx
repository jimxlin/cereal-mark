import { useState, useEffect, Fragment, createContext } from "react";
import { Format, Collection, SeriesItem, Session } from "./types";
import { getCollection, backupCollection } from "./api";
import { validUrl } from "./helpers";
import demoData from "./demo-data";
import "./App.css";
import ManageCollection from "./components/ManageCollection";
import SeriesList from "./components/SeriesList";
import Initialize from "./components/Initialize";
import Loading from "./components/Loading";

export const SetErrorContext = createContext<any>(null);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [demoMode, setDemoMode] = useState(false);
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

  const hydrateCollection = (collection: Collection): void => {
    setCollectionId(collection.id);
    setCollectionName(collection.name);
    setSeriesItems(collection.seriesItems);
    setUpdatedAtMs(collection.updatedAtMs);
  };

  const initialLoad = (): void => {
    setError(undefined);
    const id = window.location.pathname.substring(1);
    if (id.length === 0) {
      setIsLoading(false);
      return;
    }
    // https://www.robinwieruch.de/react-hooks-fetch-data/
    const fetchData = async () => {
      try {
        const response = await getCollection(id);
        const collection = response.Item as Collection;
        if (!collection) {
          setError("Invalid URL");
          return;
        }

        hydrateCollection(collection);
        setIsLoading(false);
      } catch (err) {
        // TODO: generic error message in prod
        setError(err instanceof Error ? err.message : JSON.stringify(err));
        setIsLoading(false);
      }
    };
    fetchData();
  };
  useEffect(initialLoad, []);

  const saveChanges = (): void => {
    if (demoMode) return;
    // do not get triggered by initial load
    if (!collectionId || !seriesItems || !updatedAtMs) return;
    backupCollection({
      id: collectionId,
      name: collectionName,
      seriesItems,
      updatedAtMs,
    });
  };
  useEffect(saveChanges, [
    collectionId,
    collectionName,
    seriesItems,
    updatedAtMs,
  ]);

  const enterDemoMode = (): void => {
    setDemoMode(true);
    hydrateCollection(demoData);
  };

  const updateCollectionName = (name: string): void => {
    setUpdatedAtMs(Date.now());
    setCollectionName(name);
  };

  const addSeries = (
    title: string,
    format: Format,
    act: number,
    saga: number | undefined,
    viewUrl: string | undefined
  ): void => {
    const existingSeries = seriesItems?.filter(
      (item) => item.title === title
    )[0];
    if (existingSeries) {
      throw new Error("Cannot add series, title already exists");
    }
    if (viewUrl && !validUrl(viewUrl)) {
      throw new Error("Cannot add session, URL is invalid");
    }
    setUpdatedAtMs(Date.now());
    const firstSession: Session = {
      saga,
      act,
      viewUrl,
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

  const addSession = (
    seriesTitle: string,
    act: number,
    saga: number | undefined,
    viewUrl: string | undefined
  ): void => {
    const seriesItem = seriesItems?.filter(
      (item) => item.title === seriesTitle
    )[0];
    if (!seriesItem) {
      throw new Error("Cannot add session, series does not exist");
    }
    if (!seriesItem.sessions) {
      throw new Error("Cannot add session, sessions array does not exist");
    }
    if (seriesItem.sessions.length === 0) {
      throw new Error("Cannot add session, missing first session");
    }
    if (viewUrl && !validUrl(viewUrl)) {
      throw new Error("Cannot add session, URL is invalid");
    }
    setUpdatedAtMs(Date.now());
    const session: Session = {
      saga,
      act,
      viewUrl,
      createdAtMs: Date.now(),
    };
    setSeriesItems(
      seriesItems.map((item) => {
        if (item.title === seriesTitle) {
          return {
            ...item,
            sessions: [...item.sessions, session],
          };
        }
        return item;
      })
    );
  };

  const DemoStatus = () => (
    <div className="demo-bar">
      DEMO MODE{" "}
      <button
        onClick={() => {
          window.location.href = "/";
        }}
      >
        exit
      </button>
    </div>
  );

  return (
    <div className="App">
      {demoMode && <DemoStatus />}
      {error && (
        <h3 style={{ color: "#f00", position: "relative", zIndex: 10 }}>
          ERROR: {error}
        </h3>
      )}
      {isLoading && <Loading />}
      <SetErrorContext.Provider value={setError}>
        {!isLoading && seriesItems ? (
          <Fragment>
            <ManageCollection
              addSeries={addSeries}
              collectionName={collectionName}
              updateCollectionName={updateCollectionName}
            />
            <SeriesList seriesItems={seriesItems} addSession={addSession} />
          </Fragment>
        ) : (
          <Initialize
            setIsLoading={setIsLoading}
            enterDemoMode={enterDemoMode}
          />
        )}
      </SetErrorContext.Provider>
    </div>
  );
}

export default App;

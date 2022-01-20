import { useState, useEffect, useMemo, Fragment, createContext } from "react";
import { Format, Collection, SeriesItem, Session } from "./types";
import { SAVE_INTERVAL, DEFAULT_ERROR } from "./constants";
import { getCollection, updateCollection, backupCollection } from "./api";
import { useInterval } from "./hooks";
import { validUrl } from "./helpers";
import demoData from "./demo-data";
import "./App.css";
import DemoStatus from "./components/DemoStatus";
import ManageCollection from "./components/ManageCollection";
import SeriesList from "./components/SeriesList";
import Home from "./components/Home";
import ErrorView from "./components/ErrorView";
import LoadingView from "./components/LoadingView";

export const SetErrorContext = createContext<any>(null);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [demoMode, setDemoMode] = useState(false);
  const [collectionId, setCollectionId] = useState<string | undefined>(
    undefined
  );
  const [updatedAtMs, setUpdatedAtMs] = useState<number | undefined>(undefined);
  const [savedAtMs, setSavedAtMs] = useState<number>(Date.now());
  const [collectionName, setCollectionName] = useState<string | undefined>(
    undefined
  );
  const [seriesItems, setSeriesItems] = useState<Array<SeriesItem> | undefined>(
    undefined
  );
  const collection = useMemo(
    () =>
      !collectionId || !seriesItems || !updatedAtMs
        ? null
        : {
            id: collectionId,
            name: collectionName,
            seriesItems,
            updatedAtMs,
          },
    [collectionId, collectionName, seriesItems, updatedAtMs]
  );

  const changesSaved = !updatedAtMs || updatedAtMs < savedAtMs;

  const hydrateCollection = (collection: Collection): void => {
    setCollectionId(collection.id);
    setCollectionName(collection.name);
    setSeriesItems(collection.seriesItems);
    setUpdatedAtMs(collection.updatedAtMs);
  };

  const initialize = (): void => {
    setError(undefined);
    const id = window.location.pathname.substring(1);
    if (id.length === 0) {
      setIsLoading(false);
      return;
    }
    if (id === "demo") {
      setIsLoading(false);
      enterDemoMode();
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
        setError(err instanceof Error ? err.message : DEFAULT_ERROR);
        setIsLoading(false);
      }
    };
    fetchData();
  };
  useEffect(initialize, []);

  const backupChanges = (): void => {
    if (demoMode || !collection) return;
    backupCollection(collection);
  };
  useEffect(backupChanges, [demoMode, collection, updatedAtMs]);

  const saveChanges = (): void => {
    if (demoMode || !collection || changesSaved) return;
    updateCollection(collection)
      .then(() => setSavedAtMs(Date.now()))
      .catch(() => setError("Could not save changes."));
  };
  useInterval(saveChanges, SAVE_INTERVAL);

  // warning for unsaved changes
  useEffect(() => {
    const leavePageWarning = (e: BeforeUnloadEvent) => {
      if (!demoMode && collectionId && !changesSaved) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", leavePageWarning);
    return () => window.removeEventListener("beforeunload", leavePageWarning);
  }, [changesSaved, collectionId, demoMode]);

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

  return (
    <div className="App">
      {demoMode && <DemoStatus />}
      {error && <ErrorView error={error} />}
      {isLoading && <LoadingView />}
      {!isLoading && (
        <SetErrorContext.Provider value={setError}>
          {seriesItems ? (
            <Fragment>
              <ManageCollection
                addSeries={addSeries}
                collectionName={collectionName}
                updateCollectionName={updateCollectionName}
              />
              <SeriesList seriesItems={seriesItems} addSession={addSession} />
            </Fragment>
          ) : (
            <Home setIsLoading={setIsLoading} />
          )}
        </SetErrorContext.Provider>
      )}
    </div>
  );
}

export default App;

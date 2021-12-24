import { useState, useEffect } from "react";
import { Collection, SeriesItem } from "./types";
import { getCollection } from "./api";
import logo from "./logo.svg";
import "./App.css";
import Management from "./components/Management";
import SeriesList from "./components/SeriesList";
import Initialize from "./components/Initialize";
import Loading from "./components/Loading";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [collectionId, setCollectionId] = useState<string | undefined>(
    undefined
  );
  const [collectionName, setCollectionName] = useState<string | undefined>(
    undefined
  );
  const [seriesItems, setSeriesItems] = useState<Array<SeriesItem> | undefined>(
    undefined
  );
  const [invalidCollection, setInvalidCollection] = useState(false);

  useEffect(() => {
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
        setIsLoading(false);
      } catch (err) {
        // TODO: generic error message in prod
        setError(err instanceof Error ? err.message : JSON.stringify(err));
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
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
      {!isLoading && collectionId ? (
        <SeriesList />
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

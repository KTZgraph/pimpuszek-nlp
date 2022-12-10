"use client";
// https://www.youtube.com/watch?v=VjohMDwjty4&list=PL4cUxeGkcC9hUb6sHthUEwG7r9VDPBMKO&index=3
// https://youtu.be/VjohMDwjty4
import supabase from "../services/supabase/connector";
import { useEffect, useState } from "react";
import SmoothieCard from "../components/SmoothieCard";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);
  // sortowanie danych przez usera - nazwa pola z bazy - userowi dać selekt ze zmapowanymi danymi
  const [orderBy, setOrderBy] = useState("created_at");

  const handleDelete = (id) => {
    // odświeżenie uI po usunieciu
    setSmoothies((prevState) => {
      return prevState.filter((element) => element.id !== id);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      // select()
      // supabase.from("mojaTabela").select(); pustty sleec t- wszystko
      // const { data, error } = await supabase.from("smoothies").select();
      // sotruje po naziwe pola { ascending: false } standarodow domyslnie na true jest
      const { data, error } = await supabase
        .from("smoothies")
        .select()
        .order(orderBy, { ascending: false });

      if (error) {
        setFetchError("Could not fetch the smoothies");
        // dla pewnosci jak byly błędy to ustwiam na null
        setSmoothies(null);
        console.log(error);
      }

      if (data) {
        setSmoothies(data);
        // jak mieliśmy bład, to go zerujemy
        setFetchError(null);
      }
    };
    fetchData();
    // ale można na frocnie ogarnąć
    // orderBy jak się zmienic to refech UseEffectem
  }, [orderBy]);

  return (
    <div className="home">
      <h1>Hello główna strona tylko dla zalogowanych</h1>
      <hr />
      {fetchError && <p>{fetchError}</p>}
      {smoothies && (
        <div>
          {/* order by buttons */}
          <div className="order-by">
            Order by:
            <button onClick={() => setOrderBy("created_at")}>
              Time created
            </button>
            <button onClick={() => setOrderBy("title")}>Title</button>
            <button onClick={() => setOrderBy("rating")}>Rating</button>
            {orderBy}
          </div>
          <div>
            {smoothies.map((smoothie) => (
              <SmoothieCard
                key={smoothie.id}
                smoothie={smoothie}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

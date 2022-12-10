"use client";
import supabase from "../../services/supabase/connector";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Update = ({ params: { smoothieId } }) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    // WARNING pamiętać o dependency id i router
    const fetchSmoothie = async () => {
      const { data, error } = await supabase
        .from("smoothies")
        .select()
        .eq("id", smoothieId)
        .single(); //dodatkowy argument wtedy tylko jedno zwróci

      if (error) {
        // https://youtu.be/eyRdcNhDcI4?t=459
        router.push("/", { replace: true });
      }

      if (data) {
        setTitle(data.title);
        setMethod(data.method);
        setRating(data.rating);
        console.log(data);
      }
    };

    fetchSmoothie();
  }, [smoothieId, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // sprawdzamy czy user dał dane
    if (!title || !method || !rating) {
      setFormError("Please fill in all the fields correctly");
      return;
    }

    const { data, error } = await supabase
      .from("smoothies")
      .update({ title, method, rating })
      .eq("id", smoothieId)
      .select(); //select żeby zwrócić rekord

    if (error) {
      console.log(error);
      setFormError("Nie udało się zaktyualizować przepisu");
    }
    if (data) {
      console.log(data);
      setFormError(null);
      router.push("/");
    }
  };

  return (
    <div>
      <h2>smoothieId: {smoothieId}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Method:</label>
        <textarea
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Zaktualizuj przepis</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Update;

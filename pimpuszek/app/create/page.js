"use client";

import supabase from "../../services/supabase/connector";
import { useRouter } from "next/navigation";

import { useState } from "react";

const Create = () => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // sprawdzamy czy user dał dane
    if (!title || !method || !rating) {
      setFormError("Please fill in all the fields correctly");
      return;
    }
    // data - nowo dodany wiersz; insert([]) zawsze array - każdy obiekt to jeden wiersz
    // const { data, error } = await supabase.from("smoothies").insert([{}, {}, {}]);
    const { data, error } = await supabase
      .from("smoothies")
      .insert([{ title, method, rating }])
      .select();

    if (error) {
      console.log(error);
      setFormError("Please fill in all the fields correctly");
    }
    if (data) {
      console.log(data);
      setFormError(null);
      router.push("/");
    }
  };

  return (
    <div>
      <h2>Create</h2>
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

        <button>Create Smoothie Recipe</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Create;

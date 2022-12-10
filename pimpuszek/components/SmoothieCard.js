import supabase from "../services/supabase/connector";

import Link from "next/link";
import React from "react";

const SmoothieCard = ({ smoothie, onDelete }) => {
  const handleClick = async () => {
    const { data, error } = await supabase
      .from("smoothies")
      .delete()
      .eq("id", smoothie.id)
      .select();

    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
      // aktualizacja stanu UI
      // WARNING oba idki sa takie same, wiec tak tutaj mogę zrobić
      // onDelete(data.id);
      onDelete(smoothie.id);
    }
  };

  return (
    <div>
      <h3>{smoothie.title}</h3>
      <p>{smoothie.method}</p>
      <div>{smoothie.rating}</div>
      <div className="buttons">
        <Link href={`/${smoothie.id}`}>Edytuj</Link>
        <p onClick={handleClick}>USUŃ (to nie jest link)</p>
      </div>
    </div>
  );
};

export default SmoothieCard;

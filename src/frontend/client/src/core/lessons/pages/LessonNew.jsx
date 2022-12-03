import { useState } from "react";
import { createLesson } from "../../../api/lessons/pages";

const InputBlock = ({ label, name, type, value, onChange }) => {
  return (
    <div className="lesson-new__input">
      <label htmlFor={name}>{label}:</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};

const LessonNew = () => {
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    class_date: "",
    title: "",
    description: "",
  });

  const handleClick = async () => {
    setError("");
    setInfo("");
    console.log("tworzy nową lekcję");
    console.log(formData);
    try {
      const response = await createLesson(
        formData.name,
        formData.number,
        formData.class_date,
        formData.title,
        formData.description
      );

      console.log("LessonNew response: ", response.message);
      setInfo(response.message);

      //   jak się uda to przekierowanie na inną stronę
    } catch (err) {
      console.log("LessonNew error: ", err.response.data.details);
      setError(err.response.data.error + "|" + err.response.data.details);
    }
  };

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="lesson-new">
      <h1>Tworzy nową leckję</h1>

      <InputBlock
        label="name"
        name="name"
        type="text"
        onChange={handleChange}
      />

      {/* FIXME - ograniczenie na numery lekcyjne */}
      <InputBlock
        label="number"
        name="number"
        type="number"
        onChange={handleChange}
      />

      <InputBlock
        label="Data zajęć"
        name="class_date"
        type="text"
        onChange={handleChange}
      />

      <InputBlock
        label="Tytuł lekcji"
        name="title"
        type="text"
        onChange={handleChange}
      />

      <InputBlock
        label="Opis lekcji"
        name="description"
        type="text"
        onChange={handleChange}
      />

      <code>
        <p>
          {JSON.stringify({
            name: "lekcja 1",
            number: 1,
            class_date: "2022-12-29",
            title: "tytul lekcji 1",
            description: "jakis opis lekcji pierwszej",
          })}
        </p>
      </code>
      <button onClick={handleClick}>Utwórz nowa lekcję</button>
      {error ? <p>Error: {error}</p> : null}
      {info ? <p>Info z backendu: {info}</p> : null}
    </div>
  );
};

export default LessonNew;

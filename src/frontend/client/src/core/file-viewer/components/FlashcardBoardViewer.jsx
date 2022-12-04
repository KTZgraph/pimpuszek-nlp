import FlashCard from "./FlashCard";

const FlashcardBoardViewer = ({ fileData }) => {
  console.log(fileData);
  return (
    <div className="card-grid">
      {fileData.data.map((row) => {
        return (
          <FlashCard
            question={row.question}
            answer={row.answer}
            type={row.type}
            key={row.row_id}
          />
        );
      })}
    </div>
  );
};

export default FlashcardBoardViewer;

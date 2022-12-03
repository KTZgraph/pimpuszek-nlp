class QuizCreator:
    def __init__(
        self, raw_data, question_column_list, answer_column_list, example_column_list
    ) -> None:
        self.raw_data = raw_data
        self.question_column_list = question_column_list
        self.answer_column_list = answer_column_list
        self.example_column_list = example_column_list

        self.quiz_data = self.get_quiz_data()

    def get_quiz_data(self):
        quiz_list = []

        for row_id, row in enumerate(self.raw_data):
            # pytania oddzielone
            question_value = [row[q] for q in self.question_column_list]
            question_value = " | ".join(question_value)

            answer_value = [row[a] for a in self.answer_column_list]
            answer_value = " | ".join(answer_value)

            example_value = [row[e] for e in self.example_column_list]
            example_value = " | ".join(example_value)

            quiz_list.append(
                {
                    "row_id": row_id,
                    "question": question_value,
                    "answer": answer_value,
                    "example": example_value,
                    # liczba prób
                    "tries": 0,
                    # suma punktów
                    "scores": 0,
                }
            )

        return quiz_list

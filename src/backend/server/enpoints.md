```sh
python manage.py migrate lessons --database=lessons
```

# 1. Lekcje - foldery

## 1.1 GET http://localhost:8000/api/lessons/

- zwraca wszsytkie lekcje będące folderami

```json
"lista folderow które są lekcjami ['lesson_1', 'lesson_2', 'lesson_3']"
```

## 1.2 POST http://127.0.0.1:8000/api/lessons/

- tworzenie nowej lekcji - dokładnie nowego folderu

```json
{
  "name": "lekcja 1",
  "number": 1,
  "class_date": "2022-12-29",
  "title": "tytul lekcji 1",
  "description": "jakis opis lekcji pierwszej"
}
```

```json
{
  "name": "lekcja 2",
  "number": 2,
  "class_date": "2022-12-29",
  "title": "tytul lekcji 2",
  "description": "jakis opis lekcji drugiej"
}
```

```json
{
  "name": "lekcja 3",
  "number": 3,
  "class_date": "2022-12-29",
  "title": "tytul lekcji 3",
  "description": "jakis opis lekcji trzeciej"
}
```

# 2. Pliki Lekcji

## 2.1 GET http://localhost:8000/api/lessons/files/

- Pobieranie wszysktich plików dla lekcji

```json
"Pliki: [{'lesson': 'lesson_1', 'files': ['lekcja 1 09_11_2022.xlsx']}, {'lesson': 'lesson_2', 'files': ['lekcja 1 09_11_2022.xlsx']}, {'lesson': 'lesson_3', 'files': ['lekcja 1 09_11_2022.xlsx', 'kotek.jfif']}]"
```

## 2.2 POST http://localhost:8000/api/lessons/files/

- dodanie pliku do lekcji po nazwie lekcji
- POSTMAN form-data

```json
{
  "lesson_name": "lesson_1",
  "lesson_file": "<plik przez form-data>"
}
```

# 3. Pliki excel

## 3.1 GET http://localhost:8000/api/lessons/files/xlsx?filename=lekcja 1 09_11_2022.xlsx

- pobranie wszystkich lekcji po nazwie pliku

```json
"Wszytkie lekcje w których plik <QuerySet [<LessonFile: lekcja 1 09_11_2022.xlsx>, <LessonFile: lekcja 1 09_11_2022.xlsx>, <LessonFile: lekcja 1 09_11_2022.xlsx>, <LessonFile: kotek.jfif>]> się znajduje"
```

## 3.2 GET http://localhost:8000/api/lessons/files/xlsx?filename=lekcja 1 09_11_2022.xlsx&lesson=lesson_3

- pobieranie wszsytkich plików o tej nazwie w danych folderze (pliki po nazwie są unikalne)

```json
"Pli: ['lekcja 1 09_11_2022.xlsx']"
```

## 3.3 GET http://localhost:8000/api/lessons/files/xlsx?lesson=lesson_1

- pliki excel dla lekcji

```json
"Pliki excel dla lekcji lesson_1: ['lekcja_1_09_11_2022.xlsx']"
```

# 4. Plik excel do JSON

## 4.1 GET http://localhost:8000/api/lessons/files/xlsx-json?filename=lekcja_1_09_11_2022.xlsx&lesson=lesson_1

# FIXME - nazwy plików z podłogą

# 5. Notion

## 5.1 GET http://127.0.0.1:8000/api/lessons/notion/

- notion pobieranie plików zrobionych na podstawie Notion

## 5.2 POST http://127.0.0.1:8000/api/lessons/notion/

- notion zapisywanie pliku z urla jako json - potem będzie do quizów przydatne
- TODO scrapowanie wymowy ze słowników

```json
{
  "lesson_name": "lesson_1",
  "notion_url": "https://www.notion.so/ae9f91e6a3fe476b95ea6d9eae4c4376?v=b244c91401544d689e2242610fa70026",
  "notion_filename": "słówka",
  "question_column": "polski",
  "answer_column": "niemiecki",
  "type_column": "Select"
}
```

## 5.3 GET http://127.0.0.1:8000/api/lessons/notion?lesson=lesson_1

- pobieranie plikow notion dla lekcji

## 5.4 GET http://127.0.0.1:8000/api/lessons/notion/

- pobieranie wszsytkich plików stworoznych przez notion

## 5.4 GET http://127.0.0.1:8000/api/lessons/notion?lesson=lesson_1&notion_filename=słówka.json

- zwracanie jsona z pliku - nawet polskie znaki ogarnia w parametrze

## 6.1 GET http://127.0.0.1:8000/api/lessons/notion-quiz-data?lesson_name=lesson_6&quiz_filename=slowka_quiz_z_all_columns

- http://localhost:3000/lessons/lesson_6/notion-quiz/slowka_quiz_z_all_columns

## 6.2 POST http://127.0.0.1:8000/api/lessons/notion-quiz/

```json
{
  "lesson_name": "lesson_3",
  "notion_url": "https://www.notion.so/f12567bbeab4466e8be3c0f86506936b?v=5ae25c96838d4da683a389dc5594d441",
  "quiz_filename": "slowka_quiz_z_typem",
  "all_columns": ["niemiecki", "polski", "Select"],
  "type_column_name": "Select",
  "question_column_list": ["polski"],
  "answer_column_list": ["niemiecki"],
  "example_column_list": []
}
```

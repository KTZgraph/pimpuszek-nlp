# 1. tworzenie projektu
- mkdir backend
- cd backend
- pimpuszek\backend>python -m venv env
- pimpuszek\backend>env\Scripts\activate.bat

# 2. Instalacja bibliotek
- pip install django djangorestframework Pillow psycopg2 djangorestframework-simplejwt

# 3. Zapis zaisntalowanych bibliotek do pliku
- pimpuszek\backend>pip freeze > requirements.txt

# 4. Stworzenie projektu Django
- pimpuszek\backend>django-admin startproject core .

# 5. Tworzenie aplikacji 

- pimpuszek\backend>mkdir apps

## user
- pimpuszek\backend>mkdir apps\user #tworzy folder dla aplikacji
- pimpuszek\backend>python manage.py startapp user apps\user  #tworzy apkę w odpowiednim folderze

## common_weakness_enumeration

- pimpuszek\backend>mkdir apps\common_weakness_enumeration
- pimpuszek\backend>python manage.py startapp common_weakness_enumeration apps\common_weakness_enumeration

## common_vulnerability_enumeration

- pimpuszek\backend>mkdir apps\common_vulnerability_enumeration
- pimpuszek\backend>python manage.py startapp common_vulnerability_enumeration apps\common_vulnerability_enumeration

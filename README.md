Para o backend
cd sol 
cd backend 
.\venv-backend\Scripts\activate
pip install -r requirements.txt
python .\manage.py makemigrations
python .\manage.py migrate
python .\manage.py runserver



-----------------------------------------
Para o front
cd sol
cd frontend
npm run dev



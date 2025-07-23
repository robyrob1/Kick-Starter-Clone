FROM python:3.9.18-alpine3.18

RUN apk add --no-cache build-base postgresql-dev gcc python3-dev musl-dev

ARG FLASK_APP
ARG FLASK_ENV
ARG DATABASE_URL
ARG SCHEMA
ARG SECRET_KEY

WORKDIR /var/www

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt
RUN pip install psycopg2

COPY . .

# Apply migrations
RUN flask db upgrade

# Seed the database (without undo to avoid errors during build)
RUN flask seed all

CMD ["gunicorn", "app:app"]
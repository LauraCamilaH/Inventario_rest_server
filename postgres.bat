@echo off

docker rm -fv inventario-pg

docker volume create inventario-pg-data

docker run -it --rm ^
--name inventario-pg ^
-e POSTGRES_USER=pg ^
-e POSTGRES_DB=inventario ^
-e POSTGRES_PASSWORD=Asdf1234$ ^
-v inventario-pg-data:/var/lib/postgresql/data ^
-p 5432:5432 ^
postgres

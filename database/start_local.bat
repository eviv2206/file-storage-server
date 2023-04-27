@echo off

echo #### Start mysql container ####
call docker-compose -f docker-compose.yml up

echo #### Enviroment status ####
docker-compose ps

cmd /k

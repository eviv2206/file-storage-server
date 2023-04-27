@echo off
echo #### Delete docker-compose containers #### 
call docker-compose down -v --rmi all --remove-orphans

echo #### Recreate containers ####
call start_local.bat

cmd /k

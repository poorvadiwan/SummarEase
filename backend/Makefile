.PHONY: rs
rs:
	-   python manage.py runserver


.PHONY: mm
mm:
	-   sudo docker exec -it django python manage.py makemigrations


.PHONY: mmig
mmig:
	-   sudo docker exec -it django python manage.py makemigrations summar_ease


.PHONY: mig
mig:
	-   sudo docker exec -it django python manage.py migrate


.PHONY: shell
shell:
	-   sudo docker exec -it django python manage.py shell


.PHONY: mpyhelp
mpyhelp:
	-   sudo docker exec -it django python manage.py --help


.PHONY: offpg
offpg:
	- sudo systemctl stop postgresql


.PHONY: dub
dub:
	- sudo docker-compose -f docker-compose.prod.yml up  --build


.PHONY: ddown
ddown:
	- sudo docker-compose -f docker-compose.prod.yml down -v


.PHONY: dlogsdjango
dlogsdjango:
	- sudo docker logs -f django


.PHONY: createpg
createpg:
	- sudo docker run -p 5432:5432 -d --name postgres --network SummarEase-Backend-Network -e POSTGRES_PASSWORD=postgres postgres


.PHONY: dps
dps:
	- sudo docker ps


.PHONY: getinpg
getinpg:
	- sudo docker exec -it postgres /bin/bash


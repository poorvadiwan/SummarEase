.PHONY: rs
rs:
	- poetry run python manage.py runserver


.PHONY: mm
mm:
	- poetry run python manage.py makemigrations


.PHONY: mmig
mmig:
	- poetry run python manage.py makemigrations $(app)


.PHONY: mig
mig:
	- poetry run python manage.py migrate


.PHONY: shell
shell:
	- poetry run python manage.py shell


.PHONY: mpyhelp
mpyhelp:
	- poetry run python manage.py --help


.PHONY: offpg
offpg:
	- sudo systemctl stop postgresql


.PHONY: dub
dub:
	- sudo docker-compose -f docker-compose.prod.yml up -d --build


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


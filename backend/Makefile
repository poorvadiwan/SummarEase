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
	- sudo docker-compose -f docker-compose.yml up -d --build


.PHONY: ddown
ddown:
	- sudo docker-compose -f docker-compose.yml down -v


.PHONY: dlogsdjango
dlogs:
	- sudo docker logs -f django



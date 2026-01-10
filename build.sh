#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

python manage.py collectstatic --no-input
python manage.py migrate

# Create superuser if not exists (username: admin, password: pass)
python manage.py shell << END
from django.contrib.auth import get_user_model; User = get_user_model();
if not User.objects.filter(username='admin').exists():
	User.objects.create_superuser('akbiplob@', '', 'qQpR28a2gVJmGWY')
END

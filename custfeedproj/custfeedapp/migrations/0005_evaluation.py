# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('custfeedapp', '0004_employee_resource'),
    ]

    operations = [
        migrations.CreateModel(
            name='Evaluation',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, verbose_name='ID', primary_key=True)),
                ('owner', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
                ('resource', models.ForeignKey(to='custfeedapp.Resource')),
            ],
        ),
    ]

# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('custfeedapp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='office',
            name='owner',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL, related_name='offices', default=1),
            preserve_default=False,
        ),
    ]

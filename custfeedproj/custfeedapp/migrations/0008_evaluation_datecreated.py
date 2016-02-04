# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.utils.timezone import utc
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('custfeedapp', '0007_userprofile'),
    ]

    operations = [
        migrations.AddField(
            model_name='evaluation',
            name='datecreated',
            field=models.DateTimeField(default=datetime.datetime(2016, 1, 31, 19, 48, 38, 847021, tzinfo=utc), auto_now_add=True),
            preserve_default=False,
        ),
    ]

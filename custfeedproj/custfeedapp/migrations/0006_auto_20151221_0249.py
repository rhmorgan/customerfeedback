# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('custfeedapp', '0005_evaluation'),
    ]

    operations = [
        migrations.AddField(
            model_name='evaluation',
            name='comments',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='evaluation',
            name='grade',
            field=models.IntegerField(default=3),
        ),
    ]

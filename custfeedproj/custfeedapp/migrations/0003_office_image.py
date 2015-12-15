# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('custfeedapp', '0002_office_owner'),
    ]

    operations = [
        migrations.AddField(
            model_name='office',
            name='image',
            field=models.ImageField(default=1, upload_to='images/officethumbs/'),
            preserve_default=False,
        ),
    ]

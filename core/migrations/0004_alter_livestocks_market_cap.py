# Generated by Django 3.2.8 on 2021-10-17 22:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_auto_20211018_0420'),
    ]

    operations = [
        migrations.AlterField(
            model_name='livestocks',
            name='market_cap',
            field=models.BigIntegerField(blank=True, null=True),
        ),
    ]

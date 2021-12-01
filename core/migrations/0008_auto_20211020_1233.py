# Generated by Django 3.2.8 on 2021-10-20 07:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0007_portfoliorecords_symbol'),
    ]

    operations = [
        migrations.AlterField(
            model_name='portfoliorecords',
            name='notes',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='portfoliorecords',
            name='trade_date',
            field=models.DateField(auto_now_add=True),
        ),
    ]
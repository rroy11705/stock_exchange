# Generated by Django 3.2.8 on 2021-10-14 10:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_auto_20211013_1729'),
    ]

    operations = [
        migrations.AlterField(
            model_name='livestocks',
            name='change',
            field=models.FloatField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='livestocks',
            name='change_percent',
            field=models.FloatField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='livestocks',
            name='days_range',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='livestocks',
            name='dividend',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='livestocks',
            name='fifty_two_week_range',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='livestocks',
            name='market_cap',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='livestocks',
            name='name',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='livestocks',
            name='open_value',
            field=models.FloatField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='livestocks',
            name='prev_close_value',
            field=models.FloatField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='livestocks',
            name='prev_dividend_date',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='livestocks',
            name='price',
            field=models.FloatField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='livestocks',
            name='symbol',
            field=models.CharField(editable=False, max_length=50, primary_key=True, serialize=False),
        ),
    ]

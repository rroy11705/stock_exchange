# Generated by Django 3.2.8 on 2021-10-19 21:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('core', '0004_alter_livestocks_market_cap'),
    ]

    operations = [
        migrations.CreateModel(
            name='Portfolio',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('portfolio_name', models.CharField(blank=True, max_length=500, null=True)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('updatedAt', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.RemoveField(
            model_name='livestocks',
            name='change',
        ),
        migrations.CreateModel(
            name='PortfolioRecords',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('trade_date', models.DateTimeField(auto_now_add=True)),
                ('shares', models.FloatField(blank=True, max_length=50, null=True)),
                ('cost_per_share', models.FloatField(blank=True, max_length=50, null=True)),
                ('notes', models.TextField(blank=True)),
                ('portfolio', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='core.portfolio')),
            ],
        ),
    ]
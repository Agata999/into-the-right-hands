from django.contrib.auth.models import User
from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=64)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Categories'


class Institution(models.Model):
    TYPE_FOUNDATION = 0
    TYPE_NGO = 1
    TYPE_LOCAL_COLLECTION = 2

    TYPES = (
        (TYPE_FOUNDATION, 'fundacja'),
        (TYPE_NGO, 'organizacja pozarządowa'),
        (TYPE_LOCAL_COLLECTION, 'zbiórka lokalna')
    )

    name = models.CharField(max_length=64, null=False)
    description = models.TextField(null=False)
    type = models.IntegerField(choices=TYPES, default=0)
    categories = models.ManyToManyField(Category, related_name='institutions')

    def __str__(self):
        return self.name


class Donation(models.Model):
    quantity = models.PositiveSmallIntegerField()
    categories = models.ManyToManyField(Category, related_name='donations')
    institution = models.ForeignKey(Institution, on_delete=models.PROTECT, related_name='donations')
    address = models.CharField(max_length=128)
    phone_number = models.CharField(max_length=11)
    city = models.CharField(max_length=64)
    zip_code = models.CharField(max_length=12)
    pick_up_date = models.DateField()
    pick_up_time = models.TimeField()
    pick_up_comment = models.CharField(max_length=256, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.PROTECT, related_name='donations', null=True, blank=True)

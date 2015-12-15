from django.contrib import admin

# Register your models here.
from custfeedapp.models import Office
from custfeedapp.models import Employee
from custfeedapp.models import Resource

admin.site.register(Employee)
admin.site.register(Office)
admin.site.register(Resource)

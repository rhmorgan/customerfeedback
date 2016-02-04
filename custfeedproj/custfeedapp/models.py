from django.db import models
from django.contrib.auth.models import User
from django.db.models import Sum
from django.db.models import Avg
from django.db.models import Count


# Create your models here.
class Office(models.Model):
	title = models.CharField(max_length=255)
	street = models.CharField(max_length=255)
	city = models.CharField(max_length=255)
	state = models.CharField(max_length=2)
	zip = models.CharField(max_length=10)
	latitude = models.DecimalField(max_digits=10, decimal_places=6)
	longitude = models.DecimalField(max_digits=10, decimal_places=6)
	picture = models.FileField
	image = models.ImageField(upload_to="images/officethumbs/")
	active_ind = models.BooleanField
	created_at = models.DateTimeField(auto_now_add=True)
	owner = models.ForeignKey('auth.User', related_name='offices')
	
	def save(self, *args, **kwargs):
		super(Office, self).save(*args, **kwargs)
		
		
	def __str__(self):
		return self.title
				
		
class Employee(models.Model):
	first_name = models.CharField(max_length=255)
	middle_name = models.CharField(max_length=255)	
	last_name = models.CharField(max_length=255)
	position = models.CharField(max_length=255)
	picture = models.ImageField(upload_to="images/officethumbs/")
	
	def __str__(self):
	        return '%s %s' % (self.first_name, self.last_name)


	
class Resource(models.Model):
	employee = models.ForeignKey(Employee) 
	office = models.ForeignKey(Office)


	def __str__(self):
	        return '%s - %s' % (self.employee, self.office)

	@property
	def get_grades(self):
		return Evaluation.objects.filter(resource__id=self.id).aggregate(
			count_grades = Count('grade'),
			sum_grades = Sum('grade'),
			avg_grades = Avg('grade'),
			)

class Evaluation(models.Model):
	resource = models.ForeignKey(Resource)
	owner = models.ForeignKey('auth.User')
	grade = models.IntegerField(blank=False, null=False, default=3)
	comments = models.TextField(blank=True, null=False)
	datecreated = models.DateTimeField(auto_now_add=True)

	def __str__(self):
	        return '%s - %s - %s' % (self.resource, self.owner, self.grade)

class UserProfile(models.Model):
    # This line is required. Links UserProfile to a User model instance.
	user = models.OneToOneField(User)
	office = models.ForeignKey(Office)

	def __str__(self):
	        return '%s - %s' % (self.user, self.office)

    # Override the __unicode__() method to return out something meaningful!
	def __unicode__(self):
		return self.user.username
	
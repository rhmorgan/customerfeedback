from django.db import models

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
	
class Resource(models.Model):
	employee = models.ForeignKey(Employee) 
	office = models.ForeignKey(Office)

#class Evaluation(models.Model):
#	resource = models.ForeignKey(Resource)
#	owner = models.ForeignKey('auth.User')
#	grade = models.IntegerField
#	comments = models.TextField
	
	
from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
#from django_filters import *
from rest_framework import filters
#from django-crispy-forms import *

from django.http import HttpResponse
#from django.views.decorators.csrf import csrf_exempt
#from rest_framework.renderers import JSONRenderer
#from rest_framework.parsers import JSONParser

from custfeedapp.models import Office, Resource, Evaluation
from django.contrib.auth.models import User
from custfeedapp.serializers import OfficeSerializer
from custfeedapp.serializers import UserSerializer
from custfeedapp.serializers import ResourceSerializer
from custfeedapp.serializers import EvaluationSerializer

from rest_framework import generics
from rest_framework import permissions
from custfeedapp.permissions import IsOwnerOrReadOnly
#from django.http import Http404
#from rest_framework.views import APIView
#from rest_framework import status


from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework import viewsets


class UserViewSet(viewsets.ReadOnlyModelViewSet):
	queryset = User.objects.all()
	serializer_class=UserSerializer
	
class OfficeViewSet(viewsets.ModelViewSet):
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
	queryset = Office.objects.all()
	serializer_class = OfficeSerializer

	def perform_create(self, serializer):
	    serializer.save(owner=self.request.user)

class ResourceViewSet(viewsets.ModelViewSet):
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
	queryset = Resource.objects.all()
	serializer_class = ResourceSerializer
	filter_backends = (filters.DjangoFilterBackend,)
	filter_fields = ('id', 'office', 'employee')

class EvaluationViewSet(viewsets.ModelViewSet):
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
	queryset = Evaluation.objects.all()
	serializer_class = EvaluationSerializer
	filter_backends = (filters.DjangoFilterBackend,)
	filter_fields = ('id','resource', 'owner', 'grade')

	def perform_create(self, serializer):
	    serializer.save(owner=self.request.user)
"""
@api_view(('GET',))
def api_root(request,format=None):
	return Response({
		'users': reverse('user-list', request=request, format=format),
		'offices': reverse('office-list', request=request, format=format)
	})

class OfficeList(generics.ListCreateAPIView):
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
	queryset = Office.objects.all()
	serializer_class = OfficeSerializer

	def perform_create(self, serializer):
	    serializer.save(owner=self.request.user)

class OfficeDetail(generics.RetrieveUpdateDestroyAPIView):
	permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly, )
	queryset = Office.objects.all()
	serializer_class = OfficeSerializer


class UserList(generics.ListAPIView):
	queryset = User.objects.all()
	serializer_class = UserSerializer
	
class UserDetail(generics.RetrieveAPIView):
	queryset = User.objects.all()
	serializer_class = UserSerializer

class OfficeList(APIView):
	def get(self, request, format=None):
		offices = Office.objects.all()
		serializer = OfficeSerializer(offices, many=True)
		return Response(serializer.data)
		
	def post(self, request, format=None):
		serializer = OfficeSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
		

class OfficeDetail(APIView):

	def get_object(self, pk):	
		try:
			return Office.objects.get(pk=pk)
		except Office.DoesNotExist:
			raise Http404
		
	def get(self, request, pk, format=None):
		office = self.get_object(pk) 
		serializer = OfficeSerializer(office)
		return Response(serializer.data)

	def put(self, request, pk, format=None):
		office = self.get_object(pk)
		serializer = OfficeSerializer(office, data=request.data)
		if serializer.is_valid():
		   serializer.save()
		   return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
		
	def delete(self, request, pk, format=None):
		office = self.get_object(pk) 
		office.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)

"""

"""

def index(request):
	return HttpResponse('Rhodri says this is my app')

	"""


@csrf_protect
@ensure_csrf_cookie
def index(request):
#    user = authenticate(username='david', password='muncie')
#    if user is not None:
#        login(request, user)
        return render(request, 'custfeedapp/indexn.html')






from custfeedapp.forms import UserForm
from django.template import RequestContext
from django.shortcuts import render

def register(request):
  # Like before, get the request's context.
  context = RequestContext(request)

  # A boolean value for telling the template whether the registration was successful.
  # Set to False initially. Code changes value to True when registration succeeds.
  registered = False

  # If it's a HTTP POST, we're interested in processing form data.
  if request.method == 'POST':
      # Attempt to grab information from the raw form information.
      # Note that we make use of both UserForm and UserProfileForm.
      user_form = UserForm(data=request.POST)

      # If the two forms are valid...
      if user_form.is_valid():
          # Save the user's form data to the database.
          user = user_form.save()

          # Now we hash the password with the set_password method.
          # Once hashed, we can update the user object.
          user.set_password(user.password)
          user.save()

          # Update our variable to tell the template registration was successful.
          registered = True

      # Invalid form or forms - mistakes or something else?
      # Print problems to the terminal.
      # They'll also be shown to the user.
      else:
          print(user_form.errors)

  # Not a HTTP POST, so we render our form using two ModelForm instances.
  # These forms will be blank, ready for user input.
  else:
      user_form = UserForm()

  # Render the template depending on the context.
  #return render_to_response(
  #        'custfeedapp/register.html',
  #        {'user_form': user_form, 'registered': registered},
  #        context)

  return render(request, 'custfeedapp/register.html', {'user_form': user_form, 'registered': registered})


from django.contrib.auth import authenticate, login
from django.http import HttpResponseRedirect, HttpResponse

def user_login(request):

    # If the request is a HTTP POST, try to pull out the relevant information.
    if request.method == 'POST':
        # Gather the username and password provided by the user.
        # This information is obtained from the login form.
                # We use request.POST.get('<variable>') as opposed to request.POST['<variable>'],
                # because the request.POST.get('<variable>') returns None, if the value does not exist,
                # while the request.POST['<variable>'] will raise key error exception
        username = request.POST.get('username')
        password = request.POST.get('password')

        # Use Django's machinery to attempt to see if the username/password
        # combination is valid - a User object is returned if it is.
        user = authenticate(username=username, password=password)

        # If we have a User object, the details are correct.
        # If None (Python's way of representing the absence of a value), no user
        # with matching credentials was found.
        if user:
            # Is the account active? It could have been disabled.
            if user.is_active:
                # If the account is valid and active, we can log the user in.
                # We'll send the user back to the homepage.
                login(request, user)
                return HttpResponseRedirect('/custfeedapp/')
            else:
                # An inactive account was used - no logging in!
                return HttpResponse("Your account is disabled.")
        else:
            # Bad login details were provided. So we can't log the user in.
            print("Invalid login details: {0}, {1}".format(username, password))
            return HttpResponse("Invalid login details supplied.")

    # The request is not a HTTP POST, so display the login form.
    # This scenario would most likely be a HTTP GET.
    else:
        # No context variables to pass to the template system, hence the
        # blank dictionary object...
        return render(request, 'custfeedapp/login.html', {})

from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required

# Use the login_required() decorator to ensure only those logged in can access the view.
@login_required
def user_logout(request):
    # Since we know the user is logged in, we can now just log them out.
    logout(request)
    print("Start")
    print(request)
    print("End")

    # Take the user back to the homepage.
    return HttpResponseRedirect('/custfeedapp/')

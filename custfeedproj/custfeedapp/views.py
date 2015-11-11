from django.http import HttpResponse
#from django.views.decorators.csrf import csrf_exempt
#from rest_framework.renderers import JSONRenderer
#from rest_framework.parsers import JSONParser

from custfeedapp.models import Office
from django.contrib.auth.models import User
from custfeedapp.serializers import OfficeSerializer
from custfeedapp.serializers import UserSerializer


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

def index(request):
	return HttpResponse('Rhodri says this is my app')




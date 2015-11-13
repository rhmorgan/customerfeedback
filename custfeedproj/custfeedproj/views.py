from django.http import HttpResponse

def index(request):
	return HttpResponse("Rhodri says hello world?OK this is where it is going")

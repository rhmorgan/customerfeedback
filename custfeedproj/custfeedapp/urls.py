from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns
from custfeedapp import views

from rest_framework.routers import DefaultRouter

from django.contrib import admin #this was in tweeter

"""
urlpatterns = [
#	url(r'^$', views.index),
	url(r'^offices/$', views.OfficeList.as_view(),
		name='office-list'),
	url(r'^offices/(?P<pk>[0-9]+)/$', views.OfficeDetail.as_view(),
		name='office-detail'),
	url(r'^users/$', views.UserList.as_view(),
		name = 'user-list'),
	url(r'^users/(?P<pk>[0-9]+)/$', views.UserDetail.as_view(),
		name = 'user-detail'),
	url(r'^$', views.api_root)
]

urlpatterns = format_suffix_patterns(urlpatterns)
"""

admin.autodiscover() #Added from tweeter

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'offices', views.OfficeViewSet)
router.register(r'resources', views.ResourceViewSet)
router.register(r'users', views.UserViewSet)
router.register(r'evaluations', views.EvaluationViewSet)
router.register(r'topemployees', views.TopEmployeesViewSet)




# The API URLs are now determined automatically by the router.
# Additionally, we include the login URLs for the browsable API.
urlpatterns = [
	url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
	url(r'^$', views.index, name='index'),
	url(r'^register/', views.register, name='register'), # ADD NEW PATTERN!
    url(r'^login/$', views.user_login, name='login'),
	url(r'^logout/$', views.user_logout, name='logout'),
#	url(r'^media/', static.custfeedapp, name='index'),	
]


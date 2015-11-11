from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns
from custfeedapp import views

from rest_framework.routers import DefaultRouter

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
# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'offices', views.OfficeViewSet)
router.register(r'users', views.UserViewSet)

# The API URLs are now determined automatically by the router.
# Additionally, we include the login URLs for the browsable API.
urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]


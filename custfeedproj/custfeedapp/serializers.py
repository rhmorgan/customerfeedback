#!/usr/bin/env python
# encoding: utf-8
"""
serializers.py

Created by Rhodri Morgan on 2015-11-04.
Copyright (c) 2015 __MyCompanyName__. All rights reserved.
"""

import sys
import os

from rest_framework import serializers
from custfeedapp.models import Office
from django.contrib.auth.models import User

class OfficeSerializer(serializers.ModelSerializer):
	owner = serializers.ReadOnlyField(source='owner.username')
	
	class Meta:
		model = Office
		fields = ('id','title','street','city','state','zip','latitude','longitude','created_at', 'owner')

class UserSerializer(serializers.ModelSerializer):
	offices = serializers.PrimaryKeyRelatedField(many=True, queryset=Office.objects.all())

	class Meta:
		model = User
		fields = ('id','username','offices')

def main():
	pass


if __name__ == '__main__':
	main()


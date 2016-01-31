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
from custfeedapp.models import Office, Resource, Employee, Evaluation
from django.contrib.auth.models import User

class OfficeSerializer(serializers.ModelSerializer):
	owner = serializers.ReadOnlyField(source='owner.username')
	
	class Meta:
		model = Office
		fields = ('id','title','street','city','state','zip','latitude','longitude','created_at', 'owner', 'image')

class UserSerializer(serializers.ModelSerializer):
	offices = serializers.PrimaryKeyRelatedField(many=True, queryset=Office.objects.all())

	class Meta:
		model = User
		fields = ('id','username','offices')

class EvaluationSerializer(serializers.ModelSerializer):
	owner = serializers.ReadOnlyField(source='owner.username')
#	resource = serializers.PrimaryKeyRelatedField(many=True, queryset=Resource.objects.all())

	class Meta:
		model = Evaluation
		fields = ('id','resource', 'owner', 'grade', 'comments')


class ResourceSerializer(serializers.ModelSerializer):
#	offices = serializers.PrimaryKeyRelatedField(many=True, queryset=Office.objects.all())
#	employees = serializers.PrimaryKeyRelatedField(many=False, queryset=Employee.objects.all())
	first_name = serializers.ReadOnlyField(source='employee.first_name')
	last_name = serializers.ReadOnlyField(source='employee.last_name')
	middle_name = serializers.ReadOnlyField(source='employee.middle_name')
	position = serializers.ReadOnlyField(source='employee.position')
	picture = serializers.CharField(source='employee.picture')
	

	class Meta:
		model = Resource
		fields = ('id', 'employee', 'office', 'first_name', 'last_name', 'middle_name', 'position','picture', 'get_grades')


def main():
	pass


if __name__ == '__main__':
	main()


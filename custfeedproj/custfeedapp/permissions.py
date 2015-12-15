#!/usr/bin/env python
# encoding: utf-8
"""
permissions.py

Created by Rhodri Morgan on 2015-11-07.
Copyright (c) 2015 __MyCompanyName__. All rights reserved.
"""

import sys
import os
from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
	
	def has_object_permission(self, request, view, obj):
		# Read permissions are allowed to any reqeust
		# so we'll always allow GET, HEAD or oPTIONS reqeusts.
		if request.method in permissions.SAFE_METHODS:
			return True
		
		# Write permissions are only allowed to the owner of the snippet
		return obj.owner == request.user

def main():
	pass


if __name__ == '__main__':
	main()



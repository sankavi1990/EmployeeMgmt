from django.contrib import admin
from .models import Employee, Attendance, LeaveRequest
from .models import DailyUpdate, Salary


admin.site.register(Employee)
admin.site.register(Attendance)
admin.site.register(LeaveRequest)
admin.site.register(DailyUpdate)
admin.site.register(Salary)
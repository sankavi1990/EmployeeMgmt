from rest_framework import serializers
from .models import Employee, Attendance, LeaveRequest
from .models import DailyUpdate
from .models import Salary


class EmployeeSerializer(serializers.ModelSerializer):

    user = serializers.CharField(source='user.username')  # ✅ FIX

    class Meta:
        model = Employee
        fields = '__all__'


class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = '__all__'


class LeaveRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeaveRequest
        fields = '__all__'

class DailyUpdateSerializer(serializers.ModelSerializer):

    user = serializers.CharField(source='user.username')

    class Meta:
        model = DailyUpdate
        fields = '__all__'



class SalarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Salary
        fields = '__all__'
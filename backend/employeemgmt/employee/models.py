from django.db import models
from django.contrib.auth.models import User

class Employee(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE)

    employee_id = models.CharField(max_length=10)

    name = models.CharField(max_length=100)

    photo = models.ImageField(upload_to="employee_photos/", blank=True, null=True)

    email = models.EmailField()

    phone = models.CharField(max_length=15)

    address = models.TextField()

    qualification = models.CharField(max_length=100)

    department = models.CharField(max_length=100)

    designation = models.CharField(max_length=100)

    joining_date = models.DateField()

    def __str__(self):
        return self.name


class Attendance(models.Model):

    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    date = models.DateField()

    status = models.CharField(
        max_length=20,
        choices=[
            ('Present','Present'),
            ('Absent','Absent'),
            ('Leave','Leave')
        ]
    )

    def __str__(self):
        return f"{self.employee.user.username} - {self.date}"


class LeaveRequest(models.Model):

    employee = models.ForeignKey(Employee,on_delete=models.CASCADE)

    start_date = models.DateField()
    end_date = models.DateField()

    reason = models.TextField()

    status = models.CharField(
        max_length=20,
        default='Pending',
        choices=[
            ('Pending','Pending'),
            ('Approved','Approved'),
            ('Rejected','Rejected')
        ]
    )

    def __str__(self):
        return f"{self.employee.user.username} - {self.status}"

class DailyUpdate(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    content = models.TextField()

    def __str__(self):
        return f"{self.user.username} - {self.date}"

class Salary(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)

    month = models.CharField(max_length=20)
    year = models.IntegerField()

    amount = models.DecimalField(max_digits=10, decimal_places=2)

    status = models.CharField(
        max_length=20,
        choices=[
            ('Paid', 'Paid'),
            ('Pending', 'Pending')
        ],
        default='Pending'
    )

    def __str__(self):
        return f"{self.employee.user.username} - {self.month} {self.year}"
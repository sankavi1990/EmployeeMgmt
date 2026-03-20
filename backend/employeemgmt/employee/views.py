from django.shortcuts import render

from rest_framework import viewsets
from .models import Employee, Attendance, LeaveRequest
from .serializers import EmployeeSerializer, AttendanceSerializer, LeaveRequestSerializer
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import DailyUpdate, Salary
from .serializers import DailyUpdateSerializer
from django.contrib.auth.models import User
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from django.http import HttpResponse
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from django.http import HttpResponse
import os
from django.conf import settings

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user:
        role = "admin" if user.is_superuser else "employee"

        return Response({
            "message": "Login successful",
            "username": user.username,
            "role": role
        })
    else:
        return Response({"error": "Invalid credentials"}, status=400)

@api_view(['GET'])
def my_profile(request):
    username = request.GET.get('username')

    try:
        employee = Employee.objects.get(user__username=username)
        serializer = EmployeeSerializer(employee)
        return Response(serializer.data)
    except Employee.DoesNotExist:
        return Response({"error": "Employee not found"}, status=404)

@api_view(['POST'])
def add_update(request):
    username = request.data.get('username')
    content = request.data.get('content')

    user = User.objects.get(username=username)

    DailyUpdate.objects.create(
        user=user,
        content=content
    )

    return Response({"message": "Update added"})

@api_view(['GET'])
def get_updates(request):
    updates = DailyUpdate.objects.all().order_by('-date')
    serializer = DailyUpdateSerializer(updates, many=True)
    return Response(serializer.data)

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer


class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer


class LeaveRequestViewSet(viewsets.ModelViewSet):
    queryset = LeaveRequest.objects.all()
    serializer_class = LeaveRequestSerializer

@api_view(['POST'])
def apply_leave(request):
    username = request.data.get('username')
    reason = request.data.get('reason')
    start_date = request.data.get('start_date')
    end_date = request.data.get('end_date')

    try:
        employee = Employee.objects.get(user__username=username)

        LeaveRequest.objects.create(
            employee=employee,
            reason=reason,
            start_date=start_date,
            end_date=end_date
        )

        return Response({"message": "Leave applied successfully"})

    except Exception as e:
        return Response({"error": str(e)}, status=500)



@api_view(['GET'])
def get_leaves(request):

    username = request.GET.get('username')  # 👈 get from frontend

    # 👉 If username is given → Employee view
    if username:
        user = User.objects.get(username=username)
        employee = Employee.objects.get(user=user)
        leaves = LeaveRequest.objects.filter(employee=employee).order_by('-id')
    else:
        # 👉 Admin view (show all)
        leaves = LeaveRequest.objects.all().order_by('-id')

    data = []
    for leave in leaves:
        data.append({
            "id": leave.id,
            "employee": leave.employee.user.username,
            "reason": leave.reason,
            "start_date": leave.start_date,
            "end_date": leave.end_date,
            "status": leave.status
        })

    return Response(data)

@api_view(['POST'])
def update_leave_status(request):
    leave_id = request.data.get('id')
    status = request.data.get('status')

    try:
        leave = LeaveRequest.objects.get(id=leave_id)
        leave.status = status
        leave.save()

        return Response({"message": "Status updated"})

    except Exception as e:
        return Response({"error": str(e)}, status=500)


from django.contrib.auth.models import User

@api_view(['GET'])
def dashboard(request):

    total_employees = Employee.objects.count()
    total_leaves = LeaveRequest.objects.count()
    pending_leaves = LeaveRequest.objects.filter(status='Pending').count()

    return Response({
        "total_employees": total_employees,
        "total_leaves": total_leaves,
        "pending_leaves": pending_leaves
    })

@api_view(['POST'])
def mark_attendance(request):
    username = request.data.get('username')  # from frontend
    status = request.data.get('status')
    date = request.data.get('date')

    user = User.objects.get(username=username)
    employee = Employee.objects.get(user=user)

    # 🔒 Prevent duplicate (same date)
    if Attendance.objects.filter(employee=employee, date=date).exists():
        return Response({"error": "Attendance already marked"}, status=400)

    Attendance.objects.create(
        employee=employee,
        status=status,
        date=date
    )

    return Response({"message": "Attendance marked"})

@api_view(['GET'])
def get_attendance(request):

    username = request.GET.get('username')
    print("USERNAME:", username)

    if username is not None and username != "":
        records = Attendance.objects.filter(
            employee__user__username__iexact=username
        ).order_by('-date')
    else:
        records = Attendance.objects.all().order_by('-date')

    print("RECORD COUNT:", records.count())

    data = []
    for record in records:
        data.append({
            "employee": record.employee.user.username,
            "date": record.date,
            "status": record.status
        })

    return Response(data)


@api_view(['POST'])
def add_salary(request):
    username = request.data.get('username')
    month = request.data.get('month')
    year = request.data.get('year')
    amount = request.data.get('amount')

    employee = Employee.objects.get(user__username=username)

    Salary.objects.create(
        employee=employee,
        month=month,
        year=year,
        amount=amount
    )

    return Response({"message": "Salary added"})


@api_view(['GET'])
def get_salary(request):
    username = request.GET.get('username')

    if username:
        salaries = Salary.objects.filter(
            employee__user__username=username
        )
    else:
        salaries = Salary.objects.all()

    data = []
    for s in salaries:
        data.append({
    "id": s.id,   # ✅ VERY IMPORTANT
    "employee": s.employee.user.username,
    "month": s.month,
    "year": s.year,
    "amount": s.amount,
    "status": s.status
})

    return Response(data)

@api_view(['POST'])
def update_salary_status(request):
    try:
        salary_id = request.data.get('id')
        status = request.data.get('status')

        print("ID:", salary_id)
        print("STATUS:", status)

        salary = Salary.objects.get(id=salary_id)

        salary.status = status
        salary.save()

        return Response({"message": "Salary updated"})

    except Exception as e:
        print("ERROR:", str(e))   # 🔥 VERY IMPORTANT
        return Response({"error": str(e)}, status=500)


@api_view(['GET'])
def download_payslip(request):

    username = request.GET.get('username')
    month = request.GET.get('month')
    year = request.GET.get('year')

    try:
        salary = Salary.objects.get(
            employee__user__username=username,
            month=month,
            year=year
        )

        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="payslip_{username}.pdf"'

        p = canvas.Canvas(response, pagesize=letter)

        # 📍 LOGO
        logo_path = os.path.join(settings.MEDIA_ROOT, 'logo.jfif')
        if os.path.exists(logo_path):
            p.drawImage(logo_path, 50, 730, width=80, height=50)

        # 📍 COMPANY NAME
        p.setFont("Helvetica-Bold", 16)
        p.drawString(150, 750, "ABC Technologies Pvt Ltd")

        # 📍 TITLE
        p.setFont("Helvetica-Bold", 14)
        p.drawString(200, 700, "Employee Payslip")

        # 📍 LINE
        p.line(50, 690, 550, 690)

        # 📍 DETAILS BOX
        p.setFont("Helvetica", 12)

        p.drawString(100, 650, f"Employee: {username}")
        p.drawString(100, 620, f"Month: {month}")
        p.drawString(100, 590, f"Year: {year}")

        # 📍 SALARY BOX
        p.setFont("Helvetica-Bold", 12)
        p.drawString(100, 540, "Salary Details")

        p.setFont("Helvetica", 12)
        p.drawString(100, 510, f"Amount: ₹ {salary.amount}")
        p.drawString(100, 480, f"Status: {salary.status}")

        # 📍 FOOTER
        p.setFont("Helvetica-Oblique", 10)
        p.drawString(150, 430, "This is a system generated payslip")

        p.save()

        return response

    except Exception as e:
        return Response({"error": str(e)}, status=500)
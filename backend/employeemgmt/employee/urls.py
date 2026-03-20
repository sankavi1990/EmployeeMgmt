from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EmployeeViewSet, AttendanceViewSet, LeaveRequestViewSet
from .views import login_view
from .views import my_profile, download_payslip
from .views import add_update, get_updates, update_salary_status
from .views import apply_leave, get_leaves, update_leave_status, dashboard, mark_attendance, get_attendance, add_salary, get_salary

router = DefaultRouter()
router.register(r'employees', EmployeeViewSet)
router.register(r'attendance', AttendanceViewSet)
router.register(r'leave', LeaveRequestViewSet)

urlpatterns = [
    path('login/', login_view),
    path('', include(router.urls)),
    path('my-profile/', my_profile),
    path('add-update/', add_update),
    path('updates/', get_updates),
    path('apply-leave/', apply_leave),
    path('leaves/', get_leaves),
    path('update-leave/', update_leave_status),
    path('dashboard/', dashboard),
    path('mark-attendance/', mark_attendance),
    path('attendance-filter/', get_attendance),
    path('add-salary/', add_salary),
    path('salary/', get_salary),
    path('update-salary/', update_salary_status),
    path('download-payslip/', download_payslip),
]
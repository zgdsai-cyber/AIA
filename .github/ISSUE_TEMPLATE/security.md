# شكوى أمان
name: 🔒 اكتشاف ثغرة أمنية

description: أبلغنا عن مشاكل أمان حساسة
labels: ["security"]

body:
  - type: textarea
    attributes:
      label: وصف المشكلة الأمنية
      description: لا تفصح عن تفاصيل كاملة هنا
      placeholder: وجدت مشكلة أمنية في...
    validations:
      required: true

  - type: textarea
    attributes:
      label: كيفية إصلاحها
      description: اقترحك للحل
      placeholder: يمكن إصلاحها ب...
    validations:
      required: false

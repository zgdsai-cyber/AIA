# نموذج تقرير خطأ
name: 🐛 تقرير خطأ

description: ساعدنا في تحسين المشروع بالإبلاغ عن الأخطاء
labels: ["bug"]

body:
  - type: textarea
    attributes:
      label: وصف الخطأ
      description: ماذا حدث؟
      placeholder: الخطأ يحدث عندما...
    validations:
      required: true

  - type: textarea
    attributes:
      label: خطوات إعادة الإنتاج
      description: كيفية إعادة الخطأ
      value: |
        1. 
        2. 
        3.
    validations:
      required: true

  - type: textarea
    attributes:
      label: السلوك المتوقع
      description: ماذا يجب أن يحدث؟
      placeholder: يجب أن...
    validations:
      required: true

  - type: input
    attributes:
      label: المتصفح
      placeholder: Chrome, Firefox, Safari...
    validations:
      required: false

  - type: input
    attributes:
      label: النظام
      placeholder: Windows, macOS, Linux...
    validations:
      required: false

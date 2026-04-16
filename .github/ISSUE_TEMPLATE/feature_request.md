# نموذج طلب الميزة
name: 🎉 طلب ميزة جديدة

description: صف الميزة التي تريد إضافتها
labels: ["enhancement"]

body:
  - type: textarea
    attributes:
      label: وصف الميزة
      description: وضح بالتفصيل ما هي الميزة المطلوبة
      placeholder: سأود إضافة...
    validations:
      required: true

  - type: textarea
    attributes:
      label: الفائدة المتوقعة
      description: شرح كيف ستحسن هذه الميزة المشروع
      placeholder: هذه الميزة ستساعد في...
    validations:
      required: true

  - type: textarea
    attributes:
      label: معلومات إضافية
      description: أي معلومات أخرى
      placeholder: ملاحظات إضافية...
    validations:
      required: false

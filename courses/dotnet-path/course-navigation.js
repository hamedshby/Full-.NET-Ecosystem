(function (globalScope) {
  const dotnetChapters = [
    {
      "title": "فصل 1 — مقدمه‌ای بر Object-Oriented Programming",
      "lessons": [
        {
          "id": "oop-introduction",
          "title": "1.1 OOP چیست؟",
          "available": true
        },
        {
          "id": "basic-concepts",
          "title": "1.2 مفاهیم پایه",
          "available": true
        }
      ]
    },
    {
      "title": "فصل 2 — Class و Object در C#",
      "lessons": [
        {
          "id": "chapter-2-lesson-1",
          "title": "2.1 تعریف Class",
          "available": true
        },
        {
          "id": "chapter-2-lesson-2",
          "title": "2.2 Fields",
          "available": true
        },
        {
          "id": "chapter-2-lesson-3",
          "title": "2.3 Properties",
          "available": true
        },
        {
          "id": "chapter-2-lesson-4",
          "title": "2.4 Methods",
          "available": true
        }
      ]
    },
    {
      "title": "فصل 3 — Constructor و چرخه ایجاد Object",
      "lessons": [
        {
          "id": "chapter-3-lesson-1",
          "title": "3.1 Constructor چیست؟",
          "available": true
        },
        {
          "id": "chapter-3-lesson-2",
          "title": "3.2 Constructor Chaining",
          "available": true
        },
        {
          "id": "chapter-3-lesson-3",
          "title": "3.3 Static Constructor",
          "available": true
        },
        {
          "id": "chapter-3-lesson-4",
          "title": "3.4 Object Initializer",
          "available": true
        },
        {
          "id": "chapter-3-lesson-5",
          "title": "3.5 Primary Constructors در C#",
          "available": true
        },
        {
          "id": "chapter-3-lesson-6",
          "title": "3.6 ترتیب Initialization",
          "available": true
        }
      ]
    },
    {
      "title": "فصل 4 — Encapsulation",
      "lessons": [
        {
          "id": "chapter-4-lesson-1",
          "title": "4.1 Encapsulation چیست؟",
          "available": true
        },
        {
          "id": "chapter-4-lesson-2",
          "title": "4.2 Access Modifiers",
          "available": true
        },
        {
          "id": "chapter-4-lesson-3",
          "title": "4.3 طراحی Encapsulated Class",
          "available": true
        },
        {
          "id": "chapter-4-lesson-4",
          "title": "4.4 Tell, Don't Ask",
          "available": true
        },
        {
          "id": "chapter-4-lesson-5",
          "title": "4.5 Anemic Domain Model",
          "available": true
        }
      ]
    },
    {
      "title": "فصل 5 — Inheritance",
      "lessons": [
        {
          "id": "chapter-5-lesson-1",
          "title": "5.1 Inheritance چیست؟",
          "available": true
        },
        {
          "id": "chapter-5-lesson-2",
          "title": "5.2 Base Class و Derived Class",
          "available": true
        },
        {
          "id": "chapter-5-lesson-3",
          "title": "5.3 استفاده از `base`",
          "available": true
        },
        {
          "id": "chapter-5-lesson-4",
          "title": "5.4 Protected Members",
          "available": true
        },
        {
          "id": "chapter-5-lesson-5",
          "title": "5.5 Method Overriding",
          "available": true
        },
        {
          "id": "chapter-5-lesson-6",
          "title": "5.6 جلوگیری از Inheritance",
          "available": true
        },
        {
          "id": "chapter-5-lesson-7",
          "title": "5.7 مشکلات Inheritance",
          "available": true
        },
        {
          "id": "chapter-5-lesson-8",
          "title": "5.8 چه زمانی از Inheritance استفاده نکنیم؟",
          "available": true
        },
        {
          "id": "chapter-5-lesson-9",
          "title": "5.9 Composition over Inheritance",
          "available": true
        }
      ]
    },
    {
      "title": "فصل 6 — Polymorphism",
      "lessons": [
        {
          "id": "chapter-6-lesson-1",
          "title": "6.1 Polymorphism چیست؟",
          "available": true
        },
        {
          "id": "chapter-6-lesson-2",
          "title": "6.2 Compile-Time Polymorphism",
          "available": true
        },
        {
          "id": "chapter-6-lesson-3",
          "title": "6.3 Runtime Polymorphism",
          "available": true
        },
        {
          "id": "chapter-6-lesson-4",
          "title": "6.4 Method Hiding",
          "available": true
        },
        {
          "id": "chapter-6-lesson-5",
          "title": "6.5 مثال واقعی Polymorphism",
          "available": true
        }
      ]
    },
    {
      "title": "فصل 7 — Abstraction",
      "lessons": [
        {
          "id": "chapter-7-lesson-1",
          "title": "7.1 Abstraction چیست؟",
          "available": true
        },
        {
          "id": "chapter-7-lesson-2",
          "title": "7.2 Abstract Class",
          "available": true
        },
        {
          "id": "chapter-7-lesson-3",
          "title": "7.3 Interface",
          "available": true
        },
        {
          "id": "chapter-7-lesson-4",
          "title": "7.4 Abstract Class vs Interface",
          "available": true
        },
        {
          "id": "chapter-7-lesson-5",
          "title": "7.5 چه زمانی Interface استفاده کنیم؟",
          "available": true
        },
        {
          "id": "chapter-7-lesson-6",
          "title": "7.6 Interface Segregation در طراحی واقعی",
          "available": true
        }
      ]
    },
    {
      "title": "فصل 8 — چهار اصل اصلی OOP",
      "lessons": [
        {
          "id": "chapter-8-lesson-1",
          "title": "8.1 Encapsulation",
          "available": true
        },
        {
          "id": "chapter-8-lesson-2",
          "title": "8.2 Abstraction",
          "available": true
        },
        {
          "id": "chapter-8-lesson-3",
          "title": "8.3 Inheritance",
          "available": true
        },
        {
          "id": "chapter-8-lesson-4",
          "title": "8.4 Polymorphism",
          "available": true
        },
        {
          "id": "chapter-8-lesson-5",
          "title": "8.5 ارتباط این چهار مفهوم با یکدیگر",
          "available": true
        },
        {
          "id": "chapter-8-lesson-6",
          "title": "8.6 مثال کامل با یک سیستم واقعی",
          "available": true
        }
      ]
    },
    {
      "title": "فصل 9 — Association, Aggregation و Composition",
      "lessons": [
        {
          "id": "chapter-9-lesson-1",
          "title": "9.1 روابط بین Objectها",
          "available": true
        },
        {
          "id": "chapter-9-lesson-2",
          "title": "9.2 Association",
          "available": true
        },
        {
          "id": "chapter-9-lesson-3",
          "title": "9.3 One-to-One",
          "available": true
        },
        {
          "id": "chapter-9-lesson-4",
          "title": "9.4 One-to-Many",
          "available": true
        },
        {
          "id": "chapter-9-lesson-5",
          "title": "9.5 Many-to-Many",
          "available": true
        },
        {
          "id": "chapter-9-lesson-6",
          "title": "9.6 Aggregation",
          "available": true
        },
        {
          "id": "chapter-9-lesson-7",
          "title": "9.7 Composition",
          "available": true
        },
        {
          "id": "chapter-9-lesson-8",
          "title": "9.8 تفاوت Aggregation و Composition",
          "available": true
        },
        {
          "id": "chapter-9-lesson-9",
          "title": "9.9 Has-A vs Is-A",
          "available": true
        },
        {
          "id": "chapter-9-lesson-10",
          "title": "9.10 مثال‌های واقعی در Domain Model",
          "available": true
        }
      ]
    },
    {
      "title": "فصل 10 — Object Equality در C#",
      "lessons": [
        {
          "id": "chapter-10-lesson-1",
          "title": "10.1 Object Equality در C#",
          "available": true
        }
      ]
    },
    {
      "title": "فصل 11 — Object، Memory و Reference Types",
      "lessons": [
        {
          "id": "chapter-11-lesson-1",
          "title": "11.1 Object، Memory و Reference Types",
          "available": true
        }
      ]
    },
    {
      "title": "فصل 12 — Static در طراحی شی‌گرا",
      "lessons": [
        {
          "id": "chapter-12-lesson-1",
          "title": "12.1 Static Class",
          "available": true
        },
        {
          "id": "chapter-12-lesson-2",
          "title": "12.2 Static Method",
          "available": true
        },
        {
          "id": "chapter-12-lesson-3",
          "title": "12.3 Static Property",
          "available": true
        },
        {
          "id": "chapter-12-lesson-4",
          "title": "12.4 Static Field",
          "available": true
        },
        {
          "id": "chapter-12-lesson-5",
          "title": "12.5 Static Constructor",
          "available": true
        },
        {
          "id": "chapter-12-lesson-6",
          "title": "12.6 مشکلات استفاده بیش از حد از Static",
          "available": true
        },
        {
          "id": "chapter-12-lesson-7",
          "title": "12.7 Static و Testability",
          "available": true
        },
        {
          "id": "chapter-12-lesson-8",
          "title": "12.8 Static vs Dependency Injection",
          "available": true
        }
      ]
    },
    {
      "title": "فصل 13 — Records, Structs و Classes",
      "lessons": [
        {
          "id": "chapter-13-lesson-1",
          "title": "13.1 Class",
          "available": true
        },
        {
          "id": "chapter-13-lesson-2",
          "title": "13.2 Struct",
          "available": true
        },
        {
          "id": "chapter-13-lesson-3",
          "title": "13.3 Record",
          "available": true
        },
        {
          "id": "chapter-13-lesson-4",
          "title": "13.4 Record Struct",
          "available": true
        },
        {
          "id": "chapter-13-lesson-5",
          "title": "13.5 تفاوت Class و Struct",
          "available": true
        },
        {
          "id": "chapter-13-lesson-6",
          "title": "13.6 تفاوت Class و Record",
          "available": true
        },
        {
          "id": "chapter-13-lesson-7",
          "title": "13.7 Value Object با Record",
          "available": true
        },
        {
          "id": "chapter-13-lesson-8",
          "title": "13.8 چه زمانی از هرکدام استفاده کنیم؟",
          "available": true
        }
      ]
    },
    {
      "title": "فصل 14 — Generic Programming و OOP",
      "lessons": [
        {
          "id": "chapter-14-lesson-1",
          "title": "14.1 Generic Class",
          "available": true
        },
        {
          "id": "chapter-14-lesson-2",
          "title": "14.2 Generic Method",
          "available": true
        },
        {
          "id": "chapter-14-lesson-3",
          "title": "14.3 Generic Interface",
          "available": true
        },
        {
          "id": "chapter-14-lesson-4",
          "title": "14.4 Generic Constraints",
          "available": true
        },
        {
          "id": "chapter-14-lesson-5",
          "title": "14.5 Generics و Polymorphism",
          "available": true
        }
      ]
    },
    {
      "title": "فصل 15 — SOLID Principles",
      "lessons": [
        {
          "id": "chapter-15-lesson-1",
          "title": "15.1 مقدمه SOLID",
          "available": true
        },
        {
          "id": "chapter-15-lesson-2",
          "title": "15.2 Single Responsibility Principle — SRP",
          "available": true
        },
        {
          "id": "chapter-15-lesson-3",
          "title": "15.3 Open/Closed Principle — OCP",
          "available": true
        },
        {
          "id": "chapter-15-lesson-4",
          "title": "15.4 Liskov Substitution Principle — LSP",
          "available": true
        },
        {
          "id": "chapter-15-lesson-5",
          "title": "15.5 Interface Segregation Principle — ISP",
          "available": true
        },
        {
          "id": "chapter-15-lesson-6",
          "title": "15.6 Dependency Inversion Principle — DIP",
          "available": true
        },
        {
          "id": "chapter-15-lesson-7",
          "title": "15.7 مثال کامل SOLID در یک پروژه .NET",
          "available": true
        }
      ]
    },
    {
      "title": "فصل 16 — Dependency Injection و OOP",
      "lessons": [
        {
          "id": "chapter-16-lesson-1",
          "title": "16.1 Dependency چیست؟",
          "available": true
        },
        {
          "id": "chapter-16-lesson-2",
          "title": "16.2 Dependency Injection چیست؟",
          "available": true
        },
        {
          "id": "chapter-16-lesson-3",
          "title": "16.3 Constructor Injection",
          "available": true
        },
        {
          "id": "chapter-16-lesson-4",
          "title": "16.4 Property Injection",
          "available": true
        },
        {
          "id": "chapter-16-lesson-5",
          "title": "16.5 Method Injection",
          "available": true
        },
        {
          "id": "chapter-16-lesson-6",
          "title": "16.6 Dependency Injection Container",
          "available": true
        },
        {
          "id": "chapter-16-lesson-7",
          "title": "16.7 DI داخلی ASP.NET Core",
          "available": true
        },
        {
          "id": "chapter-16-lesson-8",
          "title": "16.8 Service Lifetimes",
          "available": true
        },
        {
          "id": "chapter-16-lesson-9",
          "title": "16.9 Dependency Inversion vs Dependency Injection",
          "available": true
        },
        {
          "id": "chapter-16-lesson-10",
          "title": "16.10 اشتباهات رایج DI",
          "available": true
        }
      ]
    },
    {
      "title": "فصل 17 — Coupling و Cohesion",
      "lessons": [
        {
          "id": "chapter-17-lesson-1",
          "title": "17.1 Coupling چیست؟",
          "available": true
        },
        {
          "id": "chapter-17-lesson-2",
          "title": "17.2 Tight Coupling",
          "available": true
        },
        {
          "id": "chapter-17-lesson-3",
          "title": "17.3 Loose Coupling",
          "available": true
        },
        {
          "id": "chapter-17-lesson-4",
          "title": "17.4 Cohesion چیست؟",
          "available": true
        },
        {
          "id": "chapter-17-lesson-5",
          "title": "17.5 High Cohesion",
          "available": true
        },
        {
          "id": "chapter-17-lesson-6",
          "title": "17.6 Low Cohesion",
          "available": true
        },
        {
          "id": "chapter-17-lesson-7",
          "title": "17.7 چگونه Coupling را کاهش دهیم؟",
          "available": true
        },
        {
          "id": "chapter-17-lesson-8",
          "title": "17.8 Interface و DI برای کاهش Coupling",
          "available": true
        }
      ]
    },
    {
      "title": "فصل 18 — اصول طراحی Object-Oriented",
      "lessons": [
        {
          "id": "chapter-18-lesson-1",
          "title": "18.1 Composition over Inheritance",
          "available": true
        },
        {
          "id": "chapter-18-lesson-2",
          "title": "18.2 Program to an Interface",
          "available": true
        },
        {
          "id": "chapter-18-lesson-3",
          "title": "18.3 Favor Immutability",
          "available": true
        },
        {
          "id": "chapter-18-lesson-4",
          "title": "18.4 Tell, Don't Ask",
          "available": true
        },
        {
          "id": "chapter-18-lesson-5",
          "title": "18.5 Law of Demeter",
          "available": true
        },
        {
          "id": "chapter-18-lesson-6",
          "title": "18.6 Encapsulate What Changes",
          "available": true
        },
        {
          "id": "chapter-18-lesson-7",
          "title": "18.7 Separation of Concerns",
          "available": true
        },
        {
          "id": "chapter-18-lesson-8",
          "title": "18.8 DRY",
          "available": true
        },
        {
          "id": "chapter-18-lesson-9",
          "title": "18.9 KISS",
          "available": true
        },
        {
          "id": "chapter-18-lesson-10",
          "title": "18.10 YAGNI",
          "available": true
        }
      ]
    },
    {
      "title": "فصل 19 — Code Smells در طراحی OOP",
      "lessons": [
        {
          "id": "chapter-19-lesson-1",
          "title": "19.1 God Class",
          "available": true
        },
        {
          "id": "chapter-19-lesson-2",
          "title": "19.2 Long Method",
          "available": true
        },
        {
          "id": "chapter-19-lesson-3",
          "title": "19.3 Large Class",
          "available": true
        },
        {
          "id": "chapter-19-lesson-4",
          "title": "19.4 Feature Envy",
          "available": true
        },
        {
          "id": "chapter-19-lesson-5",
          "title": "19.5 Data Class",
          "available": true
        },
        {
          "id": "chapter-19-lesson-6",
          "title": "19.6 Primitive Obsession",
          "available": true
        },
        {
          "id": "chapter-19-lesson-7",
          "title": "19.7 Shotgun Surgery",
          "available": true
        },
        {
          "id": "chapter-19-lesson-8",
          "title": "19.8 Switch Statement Abuse",
          "available": true
        },
        {
          "id": "chapter-19-lesson-9",
          "title": "19.9 Inappropriate Intimacy",
          "available": true
        },
        {
          "id": "chapter-19-lesson-10",
          "title": "19.10 Refused Bequest",
          "available": true
        },
        {
          "id": "chapter-19-lesson-11",
          "title": "19.11 Duplicate Code",
          "available": true
        },
        {
          "id": "chapter-19-lesson-12",
          "title": "19.12 Refactoring هر Code Smell",
          "available": true
        }
      ]
    },
    {
      "title": "فصل 20 — Design Patterns و OOP",
      "lessons": [
        {
          "id": "chapter-20-lesson-1",
          "title": "20.1 Factory Method",
          "available": true
        },
        {
          "id": "chapter-20-lesson-2",
          "title": "20.2 Abstract Factory",
          "available": true
        },
        {
          "id": "chapter-20-lesson-3",
          "title": "20.3 Builder",
          "available": true
        },
        {
          "id": "chapter-20-lesson-4",
          "title": "20.4 Singleton",
          "available": true
        },
        {
          "id": "chapter-20-lesson-5",
          "title": "20.5 Prototype",
          "available": true
        },
        {
          "id": "chapter-20-lesson-6",
          "title": "20.6 Adapter",
          "available": true
        },
        {
          "id": "chapter-20-lesson-7",
          "title": "20.7 Decorator",
          "available": true
        },
        {
          "id": "chapter-20-lesson-8",
          "title": "20.8 Facade",
          "available": true
        },
        {
          "id": "chapter-20-lesson-9",
          "title": "20.9 Proxy",
          "available": true
        },
        {
          "id": "chapter-20-lesson-10",
          "title": "20.10 Composite",
          "available": true
        },
        {
          "id": "chapter-20-lesson-11",
          "title": "20.11 Strategy",
          "available": true
        },
        {
          "id": "chapter-20-lesson-12",
          "title": "20.12 Observer",
          "available": true
        },
        {
          "id": "chapter-20-lesson-13",
          "title": "20.13 Command",
          "available": true
        },
        {
          "id": "chapter-20-lesson-14",
          "title": "20.14 Template Method",
          "available": true
        },
        {
          "id": "chapter-20-lesson-15",
          "title": "20.15 Chain of Responsibility",
          "available": true
        },
        {
          "id": "chapter-20-lesson-16",
          "title": "20.16 State",
          "available": true
        },
        {
          "id": "chapter-20-lesson-17",
          "title": "20.17 Mediator",
          "available": true
        }
      ]
    },
    {
      "title": "فصل 21 — OOP در Domain-Driven Design",
      "lessons": [
        {
          "id": "chapter-21-lesson-1",
          "title": "21.1 Domain Model",
          "available": true
        },
        {
          "id": "chapter-21-lesson-2",
          "title": "21.2 Entity",
          "available": true
        },
        {
          "id": "chapter-21-lesson-3",
          "title": "21.3 Value Object",
          "available": true
        },
        {
          "id": "chapter-21-lesson-4",
          "title": "21.4 Aggregate",
          "available": true
        },
        {
          "id": "chapter-21-lesson-5",
          "title": "21.5 Aggregate Root",
          "available": true
        },
        {
          "id": "chapter-21-lesson-6",
          "title": "21.6 Domain Service",
          "available": true
        },
        {
          "id": "chapter-21-lesson-7",
          "title": "21.7 Domain Event",
          "available": true
        },
        {
          "id": "chapter-21-lesson-8",
          "title": "21.8 Rich Domain Model",
          "available": true
        },
        {
          "id": "chapter-21-lesson-9",
          "title": "21.9 Anemic Domain Model",
          "available": true
        },
        {
          "id": "chapter-21-lesson-10",
          "title": "21.10 Encapsulation در Aggregate",
          "available": true
        },
        {
          "id": "chapter-21-lesson-11",
          "title": "21.11 Invariant چیست؟",
          "available": true
        },
        {
          "id": "chapter-21-lesson-12",
          "title": "21.12 مثال واقعی Domain Model",
          "available": true
        }
      ]
    },
    {
      "title": "فصل 22 — OOP در معماری نرم‌افزار",
      "lessons": [
        {
          "id": "chapter-22-lesson-1",
          "title": "22.1 OOP و Layered Architecture",
          "available": true
        },
        {
          "id": "chapter-22-lesson-2",
          "title": "22.2 OOP و Clean Architecture",
          "available": true
        },
        {
          "id": "chapter-22-lesson-3",
          "title": "22.3 Domain Layer",
          "available": true
        },
        {
          "id": "chapter-22-lesson-4",
          "title": "22.4 Application Layer",
          "available": true
        },
        {
          "id": "chapter-22-lesson-5",
          "title": "22.5 Infrastructure Layer",
          "available": true
        },
        {
          "id": "chapter-22-lesson-6",
          "title": "22.6 Dependency Rule",
          "available": true
        },
        {
          "id": "chapter-22-lesson-7",
          "title": "22.7 Interfaceها در مرز Layerها",
          "available": true
        },
        {
          "id": "chapter-22-lesson-8",
          "title": "22.8 Repository Abstraction",
          "available": true
        },
        {
          "id": "chapter-22-lesson-9",
          "title": "22.9 Application Service vs Domain Service",
          "available": true
        }
      ]
    },
    {
      "title": "فصل 23 — تست‌پذیری در طراحی OOP",
      "lessons": [
        {
          "id": "chapter-23-lesson-1",
          "title": "23.1 Testable Design چیست؟",
          "available": true
        },
        {
          "id": "chapter-23-lesson-2",
          "title": "23.2 Dependency Injection و Testing",
          "available": true
        },
        {
          "id": "chapter-23-lesson-3",
          "title": "23.3 Mock کردن Dependencyها",
          "available": true
        },
        {
          "id": "chapter-23-lesson-4",
          "title": "23.4 Stub / Fake / Mock",
          "available": true
        },
        {
          "id": "chapter-23-lesson-5",
          "title": "23.5 مشکل Static Dependency",
          "available": true
        },
        {
          "id": "chapter-23-lesson-6",
          "title": "23.6 مشکل `new` کردن Dependency داخل Class",
          "available": true
        },
        {
          "id": "chapter-23-lesson-7",
          "title": "23.7 طراحی Classهای قابل Unit Test",
          "available": true
        }
      ]
    },
    {
      "title": "فصل 24 — Refactoring از Procedural Code به OOP",
      "lessons": [
        {
          "id": "chapter-24-lesson-1",
          "title": "مرحله 1",
          "available": true
        },
        {
          "id": "chapter-24-lesson-2",
          "title": "مرحله 2",
          "available": true
        },
        {
          "id": "chapter-24-lesson-3",
          "title": "مرحله 3",
          "available": true
        },
        {
          "id": "chapter-24-lesson-4",
          "title": "مرحله 4",
          "available": true
        },
        {
          "id": "chapter-24-lesson-5",
          "title": "مرحله 5",
          "available": true
        },
        {
          "id": "chapter-24-lesson-6",
          "title": "مرحله 6",
          "available": true
        },
        {
          "id": "chapter-24-lesson-7",
          "title": "مرحله 7",
          "available": true
        },
        {
          "id": "chapter-24-lesson-8",
          "title": "مرحله 8",
          "available": true
        },
        {
          "id": "chapter-24-lesson-9",
          "title": "مرحله 9",
          "available": true
        },
        {
          "id": "chapter-24-lesson-10",
          "title": "مرحله 10",
          "available": true
        }
      ]
    },
    {
      "title": "فصل 25 — پروژه عملی: طراحی سیستم پرداخت",
      "lessons": [
        {
          "id": "chapter-25-lesson-1",
          "title": "پروژه عملی: طراحی سیستم پرداخت",
          "available": true
        }
      ]
    },
    {
      "title": "فصل 26 — سوالات مصاحبه OOP برای .NET Developer",
      "lessons": [
        {
          "id": "chapter-26-lesson-1",
          "title": "سطح Junior",
          "available": true
        },
        {
          "id": "chapter-26-lesson-2",
          "title": "سطح Mid-Level",
          "available": true
        },
        {
          "id": "chapter-26-lesson-3",
          "title": "سطح Senior",
          "available": true
        }
      ]
    },
    {
      "title": "فصل 27 — اشتباهات رایج در OOP",
      "lessons": [
        {
          "id": "chapter-27-lesson-1",
          "title": "اشتباهات رایج در OOP",
          "available": true
        }
      ]
    },
    {
      "title": "فصل 28 — جمع‌بندی و مسیر ادامه",
      "lessons": [
        {
          "id": "chapter-28-lesson-1",
          "title": "28.1 مرور مفاهیم اصلی OOP",
          "available": true
        },
        {
          "id": "chapter-28-lesson-2",
          "title": "28.2 چک‌لیست مهارت‌های OOP برای .NET Developer",
          "available": true
        },
        {
          "id": "chapter-28-lesson-3",
          "title": "28.3 مهارت‌های موردنیاز Junior",
          "available": true
        },
        {
          "id": "chapter-28-lesson-4",
          "title": "28.4 مهارت‌های موردنیاز Mid-Level",
          "available": true
        },
        {
          "id": "chapter-28-lesson-5",
          "title": "28.5 مهارت‌های موردنیاز Senior",
          "available": true
        },
        {
          "id": "chapter-28-lesson-6",
          "title": "28.6 مسیر بعد از OOP",
          "available": true
        }
      ]
    }
  ];
  const availableLessons = dotnetChapters
    .flatMap(chapter => chapter.lessons);

  const escapeHtml = value => value.replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
  const displayLessonTitle = title => title.replace(/^\d+(?:\.\d+)+\s+/, '');

  function renderDotnetNavigation(currentLessonId) {
    return `
      <h2>سرفصل‌های آموزش <bdi>.NET</bdi></h2>
      ${dotnetChapters.map(chapter => {
      const containsCurrent = chapter.lessons.some(lesson => lesson.id === currentLessonId);
      return `<details class="course-chapter"${containsCurrent ? ' open' : ''}>
          <summary>${escapeHtml(chapter.title)}</summary>
          <ol>${chapter.lessons.map(lesson => {
        const title = `<bdi>${escapeHtml(displayLessonTitle(lesson.title))}</bdi>`;
        const href = lesson.id === 'oop-introduction'
          ? '../oop/whatisoop.html'
          : `../lessons/${lesson.id}.html`;
        return `<li><a href="${href}"${lesson.id === currentLessonId ? ' aria-current="page"' : ''}>${title}</a></li>`;
      }).join('')}</ol>
        </details>`;
    }).join('')}`;
  }

  const api = { dotnetChapters, availableLessons, renderDotnetNavigation };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  globalScope.dotnetCourse = api;
})(typeof window !== 'undefined' ? window : globalThis);

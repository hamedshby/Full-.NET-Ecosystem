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
        "available": false
      }
    ]
  },
  {
    "title": "فصل 2 — Class و Object در C#",
    "lessons": [
      {
        "id": "chapter-2-lesson-1",
        "title": "2.1 تعریف Class",
        "available": false
      },
      {
        "id": "chapter-2-lesson-2",
        "title": "2.2 Fields",
        "available": false
      },
      {
        "id": "chapter-2-lesson-3",
        "title": "2.3 Properties",
        "available": false
      },
      {
        "id": "chapter-2-lesson-4",
        "title": "2.4 Methods",
        "available": false
      }
    ]
  },
  {
    "title": "فصل 3 — Constructor و چرخه ایجاد Object",
    "lessons": [
      {
        "id": "chapter-3-lesson-1",
        "title": "3.1 Constructor چیست؟",
        "available": false
      },
      {
        "id": "chapter-3-lesson-2",
        "title": "3.2 Constructor Chaining",
        "available": false
      },
      {
        "id": "chapter-3-lesson-3",
        "title": "3.3 Static Constructor",
        "available": false
      },
      {
        "id": "chapter-3-lesson-4",
        "title": "3.4 Object Initializer",
        "available": false
      },
      {
        "id": "chapter-3-lesson-5",
        "title": "3.5 Primary Constructors در C#",
        "available": false
      },
      {
        "id": "chapter-3-lesson-6",
        "title": "3.6 ترتیب Initialization",
        "available": false
      }
    ]
  },
  {
    "title": "فصل 4 — Encapsulation",
    "lessons": [
      {
        "id": "chapter-4-lesson-1",
        "title": "4.1 Encapsulation چیست؟",
        "available": false
      },
      {
        "id": "chapter-4-lesson-2",
        "title": "4.2 Access Modifiers",
        "available": false
      },
      {
        "id": "chapter-4-lesson-3",
        "title": "4.3 طراحی Encapsulated Class",
        "available": false
      },
      {
        "id": "chapter-4-lesson-4",
        "title": "4.4 Tell, Don't Ask",
        "available": false
      },
      {
        "id": "chapter-4-lesson-5",
        "title": "4.5 Anemic Domain Model",
        "available": false
      }
    ]
  },
  {
    "title": "فصل 5 — Inheritance",
    "lessons": [
      {
        "id": "chapter-5-lesson-1",
        "title": "5.1 Inheritance چیست؟",
        "available": false
      },
      {
        "id": "chapter-5-lesson-2",
        "title": "5.2 Base Class و Derived Class",
        "available": false
      },
      {
        "id": "chapter-5-lesson-3",
        "title": "5.3 استفاده از `base`",
        "available": false
      },
      {
        "id": "chapter-5-lesson-4",
        "title": "5.4 Protected Members",
        "available": false
      },
      {
        "id": "chapter-5-lesson-5",
        "title": "5.5 Method Overriding",
        "available": false
      },
      {
        "id": "chapter-5-lesson-6",
        "title": "5.6 جلوگیری از Inheritance",
        "available": false
      },
      {
        "id": "chapter-5-lesson-7",
        "title": "5.7 مشکلات Inheritance",
        "available": false
      },
      {
        "id": "chapter-5-lesson-8",
        "title": "5.8 چه زمانی از Inheritance استفاده نکنیم؟",
        "available": false
      },
      {
        "id": "chapter-5-lesson-9",
        "title": "5.9 Composition over Inheritance",
        "available": false
      }
    ]
  },
  {
    "title": "فصل 6 — Polymorphism",
    "lessons": [
      {
        "id": "chapter-6-lesson-1",
        "title": "6.1 Polymorphism چیست؟",
        "available": false
      },
      {
        "id": "chapter-6-lesson-2",
        "title": "6.2 Compile-Time Polymorphism",
        "available": false
      },
      {
        "id": "chapter-6-lesson-3",
        "title": "6.3 Runtime Polymorphism",
        "available": false
      },
      {
        "id": "chapter-6-lesson-4",
        "title": "6.4 Method Hiding",
        "available": false
      },
      {
        "id": "chapter-6-lesson-5",
        "title": "6.5 مثال واقعی Polymorphism",
        "available": false
      }
    ]
  },
  {
    "title": "فصل 7 — Abstraction",
    "lessons": [
      {
        "id": "chapter-7-lesson-1",
        "title": "7.1 Abstraction چیست؟",
        "available": false
      },
      {
        "id": "chapter-7-lesson-2",
        "title": "7.2 Abstract Class",
        "available": false
      },
      {
        "id": "chapter-7-lesson-3",
        "title": "7.3 Interface",
        "available": false
      },
      {
        "id": "chapter-7-lesson-4",
        "title": "7.4 Abstract Class vs Interface",
        "available": false
      },
      {
        "id": "chapter-7-lesson-5",
        "title": "7.5 چه زمانی Interface استفاده کنیم؟",
        "available": false
      },
      {
        "id": "chapter-7-lesson-6",
        "title": "7.6 Interface Segregation در طراحی واقعی",
        "available": false
      }
    ]
  },
  {
    "title": "فصل 8 — چهار اصل اصلی OOP",
    "lessons": [
      {
        "id": "chapter-8-lesson-1",
        "title": "8.1 Encapsulation",
        "available": false
      },
      {
        "id": "chapter-8-lesson-2",
        "title": "8.2 Abstraction",
        "available": false
      },
      {
        "id": "chapter-8-lesson-3",
        "title": "8.3 Inheritance",
        "available": false
      },
      {
        "id": "chapter-8-lesson-4",
        "title": "8.4 Polymorphism",
        "available": false
      },
      {
        "id": "chapter-8-lesson-5",
        "title": "8.5 ارتباط این چهار مفهوم با یکدیگر",
        "available": false
      },
      {
        "id": "chapter-8-lesson-6",
        "title": "8.6 مثال کامل با یک سیستم واقعی",
        "available": false
      }
    ]
  },
  {
    "title": "فصل 9 — Association, Aggregation و Composition",
    "lessons": [
      {
        "id": "chapter-9-lesson-1",
        "title": "9.1 روابط بین Objectها",
        "available": false
      },
      {
        "id": "chapter-9-lesson-2",
        "title": "9.2 Association",
        "available": false
      },
      {
        "id": "chapter-9-lesson-3",
        "title": "9.3 One-to-One",
        "available": false
      },
      {
        "id": "chapter-9-lesson-4",
        "title": "9.4 One-to-Many",
        "available": false
      },
      {
        "id": "chapter-9-lesson-5",
        "title": "9.5 Many-to-Many",
        "available": false
      },
      {
        "id": "chapter-9-lesson-6",
        "title": "9.6 Aggregation",
        "available": false
      },
      {
        "id": "chapter-9-lesson-7",
        "title": "9.7 Composition",
        "available": false
      },
      {
        "id": "chapter-9-lesson-8",
        "title": "9.8 تفاوت Aggregation و Composition",
        "available": false
      },
      {
        "id": "chapter-9-lesson-9",
        "title": "9.9 Has-A vs Is-A",
        "available": false
      },
      {
        "id": "chapter-9-lesson-10",
        "title": "9.10 مثال‌های واقعی در Domain Model",
        "available": false
      }
    ]
  },
  {
    "title": "فصل 10 — Object Equality در C#",
    "lessons": [
      {
        "id": "chapter-10-lesson-1",
        "title": "10.1 Reference Equality",
        "available": false
      },
      {
        "id": "chapter-10-lesson-2",
        "title": "10.2 Value Equality",
        "available": false
      },
      {
        "id": "chapter-10-lesson-3",
        "title": "10.3 `Equals()`",
        "available": false
      },
      {
        "id": "chapter-10-lesson-4",
        "title": "10.4 `GetHashCode()`",
        "available": false
      },
      {
        "id": "chapter-10-lesson-5",
        "title": "10.5 Operator `==`",
        "available": false
      },
      {
        "id": "chapter-10-lesson-6",
        "title": "10.6 `ReferenceEquals`",
        "available": false
      },
      {
        "id": "chapter-10-lesson-7",
        "title": "10.7 Equality در Recordها",
        "available": false
      },
      {
        "id": "chapter-10-lesson-8",
        "title": "10.8 پیاده‌سازی `IEquatable<T>`",
        "available": false
      },
      {
        "id": "chapter-10-lesson-9",
        "title": "10.9 مشکلات Equality در Dictionary و HashSet",
        "available": false
      }
    ]
  },
  {
    "title": "فصل 11 — Object، Memory و Reference Types",
    "lessons": [
      {
        "id": "chapter-11-lesson-1",
        "title": "11.1 Stack و Heap",
        "available": false
      },
      {
        "id": "chapter-11-lesson-2",
        "title": "11.2 Value Type vs Reference Type",
        "available": false
      },
      {
        "id": "chapter-11-lesson-3",
        "title": "11.3 Object Reference",
        "available": false
      },
      {
        "id": "chapter-11-lesson-4",
        "title": "11.4 Reference Assignment",
        "available": false
      },
      {
        "id": "chapter-11-lesson-5",
        "title": "11.5 Passing Objects to Methods",
        "available": false
      },
      {
        "id": "chapter-11-lesson-6",
        "title": "11.6 Garbage Collector",
        "available": false
      },
      {
        "id": "chapter-11-lesson-7",
        "title": "11.7 Object Lifetime",
        "available": false
      },
      {
        "id": "chapter-11-lesson-8",
        "title": "11.8 `IDisposable`",
        "available": false
      },
      {
        "id": "chapter-11-lesson-9",
        "title": "11.9 `using`",
        "available": false
      },
      {
        "id": "chapter-11-lesson-10",
        "title": "11.10 Finalizer",
        "available": false
      }
    ]
  },
  {
    "title": "فصل 12 — Static در طراحی شی‌گرا",
    "lessons": [
      {
        "id": "chapter-12-lesson-1",
        "title": "12.1 Static Class",
        "available": false
      },
      {
        "id": "chapter-12-lesson-2",
        "title": "12.2 Static Method",
        "available": false
      },
      {
        "id": "chapter-12-lesson-3",
        "title": "12.3 Static Property",
        "available": false
      },
      {
        "id": "chapter-12-lesson-4",
        "title": "12.4 Static Field",
        "available": false
      },
      {
        "id": "chapter-12-lesson-5",
        "title": "12.5 Static Constructor",
        "available": false
      },
      {
        "id": "chapter-12-lesson-6",
        "title": "12.6 مشکلات استفاده بیش از حد از Static",
        "available": false
      },
      {
        "id": "chapter-12-lesson-7",
        "title": "12.7 Static و Testability",
        "available": false
      },
      {
        "id": "chapter-12-lesson-8",
        "title": "12.8 Static vs Dependency Injection",
        "available": false
      }
    ]
  },
  {
    "title": "فصل 13 — Records, Structs و Classes",
    "lessons": [
      {
        "id": "chapter-13-lesson-1",
        "title": "13.1 Class",
        "available": false
      },
      {
        "id": "chapter-13-lesson-2",
        "title": "13.2 Struct",
        "available": false
      },
      {
        "id": "chapter-13-lesson-3",
        "title": "13.3 Record",
        "available": false
      },
      {
        "id": "chapter-13-lesson-4",
        "title": "13.4 Record Struct",
        "available": false
      },
      {
        "id": "chapter-13-lesson-5",
        "title": "13.5 تفاوت Class و Struct",
        "available": false
      },
      {
        "id": "chapter-13-lesson-6",
        "title": "13.6 تفاوت Class و Record",
        "available": false
      },
      {
        "id": "chapter-13-lesson-7",
        "title": "13.7 Value Object با Record",
        "available": false
      },
      {
        "id": "chapter-13-lesson-8",
        "title": "13.8 چه زمانی از هرکدام استفاده کنیم؟",
        "available": false
      }
    ]
  },
  {
    "title": "فصل 14 — Generic Programming و OOP",
    "lessons": [
      {
        "id": "chapter-14-lesson-1",
        "title": "14.1 Generic Class",
        "available": false
      },
      {
        "id": "chapter-14-lesson-2",
        "title": "14.2 Generic Method",
        "available": false
      },
      {
        "id": "chapter-14-lesson-3",
        "title": "14.3 Generic Interface",
        "available": false
      },
      {
        "id": "chapter-14-lesson-4",
        "title": "14.4 Generic Constraints",
        "available": false
      },
      {
        "id": "chapter-14-lesson-5",
        "title": "14.5 Generics و Polymorphism",
        "available": false
      }
    ]
  },
  {
    "title": "فصل 15 — SOLID Principles",
    "lessons": [
      {
        "id": "chapter-15-lesson-1",
        "title": "15.1 مقدمه SOLID",
        "available": false
      },
      {
        "id": "chapter-15-lesson-2",
        "title": "15.2 Single Responsibility Principle — SRP",
        "available": false
      },
      {
        "id": "chapter-15-lesson-3",
        "title": "15.3 Open/Closed Principle — OCP",
        "available": false
      },
      {
        "id": "chapter-15-lesson-4",
        "title": "15.4 Liskov Substitution Principle — LSP",
        "available": false
      },
      {
        "id": "chapter-15-lesson-5",
        "title": "15.5 Interface Segregation Principle — ISP",
        "available": false
      },
      {
        "id": "chapter-15-lesson-6",
        "title": "15.6 Dependency Inversion Principle — DIP",
        "available": false
      },
      {
        "id": "chapter-15-lesson-7",
        "title": "15.7 مثال کامل SOLID در یک پروژه .NET",
        "available": false
      }
    ]
  },
  {
    "title": "فصل 16 — Dependency Injection و OOP",
    "lessons": [
      {
        "id": "chapter-16-lesson-1",
        "title": "16.1 Dependency چیست؟",
        "available": false
      },
      {
        "id": "chapter-16-lesson-2",
        "title": "16.2 Dependency Injection چیست؟",
        "available": false
      },
      {
        "id": "chapter-16-lesson-3",
        "title": "16.3 Constructor Injection",
        "available": false
      },
      {
        "id": "chapter-16-lesson-4",
        "title": "16.4 Property Injection",
        "available": false
      },
      {
        "id": "chapter-16-lesson-5",
        "title": "16.5 Method Injection",
        "available": false
      },
      {
        "id": "chapter-16-lesson-6",
        "title": "16.6 Dependency Injection Container",
        "available": false
      },
      {
        "id": "chapter-16-lesson-7",
        "title": "16.7 DI داخلی ASP.NET Core",
        "available": false
      },
      {
        "id": "chapter-16-lesson-8",
        "title": "16.8 Service Lifetimes",
        "available": false
      },
      {
        "id": "chapter-16-lesson-9",
        "title": "16.9 Dependency Inversion vs Dependency Injection",
        "available": false
      },
      {
        "id": "chapter-16-lesson-10",
        "title": "16.10 اشتباهات رایج DI",
        "available": false
      }
    ]
  },
  {
    "title": "فصل 17 — Coupling و Cohesion",
    "lessons": [
      {
        "id": "chapter-17-lesson-1",
        "title": "17.1 Coupling چیست؟",
        "available": false
      },
      {
        "id": "chapter-17-lesson-2",
        "title": "17.2 Tight Coupling",
        "available": false
      },
      {
        "id": "chapter-17-lesson-3",
        "title": "17.3 Loose Coupling",
        "available": false
      },
      {
        "id": "chapter-17-lesson-4",
        "title": "17.4 Cohesion چیست؟",
        "available": false
      },
      {
        "id": "chapter-17-lesson-5",
        "title": "17.5 High Cohesion",
        "available": false
      },
      {
        "id": "chapter-17-lesson-6",
        "title": "17.6 Low Cohesion",
        "available": false
      },
      {
        "id": "chapter-17-lesson-7",
        "title": "17.7 چگونه Coupling را کاهش دهیم؟",
        "available": false
      },
      {
        "id": "chapter-17-lesson-8",
        "title": "17.8 Interface و DI برای کاهش Coupling",
        "available": false
      }
    ]
  },
  {
    "title": "فصل 18 — اصول طراحی Object-Oriented",
    "lessons": [
      {
        "id": "chapter-18-lesson-1",
        "title": "18.1 Composition over Inheritance",
        "available": false
      },
      {
        "id": "chapter-18-lesson-2",
        "title": "18.2 Program to an Interface",
        "available": false
      },
      {
        "id": "chapter-18-lesson-3",
        "title": "18.3 Favor Immutability",
        "available": false
      },
      {
        "id": "chapter-18-lesson-4",
        "title": "18.4 Tell, Don't Ask",
        "available": false
      },
      {
        "id": "chapter-18-lesson-5",
        "title": "18.5 Law of Demeter",
        "available": false
      },
      {
        "id": "chapter-18-lesson-6",
        "title": "18.6 Encapsulate What Changes",
        "available": false
      },
      {
        "id": "chapter-18-lesson-7",
        "title": "18.7 Separation of Concerns",
        "available": false
      },
      {
        "id": "chapter-18-lesson-8",
        "title": "18.8 DRY",
        "available": false
      },
      {
        "id": "chapter-18-lesson-9",
        "title": "18.9 KISS",
        "available": false
      },
      {
        "id": "chapter-18-lesson-10",
        "title": "18.10 YAGNI",
        "available": false
      }
    ]
  },
  {
    "title": "فصل 19 — Code Smells در طراحی OOP",
    "lessons": [
      {
        "id": "chapter-19-lesson-1",
        "title": "19.1 God Class",
        "available": false
      },
      {
        "id": "chapter-19-lesson-2",
        "title": "19.2 Long Method",
        "available": false
      },
      {
        "id": "chapter-19-lesson-3",
        "title": "19.3 Large Class",
        "available": false
      },
      {
        "id": "chapter-19-lesson-4",
        "title": "19.4 Feature Envy",
        "available": false
      },
      {
        "id": "chapter-19-lesson-5",
        "title": "19.5 Data Class",
        "available": false
      },
      {
        "id": "chapter-19-lesson-6",
        "title": "19.6 Primitive Obsession",
        "available": false
      },
      {
        "id": "chapter-19-lesson-7",
        "title": "19.7 Shotgun Surgery",
        "available": false
      },
      {
        "id": "chapter-19-lesson-8",
        "title": "19.8 Switch Statement Abuse",
        "available": false
      },
      {
        "id": "chapter-19-lesson-9",
        "title": "19.9 Inappropriate Intimacy",
        "available": false
      },
      {
        "id": "chapter-19-lesson-10",
        "title": "19.10 Refused Bequest",
        "available": false
      },
      {
        "id": "chapter-19-lesson-11",
        "title": "19.11 Duplicate Code",
        "available": false
      },
      {
        "id": "chapter-19-lesson-12",
        "title": "19.12 Refactoring هر Code Smell",
        "available": false
      }
    ]
  },
  {
    "title": "فصل 20 — Design Patterns و OOP",
    "lessons": [
      {
        "id": "chapter-20-lesson-1",
        "title": "20.1 Factory Method",
        "available": false
      },
      {
        "id": "chapter-20-lesson-2",
        "title": "20.2 Abstract Factory",
        "available": false
      },
      {
        "id": "chapter-20-lesson-3",
        "title": "20.3 Builder",
        "available": false
      },
      {
        "id": "chapter-20-lesson-4",
        "title": "20.4 Singleton",
        "available": false
      },
      {
        "id": "chapter-20-lesson-5",
        "title": "20.5 Prototype",
        "available": false
      },
      {
        "id": "chapter-20-lesson-6",
        "title": "20.6 Adapter",
        "available": false
      },
      {
        "id": "chapter-20-lesson-7",
        "title": "20.7 Decorator",
        "available": false
      },
      {
        "id": "chapter-20-lesson-8",
        "title": "20.8 Facade",
        "available": false
      },
      {
        "id": "chapter-20-lesson-9",
        "title": "20.9 Proxy",
        "available": false
      },
      {
        "id": "chapter-20-lesson-10",
        "title": "20.10 Composite",
        "available": false
      },
      {
        "id": "chapter-20-lesson-11",
        "title": "20.11 Strategy",
        "available": false
      },
      {
        "id": "chapter-20-lesson-12",
        "title": "20.12 Observer",
        "available": false
      },
      {
        "id": "chapter-20-lesson-13",
        "title": "20.13 Command",
        "available": false
      },
      {
        "id": "chapter-20-lesson-14",
        "title": "20.14 Template Method",
        "available": false
      },
      {
        "id": "chapter-20-lesson-15",
        "title": "20.15 Chain of Responsibility",
        "available": false
      },
      {
        "id": "chapter-20-lesson-16",
        "title": "20.16 State",
        "available": false
      },
      {
        "id": "chapter-20-lesson-17",
        "title": "20.17 Mediator",
        "available": false
      }
    ]
  },
  {
    "title": "فصل 21 — OOP در Domain-Driven Design",
    "lessons": [
      {
        "id": "chapter-21-lesson-1",
        "title": "21.1 Domain Model",
        "available": false
      },
      {
        "id": "chapter-21-lesson-2",
        "title": "21.2 Entity",
        "available": false
      },
      {
        "id": "chapter-21-lesson-3",
        "title": "21.3 Value Object",
        "available": false
      },
      {
        "id": "chapter-21-lesson-4",
        "title": "21.4 Aggregate",
        "available": false
      },
      {
        "id": "chapter-21-lesson-5",
        "title": "21.5 Aggregate Root",
        "available": false
      },
      {
        "id": "chapter-21-lesson-6",
        "title": "21.6 Domain Service",
        "available": false
      },
      {
        "id": "chapter-21-lesson-7",
        "title": "21.7 Domain Event",
        "available": false
      },
      {
        "id": "chapter-21-lesson-8",
        "title": "21.8 Rich Domain Model",
        "available": false
      },
      {
        "id": "chapter-21-lesson-9",
        "title": "21.9 Anemic Domain Model",
        "available": false
      },
      {
        "id": "chapter-21-lesson-10",
        "title": "21.10 Encapsulation در Aggregate",
        "available": false
      },
      {
        "id": "chapter-21-lesson-11",
        "title": "21.11 Invariant چیست؟",
        "available": false
      },
      {
        "id": "chapter-21-lesson-12",
        "title": "21.12 مثال واقعی Domain Model",
        "available": false
      }
    ]
  },
  {
    "title": "فصل 22 — OOP در معماری نرم‌افزار",
    "lessons": [
      {
        "id": "chapter-22-lesson-1",
        "title": "22.1 OOP و Layered Architecture",
        "available": false
      },
      {
        "id": "chapter-22-lesson-2",
        "title": "22.2 OOP و Clean Architecture",
        "available": false
      },
      {
        "id": "chapter-22-lesson-3",
        "title": "22.3 Domain Layer",
        "available": false
      },
      {
        "id": "chapter-22-lesson-4",
        "title": "22.4 Application Layer",
        "available": false
      },
      {
        "id": "chapter-22-lesson-5",
        "title": "22.5 Infrastructure Layer",
        "available": false
      },
      {
        "id": "chapter-22-lesson-6",
        "title": "22.6 Dependency Rule",
        "available": false
      },
      {
        "id": "chapter-22-lesson-7",
        "title": "22.7 Interfaceها در مرز Layerها",
        "available": false
      },
      {
        "id": "chapter-22-lesson-8",
        "title": "22.8 Repository Abstraction",
        "available": false
      },
      {
        "id": "chapter-22-lesson-9",
        "title": "22.9 Application Service vs Domain Service",
        "available": false
      }
    ]
  },
  {
    "title": "فصل 23 — تست‌پذیری در طراحی OOP",
    "lessons": [
      {
        "id": "chapter-23-lesson-1",
        "title": "23.1 Testable Design چیست؟",
        "available": false
      },
      {
        "id": "chapter-23-lesson-2",
        "title": "23.2 Dependency Injection و Testing",
        "available": false
      },
      {
        "id": "chapter-23-lesson-3",
        "title": "23.3 Mock کردن Dependencyها",
        "available": false
      },
      {
        "id": "chapter-23-lesson-4",
        "title": "23.4 Stub / Fake / Mock",
        "available": false
      },
      {
        "id": "chapter-23-lesson-5",
        "title": "23.5 مشکل Static Dependency",
        "available": false
      },
      {
        "id": "chapter-23-lesson-6",
        "title": "23.6 مشکل `new` کردن Dependency داخل Class",
        "available": false
      },
      {
        "id": "chapter-23-lesson-7",
        "title": "23.7 طراحی Classهای قابل Unit Test",
        "available": false
      }
    ]
  },
  {
    "title": "فصل 24 — Refactoring از Procedural Code به OOP",
    "lessons": [
      {
        "id": "chapter-24-lesson-1",
        "title": "مرحله 1",
        "available": false
      },
      {
        "id": "chapter-24-lesson-2",
        "title": "مرحله 2",
        "available": false
      },
      {
        "id": "chapter-24-lesson-3",
        "title": "مرحله 3",
        "available": false
      },
      {
        "id": "chapter-24-lesson-4",
        "title": "مرحله 4",
        "available": false
      },
      {
        "id": "chapter-24-lesson-5",
        "title": "مرحله 5",
        "available": false
      },
      {
        "id": "chapter-24-lesson-6",
        "title": "مرحله 6",
        "available": false
      },
      {
        "id": "chapter-24-lesson-7",
        "title": "مرحله 7",
        "available": false
      },
      {
        "id": "chapter-24-lesson-8",
        "title": "مرحله 8",
        "available": false
      },
      {
        "id": "chapter-24-lesson-9",
        "title": "مرحله 9",
        "available": false
      },
      {
        "id": "chapter-24-lesson-10",
        "title": "مرحله 10",
        "available": false
      }
    ]
  },
  {
    "title": "فصل 25 — پروژه عملی: طراحی سیستم پرداخت",
    "lessons": [
      {
        "id": "chapter-25-lesson-1",
        "title": "پروژه عملی: طراحی سیستم پرداخت",
        "available": false
      }
    ]
  },
  {
    "title": "فصل 26 — سوالات مصاحبه OOP برای .NET Developer",
    "lessons": [
      {
        "id": "chapter-26-lesson-1",
        "title": "سطح Junior",
        "available": false
      },
      {
        "id": "chapter-26-lesson-2",
        "title": "سطح Mid-Level",
        "available": false
      },
      {
        "id": "chapter-26-lesson-3",
        "title": "سطح Senior",
        "available": false
      }
    ]
  },
  {
    "title": "فصل 27 — اشتباهات رایج در OOP",
    "lessons": [
      {
        "id": "chapter-27-lesson-1",
        "title": "اشتباهات رایج در OOP",
        "available": false
      }
    ]
  },
  {
    "title": "فصل 28 — جمع‌بندی و مسیر ادامه",
    "lessons": [
      {
        "id": "chapter-28-lesson-1",
        "title": "28.1 مرور مفاهیم اصلی OOP",
        "available": false
      },
      {
        "id": "chapter-28-lesson-2",
        "title": "28.2 چک‌لیست مهارت‌های OOP برای .NET Developer",
        "available": false
      },
      {
        "id": "chapter-28-lesson-3",
        "title": "28.3 مهارت‌های موردنیاز Junior",
        "available": false
      },
      {
        "id": "chapter-28-lesson-4",
        "title": "28.4 مهارت‌های موردنیاز Mid-Level",
        "available": false
      },
      {
        "id": "chapter-28-lesson-5",
        "title": "28.5 مهارت‌های موردنیاز Senior",
        "available": false
      },
      {
        "id": "chapter-28-lesson-6",
        "title": "28.6 مسیر بعد از OOP",
        "available": false
      }
    ]
  }
];
  const availableLessons = dotnetChapters
    .flatMap(chapter => chapter.lessons)
    .filter(lesson => lesson.available);

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
            if (lesson.available) {
              return `<li><a href="../oop/index.html"${lesson.id === currentLessonId ? ' aria-current="page"' : ''}>${title}</a></li>`;
            }
            return `<li><span class="lesson-soon" data-lesson-id="${lesson.id}">${title}</span></li>`;
          }).join('')}</ol>
        </details>`;
      }).join('')}`;
  }

  const api = { dotnetChapters, availableLessons, renderDotnetNavigation };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  globalScope.dotnetCourse = api;
})(typeof window !== 'undefined' ? window : globalThis);

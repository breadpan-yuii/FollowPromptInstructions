I can definitely help write this into Figma, but I can't directly create or edit a Figma file unless I have access to your Figma workspace through the Figma integration.

Your specification is already very detailed. The only change I'd recommend is restructuring it into a prompt that Figma AI understands better by defining the design system first, then the screens, then the components and interactions.

---

# Wallet & Expense Tracker — Android UI (Flutter Ready)

Create a **high-fidelity Android mobile application UI** for a **Wallet & Expense Tracker** that will be implemented in **Flutter (Dart)**.

The design must follow **Material Design 3** guidelines and use **Auto Layout**, reusable components, variables, and a clean developer-friendly structure.

The app should feel similar in quality to **Wallet by BudgetBakers**, **Money Manager**, and **Spendee**, while maintaining its own modern fintech identity.

---

## Design Style

* Material Design 3
* Modern fintech aesthetic
* Dark theme
* Rounded corners (16–20px)
* Card-based interface
* Soft elevation
* Smooth gradients
* Large touch targets
* Clean typography
* Minimal yet premium appearance
* Responsive Android layouts

---

## Color System

Background

* #121212

Surface

* #1E1E1E

Primary

* #6C63FF

Secondary

* #8E44AD

Accent

* #00C2FF

Success (Income)

* #4CAF50

Error (Expense)

* #F44336

Text

* White

Secondary Text

* Gray

---

## Typography

Use Material Design 3 typography.

Create text styles for:

* Display
* Headline
* Title
* Body
* Label
* Caption

---

## Design System

Create reusable components for:

Buttons

* Filled
* Outlined
* Text
* Icon Button
* Floating Action Button

Cards

Dialogs

Bottom Sheets

Snackbars

Search Bar

Text Fields

Dropdown Menus

Date Picker

Progress Bars

Pie Charts

Bar Charts

Navigation Bar

App Bar

Transaction Card

Budget Card

Category Card

Statistic Card

Profile Card

Create reusable color variables, spacing tokens, typography styles, and icon styles.

Use an **8-point spacing grid**.

---

# Required Screens

---

## 1. Splash Screen

Include

* Wallet logo
* App name
* Tagline

> Track Every Peso, Spend Smarter.

Animated loading indicator

---

## 2. Login

Fields

* Email
* Password

Options

* Remember Me
* Forgot Password

Buttons

* Login
* Continue as Guest

Footer

* Don't have an account?
* Sign Up

---

## 3. Sign Up

Fields

* Full Name
* Username
* Email
* Password
* Confirm Password

Buttons

* Create Account
* Back to Login

---

## 4. Home Dashboard

Top Card

Current Wallet Balance

Display

* Total Balance
* Monthly Income
* Monthly Expenses
* Remaining Balance

Quick Actions

* Add Income
* Add Expense

Widgets

Recent Transactions

Mini Spending Chart

Monthly Summary

Bottom Navigation

* Dashboard
* Transactions
* Analytics
* Profile

Floating Action Button

Add Transaction

---

## 5. Transactions

Scrollable list of transactions.

Each transaction card displays

* Category Icon
* Title
* Category
* Date
* Amount

Income

Green

Expense

Red

Swipe Actions

* Edit
* Delete

Floating Action Button

* Add Transaction

---

# CRUD Flow

## Create Transaction

Fields

* Transaction Title
* Amount
* Category
* Type

  * Income
  * Expense
* Date
* Notes

Buttons

* Save
* Cancel

---

## Read Transaction

Display

* Title
* Amount
* Category
* Date
* Notes
* Transaction Type

Buttons

* Edit
* Delete

---

## Update Transaction

Same layout as Create.

Auto-filled values.

Button

Update

---

## Delete Confirmation

Material Dialog

Title

Delete this transaction?

Buttons

* Cancel
* Delete

---

## Categories

Display category cards.

Default categories

* Food
* Transportation
* Bills
* Shopping
* Entertainment
* Salary
* Savings
* Healthcare
* Education
* Others

Support CRUD operations.

---

## Analytics

Dashboard containing

* Pie Chart
* Expense Breakdown
* Income vs Expense Bar Chart
* Weekly Spending Trend
* Spending by Category

Summary Cards

* Highest Expense Category
* Total Savings
* Budget Progress

---

## Search & Filters

Search Bar

Filters

* Date
* Category
* Income
* Expense
* Amount Range

Sorting

* Latest
* Oldest
* Highest Amount
* Lowest Amount

Use chips, bottom sheets, and dropdowns.

---

## Budget

Allow users to

* Create Budget
* Edit Budget
* Delete Budget

Budget Card Example

Food Budget

₱2,500 / ₱5,000

Linear Progress Indicator

Remaining Budget

---

## Profile

Display

* Profile Picture
* Name
* Email
* Current Balance
* Total Transactions
* Total Income
* Total Expenses

Buttons

* Edit Profile
* Change Password
* Logout

---

## Settings

Include

* Dark Mode
* Currency
* Notifications
* Language
* About
* Privacy Policy
* Logout

---

# Navigation

Bottom Navigation

* Dashboard
* Transactions
* Analytics
* Profile

Floating Action Button

Add Transaction

---

# User Experience

Design smooth user flows for every CRUD operation.

Include:

* Empty states with illustrations
* Delete confirmation dialogs
* Success snackbars
* Error snackbars
* Material transitions
* Touch-friendly controls
* Consistent spacing
* Accessible contrast
* Responsive Android layouts

---

# Figma Organization

Create organized pages:

1. Cover
2. Design System
3. Components
4. Screens
5. Prototypes

Use Auto Layout throughout.

Create reusable components and variants.

Use Variables for:

* Colors
* Typography
* Spacing
* Corner Radius
* Elevation

Name layers clearly for Flutter developers.

---

# Deliverables

Produce:

* High-fidelity Android mockups
* Complete Material Design 3 design system
* Reusable components and variants
* Auto Layout frames
* Interactive prototype connections
* Flutter-ready spacing and layout
* Developer-friendly organization
* Pixel-perfect fintech interface with complete CRUD functionality and modern analytics

The final result should resemble a polished, production-ready fintech application suitable for implementation in Flutter, with a premium dark theme, intuitive navigation, insightful analytics, and a seamless expense management experience.

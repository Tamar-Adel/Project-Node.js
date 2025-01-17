# Recipe, Category, and User Management with MongoDB and Node.js

## Project Description
This project provides a REST API for managing recipes, categories, and users. It is built using Node.js with Express and MongoDB. The system supports functions like adding, updating, and deleting data, along with basic user and admin permissions management.

---

## Project Structure

### 1. **Database Connection**
#### File: `config/db.js`
- This file handles the connection to MongoDB using the `mongoose` library.
- It uses the environment variable `MONGODB_URI` to establish the connection string.

### 2. **Data Models**
#### Files:
- `models/user.model.js`: Defines the user schema, including password encryption.
- `models/recipes.model.js`: Defines the recipe schema.
- `models/category.model.js`: Defines the category schema.

### 3. **Controllers**
#### Files:
- `controllers/user.controller.js`: Handles user-related operations like login, registration, and user listing.
- `controllers/recipes.controller.js`: Manages recipe operations like adding, updating, deleting, and filtering recipes.
- `controllers/categories.controller.js`: Handles category management.

### 4. **Routes**
#### Files:
- `routes/users.route.js`: Defines routes for user-related functionality.
- `routes/recipes.route.js`: Defines routes for recipe operations.
- `routes/categories.route.js`: Defines routes for category management.

### 5. **Middlewares**
#### Files:
- `middlewares/authadmin.middleware.js`: Verifies if a user is an admin.
- `middlewares/errorHandling.middleware.js`: Handles global error responses.
- `middlewares/generateToken.js`: Generates JWT for users.

### 6. **Main Entry File**
#### File: `server.js`
- Initializes the application, connects to MongoDB, and sets up routes and middlewares.

---

## Setup Instructions

1. **Clone the Project**  
   Clone the project from a Git repository or download it locally.

2. **Install Dependencies**  
   Run the following command:
   ```bash
   npm install
------------------------------------------------------------------------------------------
# ניהול מתכונים, קטגוריות ומשתמשים עם MongoDB ו-Node.js

## תיאור הפרויקט
פרויקט זה מאפשר ניהול מתכונים, קטגוריות ומשתמשים באמצעות REST API. המערכת מבוססת על Node.js עם Express ו-MongoDB, והיא כוללת פונקציות כמו הוספה, עדכון ומחיקה של נתונים, לצד מערכת הרשאות בסיסית למשתמשים ומנהלים.

---

## תכולת הפרויקט

### 1. **חיבור לבסיס הנתונים**
#### קובץ: `config/db.js`
- קובץ זה אחראי לחיבור ל-MongoDB באמצעות הספרייה `mongoose`.
- הקובץ משתמש במשתנה סביבה `MONGODB_URI` לצורך התחברות לכתובת בסיס הנתונים.

### 2. **מודלים של הנתונים**
#### קבצים:
- `models/user.model.js`: מגדיר את מבנה משתמשים כולל הצפנת סיסמאות.
- `models/recipies.model.js`: מגדיר את מבנה מתכונים.
- `models/category.model.js`: מגדיר את מבנה קטגוריות.

### 3. **בקרות (Controllers)**
#### קבצים:
- `controllers/user.controller.js`: מטפל בפונקציות משתמשים כמו התחברות, רישום והצגת רשימת משתמשים.
- `controllers/recipies.controller.js`: מטפל בפונקציות של מתכונים כמו הוספה, עדכון, מחיקה וסינון לפי פרמטרים.
- `controllers/categories.controller.js`: מטפל בניהול קטגוריות.

### 4. **ניתובים (Routes)**
#### קבצים:
- `routes/users.route.js`: ניתובים לפונקציות המשתמשים.
- `routes/recipies.route.js`: ניתובים לפונקציות המתכונים.
- `routes/categories.route.js`: ניתובים לפונקציות הקטגוריות.

### 5. **מידלווארים (Middlewares)**
#### קבצים:
- `middlwares/authadmin.middleware.js`: בודק האם משתמש הוא מנהל.
- `middlwares/errorHandling.middleware.js`: מטפל בשגיאות גלובליות.
- `middlwares/generateToken.js`: יוצר JWT עבור משתמשים.

### 6. **קובץ הפעלה ראשי**
#### קובץ: `server.js`
- מאתחל את האפליקציה, מבצע את החיבור ל-MongoDB, ומגדיר את כל הניתובים והמידלווארים.

---

## הוראות הפעלה

1. **שכפול הפרויקט**  
   יש לשכפל את הפרויקט ממאגר ה-Git או להוריד אותו למחשב.

2. **התקנת התלויות**  
   יש להריץ את הפקודה הבאה:
   ```bash
   npm install




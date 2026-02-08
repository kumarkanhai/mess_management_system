# Mess Management Application Design Specification

## 1. User Roles & Flows

### A. Student (User)
**Objective:** Access quality food, check nutrition, reserve meals to avoid missing out, and provide feedback.
**Flow:**
1.  **Login/Register**: Authenticate as a student.
2.  **Dashboard**: View "Today's Meals" (Breakfast, Lunch, Dinner).
3.  **Menu Detail**:
    *   View specific items.
    *   Check **Nutrition Info** (Calories, Protein, Allergens).
    *   Check **Availability** (In Stock / Out of Stock).
4.  **Action**:
    *   **Reserve Button**: Books a meal for a specific slot. (Reduces available count prediction for management).
5.  **Post-Meal**:
    *   **Feedback**: Rate the meal (1-5 stars).
    *   **Comments**: "Too salty", "Cold", etc.
    *   **Image Upload**: Upload photo of food (e.g., if quality is bad or good).

### B. Admin (University Management)
**Objective:** Reduce food waste, monitor quality, and track consumption trends.
**Flow:**
1.  **Dashboard**:
    *   **Reserved vs Prepared**: Real-time chart comparing bookings vs. actual food made.
    *   **Waste Estimation**: Daily report of wasted food (Prepared - Consumed).
    *   **Consumption Trends**: Weekly/Monthly graphs of popular meals vs. wasted meals.
    *   **Feedback Score**: Aggregated sentiment analysis from student feedback.

### C. Mess Staff
**Objective:** Know how much to cook and manage distribution.
**Flow:**
1.  **Food Requirement View**: See total reservations for the next meal (e.g., "Cook for 200 students").
2.  **Menu Management**: Upload daily menu and nutrition info.
3.  **Service**:
    *   Check-in students (verify reservation).
    *   Mark meal as "Served".

---

## 2. Database Schema (MongoDB / Mongoose)

### A. User Schema
```javascript
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['student', 'admin', 'staff'], 
    default: 'student' 
  },
  studentId: { type: String }, // Optional, for students
  profileImage: { type: String }
});
```

### B. Menu Schema
```javascript
const MenuSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  mealType: { 
    type: String, 
    enum: ['Breakfast', 'Lunch', 'Dinner', 'Snacks'], 
    required: true 
  },
  items: [{
    name: { type: String, required: true },
    nutritionInfo: {
      calories: Number,
      protein: Number,
      carbs: Number,
      fats: Number
    }, // Nutrition Info
    image: String, // Food Image URL
    isVegetarian: Boolean
  }],
  availability: { type: Boolean, default: true }, // Is open for reservation?
  preparedQuantity: { type: Number, default: 0 } // For waste calculation
});
```

### C. Reservation Schema
```javascript
const ReservationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  menuId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
  status: { 
    type: String, 
    enum: ['reserved', 'collected', 'cancelled', 'no-show'], 
    default: 'reserved' 
  },
  reservedAt: { type: Date, default: Date.now },
  collectedAt: { type: Date }
});
```

### D. Feedback Schema
```javascript
const FeedbackSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  menuId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
  imageUrl: { type: String }, // Option to add food image
  date: { type: Date, default: Date.now }
});
```

### E. Analytics/Waste Schema (Aggregated Data)
```javascript
const WasteLogSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  mealType: { type: String, required: true },
  totalPrepared: { type: Number, required: true },
  totalReserved: { type: Number, required: true },
  totalConsumed: { type: Number, required: true }, // Scanned count
  wasteQuantity: { type: Number }, // Calculated or Weighed (in kg)
  wasteReason: { type: String } // 'Overcooked', 'Low Attendance', etc.
});
```

## 3. Required Fields Summary

### Student View Fields
*   **Today's Meals**: List of active Menu items for current Date.
*   **Nutrition Info**: Display `items.nutritionInfo` from Menu Schema.
*   **Availability**: Boolean check on `Menu.availability`.
*   **Reserve Button**: Creates a `Reservation` document.
*   **Feedback**: Input for `rating`, `comment`, `imageUrl`.

### Management View Fields
*   **Reserved vs Prepared**: Count(Reservation where status='reserved') vs Menu.preparedQuantity.
*   **Consumption Trends**: Aggregate Reservation data over time.
*   **Feedback Score**: Average of `Feedback.rating`.
*   **Waste Estimation**: (Prepared - Collected) delta logic.

### Staff View Fields
*   **Food Requirement**: Count(Reservation where status='reserved') for upcoming meal.
*   **Book List**: List of User Names with active reservations.

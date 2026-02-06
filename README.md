
# User Management CRUD Application

A React-based CRUD application for managing user data with extensible form configuration and Material-UI components.

## Features

- ✅ Create, Read, Update, Delete users
- ✅ Form validation using Joi
- ✅ Responsive Material-UI design
- ✅ Configuration-driven form fields
- ✅ Easy extensibility for new fields
- ✅ Error handling and loading states
- ✅ Mock API with JSON Server

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd user-crud-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the mock API server:
```bash
npm run server
```
This starts JSON Server on http://localhost:3001

4. In a new terminal, start the React application:
```bash
npm start
```
This starts the React app on http://localhost:3000

## Adding New Fields

The application is designed for easy extensibility. To add new fields:

### 1. Update Form Configuration

Edit `src/config/formConfig.js` and add your new field to the `userFormConfig` array:

```javascript
{
  name: 'dateOfBirth',
  label: 'Date of Birth',
  type: 'date',
  required: false,
  validation: Joi.date().optional().messages({
    'date.base': 'Please enter a valid date'
  })
}
```

### 2. Update Mock Data (Optional)

Add the new field to existing users in `db.json`:

```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+1234567890",
  "email": "john.doe@example.com",
  "dateOfBirth": "1990-01-15"
}
```

### That's it! 

The application will automatically:
- Render the new field in forms
- Include it in the user list table
- Apply validation rules
- Handle CRUD operations


### Configuration-Driven Forms
- **Decision**: Use a configuration array to define form fields
- **Benefit**: Adding new fields requires only config changes, no UI code modifications
- **Location**: `src/config/formConfig.js`

### Joi Validation
- **Decision**: Use Joi for schema validation
- **Benefit**: Declarative validation rules, easy to extend
- **Implementation**: Each field config includes its validation schema

### Material-UI Components
- **Decision**: Use Material-UI for consistent, professional UI
- **Benefit**: Built-in responsive design, accessibility, and theming

### Service Layer Pattern
- **Decision**: Separate API logic into service classes
- **Benefit**: Easy to swap API implementations, centralized error handling
- **Location**: `src/services/userService.js`

### Component Separation
- **Decision**: Split functionality into focused components
- **Components**: UserForm, UserList, ConfirmDialog
- **Benefit**: Reusable, testable, maintainable code

## Project Structure

```
src/
├── components/
│   ├── UserForm.js          # Form for create/edit operations
│   ├── UserList.js          # Table display of users
│   └── ConfirmDialog.js     # Delete confirmation dialog
├── config/
│   └── formConfig.js        # Field configuration and validation
├── services/
│   └── userService.js       # API service layer
├── App.js                   # Main application component
└── index.js                 # Application entry point
```

## API Endpoints

The application expects these REST endpoints:

- `GET /users` - Fetch all users
- `GET /users/:id` - Fetch single user
- `POST /users` - Create new user
- `PUT /users/:id` - Update existing user
- `DELETE /users/:id` - Delete user


## Deployment

### Quick Netlify Deployment
1. Push code to GitHub
2. Connect repository to Netlify

## Technologies Used

- React 18
- Material-UI 5
- Joi (validation)
- Axios (HTTP client)
- JSON Server (mock API)

## Future Enhancements

- User search and filtering
- Pagination for large datasets
- Export functionality
- User profile images
- Advanced field types (multi-select, file upload)
- Real-time updates with WebSocket



Deplyed link:https://lustrous-travesseiro-7d5dd6.netlify.app/

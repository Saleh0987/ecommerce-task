E-commerce App
This is a simple E-commerce application built with React, Vite, Redux Toolkit, and Tailwind CSS. The app allows users to browse products, add them to a cart, and proceed to checkout. It fetches product data from the EscuelaJS API.
Features

Browse products and categories fetched from an API.
Add products to the cart and update quantities.
View cart in a sidebar with total price and item count.
Clear cart functionality with confirmation modal.
Proceed to checkout, clearing the cart and local storage.
Responsive design using Tailwind CSS.
Unit tests for key components using Jest.

Tech Stack

React: Frontend library for building the UI.
Vite: Fast build tool and development server.
Redux Toolkit: State management for the cart and product data.
Axios: For making API requests.
Tailwind CSS: For styling the app.
React Router: For client-side routing.
Sonner: For toast notifications.
Jest: For unit testing.

Installation

Clone the repository:
git clone https://github.com/your-username/ecommerce-task.git
cd ecommerce-task

Install dependencies:
npm install

Create a .env file in the root directory and add the API base URL:
VITE_BASE_URL=https://api.escuelajs.co/api/v1

Running the App

Start the development server:
npm run dev

The app will be available at http://localhost:3000.

Open your browser and navigate to http://localhost:3000 to view the app.

Available Scripts

npm run dev: Starts the development server.
npm run build: Builds the app for production.
npm test: Runs the unit tests using Jest.
npm run lint: Lints the code using ESLint (if configured).

Project Structure
ecommerce-task/
├── src/
│ ├── components/ # Reusable React components (e.g., ProductCard, CartSidebar)
│ ├── redux/ # Redux slices and store configuration
│ │ ├── slices/ # Redux Toolkit slices (e.g., cartSlice, productsSlice)
│ │ └── store.js # Redux store setup
│ ├── utils/ # Utility functions (e.g., imageUtils)
│ ├── pages/ # Page components (e.g., Home, Cart)
│ ├── App.jsx # Main app component with routing
│ └── main.jsx # Entry point for the app
├── .env # Environment variables (e.g., VITE_BASE_URL)
├── package.json # Project dependencies and scripts
└── README.md # Project documentation

Testing
The project includes unit tests for key components like ProductCard and CartSidebar. To run the tests:
npm test

Tests are written using Jest and React Testing Library, covering scenarios like:

Rendering product details.
Adding/removing items from the cart.
Updating quantities.
Clearing the cart.

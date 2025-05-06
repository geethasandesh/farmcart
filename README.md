# FarmCart - Farm Fresh Produce Direct to Your Door

FarmCart is a React Native/Expo mobile application that allows users to buy fresh vegetables, fruits, and organic products directly from farmers. The app eliminates middlemen, providing better prices for consumers and better returns for farmers.

## Features

- User authentication (login, registration)
- Browse products by categories
- View featured products, new arrivals, and best sellers
- Product details with farmer information
- Add products to cart
- Checkout and order tracking
- User profile management

## Tech Stack

- React Native
- Expo
- Firebase (Authentication, Firestore, Storage)
- React Navigation
- React Native Paper (UI components)

## Installation and Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation Steps

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/farmcart.git
   cd farmcart
   ```

2. Install dependencies:
   ```
   npm install
   ```
   
   or

   ```
   yarn install
   ```

3. Update Firebase configuration:
   - Navigate to `src/services/firebase.js`
   - Replace the Firebase configuration with your own Firebase project details

4. Start the development server:
   ```
   expo start
   ```

5. Use the Expo Go app on your device to scan the QR code that appears in the terminal or in the browser.

## Project Structure

```
farmcart/
├── App.js               # Entry point
├── package.json         # Dependencies
├── src/
│   ├── assets/          # Images, fonts, etc.
│   ├── components/      # Reusable components
│   ├── screens/         # Application screens
│   ├── services/        # API services and Firebase config
│   └── utils/           # Utility functions
└── README.md
```

## Screens

1. **Welcome Screen**: Introduction to the app
2. **Login/Register Screens**: User authentication
3. **Home Screen**: Browse products by category, featured items
4. **Product Detail Screen**: Detailed view of products with farmer info
5. **Cart Screen**: Review cart items and proceed to checkout
6. **Profile Screen**: User profile management and settings

## Future Enhancements

- In-app messaging between customers and farmers
- Order tracking
- Reviews and ratings system
- Farmer profiles and store pages
- Subscription service for regular deliveries
- Integration with payment gateways

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Unsplash for product images
- React Native, Expo, and Firebase communities for documentation and support
## Scan to download the App
<img src="https://github.com/user-attachments/assets/80f99ff9-7398-49e1-bebd-c4a395c9625f" alt="farmcart QR" width="200"/>



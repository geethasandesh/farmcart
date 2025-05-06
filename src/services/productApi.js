import { db } from './firebase';
import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
  limit 
} from 'firebase/firestore';

// Mock product data (in a real app, this would come from Firebase)
const mockProducts = [
  { 
    id: '1', 
    name: 'Fresh Tomatoes', 
    price: 2.99, 
    unit: 'kg', 
    farmer: 'Green Valley Farm', 
    location: 'Springfield, IL',
    category: 'vegetables',
    isFeatured: true,
    isOrganic: true,
    rating: 4.8,
    reviews: 156,
    description: 'Fresh, juicy tomatoes grown with care and sustainable farming practices.',
    image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  { 
    id: '2', 
    name: 'Organic Apples', 
    price: 4.49, 
    unit: 'kg', 
    farmer: 'Sunny Grove Farms', 
    location: 'Madison, WI',
    category: 'fruits',
    isFeatured: true,
    isOrganic: true,
    rating: 4.9,
    reviews: 203,
    description: 'Sweet and crisp apples grown using organic farming methods. Perfect for snacking or baking.',
    image: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  { 
    id: '3', 
    name: 'Fresh Spinach', 
    price: 1.99, 
    unit: 'bunch', 
    farmer: 'Evergreen Farms', 
    location: 'Columbus, OH',
    category: 'vegetables',
    isFeatured: true,
    isOrganic: true,
    rating: 4.7,
    reviews: 129,
    description: 'Nutrient-rich, leafy green spinach. Locally grown and harvested at peak freshness.',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  { 
    id: '4', 
    name: 'Organic Milk', 
    price: 3.99, 
    unit: 'liter', 
    farmer: 'Happy Cow Dairy', 
    location: 'Sarasota, FL',
    category: 'dairy',
    isFeatured: true,
    isOrganic: true,
    rating: 4.9,
    reviews: 178,
    description: 'Creamy, organic milk from grass-fed cows. No hormones or antibiotics.',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  { 
    id: '5', 
    name: 'Brown Rice', 
    price: 2.49, 
    unit: 'kg', 
    farmer: 'Golden Fields Farm', 
    location: 'Portland, OR',
    category: 'grains',
    isFeatured: false,
    isOrganic: true,
    rating: 4.6,
    reviews: 112,
    description: 'Nutritious whole grain brown rice. High in fiber and minimally processed.',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e8ac?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  { 
    id: '6', 
    name: 'Fresh Strawberries', 
    price: 3.99, 
    unit: 'box', 
    farmer: 'Berry Good Farms', 
    location: 'Santa Barbara, CA',
    category: 'fruits',
    isFeatured: false,
    isOrganic: true,
    rating: 4.8,
    reviews: 185,
    description: 'Sweet, juicy strawberries handpicked at the peak of ripeness.',
    image: 'https://images.unsplash.com/photo-1518635017498-87f514b751ba?q=80&w=2081&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  { 
    id: '7', 
    name: 'Organic Eggs', 
    price: 4.99, 
    unit: 'dozen', 
    farmer: 'Happy Hens Farm', 
    location: 'Austin, TX',
    category: 'dairy',
    isFeatured: false,
    isOrganic: true,
    rating: 4.9,
    reviews: 231,
    description: 'Free-range, organic eggs from hens raised in humane conditions with access to pasture.',
    image: 'https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?q=80&w=2036&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  { 
    id: '8', 
    name: 'Organic Honey', 
    price: 7.99, 
    unit: 'jar', 
    farmer: 'Busy Bee Apiaries', 
    location: 'Savannah, GA',
    category: 'organic',
    isFeatured: false,
    isOrganic: true,
    rating: 4.8,
    reviews: 142,
    description: 'Raw, unfiltered honey produced from local wildflowers. Rich in flavor and nutrients.',
    image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
];

export const productsAPI = {
  // Get all products
  getAllProducts: async () => {
    // In a real app, we would use:
    // const querySnapshot = await getDocs(collection(db, "products"));
    // return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    return mockProducts;
  },
  
  // Get product by ID
  getProductById: async (productId) => {
    // In a real app, we would use:
    // const docRef = doc(db, "products", productId);
    // const docSnap = await getDoc(docRef);
    // if (docSnap.exists()) {
    //   return { id: docSnap.id, ...docSnap.data() };
    // }
    // return null;
    
    return mockProducts.find(product => product.id === productId);
  },
  
  // Get featured products
  getFeaturedProducts: async () => {
    // In a real app, we would use:
    // const q = query(
    //   collection(db, "products"),
    //   where("isFeatured", "==", true),
    //   limit(10)
    // );
    // const querySnapshot = await getDocs(q);
    // return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    return mockProducts.filter(product => product.isFeatured);
  },
  
  // Get products by category
  getProductsByCategory: async (category) => {
    // In a real app, we would use:
    // const q = query(
    //   collection(db, "products"),
    //   where("category", "==", category)
    // );
    // const querySnapshot = await getDocs(q);
    // return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    return mockProducts.filter(product => product.category === category);
  },
  
  // Search products by name
  searchProducts: async (searchTerm) => {
    // In a real Firebase app, we would use Firebase extensions like Algolia for search
    // or implement server-side search
    
    // For our mock implementation, we'll do a simple search
    const lowercaseSearchTerm = searchTerm.toLowerCase();
    return mockProducts.filter(product => 
      product.name.toLowerCase().includes(lowercaseSearchTerm) ||
      product.farmer.toLowerCase().includes(lowercaseSearchTerm) ||
      product.description.toLowerCase().includes(lowercaseSearchTerm)
    );
  },
  
  // Get best-selling products
  getBestSellingProducts: async () => {
    // In a real app, we would use:
    // const q = query(
    //   collection(db, "products"),
    //   orderBy("sales", "desc"),
    //   limit(10)
    // );
    // const querySnapshot = await getDocs(q);
    // return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    // For our mock implementation, we'll sort by rating
    return [...mockProducts].sort((a, b) => b.rating - a.rating).slice(0, 4);
  },
  
  // Get new arrivals
  getNewArrivals: async () => {
    // In a real app, we would use:
    // const q = query(
    //   collection(db, "products"),
    //   orderBy("createdAt", "desc"),
    //   limit(10)
    // );
    // const querySnapshot = await getDocs(q);
    // return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    // For our mock implementation, we'll just return the first few products
    return mockProducts.slice(2, 6);
  }
}; 
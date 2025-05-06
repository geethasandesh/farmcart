export const products = {
  vegetables: [
    {
      id: 'v1',
      name: 'Fresh Tomatoes',
      price: 2.99,
      unit: 'kg',
      image: require('../assets/products/tomatoes.jpg'),
      description: 'Fresh, ripe tomatoes from local farms',
      category: 'vegetables'
    },
    {
      id: 'v2',
      name: 'Carrots',
      price: 1.99,
      unit: 'kg',
      image: require('../assets/products/carrots.jpg'),
      description: 'Organic carrots, freshly harvested',
      category: 'vegetables'
    },
    // Add more vegetables...
  ],
  fruits: [
    {
      id: 'f1',
      name: 'Apples',
      price: 3.99,
      unit: 'kg',
      image: require('../assets/products/apples.jpg'),
      description: 'Sweet and crispy apples',
      category: 'fruits'
    },
    {
      id: 'f2',
      name: 'Bananas',
      price: 2.49,
      unit: 'kg',
      image: require('../assets/products/bananas.jpg'),
      description: 'Fresh yellow bananas',
      category: 'fruits'
    },
    // Add more fruits...
  ],
  dairy: [
    {
      id: 'd1',
      name: 'Fresh Milk',
      price: 3.49,
      unit: 'liter',
      image: require('../assets/products/milk.jpg'),
      description: 'Farm fresh milk',
      category: 'dairy'
    },
    // Add more dairy products...
  ],
  grains: [
    {
      id: 'g1',
      name: 'Brown Rice',
      price: 4.99,
      unit: 'kg',
      image: require('../assets/products/rice.jpg'),
      description: 'Organic brown rice',
      category: 'grains'
    },
    // Add more grains...
  ],
  organic: [
    {
      id: 'o1',
      name: 'Organic Spinach',
      price: 3.99,
      unit: 'bunch',
      image: require('../assets/products/spinach.jpg'),
      description: 'Certified organic spinach',
      category: 'organic'
    },
    // Add more organic products...
  ],
}; 
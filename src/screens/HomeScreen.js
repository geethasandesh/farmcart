import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  FlatList
} from 'react-native';
import { Searchbar, Badge } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

// Mock Data
const categories = [
  { id: '1', name: 'Vegetables', icon: '🥦' },
  { id: '2', name: 'Fruits', icon: '🍎' },
  { id: '3', name: 'Dairy', icon: '🥛' },
  { id: '4', name: 'Grains', icon: '🌾' },
  { id: '5', name: 'Organic', icon: '🌱' },
];

const featuredProducts = [
  { 
    id: '1', 
    name: 'Fresh Tomatoes', 
    price: 2.99, 
    unit: 'kg', 
    farmer: 'Green Valley Farm', 
    location: 'Springfield, IL',
    image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  { 
    id: '2', 
    name: 'Organic Apples', 
    price: 4.49, 
    unit: 'kg', 
    farmer: 'Sunny Grove Farms', 
    location: 'Madison, WI',
    image: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  { 
    id: '3', 
    name: 'Fresh Spinach', 
    price: 1.99, 
    unit: 'bunch', 
    farmer: 'Evergreen Farms', 
    location: 'Columbus, OH',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  { 
    id: '4', 
    name: 'Organic Milk', 
    price: 3.99, 
    unit: 'liter', 
    farmer: 'Happy Cow Dairy', 
    location: 'Sarasota, FL',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
];

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState(3); // Mock cart count
  
  const onChangeSearch = query => setSearchQuery(query);
  
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.categoryItem}
      onPress={() => {/* Navigate to category */}}
    >
      <View style={styles.categoryIconContainer}>
        <Text style={styles.categoryIcon}>{item.icon}</Text>
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );
  
  const renderProductItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image 
        source={{ uri: item.image }} 
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productFarmer}>{item.farmer}</Text>
        <View style={styles.productPriceRow}>
          <Text style={styles.productPrice}>${item.price.toFixed(2)}/{item.unit}</Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.logoContainer}>
            <View style={styles.logoPlaceholder}>
              <Text style={styles.logoText}>🌱</Text>
            </View>
            <Text style={styles.appName}>FarmCart</Text>
          </View>
          
          <View style={styles.headerRight}>
            <TouchableOpacity 
              style={styles.cartButton}
              onPress={() => navigation.navigate('Cart')}
            >
              <Text style={styles.cartIcon}>🛒</Text>
              <Badge visible={cartItems > 0} size={20} style={styles.cartBadge}>
                {cartItems}
              </Badge>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.profileButton}
              onPress={() => navigation.navigate('Profile')}
            >
              <Text style={styles.profileIcon}>👤</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <Searchbar
          placeholder="Search for products..."
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
          iconColor="#4CAF50"
        />
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>
        
        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <FlatList
            data={featuredProducts}
            renderItem={renderProductItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsList}
          />
        </View>
        
        <View style={styles.newArrivalsSection}>
          <Text style={styles.sectionTitle}>New Arrivals</Text>
          <FlatList
            data={featuredProducts.slice().reverse()} // Just using the same data reversed for this example
            renderItem={renderProductItem}
            keyExtractor={item => `new-${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsList}
          />
        </View>
        
        <View style={styles.bestSellersSection}>
          <Text style={styles.sectionTitle}>Best Sellers</Text>
          <FlatList
            data={featuredProducts.slice(1, 3)} // Just using a subset of the data for this example
            renderItem={renderProductItem}
            keyExtractor={item => `best-${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsList}
          />
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2023 FarmCart - Direct from Farmers</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoPlaceholder: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 16,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginLeft: 5,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartButton: {
    marginRight: 15,
    position: 'relative',
  },
  cartIcon: {
    fontSize: 24,
  },
  cartBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#4CAF50',
  },
  profileButton: {},
  profileIcon: {
    fontSize: 24,
  },
  searchBar: {
    elevation: 0,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#F9F9F9',
  },
  categoriesSection: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  categoriesList: {
    paddingBottom: 10,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryIcon: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 14,
    color: '#333',
  },
  featuredSection: {
    padding: 15,
    backgroundColor: '#FFFFFF',
  },
  productsList: {
    paddingBottom: 15,
  },
  productCard: {
    width: 180,
    backgroundColor: '#FFF',
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImage: {
    width: '100%',
    height: 120,
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  productFarmer: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  productPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  addButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  newArrivalsSection: {
    padding: 15,
    marginTop: 10,
  },
  bestSellersSection: {
    padding: 15,
    backgroundColor: '#FFFFFF',
    marginTop: 10,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#666',
    fontSize: 12,
  },
});

export default HomeScreen; 
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  FlatList, 
  Image, 
  TouchableOpacity 
} from 'react-native';
import { Button, Divider, IconButton } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

// Mock data for cart items
const initialCartItems = [
  { 
    id: '1', 
    name: 'Fresh Tomatoes', 
    price: 2.99, 
    quantity: 2, 
    unit: 'kg', 
    farmer: 'Green Valley Farm',
    image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  { 
    id: '2', 
    name: 'Organic Apples', 
    price: 4.49, 
    quantity: 1, 
    unit: 'kg', 
    farmer: 'Sunny Grove Farms',
    image: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  { 
    id: '4', 
    name: 'Organic Milk', 
    price: 3.99, 
    quantity: 1, 
    unit: 'liter', 
    farmer: 'Happy Cow Dairy',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
];

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  
  const handleIncreaseQuantity = (id) => {
    setCartItems(
      cartItems.map(item => 
        item.id === id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )
    );
  };
  
  const handleDecreaseQuantity = (id) => {
    setCartItems(
      cartItems.map(item => 
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      )
    );
  };
  
  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };
  
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const deliveryFee = 2.99;
  const subtotal = calculateSubtotal();
  const total = subtotal + deliveryFee;
  
  const handleCheckout = () => {
    // Checkout logic would go here
    alert('Proceeding to checkout...');
  };
  
  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image 
        source={{ uri: item.image }} 
        style={styles.itemImage}
      />
      
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemFarmer}>{item.farmer}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}/{item.unit}</Text>
      </View>
      
      <View style={styles.itemActions}>
        <View style={styles.quantityControls}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleDecreaseQuantity(item.id)}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          
          <Text style={styles.quantityText}>{item.quantity}</Text>
          
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleIncreaseQuantity(item.id)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.itemTotal}>
          ${(item.price * item.quantity).toFixed(2)}
        </Text>
        
        <IconButton
          icon="delete-outline"
          size={20}
          onPress={() => handleRemoveItem(item.id)}
          style={styles.deleteButton}
          iconColor="#FF5252"
        />
      </View>
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>
      
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.cartList}
            ItemSeparatorComponent={() => <Divider style={styles.divider} />}
          />
          
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Fee</Text>
              <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
            </View>
            
            <Divider style={styles.divider} />
            
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
            
            <Button
              mode="contained"
              style={styles.checkoutButton}
              contentStyle={styles.checkoutButtonContent}
              labelStyle={styles.checkoutButtonLabel}
              onPress={handleCheckout}
            >
              Proceed to Checkout
            </Button>
          </View>
        </>
      ) : (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartIcon}>🛒</Text>
          <Text style={styles.emptyCartTitle}>Your cart is empty</Text>
          <Text style={styles.emptyCartText}>Start shopping to add items to your cart</Text>
          <Button
            mode="contained"
            style={styles.continueShoppingButton}
            contentStyle={styles.continueShoppingButtonContent}
            labelStyle={styles.continueShoppingButtonLabel}
            onPress={() => navigation.navigate('Home')}
          >
            Continue Shopping
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  cartList: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 15,
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  itemFarmer: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: '#4CAF50',
  },
  itemActions: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  quantityButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  quantityText: {
    width: 28,
    textAlign: 'center',
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  deleteButton: {
    margin: 0,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  summaryContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#F9F9F9',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  checkoutButton: {
    marginTop: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  checkoutButtonContent: {
    height: 50,
  },
  checkoutButtonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyCartIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  emptyCartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emptyCartText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  continueShoppingButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    width: '80%',
  },
  continueShoppingButtonContent: {
    height: 50,
  },
  continueShoppingButtonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartScreen; 
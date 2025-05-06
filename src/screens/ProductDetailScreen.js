import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Linking
} from 'react-native';
import { Button, Divider, Chip } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  const handleAddToCart = () => {
    // Add to cart logic would go here
    alert(`Added ${quantity} ${product.name} to cart!`);
  };
  
  const handleCallFarmer = () => {
    // In a real app, we would have the farmer's phone number
    Linking.openURL('tel:+1234567890');
  };
  
  const handleMessageFarmer = () => {
    // In a real app, we would message the farmer
    alert('Message feature would be implemented here');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: product.image }}
            style={styles.image}
            resizeMode="cover"
          />
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.contentContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          
          <View style={styles.priceRow}>
            <Text style={styles.price}>${product.price.toFixed(2)}/{product.unit}</Text>
            <View style={styles.quantitySelector}>
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={handleDecreaseQuantity}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              
              <Text style={styles.quantity}>{quantity}</Text>
              
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={handleIncreaseQuantity}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.tagsContainer}>
            <Chip style={styles.tag} textStyle={styles.tagText}>100% Organic</Chip>
            <Chip style={styles.tag} textStyle={styles.tagText}>Fresh</Chip>
            <Chip style={styles.tag} textStyle={styles.tagText}>Local</Chip>
          </View>
          
          <Divider style={styles.divider} />
          
          <View style={styles.farmerSection}>
            <Text style={styles.sectionTitle}>About the Farmer</Text>
            
            <View style={styles.farmerCard}>
              <Image 
                source={{ 
                  uri: 'https://images.unsplash.com/photo-1568950151741-6deb537183f7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
                }}
                style={styles.farmerImage}
              />
              
              <View style={styles.farmerInfo}>
                <Text style={styles.farmerName}>{product.farmer}</Text>
                <Text style={styles.farmerLocation}>{product.location}</Text>
                
                <View style={styles.farmerButtonsContainer}>
                  <TouchableOpacity 
                    style={styles.farmerButton}
                    onPress={handleCallFarmer}
                  >
                    <Text style={styles.farmerButtonText}>📞 Call</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.farmerButton, styles.farmerMessageButton]}
                    onPress={handleMessageFarmer}
                  >
                    <Text style={styles.farmerButtonText}>💬 Message</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          
          <Divider style={styles.divider} />
          
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Product Details</Text>
            <Text style={styles.description}>
              These {product.name.toLowerCase()} are freshly harvested and brought to you directly 
              from {product.farmer}. No middlemen involved, ensuring you get the 
              freshest produce at the best prices.
            </Text>
            <Text style={styles.description}>
              Our farming practices are sustainable and eco-friendly. We do not use 
              harmful pesticides or chemicals. You can be assured of the quality 
              and freshness of our products.
            </Text>
          </View>
          
          <Divider style={styles.divider} />
          
          <View style={styles.deliverySection}>
            <Text style={styles.sectionTitle}>Delivery Information</Text>
            <Text style={styles.description}>
              Orders placed before 10 AM will be delivered the same day. Otherwise, 
              expect delivery the next day. You can also arrange pickup directly 
              from the farm if you prefer.
            </Text>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.bottomBar}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalValue}>
            ${(product.price * quantity).toFixed(2)}
          </Text>
        </View>
        
        <Button
          mode="contained"
          style={styles.addToCartButton}
          labelStyle={styles.addToCartButtonText}
          onPress={handleAddToCart}
        >
          Add to Cart
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  imageContainer: {
    width: '100%',
    height: 250,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  backButtonText: {
    fontSize: 24,
    color: '#333',
  },
  contentContainer: {
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  quantityButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  quantity: {
    width: 40,
    textAlign: 'center',
    fontSize: 18,
  },
  tagsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tag: {
    marginRight: 10,
    backgroundColor: '#E8F5E9',
  },
  tagText: {
    color: '#4CAF50',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 20,
  },
  farmerSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  farmerCard: {
    flexDirection: 'row',
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  farmerImage: {
    width: 100,
    height: 100,
  },
  farmerInfo: {
    flex: 1,
    padding: 15,
  },
  farmerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  farmerLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  farmerButtonsContainer: {
    flexDirection: 'row',
  },
  farmerButton: {
    flex: 1,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 18,
    marginRight: 8,
  },
  farmerMessageButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  farmerButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
  },
  descriptionSection: {
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#666',
    marginBottom: 10,
  },
  deliverySection: {
    marginBottom: 20,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingHorizontal: 20,
  },
  totalContainer: {
    flexDirection: 'column',
  },
  totalLabel: {
    fontSize: 14,
    color: '#666',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  addToCartButton: {
    width: 180,
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 25,
  },
  addToCartButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductDetailScreen; 
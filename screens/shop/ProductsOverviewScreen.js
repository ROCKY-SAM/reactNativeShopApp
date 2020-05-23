import React from 'react';
import { View,FlatList,ImageBackground ,Platform } from 'react-native';
import { useSelector,useDispatch } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
import * as cartAction from  '../../store/actions/cart';


import { HeaderButtons,Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';

const ProductsOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();


  return (
    <View>
             <ImageBackground  source={require('../../assets/background.png')} style={{width:'100%',height:'100%'}}>

    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetail={() => {
            props.navigation.navigate('ProductDetail', {
              productId: itemData.item.id,
              productTitle: itemData.item.title
            });
          }}
          onAddToCart={() => {
            dispatch(cartAction.addToCart(itemData.item));
          }}
        />
      )}
    />
       </ImageBackground>
    </View>
  );
};

ProductsOverviewScreen.navigationOptions=navData => {
  return{
  headerTitle: 'All Products',
  headerRight :(<HeaderButtons HeaderButtonComponent = {HeaderButton} >
    <Item title='Cart' iconName={Platform.OS === 'android' ? 'md-cart' :'ios-cart'}
    onPress={()=>{
      navData.navigation.navigate('Cart')
    }}/>
    </HeaderButtons>)
  }
};

export default ProductsOverviewScreen;

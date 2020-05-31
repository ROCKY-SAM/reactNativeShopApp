import React,{useState,useEffect,useCallback} from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView ,Platform} from 'react-native';
import HeaderButtonComponent from '../../components/UI/HeaderButton';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import {useSelector} from 'react-redux';
const EditProductScreen = props => {

    
const prodId = props.navigation.getParam('ProductId');
const editedProduct = useSelector(state=>state.products.userProdcuts.find(prod =>prod.id === prodId));


const [title,setTitle] =useState(editedProduct ? editedProduct.title:'');
const [imageUrl,setimageUrl] =useState(editedProduct ? editedProduct.imageUrl:'');
const [price,setprice] =useState('');
const [description,setdescription] =useState(editedProduct ? editedProduct.description:'');


const submitHandler = useCallback(() =>{
    
},[]);

useEffect(()=>{
props.navigation.setParams({submit:submitHandler});
},[submitHandler]);

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.fromControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput style={styles.input} value={title} onChange={text =>setTitle(text)} />
                </View>

                <View style={styles.fromControl}>
                    <Text style={styles.label}>Image Url</Text>
                    <TextInput style={styles.input} value={imageUrl} onChange={text =>setimageUrl(text)}/>
                </View>

                {editedProduct ? null : <View style={styles.fromControl}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput style={styles.input} value={price} onChange={text =>setprice(text)}/>
                </View>}

                <View style={styles.fromControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput style={styles.input} value={description} onChange={text =>setdescription(text)}/>
                </View>
            </View>
        </ScrollView>

    );
};

EditProductScreen.navigationOptions = navData =>{
    const submitFn = navData.navigation.getParam('submit');
    return{
        headerTitle:navData.nagvigation.getParam('productId') ? 'Edit Product' : 'Add Product',
        headerRight:(
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Save"
              iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
              onPress={(submitFn)}
            />
          </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    form:{margin:20},
    fromControl:{
        width:'100%'
    },
    label:{
        fontFamily:'open-sans-bold',
        marginVertical:8
    },
    input:{
        paddingHorizontal:2,
        paddingVertical:5,
        borderBottomColor:'#ccc',
        borderBottomWidth:1
    }
});




export default EditProductScreen;
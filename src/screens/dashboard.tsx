import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';

import {create} from 'react-test-renderer';
import {Colors, DEVICE_HEIGHT} from '../helper/constants';
import {defaultTheme} from '../helper/theme';
import {ProductModel} from '../model/productModel';
import {getCategories, getProductsDetails} from '../services/apiService';
import {SharedElement} from 'react-navigation-shared-element';

type DashBoardProps = {};
const DashBoard = (props: DashBoardProps) => {
  const navigation = useNavigation();
  const [productData, setProductData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [offset, setOffset] = useState(6);

  const [categories, setCategories] = useState<String[] | []>([]);
  const [selectedCategories, setSelectedCategories] = useState<String>('');

  useEffect(() => {
    console.log(selectedCategories);
    if (selectedCategories == 'All (lazy Loading)') {
      fetchProductsData();
    }
  }, [selectedCategories]);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchProductsData() {
    setLoading(true);
    let data = await getProductsDetails(offset);
    setLoading(false);
    if (data == 'Error') {
      Alert.alert('Error', 'Could not load Product data');
      setError(true);
      return;
    }
    setFilterData(data.products);
  }

  async function fetchCategories() {
    setLoading(true);
    let data = await getCategories();
    setLoading(false);
    if (data == 'Error') {
      Alert.alert('Error', 'Could not load Product data');
      setError(true);
      return;
    }
    let myArray = data.products.map((ele: ProductModel) => ele.category);
    var unique = myArray.filter(
      (value: any, index: Number, array: Number[]) =>
        array.indexOf(value) === index,
    );
    setCategories(['All (lazy Loading)', ...unique]);
    setSelectedCategories('All (lazy Loading)');

    setProductData(data.products);
  }

  function onPressCategories(item: String) {
    setSelectedCategories(item);
    if (item != 'All (lazy Loading)') {
      setFilterData(
        productData.filter((value: any) => value?.category == item),
      );
    }
  }

  const renderCard = ({item, index}) => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('Products Details', {
            item: item,
          });
        }}
        style={[styles.gridProductContainer]}>
        <View style={[defaultTheme.box, {backgroundColor: '#fff'}]}>
          <SharedElement id={`item.${item.id}.photo`}>
            <Image
              style={{width: '100%', height: DEVICE_HEIGHT * 0.2}}
              source={{uri: item?.thumbnail}}
            />
          </SharedElement>
          <View style={{padding: 8}}>
            <Text
              style={[defaultTheme.textSmall, {color: Colors.primaryColor}]}>
              {item?.brand}
            </Text>
            <Text
              numberOfLines={1}
              style={[
                defaultTheme.textMedium,
                {fontWeight: '700', marginVertical: 4},
              ]}>
              {item?.title}
            </Text>
            <Text style={[defaultTheme.textMedium, {}]}>$ {item?.price}</Text>
          </View>
        </View>
      </Pressable>
    );
  };
  if (isError) {
    return (
      <View>
        <Text>Sorry no data</Text>
      </View>
    );
  } else {
    return (
      <View style={defaultTheme.container}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <Pressable
                onPress={() => {
                  onPressCategories(item);
                }}
                style={[
                  styles.categoryTitle,
                  {
                    backgroundColor:
                      selectedCategories == item
                        ? Colors.primaryColor
                        : 'transparent',
                    alignContent: 'center',
                  },
                ]}>
                <Text
                  style={{
                    padding: 8,
                    color: selectedCategories == item ? '#fff' : '#000',
                    fontSize: 16,
                    fontWeight: '700',
                  }}>
                  {item}
                </Text>
              </Pressable>
            );
          }}
          style={{borderBottomWidth: 1, borderColor: Colors.primaryColor}}
        />

        <FlatList
          data={filterData}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReached={() => {
            setOffset(offset + 5);

            if (selectedCategories == 'All (lazy Loading)') {
              fetchProductsData();
            }
          }}
          ListFooterComponent={() =>
            isLoading ? <ActivityIndicator style={{margin: 15}} /> : <></>
          }
          onEndReachedThreshold={0.9}
          snapToAlignment="center"
          contentContainerStyle={{paddingBottom: DEVICE_HEIGHT * 0.1}}
          renderItem={renderCard}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  categoryTitle: {
    marginHorizontal: 8,
    marginBottom: 8,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',

    height: DEVICE_HEIGHT * 0.06,
  },
  gridProductContainer: {
    padding: 5,
    width: '50%',
  },
});
export default DashBoard;

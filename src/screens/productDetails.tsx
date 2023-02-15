import React, {useEffect} from 'react';
import {Image, Pressable, Text, TextInput, View} from 'react-native';
import {Colors, DEVICE_HEIGHT, DEVICE_WIDTH} from '../helper/constants';
import {defaultTheme} from '../helper/theme';
import {ProductModel} from '../model/productModel';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {SharedElement} from 'react-navigation-shared-element';
import {ScrollView} from 'react-native-gesture-handler';

export const Details = (props: {route: {params: {data: any}}}) => {
  const productDetail = props?.route?.params?.item;

  const ReviewCard = () => {
    return (
      <View
        style={[
          defaultTheme.box,
          {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 16,
          },
        ]}>
        <View
          style={{
            width: '100%',
            flexDirection: 'column',
            padding: 20,
            backgroundColor: 'white',
          }}>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold', flex: 1}}>
              Nice product
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                flex: 1,
                textAlign: 'right',
              }}>
              Raj Mishra
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 4,
            }}>
            <Rating minValue={0} readonly startingValue={4.5} imageSize={15} />
            <Text
              style={{
                fontSize: 14,
                color: 'grey',
                flex: 1,
                textAlign: 'right',
              }}>
              February 15 2023 6:00Am
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text numberOfLines={3} style={{fontSize: 14, color: 'black'}}>
              Why do we use it? It is a long established fact that a reader will
              be distracted by the readable content of a page when looking at
              its layout. The point of using Lorem Ipsum is that it has a
              more-or-less normal distribution of letters, as opposed to using
              'Content here, content here', making it look like readable
              English. Many desktop publishing packages and web page editors now
              use Lorem Ipsum as their default model text, and a search for
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      style={{
        flex: 1,
      }}>
      <View style={{height: DEVICE_HEIGHT * 0.35}}>
        <SharedElement id={`item.${productDetail.id}.photo`}>
          <Image
            source={{uri: productDetail?.thumbnail}}
            style={{width: '100%', height: DEVICE_HEIGHT * 0.35}}
          />
        </SharedElement>
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          width: '100%',
          padding: 16,
        }}>
        <View>
          <Text style={[defaultTheme.textMedium, {fontWeight: '500'}]}>
            {productDetail?.title}
          </Text>
          <Text style={[defaultTheme.textSmall, {color: Colors.primaryColor}]}>
            {productDetail?.brand}
          </Text>
        </View>
        <Text style={{fontSize: 25}}>$ {productDetail?.price}</Text>
      </View>

      <Text
        style={{
          alignSelf: 'flex-start',
          textAlign: 'left',
          marginHorizontal: 16,
        }}
        numberOfLines={5}>
        {productDetail?.description}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          margin: 15,
          alignSelf: 'flex-end',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 20}}>$ {productDetail?.price}</Text>

        <TextInput
          style={{
            width: 80,
            height: 40,
            marginStart: 30,
            borderWidth: 0.2,
            borderColor: 'grey',
            borderRadius: 5,
            padding: 10,
          }}
        />
      </View>
      <Pressable
        style={{
          backgroundColor: Colors.primaryColor,
          padding: 15,
          marginHorizontal: 16,
          borderRadius: 60,
          alignItems: 'center',
        }}>
        <Text
          style={[
            defaultTheme.textRegular,
            {fontWeight: 'bold', color: '#fff'},
          ]}>
          Buy
        </Text>
      </Pressable>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          padding: 16,
          alignItems: 'center',
        }}>
        <Text
          style={[
            defaultTheme.textVeryLarge,
            {color: Colors.primaryColor, marginRight: 10},
          ]}>
          {productDetail?.rating}
        </Text>
        <View style={{alignSelf: 'flex-start', alignItems: 'flex-start'}}>
          <Rating
            minValue={0}
            readonly
            startingValue={productDetail?.rating}
            imageSize={30}
            tintColor="#f6f6f6"
          />
          <Text style={[defaultTheme.textRegular]}>
            Based on 7 Customer reviews
          </Text>
        </View>
      </View>
      <ReviewCard />
    </ScrollView>
  );
};

export default Details;

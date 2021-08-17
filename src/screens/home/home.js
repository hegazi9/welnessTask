/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import styles from './style';
import ImagePicker from 'react-native-image-crop-picker';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {CAPTURE, SELECT} from '../../utils/constance';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/AntDesign';

const Home = () => {
  const [selectedVideo, setselectedVideo] = useState([]);
  const [paused, setpaused] = useState(true);
  const [selectedItem, setselectedItem] = useState(0);

  const _on_select = async video => {
    setselectedVideo(prev => [...prev, video.path]);
  };

  const captureFromcamera = () => {
    ImagePicker.openCamera({
      mediaType: 'video',
      compressVideoPreset: 'HighestQuality',
    }).then(video => {
      _on_select(video);
    });
  };

  const selectFromGallery = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
      compressVideoPreset: 'HighestQuality',
    }).then(video => {
      _on_select(video);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => selectFromGallery()}>
          <Text style={styles.txtBtn}>{SELECT}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, {marginBottom: hp('2%')}]}
          onPress={() => captureFromcamera()}>
          <Text style={styles.txtBtn}>{CAPTURE}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={selectedVideo}
        extraData={selectedVideo}
        //inverted
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => {
          return <View style={styles.line} />;
        }}
        keyExtractor={index => index + Math.random()}
        renderItem={({item, index}) => {
          return (
            <View style={styles.center}>
              <TouchableOpacity
                style={{marginLeft: 100, zIndex: 1}}
                onPress={() => {
                  setselectedItem(index);
                  setpaused(!paused);
                }}>
                <Icon
                  style={styles.icon}
                  name={
                    selectedItem == index
                      ? paused
                        ? 'play'
                        : 'pausecircle'
                      : 'play'
                  }
                />
              </TouchableOpacity>

              <Video
                poster={'https://baconmockup.com/300/200/'}
                posterResizeMode="cover"
                repeat={false}
                key={index}
                source={{
                  uri: item,
                }}
                resizeMode="cover"
                style={styles.video}
                paused={selectedItem == index ? (paused ? true : false) : true}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default Home;

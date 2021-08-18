/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import styles from './style';
import ImagePicker from 'react-native-image-crop-picker';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {CAPTURE, SELECT} from '../../utils/constance';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/AntDesign';
import RNThumbnail from 'react-native-thumbnail';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import colors from '../../utils/colors';

let urlVedio = '',
  urlImage = '';

const Home = () => {
  const [selectedVideo, setselectedVideo] = useState([]);
  const [paused, setpaused] = useState(true);
  const [selectedItem, setselectedItem] = useState(0);
  const [loading, setloading] = useState(false);
  const [loadingdata, setloadingdata] = useState(true);
  const [unique, setunique] = useState(0);
  const [vedios, setVedios] = useState([]);

  useEffect(() => {
    getVedios();
  }, []);

  const getVedios = () => {
    let dbRef = database().ref('vedios');
    dbRef.on('value', snapshot => {
      setVedios([]);
      setloadingdata(true);
      snapshot.forEach(function (snap) {
        var item = snap.val();
        item.key = snap.key;
        setVedios(prev => [...prev, item]);
      });
      setloadingdata(false);
    });
  };

  const writeUniqueName = () => {
    setloading(true);
    if (selectedVideo) {
      setunique(unique + 1);
    }
  };

  const _on_select = async video => {
    writeUniqueName();
    RNThumbnail.get(video.path).then(result => {
      setselectedVideo(prev => [
        ...prev,
        {uri: video.path, thumbnail: result.path},
      ]);
      uploadVedio(video.path).then(() => {
        uploadImg(result.path).then(() => {
          database().ref('/vedios').push({
            imgUrl: result.path,
            vedioUrl: video.path,
          });
        });
      });
    });
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

  const uploadVedio = async vedioUri => {
    const saveVedio = storage()
      .ref('vedio' + unique)
      .putFile(vedioUri);
    saveVedio.on('state_changed', async snapshot => {
      urlVedio = await storage()
        .ref('vedio' + unique)
        .getDownloadURL();
      return snapshot.state == 'success';
    });
  };

  const uploadImg = async imgUri => {
    const saveImage = storage()
      .ref('image' + unique)
      .putFile(imgUri);
    saveImage.on('state_changed', async snapshot => {
      urlImage = await storage()
        .ref('image' + unique)
        .getDownloadURL();
      if (snapshot.state == 'success') {
        setloading(false);
      }
      return snapshot.state == 'success';
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

      {loading || loadingdata ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.orange} />
        </View>
      ) : null}

      {vedios?.length == 0 ? (
        <View style={styles.loading}>
          <Text style={styles.txt}>No vedios uploaded</Text>
        </View>
      ) : (
        <FlatList
          data={vedios}
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
                  poster={item.imgUrl}
                  posterResizeMode="cover"
                  repeat={false}
                  key={index}
                  source={{
                    uri: item.vedioUrl,
                  }}
                  resizeMode="cover"
                  style={styles.video}
                  paused={
                    selectedItem == index ? (paused ? true : false) : true
                  }
                />
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default Home;

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {StyleSheet} from 'react-native';
import colors from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.black,
  },
  btn: {
    backgroundColor: colors.orange,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('30%'),
    height: hp('6%'),
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: hp('5%'),
  },
  txtBtn: {
    fontSize: 16,
    color: colors.black,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    zIndex : 2 ,

  },
  video: {
    aspectRatio: 1,
    width: '80%',
    marginLeft: -150,
  },
  loading: {
    alignItems: 'center',
    backgroundColor : colors.black,
    top : 0 , 
    position : 'absolute' ,
    bottom : 0 ,
    right : 0 ,
    left : 0 ,
    zIndex : 1 ,
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30,
    flexDirection: 'row',
  },
  line: {
    backgroundColor: colors.gray,
    height: 0.5,
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  icon: {
    color: colors.orange,
    fontSize: 40,
  },
  txt: {
    fontSize: 18,
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default styles;

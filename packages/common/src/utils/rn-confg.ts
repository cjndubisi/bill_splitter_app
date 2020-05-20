import { Platform } from 'react-native';
export default Platform.select({
  ios: () => require('react-native-config'),
  android: () => require('react-native-config'),
});

import { Platform } from 'react-native';
interface IConfig {
  API_URL: string;
}
import nativeConfig from './rn-confg';
let native = nativeConfig;
if (Platform.OS !== 'web') {
  native = nativeConfig().default;
}

// get all envs from process.env
// using ...process.env doesn't work,
// must manually access API_URL on .env like process.env.API_URL
const env = { ...process.env, ...native };

const envKeys = Object.keys(env)
  .filter((item) => {
    return item.indexOf('REACT_APP_') !== -1;
  })
  .reduce((acc, next) => {
    acc[next.replace('REACT_APP_', '')] = env[next];
    return acc;
  }, {});

const Config: Partial<IConfig> = {
  ...envKeys,
};
export default Config;

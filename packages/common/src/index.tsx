import React, { useContext } from 'react';
import { Platform, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AllProviders from './context/AllProviders';
import { Container } from './styled';
import SCREENS from './screens/NavigactionConfig';
import AsyncStorage from '@react-native-community/async-storage';
const PERSISTENCE_KEY = 'NAVIGATION_STATE';

type RootStackParamList = any;
const App = () => {
  const linking = {
    prefixes: ['/'],
    config: Object.keys(SCREENS).reduce(
      (acc, next) => ({
        ...acc,
        ...{
          [next]: {
            path: SCREENS[next].path,
            screens: SCREENS[next].screens,
          },
        },
      }),
      {}
    ),
  };

  const Stack = createStackNavigator<RootStackParamList>();
  const [isReady, setIsReady] = React.useState(__DEV__ ? false : true);
  const [initialState, setInitialState] = React.useState();

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (Platform.OS !== 'web' && initialUrl == null) {
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
          const state = savedStateString
            ? JSON.parse(savedStateString)
            : undefined;

          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }
  return (
    <Container>
      <AllProviders>
        <NavigationContainer
          linking={linking}
          initialState={initialState}
          onStateChange={(state) =>
            AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
          }
        >
          <Stack.Navigator>
            {Object.keys(SCREENS).map((Screen) => (
              <Stack.Screen
                key={SCREENS[Screen].name}
                name={Screen}
                options={SCREENS[Screen].options || {}}
                component={SCREENS[Screen].component}
              />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
      </AllProviders>
    </Container>
  );
};

export default App;

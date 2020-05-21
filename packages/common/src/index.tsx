import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AllProviders from './context/AllProviders';
import { Container } from './styled';
import SCREENS from './screens/NavigactionConfig';

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

  return (
    <Container>
      <AllProviders>
        <NavigationContainer linking={linking}>
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

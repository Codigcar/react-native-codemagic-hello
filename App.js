/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from 'react-native';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginButton,
  LoginManager,
} from 'react-native-fbsdk-next';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const getInfoFromToken = token => {
  const PROFILE_REQUEST_PARAMS = {
    fields: {
      string: 'id, name, first_name, last_name, birthday, email',
    },
  };
  const profileRequest = new GraphRequest(
    '/me',
    {token, parameters: PROFILE_REQUEST_PARAMS},
    (error, result) => {
      if (error) {
        console.log('Login Info has an error:', error);
      } else {
        console.log(result);
      }
    },
  );
  new GraphRequestManager().addRequest(profileRequest).start();
};

const loginWithFacebook = () => {
  LoginManager.logInWithPermissions(['public_profile', 'email']).then(
    login => {
      if (login.isCancelled) {
        console.log('Login Cancelado');
      } else {
        console.log('entrado');
        AccessToken.getCurrentAccessToken()
          .then(data => {
            const accessToken = data.accessToken.toString();
            getInfoFromToken(accessToken);
          })
          .catch(err => console.log({err}));
      }
    },
    error => {
      console.log('Erro no login ', console.error(error));
    },
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      {/* <LoginButton
        onLoginFinished={(error, result) => {
          if (error) {
            console.log(JSON.stringify(error));
            alert('login has error: ' + JSON.stringify(error));
          } else if (result.isCancelled) {
            console.log(JSON.stringify(error));
            console.log(JSON.stringify(result));
            alert('login is cancelled.');
          } else {
            AccessToken.getCurrentAccessToken().then(data => {
              let accessToken = data.accessToken;
              alert(accessToken.toString());

              const responseInfoCallback = (error, result) => {
                if (error) {
                  console.log(error);
                  alert('Error fetching data: ' + error.toString());
                } else {
                  console.log(result);
                  alert('Success fetching data: ' + result.toString());
                }
              };

              const infoRequest = new GraphRequest(
                '/me',
                {
                  accessToken: accessToken,
                  parameters: {
                    fields: {
                      string: 'email,name,first_name,middle_name,last_name',
                    },
                  },
                },
                responseInfoCallback,
              );
              // Start the graph request.
              new GraphRequestManager().addRequest(infoRequest).start();
            });
          }
        }}
        onLogoutFinished={() => alert('logout.')}
      /> */}
      <TouchableWithoutFeedback onPress={() => loginWithFacebook()}>
        <View>
          <Text>Hola</Text>
        </View>
      </TouchableWithoutFeedback>
      {/* <LoginButton
        onLoginFinished={(error, result) => {
          if (error) {
            console.log('login has error: ' + error);
            console.log('login has error: ' + result.error);
          } else if (result.isCancelled) {
            console.log('login is cancelled.');
          } else {
            AccessToken.getCurrentAccessToken().then(data => {
              console.log(data.accessToken.toString());
            });
          }
        }}
        onLogoutFinished={() => console.log('logout.')}
      /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

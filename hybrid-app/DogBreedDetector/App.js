import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TfImageRecognition } from 'react-native-tensorflow';

export default class App extends React.Component {
  componentDidMount() {
    const tf = new TfImageRecognition({
      model: 'file://base_resnet_model.pb',
      labels: 'file://dog_names.txt'
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('./assets/images/image_1.jpg')}
        />
        <Text>Prediction</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

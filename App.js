import React from 'react';
import { Image, FlatList, StyleSheet, AppRegistry ,ActivityIndicator, Text, View} from 'react-native';

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('https://web6.seattle.gov/Travelers/api/Map/Data?zoomId=17&type=2')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.Features,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }



  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
return(
      <View style={{flex: 1}}>
      <FlatList
        data={this.state.dataSource}
        renderItem={({item}) => 
        <View style={styles.camContainer}>
          <Text>{item.Cameras[0].Id}</Text>
          <Text>{item.Cameras[0].Description}</Text>
          <Image
          source = {{ uri: this.cameraType(item.Cameras[0]) }}
          style = {{height: 200, width: 350}}
          />
        </View>
        }
        keyExtractor={(item, index) => index.toString()}
      />
      </View>
    );}
  }



  var styles = StyleSheet.create({
  item:{
    height:200,
    backgroundColor:"red",
    padding:10,
  },
  camContainer:{
    flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    backgroundColor:'#fff',
  },
  container: {
    flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    backgroundColor:'#fff',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#bce6ff',
    padding: 10,
    width:100,
    height:50}
});
AppRegistry.registerComponent('myCam', () => myCam);
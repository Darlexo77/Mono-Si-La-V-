import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,

} from 'react-native';
import { Header } from 'react-native-elements';
import db from './localdb';
console.log(db["the"].chunks)

import PhonicSound from "./components/PhonicSound";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      chunks: [],
      phonicSound : []
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'#9c8210'}
          centerComponent={{
            text: 'Mono Fragmentado',
            style: { color: '#fff', fontSize: 20 },
          }}
        />

        <View style = {styles.imageContainer}>
        <Image 
          style = {styles.imageIcon}
          source = {{
            uri: 
            "https://i.kym-cdn.com/photos/images/newsfeed/002/486/154/c06.gif"
          }}
        />
        </View>

        <TextInput
          style={styles.inputBox}
          onChangeText={text => {
            this.setState({ text: text });
            this.setState({chunks:[]});
            this.setState({phonicSound:[]})
          }}
        />
        <TouchableOpacity
          style={styles.goButton}
          onPress={() => {
            var word = this.state.text.toLowerCase().trim();
            db [word]?
            (this.setState({chunks: db[word].chunks}),
            this.setState({phonicSound: db[word].phones})):
            (alert ("The word is not in the database or you write it wrong,check the ortography"),
        this.setState({text:""}),
        this.setState({chunks:[]}),
            this.setState({phonicSound:[]}))
          
          }}>
          <Text style={styles.buttonText}>IR</Text>
        </TouchableOpacity>
       
        <View>
        {this.state.chunks.map((item, index)=>{
          return(
            <PhonicSound
              wordChunk = {this.state.chunks[index]}
              soundChunk = {this.state.phonicSound[index]}
              buttonIndex={index}
            />
          )
        })}

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b8b8b8',
  },
  inputBox: {
    marginTop: 20,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
  },
  goButton: {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  }, 
  imageIcon: {
    width: 350, 
    height: 350, 
  }, 
  imageContainer:{
    justifyContent: "center", 
    alignItems: "center", 
    marginTop: 20
  },
  textChunk: {
    textAlign: "center", 
    fontSize: 30, 
    color: "white"
  }
});

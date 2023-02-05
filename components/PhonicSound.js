import * as React from "react";
import {Text, View, TouchableOpacity, StyleSheet} from "react-native";
import {Audio} from "expo-av"

export default class PhonicSound extends React.Component{

  constructor(props){
    super(props);
    this.state={
      pressedButtonIndex: ''
    }
  }

  playSound = async (soundChunk) =>{
    var soundLink = 
    'https://s3-whitehatjrcontent.whjr.online/phones/' +
      soundChunk +
    '.mp3';
    
    await Audio.Sound.createAsync(
      {uri: soundLink},
      {shouldPlay: true}
    );
  }


  render(){
    return(
      <TouchableOpacity
        style = {this.props.buttonIndex===this.state.pressedButtonIndex?
        [styles.soundChunk,{backgroundColor:"white"}]:
        [styles.soundChunk,{backgroundColor: "red"}]}
        onPress= {()=>{
          this.playSound(this.props.soundChunk)
          this.setState({pressedButtonIndex:this.props.buttonIndex})
        }}>
        <Text
          style = {styles.displayText}>
          {this.props.wordChunk}
        </Text>
      </TouchableOpacity>
    )
  }
}


const styles = StyleSheet.create({
    displayText: {
    textAlign: 'center',
    fontSize: 30,
    },
     
  soundChunk: {
    width: "65%", 
    height: 50, 
    justifyContent: "center", 
    alignItems: "center", 
    borderRadius: 10, 
    margin: 5,  
    alignSelf: "center"
  }

})
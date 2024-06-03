import React, { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { 
  ViroARScene, 
  ViroARImageMarker, 
  ViroARTrackingTargets, 
  ViroText, 
  ViroARSceneNavigator,
  ViroTrackingReason,
  ViroTrackingStateConstants,
  ViroQuad,
  ViroMaterials
 } from '@viro-community/react-viro';

// Define the image marker target
ViroARTrackingTargets.createTargets({
  "vitral": {
    source: require('./assets/vitral.jpg'),
    orientation: "Up",
    physicalWidth: 0.15 // width of the physical image in meters
  }
});

const App = () => {
  const [text, setText] = useState("Initializing AR...");

  function onInitialized(state, reason) {
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText("Hello, world!");
      console.log("Tracking normal");

    } else if (state === ViroTrackingStateConstants.TRACKING_NONE) {
      setText("No tracking");
      console.log("Tracking none");
    }
  };

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroARImageMarker target={"vitral"}>
        <ViroQuad
          position={[0, 0 , 0]}
          scale={[0.04, 0.04, 0.04]}
          rotation={[-90, 0, 0]}
          materials={["transparent"]}
          onClick={() => Alert.alert("Quad clicked!")}
        />
      </ViroARImageMarker>
    </ViroARScene>
  );
};

export default () => {
    return (
      < ViroARSceneNavigator
      autofocus = {true}
      initialScene = {
        {
          scene: App
        }
      }
      style = {styles.f1}
      />
    )
  };

const styles = StyleSheet.create({
  f1: {
    flex: 1,
  },
  helloText: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    // textAlignVertical: 'center',
    textAlign: 'center',
  },
});

ViroMaterials.createMaterials({
  transparent: {
    shininess: 2.0,
    lightingModel: "Constant",
    diffuseColor: "rgba(0,0,0,1)",
  },
});
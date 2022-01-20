import React, { Component, useEffect } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { WebView } from 'react-native-webview';

const getVideoHTML = (uri) => {
  return `
    <style>
      * {margin: 0}
      video { width: 100%; height: 100vh; object-fit: cover; background: #fff }
    </style>
    ${uri}
    <video src="${uri}" autoplay muted width="400" height="400" />
    <script>
    try {
      const video = document.getElementsByTagName("video")[0];

      video.muted = false;

      video.addEventListener('ended', function(){
        window.ReactNativeWebView.postMessage('end');
      });

      video.addEventListener('progress', function() {
        var loadedPercentage = this.buffered.end(0) / this.duration;
        
        window.ReactNativeWebView.postMessage(JSON.stringify({ name: 'progress', data: loadedPercentage }));
      });

      video.addEventListener('durationchange', function() {
        window.ReactNativeWebView.postMessage(JSON.stringify({ name: 'duration', data: video.duration }));
      });
    } catch(err) {
      document.write(err);
    }
      
    </script>
  `
}

export default ({ paused, onEnd, source, onProgress, onLoadStart, onLoad}) => {
  let webref;

  // useEffect(() => {
  //   if (webref) {
  //     if (paused) {
  //       webref.injectJavaScript(`document.getElementsByTagName("video")[0].pause(); true`);
  //     } else {
  //       webref.injectJavaScript(`document.getElementsByTagName("video")[0].play(); true`);
  //     }
  //   }
  // }, [paused])

  return (
    <WebView
      ref={(r) => (webref = r)}
      androidLayerType={'hardware'}
      mixedContentMode='always'
      mediaPlaybackRequiresUserAction={false}
      allowsInlineMediaPlayback={true}
      javaScriptEnabled={true}
      allowsFullscreenVideo={true}
      source={{ html: getVideoHTML(source.uri) }}

      onMessage = {(event) => {
        const msg = event.nativeEvent.data;

        if (msg === 'end') {
          return onEnd();
        }

        // const obj = JSON.parse(msg);

        // if (obj.name === 'progress') {
        //   return onProgress({ currentTime: obj.data });
        // }

        // if (obj.name === 'duration') {
        //   console.log(obj.data);
        //   return onLoad({ duration: obj.data });
        // }

        console.log(+msg);
      }}
    />
  );
}

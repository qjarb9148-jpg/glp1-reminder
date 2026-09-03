import React from 'react';
import { StyleSheet, View } from 'react-native';
import { isExpoGo } from '../utils/environment';

/**
 * Home screen bottom banner. Uses a test ad unit ID until a real AdMob
 * account and ad units are configured. Renders nothing inside Expo Go,
 * since the native ads module is only available in a custom/EAS build.
 */
export default function AdBanner() {
  if (isExpoGo) {
    return null;
  }

  const { BannerAd, BannerAdSize } = require('react-native-google-mobile-ads');
  const { BANNER_AD_UNIT_ID } = require('./adUnits');

  return (
    <View style={styles.container}>
      <BannerAd
        unitId={BANNER_AD_UNIT_ID}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{ requestNonPersonalizedAdsOnly: true }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

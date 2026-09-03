import React from 'react';
import { Text, View } from 'react-native';

/**
 * Web-only stand-in for `react-native-google-mobile-ads`. The real package
 * pulls in native-only React Native internals that Metro cannot bundle for
 * web, so metro.config.js redirects that import to this file when
 * platform === 'web'. The app never actually renders this (AdBanner/
 * interstitial already skip ads on web via isNativeAdsAvailable), but the
 * module still needs to exist and be import-safe so the web bundle builds.
 */

export const TestIds = {
  BANNER: 'web-stub-banner',
  INTERSTITIAL: 'web-stub-interstitial',
};

export const BannerAdSize = {
  ANCHORED_ADAPTIVE_BANNER: 'ANCHORED_ADAPTIVE_BANNER',
};

export const AdEventType = {
  LOADED: 'loaded',
  CLOSED: 'closed',
};

export function BannerAd() {
  return (
    <View style={{ padding: 8, alignItems: 'center' }}>
      <Text style={{ fontSize: 11, color: '#999' }}>광고 배너 (웹 미리보기에서는 표시되지 않음)</Text>
    </View>
  );
}

export class InterstitialAd {
  static createForAdRequest() {
    return new InterstitialAd();
  }
  addAdEventListener() {
    return () => {};
  }
  load() {}
  show() {}
}

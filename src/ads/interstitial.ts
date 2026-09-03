import { isNativeAdsAvailable } from '../utils/environment';

let interstitial: import('react-native-google-mobile-ads').InterstitialAd | null = null;
let isLoaded = false;

function loadInterstitial() {
  const { AdEventType, InterstitialAd } = require('react-native-google-mobile-ads');
  const { INTERSTITIAL_AD_UNIT_ID } = require('./adUnits');

  interstitial = InterstitialAd.createForAdRequest(INTERSTITIAL_AD_UNIT_ID, {
    requestNonPersonalizedAdsOnly: true,
  });
  isLoaded = false;

  const unsubscribeLoaded = interstitial!.addAdEventListener(AdEventType.LOADED, () => {
    isLoaded = true;
  });
  const unsubscribeClosed = interstitial!.addAdEventListener(AdEventType.CLOSED, () => {
    isLoaded = false;
    unsubscribeLoaded();
    unsubscribeClosed();
    loadInterstitial();
  });

  interstitial!.load();
}

/**
 * Call once (e.g. app startup) to warm up the first interstitial.
 * No-ops in Expo Go or on web, since the native ads module isn't available there.
 */
export function preloadInterstitialAd() {
  if (!isNativeAdsAvailable) return;
  if (!interstitial) {
    loadInterstitial();
  }
}

/**
 * Shows the preloaded interstitial ad, intended to be triggered right
 * after the user marks a dose as complete. No-ops silently in Expo Go,
 * on web, or if the ad hasn't finished loading yet.
 */
export function showInterstitialAfterDoseLogged() {
  if (!isNativeAdsAvailable) return;
  if (interstitial && isLoaded) {
    interstitial.show();
  }
}

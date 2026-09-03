import { AdEventType, InterstitialAd } from 'react-native-google-mobile-ads';
import { INTERSTITIAL_AD_UNIT_ID } from './adUnits';

let interstitial: InterstitialAd | null = null;
let isLoaded = false;

function loadInterstitial() {
  interstitial = InterstitialAd.createForAdRequest(INTERSTITIAL_AD_UNIT_ID, {
    requestNonPersonalizedAdsOnly: true,
  });
  isLoaded = false;

  const unsubscribeLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
    isLoaded = true;
  });
  const unsubscribeClosed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
    isLoaded = false;
    unsubscribeLoaded();
    unsubscribeClosed();
    loadInterstitial();
  });

  interstitial.load();
}

/** Call once (e.g. app startup) to warm up the first interstitial. */
export function preloadInterstitialAd() {
  if (!interstitial) {
    loadInterstitial();
  }
}

/**
 * Shows the preloaded interstitial ad, intended to be triggered right
 * after the user marks a dose as complete. No-ops silently if the ad
 * hasn't finished loading yet (e.g. on a slow connection).
 */
export function showInterstitialAfterDoseLogged() {
  if (interstitial && isLoaded) {
    interstitial.show();
  }
}

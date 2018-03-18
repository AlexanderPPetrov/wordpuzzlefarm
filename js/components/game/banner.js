import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded
} from 'expo';
import React, {Component} from "react";


export default class Banner extends Component {

    bannerError = () => {
        console.log('couldnt load banner')
    }
    render() {
        return <AdMobBanner
            bannerSize="fullBanner"
            adUnitID="ca-app-pub-6553158874574979/6920673711" // Test ID, Replace with your-admob-unit-id
            testDeviceID="EMULATOR"
            didFailToReceiveAdWithError={this.bannerError} />
    }
}



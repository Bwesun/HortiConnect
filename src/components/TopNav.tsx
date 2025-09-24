import { IonButton, IonIcon, IonImg, IonText } from "@ionic/react";
import React from "react";
import Logo from '../../public/favicon.png'
import { ArrowRightLeft, BellIcon, ChevronsRight, LeafIcon, LifeBuoy } from "lucide-react";
import { InAppBrowser, DefaultWebViewOptions, ToolbarPosition, iOSViewStyle, iOSAnimation } from '@capacitor/inappbrowser';

const TopNav: React.FC = () => {

    // To customize webview, u must specify all the attributes
    const openWebView = async () => {
        await InAppBrowser.openInWebView({
            url: "https://https://sspledger.com.ng/",
            options: {
                showURL: false,
                showToolbar: true,
                closeButtonText: 'Exit',
                showNavigationButtons: false,
                clearCache: true,
                clearSessionCache: false,
                mediaPlaybackRequiresUserAction: false,
                leftToRight: false,
                toolbarPosition: ToolbarPosition.BOTTOM,
                android: {
                    hardwareBack: true,
                    allowZoom: false,
                    pauseMedia: false,
                },
                iOS: {
                    allowOverScroll: false,
                    enableViewportScale: false,
                    allowInLineMediaPlayback: false,
                    surpressIncrementalRendering: false,
                    viewStyle: iOSViewStyle.PAGE_SHEET,
                    animationEffect: iOSAnimation.FLIP_HORIZONTAL,
                    allowsBackForwardNavigationGestures: true
                }
            }
        });
    }
    return ( 
        <div className="flex justify-between items-center pl-2 my-2 md:px-8 lg:px-18" style={{
            background: 'var(--ion-color-light)'
        }}>
            <div className=" flex items-center gap-4">
                <LeafIcon size={28} className="text-amber-600" />
                <IonText className="text-lg font-semibold" color="primary">HortiConnect</IonText>
            </div>
            <div className="flex justify-end items-center">
                    <div className="flex">
                        <IonButton fill="clear" shape="round">
                            <BellIcon size={22} />
                        </IonButton>
                        <IonButton fill="clear" onClick={openWebView} shape="round">
                            <ArrowRightLeft size={22} />
                        </IonButton>
                    </div>
            </div>
        </div>
     );
}
 
export default TopNav;
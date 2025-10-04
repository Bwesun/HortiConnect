import { IonButton, IonIcon, IonImg, IonItem, IonText } from "@ionic/react";
import React from "react";
import Logo from '../../public/favicon.png'
import { ArrowRightLeft, BellIcon, ChevronsRight, Home, LeafIcon, LifeBuoy, RefreshCw, User2Icon } from "lucide-react";
import { InAppBrowser, DefaultWebViewOptions, ToolbarPosition, iOSViewStyle, iOSAnimation } from '@capacitor/inappbrowser';
import { person } from "ionicons/icons";

const TopNav: React.FC = () => {

    // To customize webview, u must specify all the attributes
    const openWebView = async () => {
        await InAppBrowser.openInWebView({
            url: "https://sspledger.com.ng/",
            options: {
                showURL: false,
                showToolbar: true,
                closeButtonText: 'Close',
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
        <div className="flex justify-between items-center pl-1 sm:px-4 my-2 md:px-8 lg:px-18" style={{
            background: 'var(--ion-color-light)'
        }}>
            <div className=" flex items-center justify-between gap-4">
                {/* <LeafIcon size={28} className="text-amber-600 ml-2" /> */}
                    
                <IonItem lines="none" routerLink="/home" className="flex items-center gap-4">
                    <Home size={20} className="text-amber-600 mr-1" />
                    <IonText className="text-sm font-semibold" color="primary">Agribusiness Cluster</IonText>
                </IonItem>
            </div>
            <div className="flex justify-end items-center">
                    <div className="flex">
                        {/* <IonButton fill="clear" shape="round">
                            <BellIcon size={22} />
                        </IonButton> */}
                        <IonButton size="small" fill="clear" onClick={openWebView} shape="round">
                            <RefreshCw size={22} className="mr-1" /> <span className="mr-2 text-sm">SSP</span> 
                        </IonButton>
                        <IonButton routerLink="/profile" shape="round" fill="clear">
                            <IonIcon slot="icon-only" icon={person} size="small" />
                        </IonButton>
                    </div>
            </div>
        </div>
     );
}
 
export default TopNav;
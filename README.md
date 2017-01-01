#  MFT File-Tracking Mobile Application with Appcelerator Studio 

Android application that will display transferred files through a third party MFT solution (SecureTransport Server). The application has two tabs.  The first tab is for displaying a list with transferred files through SecureTransport server and their status. For this tab only a native code will be used, meaning  that Appcelerator  will translate the JavaScript code used and compile it to native code for Android. The second tab will display a pie chart based on the transferred files and their status. For rendering the interactive data-visualization, WebViews will be used to run a third party module based on jQuery - the [ShieldUI](http://www.shieldui.com) library for JavaScript and HTML5. 

In both cases REST API calls will be used to retrieve JSON data from the MFT server on demand. 

| ![](http://myposts.kokobok.host/appcelerator/2016/12/31/image_004.png) | ![](http://myposts.kokobok.host/appcelerator/2016/12/31/image_005.png) |
| ---------------------------------------- | ---------------------------------------- |
|                                          |                                          |

A complete walkthrough is available [here](http://myposts.kokobok.host/appcelerator/2016/12/31/AppStudioST.html).
package com.concertmap;

import com.facebook.react.ReactActivity;

// facebook imports
import android.content.Intent;
import android.os.Bundle;
import com.facebook.FacebookSdk;
import com.facebook.CallbackManager;

/*When you use the Facebook SDK, events in your app are automatically logged and collected for Facebook Analytics unless you disable automatic event logging. For details about what information is collected and how to disable automatic event logging, see Automatic App Event Logging.*/

public class MainActivity extends ReactActivity {
   /* // facebook
    CallbackManager mCallbackManager = MainApplication.getCallbackManager();

    @Override
    protected List<ReactPackage> getPackages() {
      mCallbackManager = new CallbackManager.Factory().create();
      ReactPackage packages[] = new ReactPackage[]{
        new MainReactPackage(),
        new FBSDKPackage(mCallbackManager),
      };
      return Arrays.<ReactPackage>asList(packages);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
      super.onActivityResult(requestCode, resultCode, data);
      mCallbackManager.onActivityResult(requestCode, resultCode, data);
    }
    // facebook end
*/
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Concertmap";
    }

}

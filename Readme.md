## Install Dependencies
### For Android - Linux

* install node
`curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -`  
`sudo apt-get install -y nodejs`

* install react-native
`npm install -g react-native-cli`
* if you have permission errors, follow these instructions below*

* download and install Android Studio
download from [https://developer.android.com/studio/index.html](https://developer.android.com/studio/index.html)  
install instructions: [https://developer.android.com/studio/install.html](https://developer.android.com/studio/install.html)
    * Set up android paths  
add the following lines to your `~./bashrc` file  
`export ANDROID_HOME=[path_to_your_Android_directory]/Sdk`  
`export PATH=${PATH}:${ANDROID_HOME}/tools`  
`export PATH=${PATH}:${ANDROID_HOME}/platform-tools`  

* make sure you have installed java  
you can check it with `java -version`  
    * if not, install the jdk from [http://www.oracle.com/technetwork/java/javase/downloads/index.html](http://www.oracle.com/technetwork/java/javase/downloads/index.html)   
to `/usr/local/java/` ...   
... and add the PATH variables  
`JAVA_HOME=/usr/local/java/jdk1.8.[version]`   
`PATH=$PATH:$HOME/bin:$JAVA_HOME/bin`  
`export JAVA_HOME`  
`export PATH`  

* Set up the Android Virtual Device  
`android avd` shows a list of available AVDs.

* install watchman (optional)  *haha*   
[https://facebook.github.io/watchman/docs/install.html#build-install](https://facebook.github.io/watchman/docs/install.html#build-install)    


## Testing the Installation
Use the React Native command line interface to generate a new React Native project called **Concertmap**,
then run `react-native run-android` inside the newly created folder.

A common issue is that the packager is not started automatically when you run `react-native run-android`.  
You can start it manually using `react-native start`.

## start   
Edit `index.android.js`  
Doubletap **R** to reload press menu button for dev menu  

## Troubleshooting
[https://github.com/facebook/react-native/issues/9336](https://github.com/facebook/react-native/issues/9336)   
[http://stackoverflow.com/questions/38870710/error-could-not-get-batchedbridge-make-sure-your-bundle-is-packaged-properly](http://stackoverflow.com/questions/38870710/error-could-not-get-batchedbridge-make-sure-your-bundle-is-packaged-properly)      

My `/android/app/build/intermediates/assets/debug` folder was empty and by running `cd android && ./gradlew assembleDebug`
was not creating those files required, which are later used by javascript thread in our react native apps.  

I ran manually the following command which the debug build command should have created ideally.  

`node node_modules/react-native/local-cli/cli.js bundle --platform android --dev true --reset-cache --entry-file index.android.js --bundle-output /home/cobi/dev/concertMap/Concertmap/android/app/build/intermediates/assets/debug/index.android.bundle --assets-dest /home/cobi/dev/concertmap/Concertmap/android/app/build/intermediates/res/merged/debug`

And then a I ran again `cd android && ./gradlew installDebug` my app started working again.

Will debug more and would update what is failing actually.

**also**   
[http://stackoverflow.com/questions/33965524/error-while-running-react-native-start](http://stackoverflow.com/questions/33965524/error-while-running-react-native-start)   

strange error while starting `react-native start`  
`watch /home/cobi/dev/concertmap/Concertmap/node_modules/react-native/node_modules/babel-preset-es2015-node/node_modules/babel-plugin-transform-es2015-function-name/node_modules/babel-runtime/core-js/array ENOSPC
{"code":"ENOSPC","errno":"ENOSPC","syscall":"watch /home/cobi/dev/concertmap/Concertmap/node_modules/react-native/node_modules/babel-preset-es2015-node/node_modules/babel-plugin-transform-es2015-function-name/node_modules/babel-runtime/core-js/array","filename":"/home/cobi/dev/concertmap/Concertmap/node_modules/react-native/node_modules/babel-preset-es2015-node/node_modules/babel-plugin-transform-es2015-function-name/node_modules/babel-runtime/core-js/array"}
Error: watch /home/cobi/dev/concertmap/Concertmap/node_modules/react-native/node_modules/babel-preset-es2015-node/node_modules/babel-plugin-transform-es2015-function-name/node_modules/babel-runtime/core-js/array ENOSPC
   at exports._errnoException (util.js:907:11)...`    


* watchman is a **dependency!**, so  
[http://stackoverflow.com/questions/33592197/how-to-install-facebook-watchman-on-ubuntu](http://stackoverflow.com/questions/33592197/how-to-install-facebook-watchman-on-ubuntu)   
or run the `install-watchman` script :)


### Change npm's default directory to another directory
[https://docs.npmjs.com/getting-started/fixing-npm-permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions)

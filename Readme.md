### Install Dependencies
#### Android - Linux

* install node
`curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -`  
`sudo apt-get install -y nodejs`

* install react-native
`npm install -g react-native-cli`
* if you have permission errors, follow these instructions below*

* download and install Android Studio
download from here: `https://developer.android.com/studio/index.html`  
install instructions: `https://developer.android.com/studio/install.html`
    * Set up android paths  
add the following lines to your `~./bashrc` file  
`export ANDROID_HOME=[path_to_your_Android_directory]/Sdk`  
`export PATH=${PATH}:${ANDROID_HOME}/tools`  
`export PATH=${PATH}:${ANDROID_HOME}/platform-tools`  

* make sure you have installed java  
you can check it with `java -version`  
    ** if not, install the jdk from `http://www.oracle.com/technetwork/java/javase/downloads/index.html` 
to `/usr/local/java/` ...   
... and add the PATH variables  
`JAVA_HOME=/usr/local/java/jdk1.8.[version]`   
`PATH=$PATH:$HOME/bin:$JAVA_HOME/bin`  
`export JAVA_HOME`  
`export PATH`  

* Set up the Android Virtual Device  
`android avd` shows a list of available AVDs.

* install watchman (optional)  
`https://facebook.github.io/watchman/docs/install.html#build-install`


### Testing the Installation
Use the React Native command line interface to generate a new
React Native project called "Concertmap",   
then run `react-native run-android` inside the newly created folder.

A common issue is that the packager is not started automatically when you run `react-native run-android`.  
You can start it manually using `react-native start`.

### Change npm's default directory to another directory

`https://docs.npmjs.com/getting-started/fixing-npm-permissions`

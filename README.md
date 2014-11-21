cuentacuentos
=============

visor de cuentacuentos


configuracion del ambiente
-------------

primer intento:
ubuntu 14 + cordoba 3.6 + android sdk (sin adt bundle)

1. descargar android sdk desde:
https://developer.android.com/sdk/installing/index.html?pkg=tools


wget http://dl.google.com/android/android-sdk_r23.0.2-linux.tgz

sudo mv ~/Downloads/android-sdk_r23.0.2-linux.tgz /opt/

cd /opt

sudo tar -xvf android-sdk_r23.0.2-linux.tgz

sudo chown USER *

cd android-sdk-linux


2. instalar android sdk
https://developer.android.com/sdk/installing/adding-packages.html

cd /opt/android-sdk-linux/tools

sudo ./android

esto abre una GUI de configuracion

seguir las instrucciones de la pagina para instalar dependencias.


3. instalar cordoba 3.6 cli

http://cordova.apache.org/docs/en/4.0.0//guide_cli_index.md.html#The%20Command-Line%20Interface

 sudo npm install -g cordova


http://www.gaggl.com/2014/04/apache-cordova-development-environment-install-on-ubuntu/

ahora para crear el proyecto:
http://cdn.chrislarson.me/blog/how-use-cordova-ubuntu-build-android-apps

hay que agregar ANDROID_PATH al bashrc: 

vim ~/.bashrc
y agregar:
 #AndroidDev PATH
 export PATH=${PATH}:/opt/android-sdk-linux/tools
 export PATH=${PATH}:/opt/android-sdk-linux/platform-tools

(vim .zshrc si se usa oh-my-shell..)

para agregar el emulador al proyecto:
cordova platform add android
android create avd -n hello -t 1

para ejecutar el emulador:
cordova emulate android


cuentacuentos
=============

visor de cuentacuentos


configuracion del ambiente
-------------

primer intento: 
ubuntu 14 + cordoba 3.6 + android sdk (sin adt bundle)

1. descargar android sdk desde:
https://developer.android.com/sdk/installing/index.html?pkg=tools
sudo mv ~/Downloads/android-sdk_r23.0.2-linux.tgz /opt/
cd /opt
sudo tar -xvf -xvf android-sdk_r23.0.2-linux.tgz 
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


MMM.. probando con este tut:
http://www.gaggl.com/2014/04/apache-cordova-development-environment-install-on-ubuntu/

con descarga de:
wget http://dl.google.com/android/android-sdk_r23.0.2-linux.tgz 

luego, instalacion de addons (2)
luego, instalacion de cordova con npm -g 



ahora para crear el proyecto:
http://cdn.chrislarson.me/blog/how-use-cordova-ubuntu-build-android-apps



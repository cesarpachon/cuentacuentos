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






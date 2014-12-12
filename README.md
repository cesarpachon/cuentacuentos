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

-------------------------------------
para ejecutar el emulador:
cordova emulate android
------------------------------------
ALMACENAMIENTO EXTERNO: SDCARD
la carpeta de assets es demasiado grande! lo mejor sera accederla desde el almacenamiento externo (SD).
para ello se necesita este plugin:
http://plugins.cordova.io/#/package/org.apache.cordova.file
y se usaria la opcion cordova.file.externalDataDirectory

como instalar el plugin?
http://cordova.apache.org/docs/en/3.4.0/guide_cli_index.md.html#The%20Command-Line%20Interface_add_plugin_features

cordova plugin add org.apache.cordova.file

(luego de instalar, queda almacenado en {project}/plugins/org.apache.cordova.file/ )

uso del plugin.. en la doc referencian esta pagina:
http://www.html5rocks.com/en/tutorials/file/filesystem/

---
EMULACION DE SD-CARD
ya tenemos el plugin para acceder al filesystem, pero como emular la tarjeta SD?
http://www.android-app-market.com/how-to-emulate-and-use-sd-card-for-the-android-emulator.html

cd /temp
mksdcard -l mysdcard01 4G mysdcard01.img

esto crea un archivo de 4GB en /temp. ahora, como agregarle archivos a esa imagen?
vamos a tratar el paso 3c de aca:
http://www.redips.net/android/emulator-sd-card-image/
cd /tmp
mkdir mnt
sudo mount -t vfat -o rw,uid=1000,gid=1000 /home/cesar/temp/mysdcard01.img mnt
listo, deberia estar en /tmp/mnt/
copiando archivos normalmente..
los archivos aparecen en /tmp/mnt. ahora desmontar, si todo es ok ya no deberian verse ahí.
cd .. (importante! si no se sale de la carpeta, sale error de dispositivo ocupado)
 sudo umount /tmp/mnt

----
para que la SDcard se cargue al lanzar el emulador, hay que entrar a la herramienta de administracion de android y configurarlo:

type android
17:16 < muratsu> from tools go to AVD manager
17:16 < muratsu> if you dont have an image create the image
17:16 < muratsu> otherwise edit
17:16 < muratsu> on SD Card section put your sd card image






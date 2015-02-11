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

--target=emulator_name

problema: tuve que instalar ANT, por apt-get, y agregar ANT_HOME al .bashrc (no se para que si esta en usr/bin)

otro problema: parece que requiere algunas librerias de x32:
sudo apt-get install lib32stdc++6
sudo apt-get install lib32z1

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

(me dieron estas instrucciones en IRC)

type android

from tools go to AVD manager

if you dont have an image create the image

otherwise edit

on SD Card section put your sd card image


funciona. podemos leer un archivo json desde la SDCARD!

pero.. como indicarle a un tag IMG que la ruta de una imagen la debe buscar en la SDCARD?

parece que hay que usar getDataAsURL y el resultado se le pasa a img.src.

--

some error.. lets try this:

cordova plugin add org.apache.cordova.console

and run this:
adb logcat CordovaLog:D "*:S"
adb logcat CordovaLog:V "*:S"
(in zhell requires quotes around *:S)

el emulador se puede dejar corriendo, cada vez que se ejecuta "cordova emulate android" se realiza un despliegue al emulador que esta activo.

el comando adb tambien se puede activar en cualquier momento.

----

para compilar y obtener el archivo apk:

cordova build

platforms/android/ant-build/CordovaApp-debug.apk


----

visualizacion de una imagen muy grande, con pan y zoom:

para esto probé diferente plugins, pero al final utilizé leafleat, que aunque es para mapas se puede configurar para que tome como mapa una sola imagen:

http://kempe.net/blog/2014/06/14/leaflet-pan-zoom-image.html

-----

ejecucion de archivos de audio

probe varias cosas pero fallan:


 1. using the file api to get the content as base64 encoded string (it works for pictures, but is too slow..)

   function _error(evt){_log(JSON.stringify(evt));};

    if(!this.filesystem){
      _log("app.getSound: no filesystem. loading from relative url as path");
      cbdone(url);
    }
    else{
      _log("app.getSound:  loading from filesystem ", url);

      this.filesystem.root.getFile(url, {create: false}, function(entry){
        _log("app.getSound:  loading from filesystem, got entry ", entry);

        entry.file(function(file){
          _log("app.getSound:  loading from filesystem, got entry.file ", entry.file);

          var reader = new FileReader();
          reader.onloadend = function(evt){
            _log("app.getSound:  loading from filesystem, got reader evt ", evt);
            cbdone(evt.target.result);
          }
          reader.readAsDataURL(file);

        }, _error);
      }, _error);
    }

  2. createObjectURL.
             var url = window.URL.createObjectURL(entry.file);
          _log("app.getSound: url: ", url);
          cbdone(url);

          I got this error:
          file:///android_asset/www/cordova.js: Line 1060 : processMessage failed: Stack: TypeError: Type error
            D/CordovaLog( 1497):     at file:///android_asset/www/js/index.js:159:32
            D/CordovaLog( 1497):     at win (file:///android_asset/www/plugins/org.apache.cordova.file/www/FileEntry.js:72:9)
            D/CordovaLog( 1497):     at Object.cordova.callbackFromNative (file:///android_asset/www/cordova.js:293:54)
            D/CordovaLog( 1497):     at processMessage (file:///android_asset/www/cordova.js:1054:21)
            D/CordovaLog( 1497):     at androidExec.processMessages (file:///android_asset/www/cordova.js:1091:13)
            D/CordovaLog( 1497): file:///android_asset/www/cordova.js: Line 1061 : processMessage failed: Message: S01 File644117798 {"lastModifiedDate":1419969712000,"fullPath":"\/cuentacuentos\/cuentacuentos01\/arboldezapatos.mp3","type":"audio\/mpeg","name":"arboldezapatos.mp3","size":4430126}

3. probando con el plugin media de cordoba:

instalar:

cordova plugin add org.apache.cordova.media


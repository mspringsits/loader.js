loader.js
=========

little library for animations, which are displayed while a webpage is loading

Installation
------------
The installation of the loaderjs plugin is quite simple, although there are two ways to go:<br>
**bower**<br>
```bower install loaderjs```<br>
if this was successfull, you can link the loaderjs-script like that<br>
```<script src="bower_components/loaderjs/loader.js"></script>```<br>
<sub>for more information, visit [bower](https://github.com/bower/bower)</sub>
<br>
**github clone**<br>
```git clone https://github.com/mspringsits/loader.js.git```<br>
after you have cloned the project to your disk, you can simply take the loader.js-file and copy it to your own project.<br>
<sub>for more information, visit [git](https://github.com/git/git)</sub>

Usage
-----
Generally there a three methods, that have to be called, that loaderjs works properly:
>  + Loader.preload();
>  + Loader.main();
>  + Loader.finish();

####Loader.preload();####
The preload method is used to handle background(graphically) while the page is loading.<br>
Several backgrounds are implemented from begin, which can be given with a string
parameters:<br>
preload([background], [parameter]);
background(string):
+ "no-display": nothing is displayed, the page will be empty
+ "black-background": a black background will be displayed
+ "custom-background": a custom background-color will be displayed; the color has to be transmitted with the parameter as string
+ "alpha": the opacity of the loading page will be set to 0.5; if a custom opacity is wanted, you must use the parameter as a float-number

####Loader.main();####
The main method is the 'core' of loaderjs.<br>
It is used to manage the effects that are displayed while the page is loading.<br>
parameters:<br>
main([action], [parameter]);
action(string):
+ "standard": a simple standard spinner
+ "custom": insert your custom html while the page is loading; the html has to be provided to the parameter as a string
+ "dots": a simple loader with dots, which are displaying the progress
+ "spectrum": a growing and shrinking circle, displaying the loading progress
+ "futuristic": a very futuristic loader
+ "text": a custom text, provided as string through parameter will be displayed

####Loader.finish();####
The finish method handles what has to be done when the site has loaded properly.<br>
parameters:<br>
finish([action], [parameter]):
action(string):
+ "fade": the content will be faded back in, the fade-time can be handled with the parameter given as a number in milliseconds; the default value will be one second

if no action is provided, the content will be displayed without any effects<br>
for testing purposes of the Loader.main()-method you can simply outcomment Loader.finish();<br>

Note that all three methods have to be used for a proper use!



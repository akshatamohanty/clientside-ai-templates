# Templates for client-only AI apps

AI is hard. But incorporating AI into web and mobile apps isn't anymore. After completing my AI Nanodegree from Udacity, I wanted to quickly deploy the models I built into web and mobile apps. And I wanted to do so, without using a server and completely on the client. 

This repository is a collection of all my code and the resources to build a dog breed classifier web and mobile app. The examples/workflow can be extended and manipulated to any of your own models. 

## Description of the files

### android 
Dog Breed Classifier Android app 
 
Note: You can change the models underneath by changing the model path and labels in the `Classifier Activity`. There is a 6 breed model and a biclass model available in the `assets` folder, apart from the mobile nets model itself. 


### docs
Dog Breed Classifier Web App 

Find the demo at: https://akshata.dev/client-side-template

Run this locally to change the image or have fun doing it with your device camera. 
Note: The models might be slow to load so be patient!


### keras_models

The frozen AI models in `hdf5` format. For models, such as the ResNet50, which resulted in huge files almost 1GB large, the actual file is not included. But the code to generate them is included in the Jupyter notebooks


### labels

The dog classes in `.json`, `.txt` and `.npy` format

### tflite

The `tflite` files generatede for android, using the tensorflow lite converter. Bigger files are not included, the code to generate them as been provided. 


### jupyter notebooks

A bunch of jupyter notebooks with code to do different things in the entire workflow! 


## How to convert an AI model to deploy in a web app?

I used `tensorflow.js` for this purpose. `Tensorflow.js` is a javascript library, used to train and/or deploy AI models on the browser and node.js. I used the `tfjs-converter` to convert my Keras models into a `model.json` file and a bunch of `.bin` files, also called `shards`. The `model.json` contains the architecture of your model and the shards are the numerical weights used by the model. To use these, I added the `tensorflow.js` library to my `index.html` and used the functions provided to load the model and make predictions. 

Please refer to the source code in `/docs` folder for an example. I also created some preprocessing functions in javascript for image inputs which might be more generally applicable for other models also. 

Also note, while converting my `base_resnet_50` model (which was super big!), the `model.json` generated was ill-formed because of a bug in the `tfjs-converter`. I had to manually go in and fix that. So try loading different models and incase there's just one that doesn't load - either report it and go through the source code to find out if the converter is messing up!

## How to convert an AI model to deploy in an android app?

I used `tensorflow lite` for this purpose. I converted my Keras models using the Python API, into `.tflite` models. I added these into the `assets` folder. I used the android example in the `tensorflow/examples` repository - and just replaced their models with mine to get this demo up quickly!

Note, the models will be smaller and faster if you use the `quantized tflite` option while converting the files. However, there is a cost in terms of accuracy. So check with the tensorflow accuracy checker to ensure the accuracy is not compromised above a certain threshold while adopting this way. 

Also, the model needs a defined `input_shape` and cannot have something like `[None, None, None, 3]` or then converter will complain! Incase of problems will conversion, you'll need to explore problems in the model generation as well as incompatibility between versions. 

## TODO: 
- react-native-template
- iOS-template-with-CoreML



## Talk - AI for Non-PhDs @ Junior Dev SG

[![](http://img.youtube.com/vi/1gEaPTeuBmE/0.jpg)](http://www.youtube.com/watch?v=1gEaPTeuBmE "AI for Non-PhDs")

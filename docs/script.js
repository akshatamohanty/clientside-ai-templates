let dog_names = []
let base_resnet_model
let extra_layers_model

function path_to_tensor(imageEl){
    // 3D tensor with shape (224, 224, 3)
    let tensor = tf.browser.fromPixels(imageEl)
            // .resizeNearestNeighbor([224, 224])
            // .toFloat();
    // convert 3D tensor to 4D tensor with shape (1, 224, 224, 3) and return 4D tensor
    // const axis = 1
    // return x.expandDims(axis)
    return tensor
}

// Source: https://gogul09.github.io/software/mobile-net-tensorflow-js
// Getting the 4D tensor ready for ResNet-50, and for any other pre-trained model in Keras, requires some additional processing. First, the RGB image is converted to BGR by reordering the channels. All pre-trained models have the additional normalization step that the mean pixel (expressed in RGB as $[103.939, 116.779, 123.68]$ and calculated from all pixels in all images in ImageNet) must be subtracted from every pixel in each image. This is implemented in the imported function preprocess_input. If you're curious, you can check the code for preprocess_input here.
async function preprocess_input(tensor, modelName) {
    // TODO: let reversed_tensor = tensor.reve
    let offset = tf.tensor1d([103.939, 116.779, 123.68]);
    return tensor
      .sub(offset)
      .reverse(-1)
      .expandDims();
}

// return indice of max value in list
// Source: https://gist.github.com/engelen/fbce4476c9e68c52ff7e5c2da5c24a28
function argmax(array) {
    let max = array[0]
    let index = 0
    let count = 0

    for(let el of array) {
        if ( el > max) {
            max = el
            index = count
        }

        count++
    }
    
    return index
    // return array.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
}

async function extract_bottleneck(imageEl) {
    const bottleneck_feature = await base_resnet_model.predict(tensor);
    return bottleneck_feature
}


async function predict_breed(imageEl) {
    const tensor = path_to_tensor(imageEl)
    const processed_tensor = await preprocess_input(tensor)
    const bottleneck_feature = base_resnet_model.predict(processed_tensor)
    const predicted_vector = extra_layers_model.predict(bottleneck_feature)

    // print_prediction(predicted_vector) 
    const dogIndex = argmax(await predicted_vector.data())
    const dog_breed = dog_names[ dogIndex ]
    console.log(dog_breed, dogIndex)
    document.getElementById('console').innerText = dog_breed 
}

async function predict_breed_from_image() {
    predict_breed(document.getElementById('img'))
}

async function predict_breed_from_cam() {
    predict_breed(webcamElement)
}

const webcamElement = document.getElementById('webcam');
async function setupWebcam() {
    return new Promise((resolve, reject) => {
        const navigatorAny = navigator;
        navigator.getUserMedia = navigator.getUserMedia ||
            navigatorAny.webkitGetUserMedia || navigatorAny.mozGetUserMedia ||
            navigatorAny.msGetUserMedia;
        if (navigator.getUserMedia) {
        navigator.getUserMedia({video: true},
            stream => {
            webcamElement.srcObject = stream;
            webcamElement.addEventListener('loadeddata',  () => resolve(), false);
            },
            error => reject());
        } else {
        reject();
        }
    });
}

// bootstrap the app
async function app() {
    fetch("./dog_names.json")
        .then(response => response.json())
        .then(json => dog_names = json);

    // Load the base resnet model.
    base_resnet_model = await tf.loadLayersModel('./base_resnet/model.json');
    console.log('Sucessfully loaded baseresnet model');

    // Load the model.
    extra_layers_model = await tf.loadLayersModel('./extra_layers/model.json');
    console.log('Sucessfully loaded extra layers model');

    document.getElementById('container').className = 'show'
    document.getElementById('loader').className = 'hide'

    setupWebcam();
}

app()

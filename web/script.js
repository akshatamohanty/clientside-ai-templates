const dog_names = []
let base_resnet_model
let extra_layers_model

function path_to_tensor(imageEl){
    // 3D tensor with shape (224, 224, 3)
    let tensor = tf.browser.fromPixels(imageEl)
            .resizeNearestNeighbor([224, 224])
            .toFloat();
    // convert 3D tensor to 4D tensor with shape (1, 224, 224, 3) and return 4D tensor
    // const axis = 1
    // return x.expandDims(axis)
    return tensor
}

// Source: https://gogul09.github.io/software/mobile-net-tensorflow-js
async function preprocess_input(tensor, modelName) {
  // if model is not available, send the tensor with expanded dimensions
//   if (modelName === undefined) {
//     return tensor.expandDims();
//   } 

  // if model is mobilenet, feature scale tensor image to range [-1, 1]
  // else if (modelName === "mobilenet") {
    let offset = tf.scalar(127.5);
    return tensor.sub(offset)
      .div(offset)
      .expandDims();
  //} 
}

// return indice of max value in list
// Source: https://gist.github.com/engelen/fbce4476c9e68c52ff7e5c2da5c24a28
function argmax(array) {
    let max = arr[0]
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
    return dog_names[ argmax(await predicted_vector.data()) ]
}

function print_prediction(predictions) {
    // get the model's prediction results
    // let results = Array.from(predictions)
    //         .map(function (p, i) {
    //             return {
    //                 probability: p,
    //                 className: IMAGENET_CLASSES[i]
    //             };
    //         }).sort(function (a, b) {
    //             return b.probability - a.probability;
    //         }).slice(0, 5);

    // display the top-1 prediction of the model
    document.getElementById("results-box").style.display = "block";
    document.getElementById("prediction").innerHTML = "MobileNet prediction - <b>" + results[0].className + "</b>";
}

// bootstrap the app
async function app() {
    // Load the base resnet model.
    base_resnet_model = await tf.loadLayersModel('./base_resnet/model.json', { strict: false } );
    console.log('Sucessfully loaded baseresnet model');

    // Load the model.
    extra_layers_model = await tf.loadLayersModel('./extra_layers/model.json');
    console.log('Sucessfully loaded extra layers model');
}

app()

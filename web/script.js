const dog_names = []
let base_resnet_model
let extra_layers_model

function path_to_tensor(imageEl){
    // 3D tensor with shape (224, 224, 3)
    let x = tf.browser.fromPixels(imageEl)
    // convert 3D tensor to 4D tensor with shape (1, 224, 224, 3) and return 4D tensor
    // TODO
    return np.expand_dims(x, axis=0)
}

async function extract_bottleneck(imageEl) {
    const bottleneck_feature = await base_resnet_model.predict(tensor);
    return bottleneck_feature
}

async function preprocess_input(tensor) {
    // TODO: 
    return tensor
}

// return indice of max value in list
// Source: https://gist.github.com/engelen/fbce4476c9e68c52ff7e5c2da5c24a28
function argmax(list) {
    return array.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
}

async function predict_breed(imageEl) {
    const tensor = path_to_tensor(imageEl)
    const processed_tensor = preprocess_input(tensor)
    const bottleneck_feature = base_resnet_model.predict(processed_tensor)
    const predicted_vector = last_layers_model.predict(bottleneck_feature)

    return dog_names[ argmax(predicted_vector) ]
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

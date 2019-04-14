let base_resnet_model
let extra_layers_model

async function app() {
  // Load the base resnet model.
  base_resnet_model = await tf.loadLayersModel('./base_resnet/model.json', { strict: false } );
  console.log('Sucessfully loaded baseresnet model');

  // Load the model.
  extra_layers_model = await tf.loadLayersModel('./extra_layers/model.json');
  console.log('Sucessfully loaded extra layers model');
}

app()

async function predict() {
  // Make a prediction through the model on our image.
  const imgEl = document.getElementById('img');
  const tensor = tf.browser.fromPixels(imgEl)
  const result = await base_resnet_model.predict(tensor);
  console.log(result);
}
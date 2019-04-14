let net;

async function app() {
  // Load the base resnet model.
  const base_resnet_model = await tf.loadModel('./base_resnet/model.json', strict=false);
  console.log('Sucessfully loaded baseresnet model');

  // Load the model.
  const extra_layers_model = await tf.loadLayersModel('./extra_layers/model.json');
  console.log('Sucessfully loaded extra layers model');

  // Make a prediction through the model on our image.
//   const imgEl = document.getElementById('img');
//   const result = await net.classify(imgEl);
//   console.log(result);
}

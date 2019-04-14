## No need to run this cell
from keras.applications.resnet50 import ResNet50, preprocess_input
base_resnet_model = ResNet50(weights='imagenet', include_top=False)
base_resnet_model.save('./keras_models/base_resnet.hdf5')
## save the resnet model (for use in tensorflow-js; not required otherwise)
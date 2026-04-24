import tensorflow as tf
import tensorflow_datasets as tfds
import matplotlib.pyplot as plt
import math

TAMANO_LOTE=32

def normalizar(imagen, etiqueta):
    imagen = tf.cast(imagen, tf.float32)
    imagen /= 255.0
    return imagen, etiqueta

def arreglar_orientacion(imagen, etiqueta):
    imagen = tf.image.transpose(imagen)
    return imagen, etiqueta

def ajustar_etiquetas(imagen, etiqueta):
    etiqueta = tf.where(etiqueta >= 36, etiqueta - 36, etiqueta - 10)
    return imagen, etiqueta

def filtrar_letras(img, lbl):
    return lbl >= 10

datos, metadatos = tfds.load('emnist/byclass', as_supervised=True, with_info=True)

datos_entrenamiento = datos['train'].filter(filtrar_letras).map(arreglar_orientacion).map(normalizar).map(ajustar_etiquetas)
datos_pruebas = datos['test'].filter(filtrar_letras).map(arreglar_orientacion).map(normalizar).map(ajustar_etiquetas)

modelo = tf.keras.Sequential([
    tf.keras.layers.Input(shape=(28, 28, 1)),

    tf.keras.layers.Conv2D(32,(3,3),activation='relu'),
    tf.keras.layers.MaxPooling2D(2,2),
    
    tf.keras.layers.Conv2D(64,(3,3),activation='relu'),
    tf.keras.layers.MaxPooling2D(2,2),

    tf.keras.layers.Dropout(0.3),
    tf.keras.layers.Flatten(),
    tf.keras.layers.Dense(units=128, activation='relu'),

    tf.keras.layers.Dense(26, activation='softmax')
]
)

modelo.compile(
    optimizer = "adam",
    loss = "sparse_categorical_crossentropy",
    metrics = ['accuracy']
)


num_datos_entrenamiento = metadatos.splits["train"].num_examples
num_datos_pruebas = metadatos.splits["test"].num_examples

datos_entrenamiento = datos_entrenamiento.repeat().shuffle(num_datos_entrenamiento).batch(TAMANO_LOTE)
datos_pruebas = datos_pruebas.batch(TAMANO_LOTE)

parar = tf.keras.callbacks.EarlyStopping(
    monitor="val_loss",
    patience= 5,
    restore_best_weights=True
)

historial = modelo.fit(
    datos_entrenamiento,
    epochs = 20,
    validation_data= datos_pruebas,
    steps_per_epoch= math.ceil(num_datos_entrenamiento/TAMANO_LOTE),
    callbacks = [parar]
)

print("Modelo entrenado")

acc = historial.history['accuracy']
val_acc = historial.history['val_accuracy']

loss = historial.history['loss']
val_loss = historial.history['val_loss']

plt.plot(acc, label='Train Accuracy')
plt.plot(val_acc, label='Val Accuracy')
plt.legend()
plt.show()

plt.plot(loss, label='Train Loss')
plt.plot(val_loss, label='Val Loss')
plt.legend()
plt.show()

modelo.export("Model/Modelo_Letras")

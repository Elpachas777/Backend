import tensorflow as tf
import tensorflow_datasets as tfds
import matplotlib.pyplot as plt
import math
import numpy as np
import seaborn as sns
from sklearn.metrics import confusion_matrix
import string


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

data_augmentation = tf.keras.Sequential([
    tf.keras.layers.RandomRotation(0.05),
    tf.keras.layers.RandomZoom(0.05),
    tf.keras.layers.RandomTranslation(0.05, 0.05),
])


modelo = tf.keras.Sequential([
    tf.keras.layers.Input(shape=(28, 28, 1)),

    data_augmentation,

    tf.keras.layers.Conv2D(32,(3,3), padding="same"),
    tf.keras.layers.BatchNormalization(),
    tf.keras.layers.Activation("relu"),
    tf.keras.layers.MaxPooling2D(),
    
    tf.keras.layers.Conv2D(64,(3,3),activation='relu'),
    tf.keras.layers.BatchNormalization(),
    tf.keras.layers.Activation("relu"),
    tf.keras.layers.MaxPooling2D(),

    tf.keras.layers.Conv2D(160,(3,3),activation='relu'),
    tf.keras.layers.BatchNormalization(),
    tf.keras.layers.Activation("relu"),
    tf.keras.layers.MaxPooling2D(),

    tf.keras.layers.GlobalAveragePooling2D(),

    tf.keras.layers.Dense(units=128, activation='relu'),
    tf.keras.layers.Dropout(0.5),

    tf.keras.layers.Dense(26, activation='softmax')
]
)

modelo.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
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

lr_scheduler = tf.keras.callbacks.ReduceLROnPlateau(
    monitor='val_loss',
    factor=0.3,
    patience=3
)

historial = modelo.fit(
    datos_entrenamiento,
    epochs = 20,
    validation_data= datos_pruebas,
    steps_per_epoch= math.ceil(num_datos_entrenamiento/TAMANO_LOTE),
    callbacks=[parar, lr_scheduler]
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

y_true = []
y_pred = []

for imagenes, etiquetas in datos_pruebas:
    predicciones = modelo.predict(imagenes, verbose=0)
    predicciones = np.argmax(predicciones, axis=1)

    y_true.extend(etiquetas.numpy())
    y_pred.extend(predicciones)

# 🔹 Crear matriz
matriz_confusion = confusion_matrix(y_true, y_pred)

# 🔹 Etiquetas A-Z
letras = list(string.ascii_uppercase)

# 🔹 Heatmap con valores
plt.figure(figsize=(12,10))
sns.heatmap(
    matriz_confusion,
    xticklabels=letras,
    yticklabels=letras,
    cmap='Blues',
    annot=True,          # 👈 números dentro
    fmt='d',             # enteros
    annot_kws={"size":6} # 👈 texto más pequeño (importante con 26 clases)
)
plt.xlabel('Predicción')
plt.ylabel('Etiqueta real')
plt.title('Matriz de Confusión (valores absolutos)')
plt.show()


# 🔥 OPCIONAL: versión normalizada (porcentaje)
matriz_norm = matriz_confusion.astype('float') / matriz_confusion.sum(axis=1)[:, np.newaxis]

plt.figure(figsize=(12,10))
sns.heatmap(
    matriz_norm,
    xticklabels=letras,
    yticklabels=letras,
    cmap='Blues',
    annot=True,
    fmt='.2f',
    annot_kws={"size":6}
)
plt.xlabel('Predicción')
plt.ylabel('Etiqueta real')
plt.title('Matriz de Confusión (normalizada)')
plt.show()

modelo.export("Model/Modelo_Letras")

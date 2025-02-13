#!/bin/bash

# Ruta del archivo build.gradle (ajusta la ruta si es necesario)
GRADLE_FILE="../app/build.gradle"

# Clean .cxx folder
rm -rf ../app/.cxx

# Verifica si el archivo existe
if [ ! -f "$GRADLE_FILE" ]; then
  echo "El archivo $GRADLE_FILE no se encontró."
  exit 1
fi

# Extrae el versionCode actual
CURRENT_VERSION_CODE=$(grep 'versionCode' "$GRADLE_FILE" | sed -E 's/[^0-9]*([0-9]+)/\1/')
if [ -z "$CURRENT_VERSION_CODE" ]; then
  echo "No se encontró versionCode en $GRADLE_FILE."
  exit 1
fi

# Extrae el versionName actual
CURRENT_VERSION_NAME=$(grep 'versionName' "$GRADLE_FILE" | sed -E 's/.*versionName "([0-9]+\.[0-9]+\.[0-9]+)".*/\1/')
if [ -z "$CURRENT_VERSION_NAME" ]; then
  echo "No se encontró versionName en $GRADLE_FILE."
  exit 1
fi

# Desglosa la versión en major, minor y patch
IFS='.' read -r MAJOR MINOR PATCH <<< "$CURRENT_VERSION_NAME"

# Pregunta qué parte se quiere incrementar
echo "Versión actual: $CURRENT_VERSION_NAME"
echo "Selecciona el tipo de versión a incrementar:"
echo "1) Major (X.0.0)"
echo "2) Minor ($MAJOR.X.0)"
echo "3) Patch ($MAJOR.$MINOR.X)"
read -r -p "Ingresa tu elección (1/2/3): " CHOICE </dev/tty

case $CHOICE in
  1)
    MAJOR=$((MAJOR + 1))
    MINOR=0
    PATCH=0
    ;;
  2)
    MINOR=$((MINOR + 1))
    PATCH=0
    ;;
  3)
    PATCH=$((PATCH + 1))
    ;;
  *)
    echo "Opción no válida."
    exit 1
    ;;
esac

# Forma la nueva versión
NEW_VERSION_NAME="$MAJOR.$MINOR.$PATCH"
NEW_VERSION_CODE=$((CURRENT_VERSION_CODE + 1))

# Actualiza el archivo build.gradle
sed -i.bak "s/versionCode $CURRENT_VERSION_CODE/versionCode $NEW_VERSION_CODE/" "$GRADLE_FILE"
sed -i.bak "s/versionName \"$CURRENT_VERSION_NAME\"/versionName \"$NEW_VERSION_NAME\"/" "$GRADLE_FILE"

echo "versionCode actualizado de $CURRENT_VERSION_CODE a $NEW_VERSION_CODE."
echo "versionName actualizado de $CURRENT_VERSION_NAME a $NEW_VERSION_NAME."

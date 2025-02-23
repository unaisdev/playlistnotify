#!/bin/bash

# Ruta del archivo build.gradle
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

# Lee la opción desde stdin
echo "Seleccione el tipo de incremento:"
echo "1) Major"
echo "2) Minor"
echo "3) Patch"
read -r CHOICE

# Valida y procesa la opción
case $CHOICE in
  1)
    echo "Incrementando versión Major"
    MAJOR=$((MAJOR + 1))
    MINOR=0
    PATCH=0
    ;;
  2)
    echo "Incrementando versión Minor"
    MINOR=$((MINOR + 1))
    PATCH=0
    ;;
  3)
    echo "Incrementando versión Patch"
    PATCH=$((PATCH + 1))
    ;;
  *)
    echo "Opción no válida: $CHOICE"
    exit 1
    ;;
esac

# Forma la nueva versión
NEW_VERSION_NAME="$MAJOR.$MINOR.$PATCH"
NEW_VERSION_CODE="$MAJOR$MINOR$PATCH"

# Crea un archivo temporal
TMP_FILE=$(mktemp)

# Actualiza el archivo build.gradle usando sed con compatibilidad universal
sed "s/versionCode $CURRENT_VERSION_CODE/versionCode $NEW_VERSION_CODE/" "$GRADLE_FILE" > "$TMP_FILE"
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' "s/versionName \"$CURRENT_VERSION_NAME\"/versionName \"$NEW_VERSION_NAME\"/" "$TMP_FILE"
else
  sed -i "s/versionName \"$CURRENT_VERSION_NAME\"/versionName \"$NEW_VERSION_NAME\"/" "$TMP_FILE"
fi

# Mueve el archivo temporal al original
mv "$TMP_FILE" "$GRADLE_FILE"

echo "versionCode actualizado de $CURRENT_VERSION_CODE a $NEW_VERSION_CODE"
echo "versionName actualizado de $CURRENT_VERSION_NAME a $NEW_VERSION_NAME"

exit 0
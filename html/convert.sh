#!/bin/bash

# Set the input and output encodings
IN_ENC="big5"
OUT_ENC="utf-8"

# Traverse the directory and convert all HTML files
for file in $(find . -name "*.html" -o -name "*.htm"); do
  # Check if the file is a regular file
  if [[ -f "$file" ]]; then
    # Convert the file to UTF-8 encoding
    iconv -f "$IN_ENC" -t "$OUT_ENC" "$file" > "$file.new" && mv -f "$file.new" "$file"
    echo "Converted $file"
  fi
done

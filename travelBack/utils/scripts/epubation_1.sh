#! bin/bash
tmp="epub_tmp/tmp_$1"
mkdir -p $tmp
cd book
cp -r OEBPS/ ../$tmp
cp -r META-INF/ ../$tmp
cp publish mimetype ../$tmp

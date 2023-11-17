#!/bin/bash

mkdir -p src/data
curl -L -o src/data/blocklist.json https://iptv-org.github.io/api/blocklist.json 
curl -L -o src/data/categories.json https://iptv-org.github.io/api/categories.json 
curl -L -o src/data/channels.json https://iptv-org.github.io/api/channels.json
curl -L -o src/data/streams.json https://iptv-org.github.io/api/streams.json
curl -L -o src/data/guides.json https://iptv-org.github.io/api/guides.json
curl -L -o src/data/countries.json https://iptv-org.github.io/api/countries.json 
curl -L -o src/data/languages.json https://iptv-org.github.io/api/languages.json 
curl -L -o src/data/regions.json https://iptv-org.github.io/api/regions.json 
curl -L -o src/data/subdivisions.json https://iptv-org.github.io/api/subdivisions.json
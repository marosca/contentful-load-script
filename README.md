# contentful-load-script
## Install dependecies
```npm install```

## Create file.csv
This script load data in a file.csv file (at the root of the project). This file MUST be in .csv UTR-8 format.
![image](https://user-images.githubusercontent.com/2544389/124664396-aab9a880-deab-11eb-8afa-e2df71c98e8f.png)

## Update variables
Update this values:
```
const ACCESS_TOKEN = "CFPAT-XXXXXXXXXXXXXXXXXXXXX";
const SPACE_ID = "xxxxxxxxxxxxx";
const CONTENT_TYPE_ID = "terminal";
```
## Run script
In console type:
```npm run import```

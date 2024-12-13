
# Receipt Processor API

## API endpoints

- /receipts/process
- /receipts/{id}/points

## Using this repository

### Start via Docker container
#### Requirements -
- Docker (I am on v27.3.1)
- docker compose (I am on v2.30.3-desktop.1)
#### Instructions -
##### **Run the production container:**
1. Clone the repo down located at https://github.com/tyler-thee-creator/receipt-processor
2. ```cd``` into the cloned repository
3. run ```docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d```
&nbsp;
##### **Run the dev container:**
1. Clone the repo down located at https://github.com/tyler-thee-creator/receipt-processor
2. ```cd``` into the cloned repository
3. run ```docker compose build```
4. run ```docker compose up -d```

##### Running either container should spin up the server and requests can be made to http://localhost:3000 (for example:  http://localhost:3000/receipts/process)

### Start via Nodejs using npm
#### Requirements -
- Nodejs (I am on v20.18.1)
- npm (I am on v10.8.2)

### Instructions -
1. Clone the repo down located at https://github.com/tyler-thee-creator/receipt-processor
2. ```cd``` into the cloned repository
3. Run ```npm install```
4. Run ```npm run dev``` to run the development server locally
5. Run ```npm run test``` to run the automated test suite

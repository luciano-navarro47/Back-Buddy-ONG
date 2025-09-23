# Base image with Node
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Compile Typescript
RUN npm run build

# Start command
CMD ["node", "dist/index.js"]
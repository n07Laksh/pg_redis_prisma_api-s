
# Build Stage

FROM node:20-alpine AS builder

WORKDIR /node/app

COPY package*.json ./

#install neccesary dependency excluding development dependency
RUN npm install

# Copy generated code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build TypeScript
RUN npm run build



# production stage

FROM node:20-alpine

# creates a working directory in container where all thing stored or install
WORKDIR /node/app

# copy only production files 

# Copy accepts two arg source and dest
# source from host project
# dest from container relative to /node/app
COPY package*.json ./

RUN npm install --omit=dev

# Copy build output
COPY --from=builder /node/app/dist ./dist
COPY --from=builder /node/app/prisma ./prisma

EXPOSE 8000

CMD ["node", "dist/src/server.js"]

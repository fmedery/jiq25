# Stage 1: Build the application
FROM node:22-slim AS build
RUN apt-get update && apt-get upgrade -y

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Pass GEMINI_API_KEY as a build argument
ARG GEMINI_API_KEY
ENV GEMINI_API_KEY=$GEMINI_API_KEY

RUN npm run build

# Stage 2: Serve the application
FROM node:22-slim
RUN apt-get update && apt-get upgrade -y

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY package*.json ./
COPY vite.config.ts ./

RUN npm install --production

EXPOSE 3000

CMD ["sh", "-c", "exec npx serve -s dist -l ${PORT:-3000}"]
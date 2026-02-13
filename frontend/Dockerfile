FROM node:22

WORKDIR /app

COPY package.json package-lock.json ./

# Install all deps, then force-install Linux native binaries for cross-platform build
RUN npm ci
RUN npm install lightningcss-linux-x64-gnu@1.30.2 @tailwindcss/oxide-linux-x64-gnu --save-optional --force

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]

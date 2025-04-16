# Node.js 환경에서 React 빌드
FROM node
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 5001

CMD ["npm", "start"]
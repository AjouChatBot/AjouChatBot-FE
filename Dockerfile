# Node.js 환경에서 React 빌드
FROM node AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Nginx를 사용하여 정적 파일 서빙
FROM nginx:latest
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
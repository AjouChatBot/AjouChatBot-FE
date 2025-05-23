FROM nginx:latest
 
RUN mkdir /app
WORKDIR /app
RUN mkdir ./dist
 
COPY ./dist ./dist
COPY ./default.conf /etc/nginx/conf.d
 
EXPOSE 3000
 
CMD ["nginx", "-g", "daemon off;"]
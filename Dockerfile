# Usar una imagen base de Node.js para construir la aplicación
FROM node:16 as build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Usar una imagen base de Nginx para servir la aplicación
FROM nginx:alpine

# Copiar los archivos construidos a la carpeta Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copiar el archivo de configuración de Nginx
COPY default.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]

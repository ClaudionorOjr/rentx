# imagem | utilizando a imagem do node
FROM node

# caminho do diretório para guardar as informações
WORKDIR /usr/app

COPY package.json ./

RUN npm install

# copiada tudo para dentro da pasta raiz
COPY . .

# porta que vai estar utilizando
EXPOSE 3333

CMD [ "npm", "run", "dev" ]


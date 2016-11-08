FROM node:6.9.1

#ENV NODE_ENV production
ENV HOME=/src
RUN mkdir $HOME
RUN npm install nodemon -g
WORKDIR $HOME
ADD package.json $HOME/package.json
#ADD npm-shrinkwrap.json $HOME/npm-shrinkwrap.json
RUN npm install
ADD nodemon.json $HOME/nodemon.json
EXPOSE 9000

CMD [ "npm", "start" ]
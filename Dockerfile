# Use an official Node.js LTS image as the base image
FROM node:lts-alpine

# Define environment variables
ENV HOME=/home/node/app
ENV NODE_ENV=production
ENV NODE_PORT=3000

# Create application folder and assign rights to the node user
RUN mkdir -p $HOME && chown -R node:node $HOME

# Set the working directory
WORKDIR $HOME

# Set the active user
USER node

# Copy package.json from the host
COPY --chown=node:node package.json $HOME/

# Install application modules
RUN npm install && npm cache clean --force

# Copy remaining files
COPY --chown=node:node . .

# Expose port on the host
EXPOSE $NODE_PORT

# Application launch command
CMD [ "node", "./index.js" ]   
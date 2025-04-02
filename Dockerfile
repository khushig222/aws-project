# Stage 1: Build Stage
FROM node:18 AS build-stage

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first (to leverage Docker cache)
COPY ./backend/package*.json ./

# Install all dependencies
RUN npm install

# Copy the entire project
COPY backend/. . 

# Stage 2: Production Stage
FROM node:18

# Set the working directory
WORKDIR /app

# Copy only necessary files from the build stage
COPY --from=build-stage /app /app

# Install production dependencies only (to reduce image size)
RUN npm install --only=production

# Expose the required port
EXPOSE 3008

# Start the application
CMD ["npm", "start"]

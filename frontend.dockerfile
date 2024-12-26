# Build stage
FROM node:20-alpine as builder
WORKDIR /app

# Build arguments
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# Copy and build
COPY frontend/ ./
RUN yarn install --frozen-lockfile && \
    yarn build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

FROM golang:latest

# Set the working directory inside the container
WORKDIR /app

# Copy the Go module files
COPY go.mod .

# Download dependencies
RUN go mod download

# Copy all files from the current directory to the working directory
COPY . .

RUN go build -o product

CMD ["./product"]
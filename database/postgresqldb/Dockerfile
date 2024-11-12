FROM postgres:10.5

# Copy the custom initialization script to the bin directory
COPY init_script.sh /usr/local/bin/

# Set execute permissions for the script
RUN chmod +x /usr/local/bin/init_script.sh

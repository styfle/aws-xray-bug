# bug

1. Edit the `docker-compose.yml` and add your AWS credentials
2. Change the region if you would like 
3. In the root directory, run `docker-compose up --build`
4. Visit http://localhost:8080
5. Notice the `[ERROR] Error: Failed to get the current sub/segment from the context.`
6. Remove the `xray.captureAsync()` calls and it mostly works
FROM alpine:3.9

# Download latest 2.x release of X-Ray daemon
RUN apk add --no-cache libc6-compat curl unzip ca-certificates && \
    cd /tmp/ && \
    curl https://s3.dualstack.us-east-2.amazonaws.com/aws-xray-assets.us-east-2/xray-daemon/aws-xray-daemon-linux-2.x.zip > aws-xray-daemon-linux-2.x.zip && \
        unzip aws-xray-daemon-linux-2.x.zip && \
        cp xray /usr/bin/xray && \
        rm aws-xray-daemon-linux-2.x.zip && \
    rm cfg.yaml

# Expose port 2000 on udp
EXPOSE 2000/udp

ENTRYPOINT ["/usr/bin/xray"]

CMD ['']
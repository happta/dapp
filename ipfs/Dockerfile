FROM jbenet/go-ipfs:latest

COPY initializer.sh /initializer.sh
RUN chmod +x ./initializer.sh

ENTRYPOINT ["/sbin/tini", "--", "/initializer.sh"]

CMD ["daemon", "--migrate=true"]

docker-compose run contracts node deploy.js "A test blog"
curl -svX 'POST' -F "image=@./test/a_post.json" http://localhost:5002/ipfs/
curl -svX 'POST' -F "image=@./test/another_post.json" http://localhost:5002/ipfs/
docker-compose run contracts node publish.js 0x3240c5bac4d98855f6c32b1182942bd7d91cd7f0 QmPKWPDpxHvP7QmAtpCu6siPPMXZbdcLT3qj1JpmwAMRUf
docker-compose run contracts node publish.js 0x3240c5bac4d98855f6c32b1182942bd7d91cd7f0 QmVHmyK7ZtucV6PQjN7mT2oq75EYXsnaynP3ykLT41PoC1
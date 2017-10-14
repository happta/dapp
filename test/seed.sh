docker-compose run contracts node deploy.js "A test blog"
a_post=`cat test/a_post.json`
curl -svX 'POST' --data "$a_post" http://localhost:5002/ipfs/
another_post=`cat test/another_post.json`
curl -svX 'POST' --data "$another_post" http://localhost:5002/ipfs/
docker-compose run contracts node publish.js 0x3240c5bac4d98855f6c32b1182942bd7d91cd7f0 QmPKWPDpxHvP7QmAtpCu6siPPMXZbdcLT3qj1JpmwAMRUf
docker-compose run contracts node publish.js 0x3240c5bac4d98855f6c32b1182942bd7d91cd7f0 QmeEjpN2LVDX7NkcxqtXNgJtNpoEvySBpBFxMXRJz1Dyny
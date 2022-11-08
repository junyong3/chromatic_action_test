# turbine docker run

jyg_container_name="backofficeChoShopWeb"
jyg_image_name="ui-backoffice-server"
jyg_username="backoffice/web"
version="latest"
port="5175"
targetPort="80"

echo "## Automation docker-web-server build and Run ##"

echo "=========> stop previous container ..."
docker stop  ${jyg_container_name}

echo "=========> remove previous container..."
docker rm =f ${jyg_container_name}

echo "=========> remove previous image..."
docker rmi -f ${jyg_username}/${jyg_image_name}:${version}

echo "==========> Build new image..."
docker build --tag ${jyg_username}/${jyg_image_name}:${version} .

echo "=========> Run container"
docker run -d -p ${port}:${targetPort} --name ${jyg_container_name} ${jyg_username}/${jyg_image_name}:${version}

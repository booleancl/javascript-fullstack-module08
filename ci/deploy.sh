echo "PUBLIC FOLDER"
ls -R -lha ./backend/src/public

ENVIRONMENT_NAME="production"
IMAGE_NAME="registry.heroku.com/${HEROKU_APP_NAME}/web"
FIREBASE_SERVICE_ACCOUNT_FILENAME="firebase-service-account.json" #MUST BE THE SAME NAME AS IN THE BUCKET

echo "============================================================="
echo " CREANDO IMAGEN DOCKER ${IMAGE_NAME} "
echo "============================================================="

./ci/build_service_account.sh $FIREBASE_SERVICE_ACCOUNT_FILENAME

cd backend

echo "$HEROKU_KEY" | docker login --username ${HEROKU_OWNER_EMAIL} --password-stdin registry.heroku.com
docker build -t $IMAGE_NAME \
--build-arg database_url=${DATABASE_URL} \
--build-arg service_account_filename=${FIREBASE_SERVICE_ACCOUNT_FILENAME} \
--build-arg environment_name=${ENVIRONMENT_NAME} .

echo "============================================================="
echo " PUBLICANDO VERSION ${IMAGE_NAME} "
echo "============================================================="
docker push $IMAGE_NAME
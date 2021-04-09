
echo '*********************************************'
echo '** download service account file ...'
echo '*********************************************'

FILENAME=$1
OUTPUT_PATH="backend/src/$FILENAME"
BUCKET_NAME=$FIREBASE_BUCKET_NAME
# BUCKET_NAME=
# FIREBASE_SERVICE_ACCOUNT_OBJECT_TOKEN=

curl -X GET \
-o $OUTPUT_PATH \
"https://firebasestorage.googleapis.com/v0/b/$BUCKET_NAME/o/$FILENAME?alt=media&token=$FIREBASE_SERVICE_ACCOUNT_OBJECT_TOKEN"
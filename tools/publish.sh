set -e

VERSION=$(cat version | awk '{$1=$1;print}')
echo "publish version ${VERSION}"

make release

echo "SKIP_PREFLIGHT_CHECK=true" >./.env
npm run bundle

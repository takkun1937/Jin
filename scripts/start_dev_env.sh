#!/bin/sh

SUPABASE_REPO_PATH=$1
ACTION=$2

# オプションが指定されていない場合のエラーメッセージ
if [ -z "$SUPABASE_REPO_PATH" ] || [ -z "$ACTION" ]; then
  echo "Error: Supabaseリポジトリのパスとアクション[--up|--down]を指定してください。"
  echo "Usage: $0 <supabase-repo-path> [--up|--down]"
  exit 1
fi

# dockerディレクトリへ移動
DOCKER_PATH="$SUPABASE_REPO_PATH/docker"
if [ ! -d "$DOCKER_PATH" ]; then
  echo "Error: 指定したリポジトリ直下にdockerディレクトリが存在しません。"
  exit 1
fi

# アクションのハンドリング
if [ "$ACTION" = "--up" ]; then
  docker-compose up -d
  cd "$DOCKER_PATH" || exit 1
  docker compose up -d
elif [ "$ACTION" = "--down" ]; then
  docker-compose down -v
  cd "$DOCKER_PATH" || exit 1
  docker compose down -v
else
  echo "Invalid action: $ACTION"
  echo "Usage: $0 <supabase-repo-path> [--up|--down]"
  exit 1
fi

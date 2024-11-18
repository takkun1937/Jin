#!/bin/sh

SUPABASE_REPO_PATH=$1
ACTION=$2

# オプションが指定されていない場合のエラーメッセージ
if [ -z "$SUPABASE_REPO_PATH" ] || [ -z "$ACTION" ]; then
  echo "Error: Supabaseリポジトリのパスとアクション[--up|--up-build|--down]を指定してください。"
  echo "Usage: $0 <supabase-repo-path> [--up|--down]"
  exit 1
fi

# dockerディレクトリへ移動
SUPABASE_DOCKER_PATH="$SUPABASE_REPO_PATH/docker/docker-compose.yml"
if [ ! -f "$SUPABASE_DOCKER_PATH" ]; then
  echo "Error: 指定したリポジトリ直下にdockerディレクトリが存在しません。"
  exit 1
fi

# アクションのハンドリング
if [ "$ACTION" = "--up" ]; then
  docker compose -f "$SUPABASE_DOCKER_PATH" up -d
  docker compose up -d
elif [ "$ACTION" = "--up-build" ]; then
  docker compose -f "$SUPABASE_DOCKER_PATH" up -d --build
  docker compose up -d --build
elif [ "$ACTION" = "--down" ]; then
  docker compose down -v
  docker compose -f "$SUPABASE_DOCKER_PATH" down -v
else
  echo "Invalid action: $ACTION"
  echo "Usage: $0 <supabase-repo-path> [--up|--up-build|--down]"
  exit 1
fi

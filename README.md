# Jin アプリ開発

## 1. ディレクトリ構成

```sh
.
├── Dockerfile               # Dockerイメージを構築するための設定ファイル
├── README.md                # プロジェクトの概要やセットアップ手順を説明するドキュメント
├── app                      # アプリケーションのエントリーポイントやページを格納するディレクトリ
├── atoms                    # アプリケーション全体で使用される状態
├── common                   # アプリケーション全体で再利用可能な共通のユーティリティや定数を格納するディレクトリ
├── components               # 再利用可能なReactコンポーネントを格納するディレクトリ
├── docker-compose.yml       # Dockerコンテナを起動するための設定ファイル
├── features                 # 特定の機能やモジュールに関連するコードを格納するディレクトリ
├── hooks                    # 共通のカスタムReactフックを格納するディレクトリ
├── i18n.ts                  # 多言語対応の設定や初期化を行うファイル
├── lib                      # 外部ライブラリとのインターフェースを格納するディレクトリ
├── messages                 # 多言語対応のための翻訳メッセージを格納するディレクトリ
├── next.config.mjs          # Next.jsのカスタム設定を行うファイル
├── package-lock.json        # インストールされたnpmパッケージのバージョンを固定するファイル
├── package.json             # プロジェクトの依存関係やスクリプト、メタデータを定義するファイル
├── postcss.config.mjs       # PostCSSの設定ファイル
├── providers                # グローバルなコンテキストや状態を提供するプロバイダーを格納するディレクトリ
├── public                   # 静的ファイル（画像やフォントなど）を格納するディレクトリ
├── tailwind.config.ts       # Tailwind CSSのカスタム設定ファイル
├── tsconfig.json            # TypeScriptのコンパイルオプションを設定するファイル
└── types                    # TypeScriptの型定義を格納するディレクトリ

```

## 2. 開発環境

### 2.1. 開発ツール

- Docker
- VSCode
  - [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview)
    - .devcontainer.jsonの設定を修正することで、開発コンテナ上でのEditor設定をカスタマイズ可能。

### 2.2. 環境構築手順

1. VSCodeで本リポジトリを開く

2. コンソールから以下のコマンドを実行することで仮想環境が立ち上がり、アプリケーションが実行される

  ```sh
  $ docker compose up -d
  ```
3. VSCodeのフッターメニュー(ステータスバー)の「リモートウィンドウを開きます」をクリックする。

4. メニューから「コンテナーで再度開く」を選択する。

  - 開発コンテナ環境で本リポジトリが開き直され、必要なExtensionやEditorの設定がコンテナ上に読み込まれる。

5. 開発スタート

## 3. ビルド・実行方法

※ 詳細なコマンドの情報については、`package.json`参照

### 3.1. ビルド方法

1. VSCodeでリモート接続している状態で、以下のコマンドを実行する。

    ```sh
    $ npm run build
    ```

### 3.2. 実行方法

※ デフォルトでコンテナ立ち上げ時にアプリケーションを実行するようになっているため、手動で実行する場合のみ以下のコマンドを実行する。

1. VSCodeでリモート接続している状態で、以下のコマンドを実行する。

    ```sh
    $ npm run dev
    ```

## 4. ライブラリ

### 4.1. JavaScript

| ライブラリ名 | バージョン | 用途 | ライセンス |  参考 | 補足 |
| --- | --- | --- | --- | --- | --- |
| axios | ^1.7.2| ログイン、コンテンツダウンロードなど | MIT | [Axios API](https://axios-http.com/docs/api_intro) |  |
| jotai | ^2.9.0 | Reactアプリケーションのための状態管理ライブラリで、コンポーネント間の状態共有を容易にするため | MIT | [Jotai](https://jotai.org/) |  |
| next-auth | ^4.24.7 | ログイン機能を実装するため | ISC | [NextAuth.js](https://next-auth.js.org/) |  |
| next-intl | ^3.17.2 | ローカライズ対応のため | MIT | [next-intl](https://next-intl-docs.vercel.app/) |  |
| @uiw/react-md-editor | ^4.0.4 | マークダウンエディタを実装するため | MIT | [react-md-editor](https://uiwjs.github.io/react-md-editor/) |  |

### 4.2. DB
| ライブラリ名 | バージョン | 用途 | ライセンス |  参考 | 補足 |
| --- | --- | --- | --- | --- | --- |
| prisma | ^5.17.0 | DBとの接続を行うため | Apatche-2.0 | [Prisma](https://www.prisma.io/) |  |
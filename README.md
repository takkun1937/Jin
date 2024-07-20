# Jin アプリ開発

## 1. ディレクトリ構成

```sh
.
├── Dockerfile                       # Dockerコンテナの設定ファイル
├── README.md                        # プロジェクトの説明および手順書
├── .devcontainer.json               # 開発環境接続時の設定ファイル
├── android                          # Android関連のディレクトリ
├── app                              # Reactアプリケーションのメインディレクトリ
│   ├── index.html                   # ReactアプリケーションのメインHTMLファイル
│   ├── package-lock.json            # npmの依存関係ロックファイル
│   ├── package.json                 # npmのプロジェクト設定ファイル
│   ├── postcss.config.js            # PostCSSの設定ファイル
│   ├── public                       # 公開リソースのディレクトリ
│   ├── src                          # Reactソースコードのディレクトリ
│   │   ├── App.tsx                  # Reactアプリケーションのメインコンポーネント
│   │   ├── assets                   # アセットファイル（画像、スタイルなど）
│   │   ├── main.tsx                 # Reactアプリケーションエントリーポイント
│   │   ├── types                    # TypeScriptの型定義ファイル
│   │   └── vite-env.d.ts            # Viteの環境設定ファイル
│   ├── tailwind.config.js           # Tailwind CSSの設定ファイル
│   ├── tsconfig.app.json            # TypeScriptの設定ファイル（Reactアプリケーション用）
│   ├── tsconfig.json                # TypeScriptの設定ファイル（一般）
│   ├── tsconfig.node.json           # TypeScriptの設定ファイル（Node.js用）
│   └── vite.config.ts               # Viteの設定ファイル
├── buildNumberIncrementer.js
├── buildNumberIncrementer.sh
├── contents
├── contributed
├── docker-compose.yml               # Docker Composeの設定ファイル
├── html                             # bg845アプリケーションディレクトリ
│   ├── css                          # CSSファイルのディレクトリ
│   ├── index.html                   # bg845アプリケーションエンドポイント
│   └── js                           # JavaScriptファイルのディレクトリ
├── mac                              # macOS関連のディレクトリ
└── ...

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

1. VSCodeでリモート接続している状態で、以下のコマンドで`app`ディレクトリに移動する。

    ```sh
    $ cd app
    ```

2. ビルド対象環境に合わせて以下のいずれかのコマンドを実行することで、`html`ディレクトリ配下にビルドされたものが出力される。

    ```sh
    // 開発環境用ビルドコマンド
    $ npm run build:dev
    ```
    ```sh
    // 本番環境用ビルドコマンド
    $ npm run build:prod
    ```

### 3.2. 実行方法

※ デフォルトでコンテナ立ち上げ時にアプリケーションを実行するようになっているため、手動で実行する場合のみ以下のコマンドを実行する。

1. VSCodeでリモート接続している状態で、以下のコマンドを実行する。

    ```sh
    $ cd app // appディレクトリに移動
    $ npm run dev
    ```

## 4. ライブラリ

- ライセンスはMIT、BSD、Apatche-2.0のものを使用する。

### 4.1. JavaScript

| ライブラリ名 | バージョン | 用途 | ライセンス |  参考 | 補足 |
| --- | --- | --- | --- | --- | --- |
| axios | ^1.7.2| ログイン、コンテンツダウンロードなど | MIT | [Axios API](https://axios-http.com/docs/api_intro) |  |
| react-i18next | ^15.0.0 | Reactアプリケーションにi18nextを統合し、多言語対応を簡単に実装するため | MIT | [react-i18next Introduction](https://react.i18next.com/) |  |
| i18next | ^23.12.2 | アプリケーション全体で国際化とローカライズを管理し、複数の言語に対応するため | MIT | [i18next Introduction](https://www.i18next.com/) |  |
| jotai | ^2.9.0 | Reactアプリケーションのための状態管理ライブラリで、コンポーネント間の状態共有を容易にするため | MIT | [Jotai](https://jotai.org/) |  |
| next-auth | ^4.24.7 | ログイン機能を実装するため | ISC | [NextAuth.js](https://next-auth.js.org/) |  |
| @uiw/react-md-editor | ^4.0.4 | マークダウンエディタを実装するため | MIT | [react-md-editor](https://uiwjs.github.io/react-md-editor/) |  |

### 4.2. DB
| prisma | ^5.17.0 | DBとの接続を行うため | Apatche-2.0 | [Prisma](https://www.prisma.io/) |  |
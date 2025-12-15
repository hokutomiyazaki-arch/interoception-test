# 内受容覚テスト (Interoceptive Awareness Test)

## 概要

Schandry法（1981）に基づく心拍知覚精度テストのPWAアプリケーションです。スマートフォンのカメラを使用して脈拍を測定し、ユーザーが主観的に感じた心拍数と比較することで、内受容感覚（Interoceptive Awareness）を評価します。

### 特徴

- 🔌 **完全オフライン対応**: 一度インストールすればネット不要
- 🔄 **自動キャッシュ更新**: 新バージョンを自動検出
- 📱 **ネイティブアプリ風**: アプリストア不要で配布可能
- 🖥️ **クロスプラットフォーム**: iOS/Android/PC対応
- ⚡ **容量軽量**: 数MBで高速動作

---

## 神経科学的背景

### 内受容覚（Interoception）とは

内受容覚は、心拍、呼吸、空腹感、体温など、体内の生理的状態を感知する能力です。この感覚は**島皮質（Insular Cortex）**が中心的役割を担っており、以下の機能に関与しています：

- 感情認識と調整
- 身体的自己認識
- 意思決定
- 共感能力

### Schandry法

Rainer Schandry（1981）が開発した心拍知覚課題は、内受容感覚を評価する標準的な方法として広く使用されています。

#### 算出式（心拍知覚精度スコア: IAc）

```
IAc = (1/n) × Σ(1 - |実測心拍数 - 申告心拍数| / 実測心拍数)
```

- **値の範囲**: 0〜1
- **1に近いほど**: 内受容感覚が鋭敏

### スコアの解釈

| スコア | 評価 |
|--------|------|
| 0.85以上 | 非常に優れた内受容感覚 |
| 0.70-0.84 | 良好な内受容感覚 |
| 0.50-0.69 | 平均的な内受容感覚 |
| 0.50未満 | 改善の余地あり |

---

## 使用方法

### テスト手順

1. **準備**: 座位で静止し、リラックスします
2. **カメラ設定**: 指先をスマホのカメラに軽く押し当てます
3. **キャリブレーション**: 5秒間の調整を行います
4. **測定**: 目を閉じて心拍を数えます（25-45秒 × 複数回）
5. **入力**: 感じた心拍数を入力します
6. **結果**: IAcスコアと評価が表示されます

### 注意事項

- 測定中は目を閉じて心拍に集中してください
- 指先はカメラにしっかりと当ててください
- 静かな環境で行うと精度が向上します

---

## GitHub Pagesへのデプロイ

### 必要なファイル

リポジトリに以下のファイルをアップロードしてください：

```
repository/
├── index.html
├── manifest.json
├── sw.js
├── FNT512.png          # 白背景ロゴ（512x512px）
├── FNT512-transparent.png  # 透明背景ロゴ（512x512px）
└── README.md
```

### ロゴファイルの準備

1. **FNT512.png**: 白背景のFNTロゴ（ホーム画面アイコン用）
2. **FNT512-transparent.png**: 透明背景のFNTロゴ（アプリ内ヘッダー用）

### デプロイ手順

1. GitHubでリポジトリを作成
2. 上記ファイルをプッシュ
3. Settings → Pages → Source: "main" branch
4. 公開URLが生成されます

---

## 参考文献

1. Schandry R. (1981). Heart beat perception and emotional experience. *Psychophysiology*, 18(4), 483-488.

2. Garfinkel SN, Seth AK, Barrett AB, Suzuki K, Critchley HD. (2015). Knowing your own heart: Distinguishing interoceptive accuracy from interoceptive awareness. *Biological Psychology*, 104, 65-74.

3. Craig AD. (2009). How do you feel — now? The anterior insula and human awareness. *Nature Reviews Neuroscience*, 10(1), 59-70.

---

## ライセンス

© 2025 Functional Neuro Training. All rights reserved.

---

## 技術仕様

- **PPG測定**: カメラによる光電容積脈波（Photoplethysmography）
- **フレームワーク**: Vanilla JavaScript
- **PWA**: Service Worker + Web App Manifest
- **音声**: Web Audio API

### 対応ブラウザ

- Chrome (Android/iOS/Desktop)
- Safari (iOS/macOS)
- Firefox
- Edge
- Samsung Internet

---

## お問い合わせ

問題やフィードバックは、GitHubのIssuesでお知らせください。

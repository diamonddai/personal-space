# 戴子淳个人动态网页

这是一个无需安装依赖的静态个人网站，可在浏览器中直接打开 `index.html`，也可部署到 GitHub Pages。

## 已实现

- 根据两张写真与卡通 IP 参考重新设计的潮玩式 3D 人物：夸张大眼睛、黑发发髻、红色蝴蝶结、墨镜及红黑皮衣。
- 米白红黑封面、上方五张弧形票券、中央大人物；开场前跃与回落动画、跳过与重播、卡片悬停联动和详情面板过渡。
- 教育、工作、GitHub 项目、奖项、个人生活五个栏目。
- 四个当前公开仓库的独立链接和介绍：MetaMuse（ideation-v2）、VisPrism、Revisio、diamonddai.github.io。
- 手机布局、键盘操作、Esc 关闭、焦点返回、浏览器返回与详情深链接。
- 动效暂停开关和系统减少动态效果设置支持。

人物为带透明通道的 3D 风格渲染图片，不是可旋转、带骨骼动画的 GLB 模型。页面没有后端，所有内容在本地文件中维护，无需在网页中配置密钥。项目列表是制作时核实后的内容快照，不会自动同步 GitHub。

## 文件

- `index.html`：首页结构。
- `styles.css`：配色、排版、手机样式、动画。
- `content.js`：教育经历、GitHub 主页、各项目标题、简介、标签和链接。
- `app.js`：栏目详情内容与交互。
- `assets/character-v2.png`：第二版生成的角色素材；`assets/character.png` 为第一版留存素材。
- `assets/portrait.jpg`：个人生活栏目中的写真。

## 本地预览

可以双击 `index.html`。也可以在本目录运行：

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

然后访问 http://127.0.0.1:4173 。

## GitHub Pages 发布

你的 `diamonddai.github.io` 仓库已经包含另一个项目。本交付未修改或覆盖它。建议先使用新的 `personal-space` 仓库预览新版：

1. 在 GitHub 创建 `personal-space` 仓库。
2. 将本目录的文件上传到仓库根目录，保留 `assets` 文件夹。
3. 在仓库 Settings → Pages 中选择 Deploy from a branch。
4. 选择 `main` 分支、`/ (root)` 目录，保存。
5. 等待 GitHub Pages 部署完成，以设置页显示的网址为准。此命名方式通常对应 `https://diamonddai.github.io/personal-space/`。

所有资源使用相对路径，支持项目子目录部署。详情使用 URL hash，因此刷新 `#projects` 等地址无需服务器路由配置。

官方说明：https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

## 内容来源与核对

教育、工作、奖项和兴趣依据用户提供的 `戴子淳简历2.docx` 整理。博士时间显示为“2023 — 至今”，未将简历中的 2027 视为已经毕业。网页未包含简历中的电话号码、微信、生日和邮箱。

公开仓库于 2026-09-19 重新核对，简介依据各仓库当前 README：

- https://github.com/diamonddai/ideation-v2 ：MetaMuse，隐喻可视化构思。
- https://github.com/diamonddai/visprism ：VisPrism，机构设计知识驱动的可视化探索。
- https://github.com/diamonddai/revisio ：可视化传播中的叙事框架变化模拟。
- https://github.com/diamonddai/diamonddai.github.io ：保留现有 persona Web 项目。

已移除不再出现在当前公开仓库列表中的视频检测、博客和 Ant Design 条目。页面列表为核对后的快照，不自动连接 GitHub API。

## 旅行影集

从“个人生活 → 旅行影集”进入 `travel.html`。参考用户提供的影集截图制作：黑底、大号衬线文字、空心 ROLLS 标题、地点编号、横向照片条。小红书链接未能直接读取，截图是布局依据。

三个章节按用户文件夹年份标注：西塘（2023）4 张、日本（2025）2 张、马尔代夫（2026）3 张。照片说明为根据照片画面拟写的简短标题，不代表原文件自带描述。网页采用 WebP 缩略图和大图，修正 EXIF 方向，未复制定位等 EXIF 元数据；原始照片未改动。

`travel-data.js` 维护地点、年份、照片路径和标题。`travel.css` 和 `travel.js` 控制影集与照片查看器。支持照片展开、前后切换、章节缩略图、键盘方向键、Esc 关闭和手机左右滑动。后续增加照片时更新 `travel-data.js` 及首页影集数量文案即可。

第二版参考了用户补充的飞书文档 https://my.feishu.cn/docx/T4Ved9tczo0P9RxfW88cFEpVn0c 中的封面构图与交互描述。开场是网页变换动画，并非视频或骨骼动画；悬停是人物位移、倾斜及文字响应，未实现独立眼神表情状态图切换。

## 制作流程

参考图和写真 → imagegen 生成角色素材 → HTML/CSS/JavaScript 实现页面和交互 → 接入简历与公开仓库 → 浏览器桌面/手机验证 → GitHub Pages 发布。

这套流程无需额外安装 skill。已有 imagegen 用于形象制作；网页采用可直接维护的标准静态文件。

# NoodleUz Website with Decap CMS

乌兹别克斯坦泡面厂商官方网站，使用 Decap CMS 进行内容管理。

## 项目结构

```
noodleuz-website/
├── index.html              # 首页
├── admin/
│   ├── index.html          # CMS 后台入口
│   └── config.yml          # CMS 配置
├── assets/
│   ├── css/
│   │   └── style.css       # 样式文件
│   ├── js/
│   │   └── main.js         # 脚本文件
│   └── images/             # 图片资源
├── content/
│   ├── products/           # 产品内容
│   │   ├── beef-noodle.yml
│   │   ├── spicy-chicken.yml
│   │   ├── shrimp.yml
│   │   └── vegetable.yml
│   ├── site/               # 站点配置
│   │   └── settings.yml
│   └── translations/       # 多语言翻译
│       ├── uz.json
│       ├── ru.json
│       └── en.json
└── README.md
```

## 技术栈

- **前端**: 纯 HTML + CSS + JavaScript
- **CMS**: Decap CMS (开源)
- **版本控制**: GitHub
- **托管**: Netlify (免费)

## 部署步骤

### 1. 创建 GitHub 仓库

```bash
# 在 GitHub 创建新仓库
# 仓库地址示例: https://github.com/YOUR_USERNAME/noodleuz-website
```

### 2. 连接到 Netlify

1. 登录 [Netlify](https://app.netlify.com)
2. 点击 "Add new site" → "Import an existing project"
3. 选择 "GitHub" 并授权
4. 选择你的仓库
5. 构建设置：
   - Build command: (留空)
   - Publish directory: `.`
6. 点击 "Deploy site"

### 3. 启用 Identity 和 Git Gateway

1. 在 Netlify 后台，进入 Site Settings
2. 找到 "Identity" → 点击 "Enable Identity"
3. Registration: 选择 "Invite only"
4. 滚动到 "Services" → 启用 "Git Gateway"
5. 回到 Identity 页面，点击 "Invite users" 添加管理员

### 4. 访问 CMS 后台

```
https://your-site-name.netlify.app/admin/
```

使用你邀请的邮箱登录即可管理内容。

## 使用说明

### 更新产品信息

1. 访问 `/admin/`
2. 点击 "Products" 集合
3. 选择要编辑的产品
4. 修改内容后点击 "Publish"
5. 网站会自动更新

### 更新公司信息

1. 访问 `/admin/`
2. 点击 "Site Settings"
3. 编辑公司名称、地址、联系方式等
4. 点击 "Publish"

### 上传产品图片

1. 访问 `/admin/`
2. 点击 "Media" 选项卡
3. 拖拽或选择图片上传
4. 图片会存储在 `assets/images/` 目录

## 多语言管理

网站支持三种语言：
- 乌兹别克语 (UZ)
- 俄语 (RU)
- 英语 (EN)

在 CMS 后台的 "Translations" 部分，可以为每种语言编辑对应的翻译内容。

## 本地开发

```bash
# 克隆仓库
git clone https://github.com/YOUR_USERNAME/noodleuz-website.git
cd noodleuz-website

# 本地预览（需要服务器）
npx serve .
# 或
python -m http.server 8000
```

## 成本说明

| 服务 | 费用 |
|------|------|
| GitHub 私有仓库 | 免费 |
| Netlify 托管 | 免费（100GB带宽/月） |
| Decap CMS | 开源免费 |
| 域名 | $10-20/年（可选） |

**总计: $0/月** (不含域名)

## 技术支持

- [Decap CMS 文档](https://decapcms.org/docs/)
- [Netlify 文档](https://docs.netlify.com/)
- [GitHub Pages 文档](https://docs.github.com/pages)

---

© 2024 NoodleUz. All rights reserved.
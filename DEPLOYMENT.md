# 🚀 Decap CMS + GitHub + Netlify 部署指南

完整的乌兹别克斯坦泡面厂商网站部署教程。

---

## 📋 准备工作

### 需要的账号

| 服务 | 用途 | 费用 |
|------|------|------|
| **GitHub** | 代码仓库 | 免费 |
| **Netlify** | 网站托管 | 免费 |
| **域名商（可选）** | 自定义域名 | $10-20/年 |

### 预计完成时间

- 首次部署：15-20分钟
- 后续更新：即时生效

---

## 📦 第一步：创建 GitHub 仓库

### 1.1 创建新仓库

1. 登录 [GitHub](https://github.com)
2. 点击右上角 `+` → `New repository`
3. 填写信息：
   - **Repository name**: `noodleuz-website`
   - **Description**: `乌兹别克斯坦泡面厂商官方网站`
   - **Visibility**: ✅ Public（公开仓库）
   - ❌ 不要勾选 "Add a README file"（我们会自己上传）
4. 点击 `Create repository`

### 1.2 上传代码

**方法A：使用 GitHub Desktop（推荐新手）**

1. 下载 [GitHub Desktop](https://desktop.github.com)
2. 安装后登录你的 GitHub 账号
3. 打开软件 → `File` → `Add local repository`
4. 选择文件夹：`C:\Users\sugon\Desktop\noodleuz-website`
5. 点击 `Create repository`
6. 点击 `Publish repository`
   - ✅ 勾选 "Keep this code private"（如果想要私有仓库）
7. 点击 `Publish repository`

**方法B：使用 Git 命令行**

```bash
cd C:\Users\sugon\Desktop\noodleuz-website

# 初始化仓库
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: NoodleUz website with Decap CMS"

# 添加远程仓库（替换 YOUR_USERNAME）
git remote add origin https://github.com/YOUR_USERNAME/noodleuz-website.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

---

## 🌐 第二步：连接 Netlify

### 2.1 登录 Netlify

1. 访问 [Netlify](https://app.netlify.com)
2. 点击 `Sign up` → 选择 `GitHub` 登录
3. 授权 Netlify 访问你的 GitHub

### 2.2 创建新站点

1. 点击 `Add new site` → `Import an existing project`
2. 选择 `GitHub`
3. 找到并选择 `noodleuz-website` 仓库
4. 配置构建设置：
   - **Branch**: `main`
   - **Build command**: 留空
   - **Publish directory**: `.`
5. 点击 `Deploy site`

### 2.3 等待部署

- 通常 1-2 分钟完成
- 完成后会得到一个临时域名，如：`https://random-name-12345.netlify.app`

---

## 🔐 第三步：启用 Identity 和 Git Gateway

### 3.1 启用 Identity

1. 在 Netlify 后台，点击你的站点
2. 进入 `Site settings` → `Identity`
3. 点击 `Enable Identity`
4. 配置 Registration：
   - 选择 `Invite only`（仅限邀请）
5. 点击 `Save`

### 3.2 启用 Git Gateway

1. 在 Identity 页面，滚动到 `Services`
2. 找到 `Git Gateway`
3. 点击 `Enable Git Gateway`

### 3.3 添加管理员

1. 回到 Identity 主页
2. 点击 `Invite users`
3. 输入管理员的邮箱地址
4. 点击 `Send`

管理员会收到邮件，点击链接设置密码后即可登录 CMS。

---

## ✍️ 第四步：使用 CMS 后台

### 4.1 访问后台

```
https://your-site-name.netlify.app/admin/
```

### 4.2 登录

使用你邀请的邮箱和设置的密码登录。

### 4.3 常用操作

#### 添加新产品

```
Products → New Product
→ 填写产品名称（三语）
→ 选择分类
→ 上传产品图片
→ 填写重量、保质期
→ 点击 Publish
```

#### 更新公司信息

```
Site Settings → General Settings
→ 编辑公司名称、地址、联系方式
→ 点击 Publish
```

#### 上传图片

```
Media → Upload
→ 拖拽或选择图片
→ 图片会自动保存到 GitHub
```

---

## 🌍 第五步：绑定自定义域名（可选）

### 5.1 购买域名

推荐域名：
- `noodleuz.uz`（本地信任度高）
- `noodleuz.com`（国际化）

域名注册商：
- [Namecheap](https://namecheap.com)（国际）
- [Reg.ru](https://reg.ru)（俄罗斯/独联体地区）
- 乌兹别克斯坦本地域名商

### 5.2 配置域名

1. 在 Netlify 后台进入 `Domain settings`
2. 点击 `Add custom domain`
3. 输入你的域名（如 `noodleuz.uz`）
4. 按提示在域名商后台添加 DNS 记录：
   ```
   类型: A
   名称: @
   值: 75.2.60.5
   
   类型: CNAME
   名称: www
   值: your-site.netlify.app
   ```
5. 等待 DNS 生效（通常几分钟到几小时）

### 5.3 启用 HTTPS

- Netlify 自动提供免费 SSL 证书
- 在 Domain settings 中点击 `Verify DNS configuration`
- 启用 `HTTPS`

---

## 📱 第六步：测试与发布

### 6.1 测试清单

- [ ] 网站能正常访问
- [ ] 语言切换正常工作
- [ ] 产品图片正确显示
- [ ] 表单能正常提交
- [ ] CMS 后台能正常登录
- [ ] 内容更新能即时生效

### 6.2 性能优化

已内置优化：
- ✅ 响应式设计（适配手机/平板/电脑）
- ✅ 图片懒加载
- ✅ CSS/JS 文件压缩
- ✅ 浏览器缓存设置
- ✅ 全球 CDN 加速（Netlify 提供）

---

## 📊 成本明细

| 项目 | 费用 |
|------|------|
| GitHub 仓库 | 免费 |
| Netlify 托管 | 免费（100GB 带宽/月） |
| Decap CMS | 开源免费 |
| 自定义域名 | $10-20/年 |
| **总计** | **$0/月**（不含域名） |

---

## 🔧 常见问题

### Q: CMS 登录后提示 "Permission denied"

**A:** 确保你的邮箱已通过 Identity 邀请，并且状态为 "Confirmed"。

### Q: 修改内容后网站没有更新

**A:** 检查 Netlify 的 Deploy 日志。内容更新会触发自动部署，通常需要 1-2 分钟。

### Q: 如何添加更多管理员？

**A:** Netlify 后台 → Identity → Invite users，输入新管理员的邮箱。

### Q: 如何修改后台配色？

**A:** 编辑 `admin/index.html` 中的 CSS 样式。

### Q: 如何备份数据？

**A:** 所有数据存储在 GitHub 仓库，可以使用 Git 克隆备份，或下载仓库 ZIP 文件。

---

## 📚 相关资源

- [Decap CMS 官方文档](https://decapcms.org/docs/)
- [Netlify 文档](https://docs.netlify.com/)
- [GitHub 帮助](https://docs.github.com/)

---

## 🆘 获取帮助

如果遇到问题：

1. 查看 Netlify 的 Deploy logs
2. 检查浏览器控制台是否有错误
3. 参考 Decap CMS 故障排除指南
4. 联系技术支持

---

**恭喜！你的网站已经成功部署！** 🎉
# 如何更新网站 / How to update the website

这份说明写给王冬梅。ChatGPT 改好文件后，按这里的步骤把文件放回 GitHub，网站就会自动更新。

This is a step-by-step guide for putting files back into GitHub after ChatGPT has
edited them. GitHub republishes the site automatically, usually within a minute.

---

# 中文说明

## 一、替换文字文件（网页、样式）

这是最常见的情况。ChatGPT 给您一个 zip 文件，里面是改好的网页文件。

1. 下载 ChatGPT 给的 zip 文件。
2. **双击** zip 文件，它会自动解压成一个文件夹（Windows 和 Mac 都自带此功能，不需要安装软件）。
3. 打开浏览器，进入您的 GitHub 仓库页面。
4. 如果文件在 `assets` 文件夹里（例如 `styles.css` 或 `main.js`），先点击进入对应文件夹：
   先点 `assets`，再点 `css` 或 `js`。网页文件（`.html`）在最外层，不用点进任何文件夹。
5. 点击右上角的 **Add file** 按钮，选择 **Upload files**。
6. 把解压出来的文件拖进页面中间的方框里。
7. 向下滚动，点击绿色的 **Commit changes** 按钮。

**文件名必须完全一样**，包括大小写和后缀（`.html`、`.css`、`.js`）。名字一样就会替换旧文件；
名字不一样就会多出一个没用的文件，网站不会更新。

## 二、上传图片（赞助商标识、活动海报等）

图片不在 ChatGPT 项目里，需要您自己放进 GitHub。步骤和上面一样，只是文件夹不同。

- **赞助商标识** 放在：`assets` → `img` → `sponsors`
- **其他图片**（海报、二维码、照片）放在：`assets` → `img`

具体做法：

1. 在 GitHub 仓库页面，点击 `assets`，再点击 `img`，如果是赞助商标识就再点 `sponsors`。
2. 确认页面上方显示的路径是对的，例如 `仓库名 / assets / img / sponsors`。
3. 点击 **Add file** → **Upload files**，把图片拖进去。
4. 向下滚动，点击 **Commit changes**。

**文件名要和 ChatGPT 告诉您的完全一致。** 例如它说文件要叫 `frontage.png`，
那就必须是 `frontage.png`，不能是 `Frontage.png` 或 `frontage.PNG`。

不确定文件名或文件夹时，直接问 ChatGPT："这个图片应该叫什么名字，放在哪个文件夹？"

## 三、上传后检查

1. 等大约一分钟。
2. 打开网站，按 **Ctrl+F5**（Mac 上按 **Command+Shift+R**）强制刷新。
   这一步很重要：浏览器会记住旧版本，不强制刷新的话，看起来会像是没有更新成功。
3. 点击页面右上角的 **中文 / English** 按钮，两种语言都看一下。

## 四、出错了怎么办

- **图片没显示出来**：多半是文件名或文件夹不对。网站是能容错的，赞助商标识如果找不到，
  会自动显示公司名字，不会出现破损的图片。重新用正确的名字上传一次即可。
- **传错文件夹了**：不会造成破坏。用正确的路径再传一次，多余的那个文件可以不管，
  或者请人帮忙删掉。
- **想撤销改动**：GitHub 会保存每一个版本。点开那个文件，再点 **History**，
  就能看到以前的版本并恢复。
- **实在弄不清楚**：把情况告诉 ChatGPT，或者找 Catherine 帮忙。网站不会因为一次上传出错而损坏。

---

# English

## 1. Replacing text files (pages, stylesheet, script)

1. Download the zip ChatGPT gives you.
2. **Double-click** it to unzip. Windows and Mac both do this built in.
3. Open your repository on GitHub.
4. If the file belongs in a subfolder, click into it first: `assets` then `css`, or
   `assets` then `js`. The `.html` pages live at the top level, so no clicking needed.
5. Click **Add file** at the top right, then **Upload files**.
6. Drag the unzipped file into the box.
7. Scroll down and click the green **Commit changes**.

**The filename must match exactly**, including capitalization and the extension. A
matching name replaces the old file. A different name leaves a stray file behind and
the site does not change.

## 2. Uploading an image

Images are not in the ChatGPT project, so you add them to GitHub yourself. Same
steps, different folder.

- **Sponsor logos** go in `assets` → `img` → `sponsors`
- **Everything else** (flyers, QR codes, photographs) goes in `assets` → `img`

Click into the folder first, check the path shown across the top of the page reads
something like `repository / assets / img / sponsors`, then **Add file** →
**Upload files**, drag it in, and **Commit changes**.

Use the exact filename ChatGPT gives you, lowercase and all. If you are unsure, ask
it: "What should this image be called, and which folder does it go in?"

## 3. After uploading

Wait about a minute, open the site, and hard-refresh with **Ctrl+F5** (or
**Command+Shift+R** on a Mac). Browsers cache the old version, and skipping this
step looks exactly like a failed upload. Then check the page in both languages using
the 中文 / English button.

## 4. If something goes wrong

- **An image does not appear:** almost always the filename or folder. Nothing is
  broken. A missing sponsor logo shows the company's name as text instead of a broken
  image. Just upload again with the right name.
- **Uploaded to the wrong folder:** harmless. Upload again to the right one; the
  stray file can be ignored or deleted later.
- **To undo a change:** GitHub keeps every version. Open the file, click **History**,
  and you can view and restore an earlier one.
- **Stuck:** describe what happened to ChatGPT, or ask Catherine. A bad upload cannot
  permanently damage the site.

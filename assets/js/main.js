// ========== 内容数据加载器 ==========
let currentLang = 'en';
let sections = {};  // 按板块存储数据

// 默认表情包（图片为空时显示）
const defaultEmojis = {
    logo: '🍜',
    hero_product: '🍜',
    feature_factory: '🏭',
    feature_rd: '👨‍🔬',
    feature_oem: '📦',
    feature_export: '🌍',
    quality_raw: '🌾',
    quality_lab: '🔬',
    quality_prod: '⚙️',
    b2b_moq: '💼',
    b2b_oem: '🎨',
    b2b_export: '🚢',
    b2b_price: '💰',
    contact_location: '📍',
    contact_phone: '📞',
    contact_hours: '🕐',
    product_generic: '🍜'
};

// ========== 加载所有板块数据 ==========
async function loadSections() {
    const sectionFiles = ['navigation', 'hero', 'about', 'quality', 'b2b', 'contact', 'footer'];
    const promises = sectionFiles.map(async name => {
        try {
            const res = await fetch(`content/sections/${name}.json`);
            if (res.ok) sections[name] = await res.json();
        } catch (e) {
            console.log(`Section "${name}" load failed, using defaults`);
        }
    });
    await Promise.all(promises);
    renderAllSections();
    applyImagesFromSections();
}

// ========== 渲染所有板块 ==========
function renderAllSections() {
    const L = currentLang;

    // --- Navigation ---
    const nav = sections.navigation;
    if (nav) {
        setText('brand_name', nav.brand_name);
        setText('nav_about', nav[`nav_about_${L}`]);
        setText('nav_products', nav[`nav_products_${L}`]);
        setText('nav_quality', nav[`nav_quality_${L}`]);
        setText('nav_b2b', nav[`nav_b2b_${L}`]);
        setText('nav_contact', nav[`nav_contact_${L}`]);
        setText('nav_cta', nav[`nav_cta_${L}`]);
    }

    // --- Hero ---
    const hero = sections.hero;
    if (hero) {
        setText('hero_badge', hero[`badge_${L}`]);
        setText('hero_title', hero[`title_${L}`]);
        setText('hero_desc', hero[`desc_${L}`]);
        setText('hero_btn1', hero[`btn1_${L}`]);
        setText('hero_btn2', hero[`btn2_${L}`]);
        setText('stat1_number', hero.stat1_num);
        setText('stat1_label', hero[`stat1_label_${L}`] || hero.stat1_label_en);
        setText('stat2_number', hero.stat2_num);
        setText('stat2_label', hero[`stat2_label_${L}`] || hero.stat2_label_en);
        setText('stat3_number', hero.stat3_num);
        setText('stat3_label', hero[`stat3_label_${L}`] || hero.stat3_label_en);
        setText('badge1_text', hero[`fbadge1_${L}`] || hero.fbadge1_en);
        setText('badge2_title', hero[`fbadge2_title_${L}`] || hero.fbadge2_title_en);
        setText('badge2_text', hero[`fbadge2_text_${L}`] || hero.fbadge2_text_en);
        setText('badge3_title', hero[`fbadge3_title_${L}`] || hero.fbadge3_title_en);
        setText('badge3_text', hero[`fbadge3_text_${L}`] || hero.fbadge3_text_en);
    }

    // --- About ---
    const about = sections.about;
    if (about) {
        setText('about_year', about.founded_year);
        setText('about_badge_label', about[`established_${L}`] || about.established_en);
        setText('about_title', about[`title_${L}`]);
        setText('about_p1', about[`p1_${L}`]);
        setText('about_p2', about[`p2_${L}`]);
        for (let i = 1; i <= 4; i++) {
            setText(`feature${i}_title`, about[`feature${i}_title_${L}`] || about[`feature${i}_title_en`]);
            setText(`feature${i}_desc`, about[`feature${i}_desc_${L}`] || about[`feature${i}_desc_en`]);
        }
    }

    // --- Products Section Header ---
    setText('products_label', L === 'en' ? 'Products' : L === 'uz' ? 'Mahsulotlar' : 'Продукция');
    setText('products_title', L === 'en' ? 'Diverse Product Portfolio' : L === 'uz' ? 'Xilma-xil mahsulotlar' : 'Разнообразная продукция');
    setText('products_desc', L === 'en' ? 'From classic beef flavor to innovative spicy series, meeting different market demands' : '');

    // --- Quality ---
    const quality = sections.quality;
    if (quality) {
        setText('quality_label', quality[`label_${L}`] || quality.label_en);
        setText('quality_title', quality[`title_${L}`] || quality.title_en);
        setText('quality_desc', quality[`desc_${L}`] || quality.desc_en);
        for (let i = 1; i <= 3; i++) {
            setText(`quality${i}_title`, quality[`card${i}_title_${L}`] || quality[`card${i}_title_en`]);
            setText(`quality${i}_desc`, quality[`card${i}_desc_${L}`] || quality[`card${i}_desc_en`]);
        }
        // 认证资质渲染
        if (quality.certifications && quality.certifications.length > 0) {
            const certContainer = document.querySelector('.certifications');
            if (certContainer) {
                const certNames = {
                    'HALAL': L === 'en' ? 'Halal Certified' : L === 'uz' ? 'HALAL Sertifikatlangan' : 'Сертификат Халяль',
                    'ISO 22000': L === 'en' ? 'Food Safety Mgmt' : L === 'uz' ? 'Oziq-ovqat Xavfsizlik Boshqaruvi' : 'Управление безопасностью',
                    'HACCP': L === 'en' ? 'Hazard Analysis' : L === 'uz' ? 'Xavf Tahlili' : 'Анализ опасностей',
                    'GMP': L === 'en' ? 'Production Quality' : L === 'uz' ? 'Ishlab Chiqarish Sifati' : 'Качество производства'
                };
                certContainer.innerHTML = quality.certifications.map(c => `
                    <div class="cert-item">
                        <div class="cert-badge">${c.code}</div>
                        <span class="cert-name">${certNames[c.code] || c.name}</span>
                    </div>
                `).join('');
            }
        }
    }

    // --- B2B ---
    const b2b = sections.b2b;
    if (b2b) {
        setText('b2b_title', b2b[`title_${L}`] || b2b.title_en);
        setText('b2b_intro', b2b[`intro_${L}`] || b2b.intro_en);
        for (let i = 1; i <= 4; i++) {
            setText(`benefit${i}_title`, b2b[`benefit${i}_title_${L}`] || b2b[`benefit${i}_title_en`]);
            setText(`benefit${i}_desc`, b2b[`benefit${i}_desc_${L}`] || b2b[`benefit${i}_desc_en`]);
        }
        setText('form_title', b2b[`form_title_${L}`] || b2b.form_title_en);
        setText('b2b_download', b2b[`download_${L}`] || b2b.download_en);
    }

    // --- Contact ---
    const contact = sections.contact;
    if (contact) {
        setText('contact_label', contact[`label_${L}`] || contact.label_en);
        setText('contact_title', contact[`title_${L}`] || contact.title_en);
        setText('contact_desc', contact[`desc_${L}`] || contact.desc_en);
        setText('contact1_title', contact[`contact1_title_${L}`] || contact.contact1_title_en);
        setText('contact1_desc', contact[`contact1_content_${L}`] || contact.contact1_content_en);
        setText('contact2_title', contact[`contact2_title_${L}`] || contact.contact2_title_en);
        setText('contact3_title', contact[`contact3_title_${L}`] || contact.contact3_title_en);
        // 联系方式
        const phoneEl = document.querySelector('.contact-card:nth-child(2) p');
        if (phoneEl && contact.phone) {
            phoneEl.innerHTML = `Phone: <a href="tel:${contact.phone}">${contact.phone}</a><br>WhatsApp: <a href="#">${contact.whatsapp}</a><br>Email: <a href="mailto:${contact.email}">${contact.email}</a>`;
        }
        setText('contact3_desc', contact[`hours_${L}`] || contact.hours_en);
    }

    // --- Footer ---
    const footer = sections.footer;
    if (footer) {
        setText('footer_desc', footer[`desc_${L}`] || footer.desc_en);
        setText('footer_bottom', footer[`bottom_${L}`] || footer.bottom_en);
        setText('footer_col1_title', footer[`col1_title_${L}`] || footer.col1_title_en);
        setText('footer_col2_title', footer[`col2_title_${L}`] || footer.col2_title_en);
        setText('footer_col3_title', footer[`col3_title_${L}`] || footer.col3_title_en);
        // 社交链接
        if (footer.social) {
            const socialLinks = document.querySelector('.social-links');
            if (socialLinks) {
                const icons = ['📱', '📘', '📸', '💬'];
                const urls = [footer.social.facebook, footer.social.instagram, footer.social.telegram, footer.social.whatsapp];
                socialLinks.innerHTML = urls.map((url, i) =>
                    url ? `<a href="${url}" class="social-link" target="_blank">${icons[i]}</a>` : `<span class="social-link">${icons[i]}</span>`
                ).join('');
            }
        }
    }

    // 更新语言属性和按钮状态
    document.documentElement.lang = L;
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === L);
    });

    const titles = {
        uz: "NoodleUz - O'zbekistonda sifatli la'mon",
        ru: "NoodleUz - Производитель качественной лапши в Узбекистане",
        en: "NoodleUz - Premium Noodle Manufacturer in Uzbekistan"
    };
    document.title = titles[L];
}

// 辅助函数：设置文本内容
function setText(key, value) {
    if (!value) return;
    const el = document.querySelector(`[data-content="${key}"]`);
    if (el) el.innerHTML = value;
}

// ========== 从板块数据应用图片 ==========
function applyImagesFromSections() {
    const nav = sections.navigation;
    const hero = sections.hero;
    const about = sections.about;
    const quality = sections.quality;
    const b2b = sections.b2b;
    const contact = sections.contact;

    // Logo
    applyImage('logo', nav?.logo_image, 'NoodleUz Logo');

    // Hero product
    applyImage('hero_product', hero?.hero_image, 'Noodle Product');

    // About factory image
    const factoryImg = document.querySelector('#factory-image img');
    if (factoryImg && about?.about_image) {
        factoryImg.src = about.about_image;
        factoryImg.alt = 'Factory';
        factoryImg.style.display = '';
    } else if (factoryImg && !about?.about_image) {
        // keep onerror placeholder
    }

    // About features
    applyImage('feature_factory', about?.feature1_image, 'Factory');
    applyImage('feature_rd', about?.feature2_image, 'R&D');
    applyImage('feature_oem', about?.feature3_image, 'OEM');
    applyImage('feature_export', about?.feature4_image, 'Export');

    // Quality cards
    applyImage('quality_raw', quality?.card1_image, 'Raw Materials');
    applyImage('quality_lab', quality?.card2_image, 'Lab');
    applyImage('quality_prod', quality?.card3_image, 'Production');

    // B2B benefits
    applyImage('b2b_moq', b2b?.benefit1_image, 'MOQ');
    applyImage('b2b_oem', b2b?.benefit2_image, 'OEM');
    applyImage('b2b_export', b2b?.benefit3_image, 'Export');
    applyImage('b2b_price', b2b?.benefit4_image, 'Pricing');

    // Contact cards
    applyImage('contact_location', contact?.contact1_image, 'Location');
    applyImage('contact_phone', contact?.contact2_image, 'Phone');
    applyImage('contact_hours', contact?.contact3_image, 'Hours');
}

// 应用单张图片或替换为表情包
function applyImage(key, src, alt) {
    const el = document.querySelector(`.site-image[data-image-key="${key}"]`);
    if (!el) return;
    if (src) {
        el.src = src;
        el.alt = alt;
        el.style.background = 'transparent';
        el.style.fontSize = '';
    } else {
        const emoji = defaultEmojis[key] || '📷';
        const span = document.createElement('span');
        span.className = el.className;
        span.setAttribute('data-image-key', key);
        span.setAttribute('data-emoji', emoji);
        span.textContent = emoji;
        el.parentNode.replaceChild(span, el);
    }
}

// ========== 产品数据 ==========
async function loadProducts() {
    try {
        const response = await fetch('content/products/index.json');
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        renderProducts(getDefaultProducts());
    }
}

function getDefaultProducts() {
    return [
        { id: "beef-noodle", emoji: "🍜", badge: { en: "Best Seller" }, category: { en: "Classic Series" }, name: { en: "Beef Flavor" }, description: { en: "Rich beef broth with selected vegetables" }, weight: "85g", shelf_life: "12 months" },
        { id: "spicy-chicken", emoji: "🌶️", category: { en: "Spicy Series" }, name: { en: "Spicy Chicken" }, description: { en: "Central Asian spices blend" }, weight: "90g", shelf_life: "12 months" },
        { id: "shrimp", emoji: "🦐", category: { en: "Seafood Series" }, name: { en: "Shrimp Flavor" }, description: { en: "Made from real shrimp powder" }, weight: "85g", shelf_life: "12 months" },
        { id: "vegetable", emoji: "🥬", badge: { en: "New" }, category: { en: "Healthy Series" }, name: { en: "Vegetable Grain Noodle" }, description: { en: "Added vegetable powder, non-fried" }, weight: "80g", shelf_life: "12 months" }
    ];
}

function getProductImage(product) {
    if (product.image) {
        return `<img src="${product.image}" alt="${product.name[currentLang] || product.name.en}">`;
    }
    return product.emoji || '🍜';
}

function renderProducts(products) {
    const container = document.getElementById('products-container');
    if (!container) return;
    container.innerHTML = products.map(p => `
        <div class="product-card">
            <div class="product-image">
                ${getProductImage(p)}
                ${p.badge ? `<span class="product-badge">${p.badge[currentLang] || p.badge.en}</span>` : ''}
            </div>
            <div class="product-info">
                <div class="product-category">${p.category[currentLang] || p.category.en}</div>
                <h3 class="product-name">${p.name[currentLang] || p.name.en}</h3>
                <p class="product-desc">${p.description[currentLang] || p.description.en}</p>
                <div class="product-specs">
                    <span class="product-spec">📦 ${p.weight}</span>
                    <span class="product-spec">📅 ${p.shelf_life}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// ========== 语言切换 ==========
function switchLanguage(lang) {
    currentLang = lang;
    renderAllSections();
    applyImagesFromSections();
    localStorage.setItem('preferred-language', lang);
}

// ========== UI 交互 ==========
// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
    }
});

// 语言切换按钮
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        switchLanguage(this.getAttribute('data-lang'));
    });
});

// 表单提交
document.getElementById('inquiry-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('Form submitted:', Object.fromEntries(new FormData(this)));
    alert('Thank you for your inquiry! We will contact you soon.');
    this.reset();
});

// ========== 初始化 ==========
document.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang) currentLang = savedLang;
    loadSections();
    loadProducts();
});

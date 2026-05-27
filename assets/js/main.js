// ========== 内容数据加载器 ==========
let currentLang = 'en';
let siteContent = {};
let siteImages = {};

// 加载内容数据
async function loadContent() {
    try {
        const response = await fetch('content/site/settings.json');
        siteContent = await response.json();
        updatePageContent();
    } catch (error) {
        console.log('Using default content');
        // 使用默认内容
        siteContent = getDefaultContent();
        updatePageContent();
    }
}


// 获取默认内容
function getDefaultContent() {
    return {
        en: {
            brand_name: "NoodleUz",
            nav_about: "About Us",
            nav_products: "Products",
            nav_quality: "Quality",
            nav_b2b: "Partnership",
            nav_contact: "Contact",
            nav_cta: "Get Quote",
            hero_badge: "HALAL Certified",
            hero_title: "Premium Noodle<br><span>Manufacturer</span> in Uzbekistan",
            hero_desc: "We produce high-quality instant noodles using premium ingredients and advanced technology, providing safe and delicious food solutions for the Central Asian market.",
            hero_btn1: "View Products",
            hero_btn2: "Become a Distributor",
            stat1_number: "15+",
            stat1_label: "Product Varieties",
            stat2_number: "50K+",
            stat2_label: "Daily Capacity (boxes)",
            stat3_number: "8",
            stat3_label: "Export Countries"
        },
        uz: {
            brand_name: "NoodleUz",
            nav_about: "Biz haqimizda",
            nav_products: "Mahsulotlar",
            nav_quality: "Sifat",
            nav_b2b: "Hamkorlik",
            nav_contact: "Aloqa",
            nav_cta: "So'rov yuborish",
            hero_badge: "HALAL sertifikati",
            hero_title: "O'zbekistonda<br><span>sifatli la'mon</span> ishlab chiqaruvchisi",
            hero_desc: "Biz yuqori sifatli tez tayyorlanadigan la'mon ishlab chiqaramiz.",
            hero_btn1: "Mahsulotlarni ko'rish",
            hero_btn2: "Distributorga aylan",
            stat1_number: "15+",
            stat1_label: "Mahsulot turlari",
            stat2_number: "50K+",
            stat2_label: "Kunlik quvvat (quti)",
            stat3_number: "8",
            stat3_label: "Eksport mamlakatlari"
        },
        ru: {
            brand_name: "NoodleUz",
            nav_about: "О нас",
            nav_products: "Продукция",
            nav_quality: "Качество",
            nav_b2b: "Сотрудничество",
            nav_contact: "Контакты",
            nav_cta: "Получить предложение",
            hero_badge: "Сертификат HALAL",
            hero_title: "Производитель<br><span>качественной лапши</span> в Узбекистане",
            hero_desc: "Мы производим высококачественную лапшу быстрого приготовления.",
            hero_btn1: "Смотреть продукцию",
            hero_btn2: "Стать дистрибьютором",
            stat1_number: "15+",
            stat1_label: "Видов продукции",
            stat2_number: "50K+",
            stat2_label: "Производство в день (коробок)",
            stat3_number: "8",
            stat3_label: "Стран экспорта"
        }
    };
}

// ========== 图片数据加载器 ==========
// 默认表情包（图片加载失败时显示）
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

// 加载图片数据
async function loadSiteImages() {
    try {
        const response = await fetch('content/images/index.json');
        const images = await response.json();
        
        // 构建 key -> image 映射
        images.forEach(img => {
            siteImages[img.key] = img;
        });
        
        applySiteImages();
    } catch (error) {
        console.log('Using default emoji icons');
        applySiteImages();
    }
}

// 应用图片到页面
function applySiteImages() {
    // 获取所有带 data-image-key 的图片元素
    const imageElements = document.querySelectorAll('.site-image[data-image-key]');
    
    imageElements.forEach(el => {
        const key = el.getAttribute('data-image-key');
        const imgData = siteImages[key];
        
        if (imgData && imgData.image) {
            // 使用 CMS 中的图片
            el.src = imgData.image;
            el.alt = imgData['alt_' + currentLang] || imgData.alt_en || '';
            el.style.display = 'inline-block';
        } else {
            // 使用默认表情包
            const emoji = defaultEmojis[key] || '📷';
            el.outerHTML = `<span class="${el.className}" data-image-key="${key}" data-emoji="${emoji}">${emoji}</span>`;
        }
    });
}

// 获取产品图片
function getProductImage(product) {
    if (product.image) {
        return `<img src="${product.image}" alt="${product.name[currentLang] || product.name.en}">`;
    }
    return product.emoji;
}

// 更新页面内容
function updatePageContent() {
    const langContent = siteContent[currentLang] || siteContent['en'];
    
    // 更新所有带有 data-content 属性的元素
    document.querySelectorAll('[data-content]').forEach(el => {
        const key = el.getAttribute('data-content');
        if (langContent[key]) {
            el.innerHTML = langContent[key];
        }
    });
    
    // 更新所有带有 data-placeholder 属性的元素
    document.querySelectorAll('[data-placeholder]').forEach(el => {
        const key = el.getAttribute('data-placeholder');
        if (langContent[key]) {
            el.placeholder = langContent[key];
        }
    });
    
    // 更新页面语言属性
    document.documentElement.lang = currentLang;
    
    // 更新按钮激活状态
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
    });
    
    // 更新页面标题
    const titles = {
        uz: "NoodleUz - O'zbekistonda ishlab chiqarilgan sifatli la'mon",
        ru: "NoodleUz - Производитель качественной лапши в Узбекистане",
        en: "NoodleUz - Premium Noodle Manufacturer in Uzbekistan"
    };
    document.title = titles[currentLang];
}

// 语言切换
function switchLanguage(lang) {
    currentLang = lang;
    updatePageContent();
    localStorage.setItem('preferred-language', lang);
}

// 加载产品数据
async function loadProducts() {
    try {
        const response = await fetch('content/products/index.json');
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.log('Using default products');
        renderProducts(getDefaultProducts());
    }
}

// 获取默认产品
function getDefaultProducts() {
    return [
        {
            id: "beef-noodle",
            emoji: "🍜",
            badge: { en: "Best Seller", uz: "Ommabop", ru: "Хит продаж" },
            category: { en: "Classic Series", uz: "Klassik seriya", ru: "Классическая серия" },
            name: { en: "Beef Flavor", uz: "Mol go'shti ta'mi", ru: "Говядина" },
            description: { 
                en: "Rich beef broth with selected vegetables, the timeless classic taste",
                uz: "Boy mol go'shti buloni, tanlangan sabzavotlar bilan",
                ru: "Насыщенный говяжий бульон с отборными овощами"
            },
            weight: "85g",
            shelf_life: "12 months"
        },
        {
            id: "spicy-chicken",
            emoji: "🌶️",
            badge: null,
            category: { en: "Spicy Series", uz: "Achchiq seriya", ru: "Острая серия" },
            name: { en: "Spicy Chicken", uz: "Achchiq tovuq ta'mi", ru: "Острая курица" },
            description: { 
                en: "Central Asian spices blend, spicy yet pleasant taste",
                uz: "O'rta Osiyo ziravorlari bilan",
                ru: "Сочетание среднеазиатских специй"
            },
            weight: "90g",
            shelf_life: "12 months"
        },
        {
            id: "shrimp",
            emoji: "🦐",
            badge: null,
            category: { en: "Seafood Series", uz: "Dengiz mahsulotlari", ru: "Морепродукты" },
            name: { en: "Shrimp Flavor", uz: "Qisqichbaqa ta'mi", ru: "Креветка" },
            description: { 
                en: "Made from real shrimp powder, rich and savory taste",
                uz: "Haqiqiy qisqichbaqa unidan tayyorlangan",
                ru: "Из настоящих креветок"
            },
            weight: "85g",
            shelf_life: "12 months"
        },
        {
            id: "vegetable",
            emoji: "🥬",
            badge: { en: "New", uz: "Yangi", ru: "Новинка" },
            category: { en: "Healthy Series", uz: "Sog'lom seriya", ru: "Здоровая серия" },
            name: { en: "Vegetable Grain Noodle", uz: "Sabzavotli arpa la'mon", ru: "Овощная зерновая лапша" },
            description: { 
                en: "Added vegetable powder, non-fried process, healthy low-fat choice",
                uz: "Ko'p sabzavotli un qo'shilgan, qovurilmagan",
                ru: "С добавлением овощного порошка, без обжарки"
            },
            weight: "80g",
            shelf_life: "12 months"
        }
    ];
}

// 渲染产品
function renderProducts(products) {
    const container = document.getElementById('products-container');
    if (!container) return;
    
    container.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                ${getProductImage(product)}
                ${product.badge ? 
                    `<span class="product-badge">${product.badge[currentLang] || product.badge.en}</span>` : 
                    ''}
            </div>
            <div class="product-info">
                <div class="product-category">${product.category[currentLang] || product.category.en}</div>
                <h3 class="product-name">${product.name[currentLang] || product.name.en}</h3>
                <p class="product-desc">${product.description[currentLang] || product.description.en}</p>
                <div class="product-specs">
                    <span class="product-spec">📦 ${product.weight}</span>
                    <span class="product-spec">📅 ${product.shelf_life}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
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

// 语言切换按钮事件
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        switchLanguage(this.getAttribute('data-lang'));
    });
});

// 表单提交
document.getElementById('inquiry-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    console.log('Form submitted:', data);
    alert('Thank you for your inquiry! We will contact you soon.');
    this.reset();
});

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    // 恢复上次选择的语言
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang) {
        currentLang = savedLang;
    }
    
    // 加载内容
    loadContent();
    loadSiteImages();
    loadProducts();
});

// 语言切换时更新图片 alt 文本
const originalSwitchLanguage = switchLanguage;
switchLanguage = function(lang) {
    currentLang = lang;
    updatePageContent();
    applySiteImages(); // 重新应用图片（更新 alt 文本）
    localStorage.setItem('preferred-language', lang);
};
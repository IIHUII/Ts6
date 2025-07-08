// ========================================
// FILES CONFIGURATION
// ========================================
const FILES_DATA = [
  {
    id: "Dark hub 1",
    name: "Dark Hub 1",
    type: "txt",
    size: "73KB",
    description: "سكربت سجاد بحث : deep or drak hub",
    downloads: "8",
    category: "سجاد",

  },
  {
    id: "Dark hub 2",
    name: "Dark hub 2",
    type: "lua",
    size: "87KB",
    downloads: "6",
    category: "سجاد",
  },
  {
    id: "Dark hub 3",
    name: "Dark hub 3",
    type: "txt",
    size: "78KB",
    description: "سكربت سجاد بحث : deep or drak hub",
    downloads: "4",
    category: "سجاد",
  },
  {
    id: "alfa",
    name: "الفا",
    type: "txt",
    size: "114KB",
    downloads: "5",
    description: "سكربت الفا بحث في الغيمه : الفا و alfa",
    category: "الفا",

  },
  {
    id: "zxe hub",
    name: "غالي",
    type: "txt",
    size: "64KB",
    description: "سكربت غالي تحت الصيانه البحث  : zxe hub",
    downloads: "8",
    category: "غالي",

  },
 {
    id: "zxe hub2",
    name: " 2 غالي",
    type: "txt",
    size: "64KB",
    description: "سكربت غالي تحت الصيانه البحث  : zxe hub",
    downloads: "8",
    category: "غالي",

  },
  {
    id: "khalefa1",
    name: "خليفه",
    type: "txt",
    size: "265KB",
    description: "سكربت خليفه البحث : خليفه",
    downloads: "8",
    category: "خليفه",
  },
  {
    id: "khalefa2",
    name: "2 خليفه" ,
    type: "txt",
    size: "265KB",
    description: "سكربت خليفه تبع النار البحث : ؟؟؟",
    downloads: "8",
    category: "خليفه",
  },
    {
    id: "khalefa3",
    name: "3 خليفه" ,
    type: "txt",
    size: "189KB",
    description: "سكربت خليفه البحث : خليفه",
    downloads: "8",
    category: "خليفه",
  },
   {
    id: "khalefa3",
    name: "3 خليفه" ,
    type: "txt",
    size: "189KB",
    description: "سكربت خليفه البحث : خليفه",
    downloads: "8",
    category: "خليفه",
  },
  {
    id: "khalefa4",
    name: "4 خليفه" ,
    type: "txt",
    size: "17KB",
    description: "سكربت خليفه البحث : خليفه",
    downloads: "8",
    category: "خليفه",
  },
   {
    id: "TNT",
    name: "TNT" ,
    type: "txt",
    size: "115KB",
    description: "سكربت تي ان تي بالبحث : TNT",
    downloads: "8",
    category: "TNT",
  },
];

let currentScript = null;
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('scriptsContainer');
  FILES_DATA.forEach(script => {
    const card = document.createElement('div');
    card.className = 'script-card';

    card.innerHTML = `
      <h3>${script.name}</h3>
      <p>${script.description}</p>
      <p><strong>الحجم:</strong> ${script.size} - <strong>تحميلات:</strong> ${script.downloads}</p>
      <button class="btn btn-preview" onclick="showScriptPreview('${script.id}')">
        <i class="fas fa-eye"></i> معاينة
      </button>
    `;
    container.appendChild(card);
  });
});


function showScriptPreview(scriptId) {
  const script = FILES_DATA.find(file => file.id === scriptId);
  if (!script) {
    alert("السكربت غير موجود");
    return;
  }

  const filePath = `scripts/${script.id}.txt`;
  currentScript = script;

  document.getElementById('scriptNamePreview').textContent = script.name;
  document.getElementById('scriptPreviewContent').textContent = 'جاري التحميل...';
  document.getElementById('previewModal').classList.add('active');

  fetch(filePath)
    .then(res => {
      if (!res.ok) throw new Error();
      return res.text();
    })
    .then(data => {
      document.getElementById('scriptPreviewContent').textContent = data;
    })
    .catch(err => {
      document.getElementById('scriptPreviewContent').textContent = '❌ فشل في تحميل المحتوى';
    });
}

function closePreview() {
  document.getElementById('previewModal').classList.remove('active');
  currentScript = null;
}

document.addEventListener('DOMContentLoaded', function () {

  renderScriptCards();


  document.getElementById('scripts-btn').addEventListener('click', function () {
    document.getElementById('scripts-section').scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('about-btn').addEventListener('click', function () {
    document.getElementById('about-section').scrollIntoView({ behavior: 'smooth' });
  });


  const hackerText = document.querySelector('.hacker-text');
  hackerText.style.width = '0';
  setTimeout(() => {
    hackerText.style.animation = 'typing 3s steps(40) forwards';
  }, 500);


  document.getElementById('scriptSearch').addEventListener('input', filterScripts);


  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      filterScripts();
    });
  });
});


function renderScriptCards() {
  const container = document.getElementById('scriptsContainer');
  container.innerHTML = '';

  FILES_DATA.forEach(script => {
    const card = document.createElement('div');
    card.className = 'script-card';
    card.setAttribute('data-name', script.name);
    card.setAttribute('data-category', script.category);
    card.setAttribute('onclick', `showScriptPreview('${script.id}')`);

    card.innerHTML = `
                    <div class="script-icon">
                        <i class="fas fa-file-code"></i>
                    </div>
                    <div class="script-name">${script.name}</div>
                    <div class="script-meta">
                        <span><i class="fas fa-download"></i> ${script.downloads}</span>
                        <span><i class="fas fa-hdd"></i> ${script.size}</span>
                    </div>
                    <div class="script-description">${script.description}</div>
                    <div class="link-status available">(الرابط متوفر)</div>
                    <div class="category-badge">${script.category}</div>
                `;

    container.appendChild(card);
  });
}


function filterScripts() {
  const searchTerm = document.getElementById('scriptSearch').value.toLowerCase();
  const activeCategory = document.querySelector('.category-btn.active').textContent;

  document.querySelectorAll('.script-card').forEach(card => {
    const name = card.getAttribute('data-name').toLowerCase();
    const category = card.getAttribute('data-category');
    const matchSearch = name.includes(searchTerm);
    const matchCategory = activeCategory === 'الكل' || category === activeCategory;

    card.style.display = (matchSearch && matchCategory) ? 'block' : 'none';
  });
}


function showNotification(type, message) {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);


  setTimeout(() => {
    notification.remove();
  }, 3000);
}


function downloadCurrentScript() {
  if (!currentScript) return;

  const filePath = `scripts/${currentScript.id}.txt`;
  const a = document.createElement('a');
  a.href = filePath;
  a.download = `${currentScript.name}.txt`;
  a.click();
}


window.addEventListener('click', e => {
  if (e.target.id === 'previewModal') closePreview();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closePreview();
});


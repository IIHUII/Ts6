  //  hi bro :) ? 
  const FILES_DATA = [
            {
                id: "Dark hub 1",
                name: "Dark Hub 1",
                type: "txt",
                size: "73KB",
                description: "سكربت سجاد بحث : deep or drak hub",
                downloads: "8",
                category: "سجاد",
                path: "scripts/Dark hub 1.txt"
            },
            {
                id: "Dark hub 2",
                name: "Dark Hub 2",
                type: "lua",
                size: "87KB",
                downloads: "6",
                category: "سجاد",
                path: "scripts/Dark hub 2.txt"
            },
            {
                id: "Dark hub 3",
                name: "Dark Hub 3",
                type: "txt",
                size: "78KB",
                description: "سكربت سجاد بحث : deep or drak hub",
                downloads: "4",
                category: "سجاد",
                path: "scripts/Dark hub 3.txt"
            },
            {
                id: "alfa",
                name: "الفا",
                type: "txt",
                size: "114KB",
                description: "سكربت الفا بحث في الغيمه : الفا و alfa",
                category: "الفا",
                downloads: "5",
                path: "scripts/alfa.txt"
            },
            {
                id: "zxe hub",
                name: "غالي",
                type: "txt",
                size: "64KB",
                description: "سكربت غالي تحت الصيانه البحث : zxe hub",
                downloads: "8",
                category: "غالي",
                path: "scripts/zxe hub.txt"
            },
            {
                id: "zex hub2",
                name: "2 غالي",
                type: "txt",
                size: "64KB",
                description: "سكربت غالي تحت الصيانه البحث : zxe hub",
                downloads: "8",
                category: "غالي",
                path: "scripts/zex hub2.txt"
            },
            {
                id: "khalefa1",
                name: "خليفه",
                type: "txt",
                size: "265KB",
                description: "سكربت خليفه البحث : خليفه",
                downloads: "8",
                category: "خليفه",
                path: "scripts/khalefa1.txt"
            },
            {
                id: "khalefa2",
                name: "2 خليفه",
                type: "txt",
                size: "265KB",
                description: "سكربت خليفه تبع النار البحث : ؟؟؟",
                downloads: "8",
                category: "خليفه",
                path: "scripts/khalefa2.txt"
            },
            {
                id: "khalefa3",
                name: "3 خليفه",
                type: "txt",
                size: "189KB",
                description: "سكربت خليفه البحث : خليفه",
                downloads: "8",
                category: "خليفه",
                path: "scripts/khalefa3.txt"
            },
            {
                id: "khalefa4",
                name: "4 خليفه",
                type: "txt",
                size: "17KB",
                description: "سكربت خليفه البحث : خليفه",
                downloads: "8",
                category: "خليفه",
                path: "scripts/khalefa4.txt"
            },
            {
                id: "TNT",
                name: "TNT",
                type: "txt",
                size: "115KB",
                description: "سكربت تي ان تي بالبحث : TNT",
                downloads: "8",
                category: "TNT",
                path: "scripts/TNT.txt"
            }
        ];

        let currentScript = null;
        let activeCategory = 'all';
        const monthlyStats = {
            downloads: 2143,
            users: 1847,
            updates: 7,
            rating: 4.8
        };


        function renderScriptCards() {
            const container = document.getElementById("scriptsContainer");
            container.innerHTML = "";

            FILES_DATA.forEach((file) => {
                const card = document.createElement("div");
                card.className = "script-card";
                card.setAttribute('data-category', file.category);
                card.setAttribute('data-id', file.id);
                card.innerHTML = `
                    <div class="script-icon">
                        <i class="fas fa-${file.type === 'lua' ? 'file-code' : 'file-alt'}"></i>
                    </div>
                    <div class="script-name">${escapeHTML(file.name)}</div>
                    <div class="script-meta">
                        <span><i class="fas fa-file"></i> ${escapeHTML(file.type)}</span>
                        <span><i class="fas fa-weight-hanging"></i> ${escapeHTML(file.size)}</span>
                        <span><i class="fas fa-download"></i> ${escapeHTML(file.downloads)}</span>
                    </div>
                    <div class="script-description">${escapeHTML(file.description)}</div>
                    <div class="link-status available">متاح</div>
                `;


                card.addEventListener('click', () => openPreview(file));
                container.appendChild(card);
            });
        }


        async function openPreview(file) {
            currentScript = file;
            document.getElementById("scriptNamePreview").textContent = file.name;
            document.getElementById("scriptPreviewContent").textContent = "جاري تحميل السكربت...";
            document.getElementById("previewModal").classList.add('active');

            try {

                const response = await fetch(file.path);
                if (!response.ok) throw new Error('فشل في تحميل السكربت');

                const content = await response.text();
                document.getElementById("scriptPreviewContent").textContent = content;
                currentScript.content = content;
            } catch (error) {
                console.error('Error loading script:', error);
                document.getElementById("scriptPreviewContent").textContent = `// خطأ في تحميل السكربت\n// ${error.message}`;
            }
        }


        function closePreview() {
            document.getElementById("previewModal").classList.remove('active');
        }


        function downloadCurrentScript() {
            if (!currentScript || !currentScript.content) {
                showDownloadMessage("لا يوجد سكربت للتحميل!", false);
                return;
            }

            try {
                const blob = new Blob([currentScript.content], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${currentScript.name}.${currentScript.type}`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);


                const fileIndex = FILES_DATA.findIndex(f => f.id === currentScript.id);
                if (fileIndex !== -1) {
                    FILES_DATA[fileIndex].downloads = (parseInt(FILES_DATA[fileIndex].downloads) + 1).toString();
                    monthlyStats.downloads += 1;
                    updateMonthlyStats();
                    renderScriptCards();
                }

                showDownloadMessage('تم تحميل السكربت بنجاح!', true);
            } catch (error) {
                console.error('Error downloading script:', error);
                showDownloadMessage("حدث خطأ أثناء التحميل!", false);
            }
        }


        function showDownloadMessage(message, isSuccess) {
            const messageDiv = document.getElementById('downloadMessage');
            messageDiv.querySelector('#messageText').textContent = message;
            messageDiv.className = `download-message ${isSuccess ? 'success' : 'error'}`;
            messageDiv.classList.add('show');

            setTimeout(() => {
                messageDiv.classList.remove('show');
            }, 3000);
        }


        function setupNavigation() {
            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');

                    document.querySelectorAll('.page-section').forEach(section => {
                        section.classList.remove('active');
                    });

                    const sectionId = this.getAttribute('data-section') + '-section';
                    document.getElementById(sectionId).classList.add('active');

                    window.scrollTo({top: 0, behavior: 'smooth'});
                });
            });

            document.querySelectorAll('.footer-links a').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const sectionId = this.getAttribute('data-section') + '-section';

                    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                    document.querySelector(`.nav-btn[data-section="${this.getAttribute('data-section')}"]`).classList.add('active');

                    document.querySelectorAll('.page-section').forEach(section => {
                        section.classList.remove('active');
                    });

                    document.getElementById(sectionId).classList.add('active');
                    window.scrollTo({top: 0, behavior: 'smooth'});
                });
            });

            document.getElementById('scripts-btn')?.addEventListener('click', () => {
                document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                document.querySelector('.nav-btn[data-section="scripts"]').classList.add('active');
                document.querySelectorAll('.page-section').forEach(section => section.classList.remove('active'));
                document.getElementById('scripts-section').classList.add('active');
                window.scrollTo({top: 0, behavior: 'smooth'});
            });

            document.getElementById('about-btn')?.addEventListener('click', () => {
                document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                document.querySelector('.nav-btn[data-section="about"]').classList.add('active');
                document.querySelectorAll('.page-section').forEach(section => section.classList.remove('active'));
                document.getElementById('about-section').classList.add('active');
                window.scrollTo({top: 0, behavior: 'smooth'});
            });
        }


        function setupUI() {
            document.querySelector('.hacker-text')?.style.setProperty('width', '0');
            setTimeout(() => {
                document.querySelector('.hacker-text')?.style.setProperty('animation', 'typing 3s steps(40) forwards');
            }, 500);

            document.getElementById('scriptSearch')?.addEventListener('input', filterScripts);

            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.addEventListener('click', function () {
                    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    activeCategory = this.getAttribute('data-category');
                    filterScripts();
                });
            });

            window.addEventListener('scroll', () => {
                const scrollTopBtn = document.getElementById('scrollTop');
                if (window.scrollY > 300) {
                    scrollTopBtn.classList.add('visible');
                } else {
                    scrollTopBtn.classList.remove('visible');
                }
            });

            document.getElementById('scrollTop').addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

            document.getElementById('discordBtn').addEventListener('click', () => {
                window.open('https://discord.gg/6E72sHEsP7', '_blank');
            });


        }


        function setupThemeSwitcher() {
            const darkBtn = document.querySelector('.theme-btn.dark');
            const lightBtn = document.querySelector('.theme-btn.light');

            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'light') {
                document.body.classList.add('light-theme');
                darkBtn.classList.remove('active');
                lightBtn.classList.add('active');
            }

            darkBtn.addEventListener('click', () => {
                document.body.classList.remove('light-theme');
                darkBtn.classList.add('active');
                lightBtn.classList.remove('active');
                localStorage.setItem('theme', 'dark');
            });

            lightBtn.addEventListener('click', () => {
                document.body.classList.add('light-theme');
                lightBtn.classList.add('active');
                darkBtn.classList.remove('active');
                localStorage.setItem('theme', 'light');
            });
        }


        function updateMonthlyStats() {
            document.getElementById('downloadsCounter').textContent = monthlyStats.downloads.toLocaleString();
            document.getElementById('usersCounter').textContent = monthlyStats.users.toLocaleString();
            document.getElementById('updatesCounter').textContent = monthlyStats.updates;
            document.getElementById('ratingCounter').textContent = monthlyStats.rating.toFixed(1);
        }


        function startStatsAnimation() {
            setInterval(() => {
                const newDownloads = Math.floor(Math.random() * 5);
                monthlyStats.downloads += newDownloads;

                if (Math.random() > 0.7) {
                    monthlyStats.users += 1;
                }

                if (Math.random() > 0.9) {
                    const change = (Math.random() - 0.5) * 0.1;
                    monthlyStats.rating = Math.min(5, Math.max(4.5, monthlyStats.rating + change));
                }

                updateMonthlyStats();
            }, 3000);
        }


        function filterScripts() {
            const searchTerm = document.getElementById('scriptSearch').value.toLowerCase();

            document.querySelectorAll('.script-card').forEach(card => {
                const name = card.querySelector('.script-name').textContent.toLowerCase();
                const description = card.querySelector('.script-description').textContent.toLowerCase();
                const category = card.getAttribute('data-category').toLowerCase();

                const matchesSearch = name.includes(searchTerm) || description.includes(searchTerm);
                const matchesCategory = activeCategory === 'all' || category === activeCategory.toLowerCase();

                if (matchesSearch && matchesCategory) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }


        function sanitizeInput(input) {
            input.value = input.value.replace(/[<>&"']/g, '');
        }


        function escapeHTML(str) {
            if (!str) return '';
            return str
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        }


        document.addEventListener('DOMContentLoaded', () => {
            renderScriptCards();
            setupUI();
            setupThemeSwitcher();
            setupNavigation();
            updateMonthlyStats();
            startStatsAnimation();
        });


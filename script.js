// Global variables
let currentUser = null;
let posts = [
    {
        id: 1,
        author: { name: 'أحمد محمد', username: 'ahmed_m', avatar: 'أ' },
        content: 'مرحباً بكم في تطبيق ZOPLP! هذا أول منشور لي في هذا التطبيق الرائع. أحب فكرة التعليقات الصوتية والأصدقاء بلا حدود! 🚀',
        timestamp: 'منذ 5 دقائق',
        likes: 15,
        comments: 3,
        liked: false,
        commentsData: [
            {
                id: 1,
                author: { name: 'فاطمة علي', avatar: 'ف' },
                content: 'تعليق رائع! أتفق معك تماماً. هذا التطبيق سيغير طريقة تواصلنا 👍',
                timestamp: 'منذ 3 دقائق',
                type: 'text'
            },
            {
                id: 2,
                author: { name: 'عبدالله محمد', avatar: 'ع' },
                content: '',
                timestamp: 'منذ 8 دقائق',
                type: 'voice',
                duration: '0:23'
            }
        ]
    },
    {
        id: 2,
        author: { name: 'سارة أحمد', username: 'sara_a', avatar: 'س' },
        content: 'أخيراً شبكة تواصل بلا قيود على عدد الأصدقاء! هذا ما كنت أبحث عنه. التعليقات الصوتية ميزة رائعة جداً 🎤',
        timestamp: 'منذ 15 دقيقة',
        likes: 28,
        comments: 7,
        liked: true,
        commentsData: [
            {
                id: 1,
                author: { name: 'محمد علي', avatar: 'م' },
                content: 'أتفق معك تماماً! التعليقات الصوتية تضيف بُعداً جديداً للتواصل',
                timestamp: 'منذ 10 دقائق',
                type: 'text'
            }
        ]
    },
    {
        id: 3,
        author: { name: 'محمد علي', username: 'mohamed_ali', avatar: 'م' },
        content: 'التعليقات الصوتية ميزة رائدة جداً! يمكن التعبير عن المشاعر بشكل أفضل بالصوت. شكراً لفريق ZOPLP على هذا الإبداع 👏',
        timestamp: 'منذ 30 دقيقة',
        likes: 42,
        comments: 12,
        liked: false,
        commentsData: [
            {
                id: 1,
                author: { name: 'نور أحمد', avatar: 'ن' },
                content: '',
                timestamp: 'منذ 25 دقيقة',
                type: 'voice',
                duration: '0:45'
            },
            {
                id: 2,
                author: { name: 'خالد محمد', avatar: 'خ' },
                content: 'صحيح! الصوت ينقل المشاعر أكثر من النص',
                timestamp: 'منذ 20 دقيقة',
                type: 'text'
            }
        ]
    }
];

// Utility functions
function getAvatarColor(name) {
    const colors = [
        'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
        'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
        'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
}

function formatTime(timestamp) {
    return timestamp;
}

// Authentication functions
function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
    if (username && password) {
        currentUser = {
            name: username,
            username: username.toLowerCase().replace(/\s+/g, '_'),
            avatar: username.charAt(0).toUpperCase()
        };
        showMainApp();
    } else {
        alert('يرجى إدخال اسم المستخدم وكلمة المرور');
    }
}

function demoLogin() {
    currentUser = {
        name: 'مستخدم تجريبي',
        username: 'demo_user',
        avatar: 'م'
    };
    showMainApp();
}

function showMainApp() {
    document.getElementById('loginPage').classList.remove('active');
    document.getElementById('mainApp').classList.add('active');
    
    // Update user info in the app
    updateUserInfo();
    
    // Render posts
    renderPosts();
}

function updateUserInfo() {
    const elements = [
        'userAvatar', 'profileAvatar', 'createPostAvatar'
    ];
    
    elements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = currentUser.avatar;
            element.style.background = getAvatarColor(currentUser.name);
        }
    });
    
    const nameElements = [
        'userName', 'profileName', 'createPostName'
    ];
    
    nameElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = currentUser.name;
        }
    });
    
    const usernameElement = document.getElementById('profileUsername');
    if (usernameElement) {
        usernameElement.textContent = `@${currentUser.username}`;
    }
}

// Post functions
function createPost() {
    const content = document.getElementById('newPostContent').value.trim();
    
    if (!content) {
        alert('يرجى كتابة محتوى المنشور');
        return;
    }
    
    const newPost = {
        id: posts.length + 1,
        author: {
            name: currentUser.name,
            username: currentUser.username,
            avatar: currentUser.avatar
        },
        content: content,
        timestamp: 'الآن',
        likes: 0,
        comments: 0,
        liked: false,
        commentsData: []
    };
    
    posts.unshift(newPost);
    document.getElementById('newPostContent').value = '';
    renderPosts();
    
    // Show success message
    showNotification('تم نشر المنشور بنجاح! 🎉');
}

function renderPosts() {
    const container = document.getElementById('postsContainer');
    container.innerHTML = '';
    
    posts.forEach(post => {
        const postElement = createPostElement(post);
        container.appendChild(postElement);
    });
}

function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'post-card';
    postDiv.innerHTML = `
        <div class="post-header">
            <div class="post-avatar" style="background: ${getAvatarColor(post.author.name)}">${post.author.avatar}</div>
            <div class="post-author">
                <h4>${post.author.name}</h4>
                <p>@${post.author.username} • ${post.timestamp}</p>
            </div>
        </div>
        
        <div class="post-content">${post.content}</div>
        
        <div class="post-actions">
            <div class="action-buttons">
                <button class="action-btn ${post.liked ? 'liked' : ''}" onclick="toggleLike(${post.id})">
                    <span class="action-icon">${post.liked ? '❤️' : '🤍'}</span>
                    <span class="action-count">${post.likes}</span>
                </button>
                
                <button class="action-btn" onclick="toggleComments(${post.id})">
                    <span class="action-icon">💬</span>
                    <span class="action-count">${post.comments}</span>
                </button>
                
                <button class="action-btn">
                    <span class="action-icon">🔄</span>
                    <span>مشاركة</span>
                </button>
            </div>
        </div>
        
        <div id="comments-${post.id}" class="comments-section" style="display: none;">
            ${renderComments(post.commentsData)}
            ${renderAddComment(post.id)}
        </div>
    `;
    
    return postDiv;
}

function renderComments(comments) {
    if (!comments || comments.length === 0) {
        return '<p style="text-align: center; color: #6b7280; padding: 1rem;">لا توجد تعليقات بعد</p>';
    }
    
    return comments.map(comment => {
        if (comment.type === 'voice') {
            return `
                <div class="comment">
                    <div class="comment-avatar" style="background: ${getAvatarColor(comment.author.name)}">${comment.author.avatar}</div>
                    <div class="comment-content">
                        <div class="comment-bubble voice-comment">
                            <div class="comment-author">${comment.author.name}</div>
                            <div class="voice-player">
                                <button class="play-btn" onclick="playVoiceComment()">▶️</button>
                                <div class="voice-waveform">
                                    <div class="voice-progress"></div>
                                </div>
                                <span class="voice-duration">${comment.duration}</span>
                            </div>
                            <div class="voice-label">🎤 تعليق صوتي</div>
                        </div>
                        <div class="comment-time">${comment.timestamp}</div>
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="comment">
                    <div class="comment-avatar" style="background: ${getAvatarColor(comment.author.name)}">${comment.author.avatar}</div>
                    <div class="comment-content">
                        <div class="comment-bubble">
                            <div class="comment-author">${comment.author.name}</div>
                            <div class="comment-text">${comment.content}</div>
                        </div>
                        <div class="comment-time">${comment.timestamp}</div>
                    </div>
                </div>
            `;
        }
    }).join('');
}

function renderAddComment(postId) {
    return `
        <div class="add-comment">
            <div class="comment-avatar" style="background: ${getAvatarColor(currentUser.name)}">${currentUser.avatar}</div>
            <input type="text" placeholder="اكتب تعليقاً..." id="comment-input-${postId}" onkeypress="handleCommentKeyPress(event, ${postId})">
            <button class="voice-comment-btn" onclick="addVoiceComment(${postId})" title="إضافة تعليق صوتي">🎤</button>
        </div>
    `;
}

function toggleLike(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.liked = !post.liked;
        post.likes += post.liked ? 1 : -1;
        renderPosts();
        
        if (post.liked) {
            showNotification('تم الإعجاب بالمنشور! ❤️');
        }
    }
}

function toggleComments(postId) {
    const commentsSection = document.getElementById(`comments-${postId}`);
    if (commentsSection) {
        const isVisible = commentsSection.style.display !== 'none';
        commentsSection.style.display = isVisible ? 'none' : 'block';
        
        if (!isVisible) {
            commentsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
}

function handleCommentKeyPress(event, postId) {
    if (event.key === 'Enter') {
        addTextComment(postId);
    }
}

function addTextComment(postId) {
    const input = document.getElementById(`comment-input-${postId}`);
    const content = input.value.trim();
    
    if (!content) return;
    
    const post = posts.find(p => p.id === postId);
    if (post) {
        const newComment = {
            id: post.commentsData.length + 1,
            author: {
                name: currentUser.name,
                avatar: currentUser.avatar
            },
            content: content,
            timestamp: 'الآن',
            type: 'text'
        };
        
        post.commentsData.push(newComment);
        post.comments++;
        input.value = '';
        renderPosts();
        
        // Show comments section
        setTimeout(() => {
            toggleComments(postId);
        }, 100);
        
        showNotification('تم إضافة التعليق بنجاح! 💬');
    }
}

function addVoiceComment(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        const newComment = {
            id: post.commentsData.length + 1,
            author: {
                name: currentUser.name,
                avatar: currentUser.avatar
            },
            content: '',
            timestamp: 'الآن',
            type: 'voice',
            duration: '0:15'
        };
        
        post.commentsData.push(newComment);
        post.comments++;
        renderPosts();
        
        // Show comments section
        setTimeout(() => {
            toggleComments(postId);
        }, 100);
        
        showNotification('تم إضافة التعليق الصوتي بنجاح! 🎤');
    }
}

function playVoiceComment() {
    showNotification('يتم تشغيل التعليق الصوتي... 🔊');
}

// Utility functions
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
        color: white;
        padding: 1rem 2rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        font-weight: 600;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners
    document.getElementById('username').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('password').focus();
        }
    });
    
    document.getElementById('password').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            login();
        }
    });
    
    document.getElementById('newPostContent').addEventListener('input', function() {
        const btn = document.querySelector('.btn-post');
        btn.disabled = !this.value.trim();
    });
    
    // Show welcome message
    setTimeout(() => {
        showNotification('مرحباً بك في تطبيق ZOPLP! 🎉');
    }, 1000);
});


/* ============================================================
   海口海事局智慧后勤 - 共享 JavaScript 工具
   ============================================================ */
(function(window) {
  'use strict';

  // ==================== Toast ====================
  var toastTimer = null;
  function showToast(text, iconType) {
    var toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast';
      document.querySelector('.miniprogram').appendChild(toast);
    }
    var iconHtml = '';
    if (iconType === 'success') {
      iconHtml = '<div class="toast-icon"><svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>';
    } else if (iconType === 'error') {
      iconHtml = '<div class="toast-icon"><svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg></div>';
    } else {
      iconHtml = '<div class="toast-icon"><svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg></div>';
    }
    toast.innerHTML = iconHtml + '<span>' + text + '</span>';
    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function() {
      toast.classList.remove('show');
    }, 1800);
  }

  // ==================== Modal ====================
  function showModal(id) {
    var modal = document.getElementById(id);
    if (modal) modal.classList.add('show');
  }
  function hideModal(id) {
    var modal = document.getElementById(id);
    if (modal) modal.classList.remove('show');
  }

  // ==================== Status Bar Time ====================
  function updateStatusTime() {
    var els = document.querySelectorAll('.status-bar .time');
    if (!els.length) return;
    var now = new Date();
    var h = String(now.getHours()).padStart(2, '0');
    var m = String(now.getMinutes()).padStart(2, '0');
    els.forEach(function(el) { el.textContent = h + ':' + m; });
  }

  // ==================== Navigation ====================
  function navigate(url) {
    window.location.href = url;
  }

  // ==================== Navigation Back ====================
  function goBack() {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = 'haikou-maritime-home.html';
    }
  }

  // ==================== Tab Bar ====================
  var tabUrls = {
    '首页': 'haikou-maritime-home.html',
    '审批': 'P26-approval-home.html',
    '任务': 'P30-task-home.html',
    '我的': 'P28-profile.html'
  };
  function initTabBar(activeTab) {
    var items = document.querySelectorAll('.tabbar-item');
    items.forEach(function(item) {
      item.addEventListener('click', function() {
        var tabName = this.getAttribute('data-tab');
        if (this.classList.contains('active')) return;
        var url = tabUrls[tabName];
        if (url) {
          window.location.href = url;
        }
      });
    });
  }

  // ==================== Tabs (horizontal) ====================
  function initTabs(callback) {
    var tabs = document.querySelectorAll('.tab, .segmented-item, .sub-tab');
    tabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        var siblings = this.parentElement.querySelectorAll('.tab, .segmented-item, .sub-tab');
        siblings.forEach(function(s) { s.classList.remove('active'); });
        this.classList.add('active');
        if (callback) callback(this.getAttribute('data-tab') || this.textContent.trim());
      });
    });
  }

  // ==================== Switch Toggle ====================
  function initSwitches() {
    document.querySelectorAll('.switch input').forEach(function(input) {
      input.addEventListener('change', function() {
        // handled by CSS
      });
    });
  }

  // ==================== Photo Upload Simulation ====================
  function initPhotoUpload() {
    document.querySelectorAll('.photo-add').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var container = this.parentElement;
        var count = container.querySelectorAll('.photo-item').length;
        if (count >= 9) {
          showToast('最多上传9张照片', 'info');
          return;
        }
        var item = document.createElement('div');
        item.className = 'photo-item';
        item.innerHTML = '<div style="width:100%;height:100%;background:linear-gradient(135deg,#E6F0FF,#1677FF);display:flex;align-items:center;justify-content:center;"><svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#FFFFFF" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></div><div class="photo-delete" onclick="this.parentElement.remove()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></div>';
        container.insertBefore(item, this);
      });
    });
  }

  // ==================== Countdown ====================
  function startCountdown(btn, seconds) {
    var remaining = seconds;
    btn.disabled = true;
    btn.classList.add('btn-disabled');
    var update = function() {
      if (remaining <= 0) {
        btn.textContent = '重新获取';
        btn.disabled = false;
        btn.classList.remove('btn-disabled');
        return;
      }
      btn.textContent = remaining + 's后重发';
      remaining--;
      setTimeout(update, 1000);
    };
    update();
  }

  // ==================== Auto Init ====================
  function init() {
    updateStatusTime();
    setInterval(updateStatusTime, 60000);
    initSwitches();
    initPhotoUpload();

    // Modal close on mask click
    document.querySelectorAll('.modal-mask, .bottom-sheet-mask').forEach(function(mask) {
      mask.addEventListener('click', function(e) {
        if (e.target === this) {
          this.classList.remove('show');
        }
      });
    });

    // Nav back button
    document.querySelectorAll('.nav-back').forEach(function(btn) {
      btn.addEventListener('click', goBack);
    });

    // Fade in on load
    document.querySelectorAll('.content').forEach(function(c) {
      c.classList.add('fade-in');
    });
  }

  if (document.readyState !== 'loading') {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }

  // Export
  window.MS = {
    showToast: showToast,
    showModal: showModal,
    hideModal: hideModal,
    initTabBar: initTabBar,
    initTabs: initTabs,
    startCountdown: startCountdown,
    goBack: goBack,
    navigate: navigate
  };
})(window);

// แปล
document.addEventListener("DOMContentLoaded", () => {
  // --- โค้ดแปลภาษาเดิม ---
  const translations = {
    ไทย: {
      display: "แสดง",
      language: "ภาษา",
      send: "ส่งลิงก์",
      share: "แชร์",
      qr: "QR Code",
      image: "เลือกรูป"
    },
    Eng: {
      display: "Display",
      language: "Language",
      send: "Send Link",
      share: "Share",
      qr: "QR Code",
      image: "Select Image"
    },
    中文: {
      display: "显示",
      language: "语言",
      send: "发送链接",
      share: "分享",
      qr: "二维码",
      image: "选择图片"
    },
    ລາວ: {
      display: "ສະແດງ",
      language: "ພາສາ",
      send: "ສົ່ງລິ້ງ",
      share: "ແບ່ງປັນ",
      qr: "QR Code",
      image: "ເລືອກຮູບ"
    }
  };

  const languageToggle = document.getElementById("languageToggle");
  const languageMenu = document.getElementById("languageMenu");

  languageToggle.addEventListener("click", () => {
    languageMenu.classList.toggle("hidden");
  });

  document.querySelectorAll("#languageMenu a").forEach(item => {
    item.addEventListener("click", e => {
      e.preventDefault();
      const selected = e.target.textContent.trim();
      const t = translations[selected];
      if (!t) return;

      document.getElementById("language-label").textContent = t.language;
      document.getElementById("btn-send").textContent = t.send;
      document.getElementById("btn-share").textContent = t.share;
      document.getElementById("btn-qr").textContent = t.qr;
      document.getElementById("btn-image").textContent = t.image;
      document.getElementById("btn-display").textContent = t.display;

      languageMenu.classList.add("hidden");
    });
  });

  document.addEventListener("click", e => {
    if (!languageToggle.contains(e.target) && !languageMenu.contains(e.target)) {
      languageMenu.classList.add("hidden");
    }
  });

  // --- โค้ดปุ่มขยายรูป ---
  const btnDisplay = document.querySelector('.display-button button');
  const images = document.querySelectorAll('.gallery-image');

  btnDisplay.addEventListener('click', () => {
    const isExpanded = btnDisplay.getAttribute('aria-pressed') === 'true';

    images.forEach(img => {
      if (isExpanded) {
        img.classList.remove('h-96');
        img.classList.add('h-60');
      } else {
        img.classList.remove('h-60');
        img.classList.add('h-96');
      }
    });

    btnDisplay.setAttribute('aria-pressed', (!isExpanded).toString());

    images[0].scrollIntoView({ behavior: "smooth", block: "start" });

    setTimeout(() => {
      window.scrollBy({ top: 100, behavior: "smooth" });
    }, 500);
  });

});


  // * --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
// โหลดรูป 
  // --- ดาวน์โหลดภาพเมื่อคลิกปุ่มดาวน์โหลด ---
document.querySelectorAll('.download-btn').forEach(btn => {
  btn.addEventListener('click', async (e) => {
    e.preventDefault();  // ป้องกันการเปิดลิงก์แบบปกติ

    const url = btn.href;
    const filename = url.split('/').pop().split('?')[0];

    try {
      const response = await fetch(url, { mode: 'cors' });
      if (!response.ok) throw new Error('Network response was not ok');

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      alert('ไม่สามารถดาวน์โหลดไฟล์ได้: ' + error.message);
    }
  });
});



// * --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//เลือกรูป
const toggleSelectionBtn = document.querySelector('#btn-image-select');
  const imageItems = document.querySelectorAll('.image-item');
  let selectionMode = false;

  function clearSelection() {
    selectionMode = false;
    imageItems.forEach(div => {
      div.classList.remove('selectable', 'selected');
    });
  }

  toggleSelectionBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // กัน event bubble
    selectionMode = !selectionMode;

    if (selectionMode) {
      imageItems.forEach(div => div.classList.add('selectable'));
    } else {
      clearSelection();
    }
  });

  // ✅ คลิกทั้ง image-item เพื่อเลือก/ยกเลิก
  imageItems.forEach(div => {
    div.addEventListener('click', (e) => {
      if (!selectionMode) return;

      e.preventDefault(); // กันลิงก์
      e.stopPropagation(); // กัน bubble
      div.classList.toggle('selected');
    });
  });

  // ✅ ยกเลิกโหมดเลือกเมื่อคลิกนอกปุ่ม/ภาพ
  document.addEventListener('click', (e) => {
    if (!toggleSelectionBtn.contains(e.target) &&
        !e.target.closest('.image-item')) {
      clearSelection();
    }
  });





// * --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//เลือกปุ่มเว็บไซต์


  const toggleButton = document.getElementById('toggleButton');
  const socialIcons = document.getElementById('socialIcons');

  toggleButton.addEventListener('click', () => {
    const expanded = toggleButton.getAttribute('aria-expanded') === 'true';
    toggleButton.setAttribute('aria-expanded', !expanded);
    socialIcons.setAttribute('aria-hidden', expanded);

    // toggle visibility
    socialIcons.classList.toggle('opacity-0');
    socialIcons.classList.toggle('pointer-events-none');
  });

// * --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
 
  
